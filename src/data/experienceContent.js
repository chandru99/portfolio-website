// Deloitte's combined "Analyst -> Consultant" narrative has been split into
// two role entries below (Consultant, then Analyst) as a first-draft copy —
// the Signal/Response/Shift text and the year split are duplicated/approximate
// placeholders pending real per-role content.
export const roles = [
  {
    company: 'Applied Medical',
    title: 'MBA Intern, Operations Strategy',
    years: '2026-present',
    signal:
      'Product configuration management across two lines was slow enough that time-to-market was bleeding weeks, with the same friction waiting in 358 more lines behind them.',
    response:
      'Redesigned the configuration process with an eye on whether the fix would scale, not just work for two lines. Automated the manual documentation work sitting underneath it.',
    shift:
      '4 weeks cut from time-to-market. A scalable path identified across all 360 product lines. 20 hours a week of manual work automated away.',
    tags: [
      'Process redesign',
      'Operations strategy',
      'Automation identification',
      'Scalability thinking',
    ],
  },
  {
    company: 'Deloitte',
    title: 'Consultant',
    years: '2023-2025',
    signal:
      "Warehouse delays at Caterpillar looked like a staffing problem. Four teams couldn't agree on what should replace a failing BOM-sync tool. A compliance interface built for a system nobody used anymore was eating 8-9 hours per order.",
    response:
      'I went looking for what was actually broken instead of accepting the stated diagnosis. Traced the warehouse delay to manual sorting logic buried in transfer order tags. Ran individual and cross-timezone alignment calls until four conflicting teams landed on one SAP-based fix. Designed a direct SAP-to-Snowflake integration the client had never run before, then got senior technical leaders to trust it.',
    shift:
      '1,000+ hours saved annually. 8-9 hours cut to about 1. An $8K/month vendor dependency, gone. Four years in, real ownership, decisions I was trusted with years ahead of my level.',
    tags: [
      'Systems architecture',
      'Stakeholder alignment',
      'Root-cause diagnosis',
      'SAP ABAP development',
    ],
  },
  {
    company: 'Deloitte',
    title: 'Business Technology Analyst',
    years: '2021-2023',
    signal:
      "Warehouse delays at Caterpillar looked like a staffing problem. Four teams couldn't agree on what should replace a failing BOM-sync tool. A compliance interface built for a system nobody used anymore was eating 8-9 hours per order.",
    response:
      'I went looking for what was actually broken instead of accepting the stated diagnosis. Traced the warehouse delay to manual sorting logic buried in transfer order tags. Ran individual and cross-timezone alignment calls until four conflicting teams landed on one SAP-based fix. Designed a direct SAP-to-Snowflake integration the client had never run before, then got senior technical leaders to trust it.',
    shift:
      '1,000+ hours saved annually. 8-9 hours cut to about 1. An $8K/month vendor dependency, gone. Four years in, real ownership, decisions I was trusted with years ahead of my level.',
    tags: [
      'Systems architecture',
      'Stakeholder alignment',
      'Root-cause diagnosis',
      'SAP ABAP development',
    ],
  },
]

export const education = [
  'MBA, Digital Transformation, Business Analytics focus — UC Irvine Paul Merage School of Business. GPA 3.9. Paul & Elisabeth Merage Full-Tuition Scholarship (top 5% of applicants). Expected June 2027.',
  'B.Tech, Electrical and Electronics Engineering — National Institute of Technology, Andhra Pradesh. GPA 3.7.',
]

export const skills = [
  'SAP S/4HANA',
  'SAP ABAP',
  'Snowflake',
  'SQL',
  'Python',
  'Tableau',
  'Machine learning (forecasting, classification)',
  'Product management (Aha/PMI certified)',
]
