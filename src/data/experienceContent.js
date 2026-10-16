// SOURCES — read this before editing any copy below.
//
//  * Roles, dates and locations: supplied directly by Chandramouli as
//    verified values, and used verbatim.
//  * Every `situation` / `action` / `impact` sentence: derived only from the
//    resume bullets in public/resume/, with no claim added. Where that
//    source states no situation or no outcome, the field is `null` and the
//    dialog says so rather than inventing one.
//  * `public/resume/Chandramouli Resume.pdf` (the newer resume) is NOT in
//    this repo — only the 13 September copy. Drop the newer file in and the
//    bullets below should be re-checked against it.
//  * Edwards Lifesciences has no resume bullets at all. Its `action` is the
//    engagement scope as described by Chandramouli; situation and impact
//    stay null because the engagement runs October–December 2026.
//
// Assets: the four `logo` files exist in public/images/logo/. The `image`
// files do not exist yet. Nothing renders a broken image — each falls back
// until the real file is dropped in at the path named here.

export const intro = {
  eyebrow: 'Experience',
  headline:
    'Where Enterprise Systems, Process Optimization, and Analytics Come Together.',
  description:
    'My experience spans enterprise technology, business process optimization, systems integration, and data-driven solutions that drive operational excellence.',
}

// Shown in the dialog wherever the source material carries no such claim.
export const UNDOCUMENTED = 'Not recorded in the source resume.'

export const companies = [
  {
    id: 'edwards',
    name: 'Edwards Lifesciences',
    monogram: 'EL',
    logo: { src: '/images/logo/Edwards_Lifesciences.svg', alt: 'Edwards Lifesciences logo' },
    location: null,
    dates: 'October 2026 – December 2026',
    roles: [
      {
        id: 'edwards-consultant',
        title: 'AI Strategy Consultant (Student Consulting Project)',
        dates: 'October 2026 – December 2026',
      },
    ],
    items: [
      {
        id: 'edwards-ai-strategy',
        roleId: 'edwards-consultant',
        title: 'AI Use-Case Assessment and Competitor Benchmarking',
        image: { src: '/images/experience/edwards-ai-strategy.webp', alt: '' },
        situation: null,
        action:
          'Assessing AI use cases alongside market and competitor research, covering value, feasibility, risk and benchmarking.',
        impact: null,
      },
    ],
  },
  {
    id: 'applied-medical',
    name: 'Applied Medical',
    monogram: 'AM',
    logo: { src: '/images/logo/applied-medical.svg', alt: 'Applied Medical logo' },
    location: 'Rancho Santa Margarita, California',
    dates: 'June 2026 – September 2026',
    roles: [
      {
        id: 'applied-analyst',
        title: 'Business Analyst Intern, Product Lifecycle Management',
        dates: 'June 2026 – September 2026',
      },
    ],
    items: [
      {
        id: 'applied-product-configuration',
        roleId: 'applied-analyst',
        title: 'Product Configuration Management',
        image: { src: '/images/experience/applied-product-configuration.webp', alt: '' },
        situation: null,
        action:
          'Redesigned the product configuration management process across 2 product lines, collaborating with 8 cross-functional teams.',
        impact:
          'Cut new-configuration time-to-market by 4 weeks, with a scalable path identified across 360 product lines.',
      },
      {
        id: 'applied-documentation-automation',
        roleId: 'applied-analyst',
        title: 'Documentation Workflow Automation',
        image: { src: '/images/experience/applied-documentation-automation.webp', alt: '' },
        situation: null,
        action:
          'Identified automation opportunities across documentation workflows in partnership with Quality, Regulatory and Engineering teams.',
        impact: 'Reduced manual work by 20 hours per week.',
      },
    ],
  },
  {
    id: 'deloitte',
    name: 'Deloitte Consulting',
    monogram: 'DC',
    logo: { src: '/images/logo/deloitte.svg', alt: 'Deloitte logo' },
    location: 'Chennai, India',
    dates: 'July 2021 – July 2025',
    // One employer, two levels. Listed earliest first so the card can draw
    // the promotion as an upward step.
    roles: [
      {
        id: 'deloitte-analyst',
        title: 'Analyst, Business Technology',
        dates: 'July 2021 – May 2024',
      },
      {
        id: 'deloitte-consultant',
        title: 'Consultant, Business Technology',
        dates: 'June 2024 – July 2025',
        promotion: true,
      },
    ],
    // Most recent level first, matching the page's reverse-chronological order.
    items: [
      {
        id: 'deloitte-genai-adoption',
        roleId: 'deloitte-consultant',
        title: 'GenAI Developer Adoption',
        image: { src: '/images/experience/deloitte-genai-adoption.webp', alt: '' },
        situation: null,
        action:
          'Led a Gen AI adoption initiative by evaluating leading LLMs, defining usage guardrails and developing prompt playbooks.',
        impact: 'Drove adoption among 40+ developers and a 30% productivity gain.',
      },
      {
        id: 'deloitte-legacy-replacement',
        roleId: 'deloitte-consultant',
        title: 'Legacy Tool Replacement',
        image: { src: '/images/experience/deloitte-legacy-replacement.webp', alt: '' },
        situation: 'A legacy tool was plagued by poor vendor support.',
        action:
          'Advised client leadership on replacing it, leading a team of three engineers through solution design and delivery and translating structured business-user feedback into a fix.',
        impact:
          'Saved $8K per month and cut data-synch time across R&D, production and analytics systems by 85%.',
      },
      {
        id: 'deloitte-material-compliance',
        roleId: 'deloitte-consultant',
        title: 'Material Compliance Automation',
        image: { src: '/images/experience/deloitte-material-compliance.webp', alt: '' },
        situation: null,
        action: 'Automated material compliance checks through a customized application.',
        impact:
          'Cut sales order approval cycle time by 80% and unlocked a $2M follow-on statement of work.',
      },
      {
        id: 'deloitte-operations-platform',
        roleId: 'deloitte-analyst',
        title: 'Integrated Operations Management Platform',
        image: { src: '/images/experience/deloitte-operations-platform.webp', alt: '' },
        situation: null,
        action:
          'Owned end-to-end delivery of an integrated operations management platform, leading 4 agile release cycles.',
        impact:
          'Delivered 10+ system integrations and improved processing efficiency by 40%.',
      },
      {
        id: 'deloitte-warehouse-automation',
        roleId: 'deloitte-analyst',
        title: 'Warehouse Workflow Automation',
        image: { src: '/images/experience/deloitte-warehouse-automation.webp', alt: '' },
        situation: 'Warehouse workflow depended on manual tag sorting.',
        action:
          'Designed software automation, analyzing material movement data using SQL and Excel to eliminate that sorting.',
        impact: 'Saved 1000+ hours annually.',
      },
      {
        id: 'deloitte-sales-orders',
        roleId: 'deloitte-analyst',
        title: 'Sales Order Management',
        image: { src: '/images/experience/deloitte-sales-orders.webp', alt: '' },
        situation: null,
        action:
          'Led compliance and customer-driven sales order modifications at scale, embedding plant scheduler approvals.',
        impact:
          'Ensured controlled execution across 1,000+ orders and reduced manual processing effort by 70%.',
      },
      {
        id: 'deloitte-invoice-automation',
        roleId: 'deloitte-analyst',
        title: 'Invoice Processing Automation',
        image: { src: '/images/experience/deloitte-invoice-automation.webp', alt: '' },
        situation:
          "An anticipated regulatory change affected a manufacturing facility's invoice submissions.",
        action:
          'Revamped the invoice processing application, automating submission of 100+ invoices generated annually to government portals.',
        impact: 'Ensured regulatory compliance.',
      },
      {
        id: 'deloitte-leadership-dashboard',
        roleId: 'deloitte-analyst',
        title: 'Leadership Reporting Dashboards',
        image: { src: '/images/experience/deloitte-leadership-dashboard.webp', alt: '' },
        situation: null,
        action:
          'Built and distributed biweekly dashboards tracking team efficiency and project milestones.',
        impact: 'Served senior leadership, client management and 10+ team leads.',
      },
    ],
  },
  {
    id: 'reliance',
    name: 'Reliance Industries Limited',
    monogram: 'RI',
    logo: { src: '/images/logo/reliance.jpg', alt: 'Reliance Industries logo' },
    location: 'Andhra Pradesh, India',
    dates: 'May 2019 – June 2019',
    roles: [
      {
        id: 'reliance-intern',
        title: 'Project Management Intern, Electrical Engineering',
        dates: 'May 2019 – June 2019',
      },
    ],
    items: [
      {
        id: 'reliance-control-system',
        roleId: 'reliance-intern',
        title: 'Control System Optimization',
        image: { src: '/images/experience/reliance-control-system.webp', alt: '' },
        situation: 'Digital timers were being replaced on a recurring basis.',
        action: 'Optimized the control system to eliminate those replacements.',
        impact: 'Generated $40K in recurring annual savings.',
      },
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
