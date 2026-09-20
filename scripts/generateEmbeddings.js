// One-time/on-demand build step. Run manually with `npm run embed`
// whenever src/data/knowledgeBase.md changes. Not part of the live app,
// not a serverless function — this just writes a committed JSON file
// that Phase 7b's chat feature will read and search against.
import { readFile, writeFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config as loadEnv } from 'dotenv'
import { GoogleGenAI } from '@google/genai'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const KNOWLEDGE_BASE_PATH = path.join(ROOT_DIR, 'src/data/knowledgeBase.md')
const OUTPUT_PATH = path.join(ROOT_DIR, 'src/data/knowledgeEmbeddings.json')
const EMBEDDING_MODEL = 'gemini-embedding-001'
const PLACEHOLDER_KEY = 'your-gemini-api-key-here'

loadEnv({ path: path.join(ROOT_DIR, '.env.local') })

// Splits the knowledge base into one chunk per ## or ### section, keeping
// each section's heading line attached to its own body text (natural
// section boundaries, not a fixed-size split). A heading immediately
// followed by another heading with no body text in between (e.g.
// "## Professional Experience" right before its "### ..." subsections) is
// a purely structural label, not a self-contained section, so it's
// dropped rather than embedded as empty content.
function chunkMarkdown(markdown) {
  const lines = markdown.split('\n')
  const sections = []
  let current = null

  for (const line of lines) {
    const headingMatch = line.match(/^(##|###)\s+(.*)$/)
    if (headingMatch) {
      if (current) sections.push(current)
      current = { heading: headingMatch[2].trim(), lines: [line] }
    } else if (current) {
      current.lines.push(line)
    }
    // Lines before the first ##/### heading (the H1 document title) are
    // intentionally dropped: not a split point, and redundant with Identity.
  }
  if (current) sections.push(current)

  return sections
    .map((section) => ({
      heading: section.heading,
      text: section.lines.join('\n').trim(),
    }))
    .filter((chunk) => {
      const bodyOnly = chunk.text.replace(/^#{2,3}\s+.*$/m, '').trim()
      return bodyOnly.length > 0
    })
    .map((chunk, index) => ({ id: `chunk-${String(index + 1).padStart(2, '0')}`, ...chunk }))
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey === PLACEHOLDER_KEY) {
    console.error('GEMINI_API_KEY is missing or still a placeholder in .env.local.')
    console.error('Paste your real Gemini API key into .env.local and re-run: npm run embed')
    process.exit(1)
  }

  console.log(`Reading ${path.relative(ROOT_DIR, KNOWLEDGE_BASE_PATH)}...`)
  const markdown = await readFile(KNOWLEDGE_BASE_PATH, 'utf-8')
  const chunks = chunkMarkdown(markdown)

  console.log(`Split into ${chunks.length} chunks:`)
  for (const chunk of chunks) {
    console.log(`  ${chunk.id}  ${chunk.heading}`)
  }

  const ai = new GoogleGenAI({ apiKey })

  console.log(
    `\nRequesting embeddings for all ${chunks.length} chunks in a single batched call ` +
      `(model: ${EMBEDDING_MODEL}, taskType: RETRIEVAL_DOCUMENT)...`,
  )

  let response
  try {
    response = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: chunks.map((chunk) => chunk.text),
      config: { taskType: 'RETRIEVAL_DOCUMENT' },
    })
  } catch (error) {
    console.error(`\nEmbedding request failed: ${error.message}`)
    console.error('No output file was written.')
    process.exit(1)
  }

  const embeddings = response.embeddings
  if (!embeddings || embeddings.length !== chunks.length) {
    console.error(
      `\nExpected ${chunks.length} embeddings back, got ${embeddings ? embeddings.length : 0}. ` +
        'Stopping without writing output.',
    )
    process.exit(1)
  }

  const result = chunks.map((chunk, index) => ({
    id: chunk.id,
    heading: chunk.heading,
    text: chunk.text,
    embedding: embeddings[index].values,
  }))

  await writeFile(OUTPUT_PATH, JSON.stringify(result, null, 2))
  const { size } = await stat(OUTPUT_PATH)
  const dimensions = result[0]?.embedding.length ?? 0

  console.log('\nDone.')
  console.log(`  Chunks embedded: ${result.length}`)
  console.log(`  Embedding dimensions: ${dimensions}`)
  console.log(
    `  Output file: ${path.relative(ROOT_DIR, OUTPUT_PATH)} (${(size / 1024).toFixed(1)} KB)`,
  )
}

main().catch((error) => {
  console.error('\nUnexpected error:', error)
  process.exit(1)
})
