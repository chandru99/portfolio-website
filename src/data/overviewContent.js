export const introduction = {
  bio: "I spent four years building inside SAP for a Fortune 100 manufacturer, not because the software fascinated me, but because that's where the real business problems lived. I got good at finding the problem underneath the stated one, then owning the fix, technical or not. Now I'm at UC Irvine building the toolkit that lets me own those calls end to end, while proving it in real time with BillBack.",
  quote: 'Hard work is the mother of good luck.',
}

export const panels = [
  {
    id: 'experience',
    label: 'Experience',
    roles: [
      {
        company: 'Deloitte',
        title: 'Business Technology Analyst → Consultant',
        years: '2021-2025',
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
    ],
  },
  {
    id: 'projects',
    label: 'Projects & Competitions',
    featured: {
      name: 'BillBack',
      description:
        'co-founded with an MBA cohort mate. AI-powered medical billing audit platform catching errors manual review misses. Full audit in under a minute versus 2+ hours by hand. 1st place, UCI Beall Butterworth Product Development Competition.',
      url: 'https://www.billbackai.com',
    },
    entries: [
      '3rd place, USC Marshall AI Product Challenge (40+ teams) — AI-powered medical bill audit platform.',
      '3rd place, SEGA competition (20+ teams) — go-to-market strategy for Football Manager 2026 in Latin America.',
    ],
  },
  {
    id: 'education',
    label: 'Education & Skills',
    education: [
      'MBA, Digital Transformation, Business Analytics focus — UC Irvine Paul Merage School of Business. GPA 3.9. Paul & Elisabeth Merage Full-Tuition Scholarship (top 5% of applicants). Expected June 2027.',
      'B.Tech, Electrical and Electronics Engineering — National Institute of Technology, Andhra Pradesh. GPA 3.7.',
    ],
    skills: [
      'SAP S/4HANA',
      'SAP ABAP',
      'Snowflake',
      'SQL',
      'Python',
      'Tableau',
      'Machine learning (forecasting, classification)',
      'Product management (Aha/PMI certified)',
    ],
  },
]
