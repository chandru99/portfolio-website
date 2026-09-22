import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { motion, useReducedMotion } from 'framer-motion'
import { RESUME_FILENAME, RESUME_PDF_SRC } from '../data/resume.js'
import './Resume.css'

// Vite bundles the worker file and hands back its final built URL; pdf.js
// needs that URL to run PDF parsing off the main thread.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

// Caps how wide a single page renders on large desktop viewports, so the
// PDF doesn't stretch edge-to-edge on wide monitors; below this the page
// just fills the available preview width.
const MAX_PAGE_WIDTH = 800

function Resume() {
  const shouldReduceMotion = useReducedMotion()
  const previewRef = useRef(null)
  const [previewWidth, setPreviewWidth] = useState(0)
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    const target = previewRef.current
    if (!target) return

    const observer = new ResizeObserver((entries) => {
      setPreviewWidth(entries[0].contentRect.width)
    })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  function handleLoadSuccess({ numPages: loadedPages }) {
    setNumPages(loadedPages)
    setPageNumber(1)
  }

  function goToPreviousPage() {
    setPageNumber((current) => Math.max(1, current - 1))
  }

  function goToNextPage() {
    setPageNumber((current) => Math.min(numPages, current + 1))
  }

  return (
    <div className="resume">
      <h1 className="resume-title">Resume</h1>

      <motion.a
        className="resume-download"
        href={RESUME_PDF_SRC}
        download={RESUME_FILENAME}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      >
        Download Resume
      </motion.a>

      <div className="resume-preview-panel">
        <div className="resume-preview" ref={previewRef}>
          <Document
            file={RESUME_PDF_SRC}
            onLoadSuccess={handleLoadSuccess}
            loading={<p className="resume-status">Loading resume…</p>}
            error={
              <p className="resume-status">
                The preview couldn't load. Use the download button above to view the PDF.
              </p>
            }
          >
            {previewWidth > 0 && (
              <Page
                pageNumber={pageNumber}
                width={Math.min(previewWidth, MAX_PAGE_WIDTH)}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading={<p className="resume-status">Loading page…</p>}
              />
            )}
          </Document>
        </div>
      </div>

      {numPages > 1 && (
        <div className="resume-pagination">
          <motion.button
            type="button"
            className="resume-pagination-button"
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          >
            Previous
          </motion.button>
          <span className="resume-pagination-status">
            Page {pageNumber} of {numPages}
          </span>
          <motion.button
            type="button"
            className="resume-pagination-button"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          >
            Next
          </motion.button>
        </div>
      )}
    </div>
  )
}

export default Resume
