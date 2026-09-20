# About Chandramouli (Chandra) Sivakumar

## Identity
Chandramouli S., goes by Chandra. MBA student at UC Irvine's Paul Merage School of Business, Digital Transformation focus with a Business Analytics emphasis, expected graduation June 2027. Based in Irvine, California. Indian national.

## Education
MBA, Digital Transformation (STEM), UC Irvine Paul Merage School of Business. GPA 3.9/4.0. Paul & Elisabeth Merage Full-Tuition Scholarship recipient, reserved for the top 5% of applicants. Expected graduation June 2027.
B.Tech, Electrical and Electronics Engineering, National Institute of Technology, Andhra Pradesh. GPA 3.7/4.0. Graduated April 2021.
GMAT: 700 (86th percentile). Quant 48 (63rd percentile), Verbal 38 (83rd percentile), AWA 6.0 (86th percentile).

## Professional Experience

### Applied Medical, MBA Intern, Operations Strategy (June 2026-present)
Redesigned product configuration management across 2 product lines, cutting time-to-market by 4 weeks, with a scalable path identified across 360 product lines. Identified automation opportunities across documentation workflows, reducing manual work by 20 hours per week.

### Deloitte Consulting, Consultant, Business Technology (June 2024-July 2025)
Led a Generative AI adoption initiative: evaluated LLMs for code generation, onboarded developers onto tooling integrated with the client's SAP development environment, built usage guardrails and prompt playbooks, and drove adoption across 40+ developers, resulting in a 30% productivity gain in development turnaround time. Replaced a legacy third-party tool with a custom SAP-based solution, saving $8,000 per month and cutting data-sync time by 85%. Automated material compliance checks, cutting sales order approval cycle time by 80% and unlocking a $2M follow-on statement of work.

### Deloitte Consulting, Business Technology Analyst (July 2021-May 2024)
Owned end-to-end delivery of an integrated operations management platform across 4 agile release cycles and 10+ system integrations, delivering a 40% efficiency improvement. Designed a direct SAP-to-Snowflake integration architecture with no middleware, cutting sales order compliance verification time from 8-9 hours to about 1 hour. Built a customizable ABAP sorting framework that eliminated manual transfer order tag sorting, saving over 1,000 hours annually. Led compliance-driven sales order modifications across 1,000+ orders, reducing manual effort by 70%. Automated a Polish e-invoice compliance workflow ahead of a regulatory mandate, enabling automatic submission of SAP-generated invoices to a government portal for stamping. Led a small team of ABAP developers on a custom integration application pulling engineering bill-of-materials data from a product lifecycle management system into SAP, replacing an unreliable, poorly-supported legacy vendor tool. Owned the product lifecycle of an SAP-Salesforce integrated application, drafting user stories and delivering 10+ APIs across four release cycles to enable mobile order management for business users.

Client throughout the Deloitte tenure: a Fortune 100 heavy machinery manufacturer.

Received 8 internal awards at Deloitte across his tenure, for independent contribution as a new hire, quick upskilling in web services, leading a mobile order management project, defect triaging and collaboration, technical support on an implementation, leading the wellness initiative described below, the order compliance project, and taking ownership of a high-stakes project under a tight deadline and budget constraint.

### Reliance Industries Limited, Project Management Intern, Electrical Engineering (May-June 2019)
Generated $40,000 in recurring annual savings through control system optimization, driving a maintenance cost-optimization project on an induction motor starter module within onshore terminal power systems, collaborating with senior management and engineering teams to identify root causes and eliminate recurring replacement costs.

## Current Venture: BillBack
AI-powered medical billing audit platform for mid-size third-party administrators and self-insured employer health plans. Catches billing errors and fee schedule violations, including duplicate billing, unbundling, MUE violations, and fee schedule violations via deterministic CMS/NCCI lookups, plus AI-driven upcoding detection. Generates ERISA-compliant dispute letters. A full audit runs in under a minute versus 2+ hours manually. Co-founded with Anup Kumar, an MBA cohort mate. Chandra works across product, business/compliance logic, and the technical build, not confined to one lane. Live at billbackai.com.

## Competitions and Recognition
1st place, Beall Applied Innovation Butterworth Product Development Competition, for BillBack.
3rd place (of 40+ teams), USC Marshall AI Product Challenge, for an AI-powered medical bill audit platform.
3rd place (of 20+ teams), SEGA competition, for a go-to-market strategy for Football Manager 2026 in Latin America.
1st place, Eluru district, Jnana Bheri singing competition, run by the Government of Andhra Pradesh.

## Leadership
VP of Technology, Product Club at Merage. Increased engagement 40% through webinars and vibe-coding sessions.
MBA Student Ambassador. Mentored 20+ prospective students, devised program marketing strategy.
Founder, Music Club, NIT Andhra Pradesh. Built and led a 50+ member student community, owned budgeting and operations.

## Certifications
Aha! Product Management Professional Certificate (PMI/Aha), including Product Roadmap, Product Strategy, Customer Development, Technical Product Management (IIBA), and Sustainability Foundations.
Product Management Job Simulation.
Python for Everybody and Using Python to Access Web Data (University of Michigan, via Coursera).
ITIL (LinkedIn Learning).
Supply Chain Basics for Everyone (LinkedIn Learning). CSCMP-certified in project management.
Generative AI at SAP (openSAP, scored 100%).
NPTEL certification, Electric Vehicles.

## Technical and Domain Skills
AI and Data: Tableau, SQL, Snowflake APIs, Python (Scikit-learn), machine learning (forecasting, regression, classification).
Enterprise systems: SAP S/4HANA, SAP ABAP, SAP Sales and Distribution, Production Planning, Material Management, Supply Chain Management, enterprise business and IT operations.
Additional programming: C++, MATLAB.
PM and dev tools: Microsoft Suite, Azure DevOps, Jira, HP ALM, Claude Code.

## The Pivot, In Chandra's Own Words
"At Deloitte the work I did had a lot of ownership, but often decisions stall because a senior leader had a different viewpoint. I know I am ready to swing alone, but the place was inhibiting, so I moved across continents to learn skills that would let me own and then decide product decisions."

## Detailed Project Stories

### Finding the real cause of warehouse delays
A client's warehouse was experiencing recurring delays and occasional bin-placement errors, and supervisors were manually sorting transfer order tags by hand before distributing them to workers. Chandra hypothesized that the manual sorting itself, not staffing or logistics, was the bottleneck. He analyzed 30 days of operational data across morning and evening shifts, comparing when transfer order tags were printed against when picking actually began, and found a consistent 35-45 minute delay tied directly to manual sorting time, ruling out system slowness, material shortages, and worker performance as causes along the way. He worked with SAP functional consultants and warehouse supervisors to define flexible sorting rules (by zone, destination bin, or source bin, depending on the day's workload), then built a customizable ABAP sorting framework letting supervisors choose their own sort order before printing. The print-to-pick gap dropped from 35-45 minutes to 2-3 minutes, saving roughly 20 supervisor hours per week and stabilizing the warehouse's daily workflow.

### Building a direct SAP-to-Snowflake connection that had never been done before
When a client migrated their material compliance database from Oracle to Snowflake for better scalability and cost efficiency, the existing SAP-to-Oracle compliance interface became obsolete overnight, forcing business teams to manually check compliance for every sales order one by one. Chandra ran an as-is analysis of the broken interface, then held workshops with SAP functional leads, business data owners, Snowflake engineers, and the IT security team to map technical constraints and data risks. He designed a direct SAP-to-Snowflake connection with no middleware, an architecture that had never been run on the client's systems before, and secured stakeholder buy-in by presenting a full risk-benefit assessment: cost savings from skipping middleware, faster processing, cleaner audit logs, weighed honestly against the real risk of an untested design under load. He built a prototype, optimized it for expected sales order volume, and trained users on the new process. Processing time dropped from 8-9 hours to about 1 hour, and the client asked him to replicate the same architecture for another country's SAP landscape.

### Untangling a four-way stakeholder standoff
A legacy third-party BOM-sync tool had become unreliable and expensive, and R&D users, SAP functional consultants, and the vendor all had conflicting views on what should replace it, with no clear path forward. Chandra took ownership of resolving the communication gap, setting up daily calls with each group individually plus a weekly cross-timezone alignment meeting where everyone could reconcile progress together. He translated technical constraints into language business stakeholders could act on, drafted detailed specification documents mapping the legacy tool's full logic, and broke the new integration's requirements into steps for the development team. The result: aligned teams, a successful rollout, an 85% improvement in BOM sync speed, and the end of an $8,000-per-month vendor dependency.

### Leading informal coordination across 200 people with no formal authority
Chandra's office ran an employee wellness initiative reaching nearly 200 employees, relying entirely on volunteers with no formal project structure. Coordination kept breaking down since volunteers came from different departments with different workloads. He set up short weekly coordination meetings, broke each event into clearly owned workstreams (communication, registration, on-ground support, event planning), created async communication channels so people could raise blockers without disrupting their client work, and made a point of publicly recognizing contributions so the work felt chosen rather than assigned. The result was multiple high-participation events, stronger cross-department engagement, and one of his strongest internal networking channels at the firm.

### Absorbing a colleague's work with no handoff
Mid-release, with tight interdependent timelines and no room for slippage, a developer on Chandra's team unexpectedly resigned, leaving critical work without an owner. As the junior team member, Chandra had to absorb responsibilities originally assigned to someone more senior. He reached out to near-strangers from a networking event who happened to know the relevant SAP area, took weekend courses to get up to speed quickly, ran weekly syncs to track the previous developer's partially completed work, and kept stakeholders updated through clear, regular written communication. He completed both his own work and the inherited work, and the team delivered the release on schedule with no defects.

## A Time Things Didn't Go Well
Early in his time at Deloitte, on his second assignment, Chandra was handed a critical SAP defect during a user acceptance testing cycle. Wanting to prove he could handle it independently, he spent several late nights debugging alone instead of raising it early. He made no real progress, the delay put pressure on the rest of the team, and his lead told him directly that asking for help sooner would have gotten him to the right resource much faster. Chandra's own reflection on it: complex problems usually need more than one person's expertise, and asking for help early isn't a weakness, it's often the faster and more effective path. It changed how he approaches being stuck on something now: raise it early, rather than trying to prove he can solve everything solo.

## What Chandra Is Into Outside Work

### Tech and hardware
Built his own PC piece by piece: RTX 4070 Ti Super, a Ryzen 5-series CPU, 32GB of RAM, on an MSI Pro B650S WiFi motherboard, self-researched and self-assembled, chosen specifically for upgrade headroom rather than maxing out day-one specs. Builds agentic workflows for his own job search and research, and tracks how Claude specifically is improving over time.

### Gaming
A story-first gamer: God of War, Red Dead Redemption, Assassin's Creed, The Last of Us, GTA, played across PS5, PS4, PS3, and PS2, going back to Prince of Persia. Also plays Catan and chess, and has won several foosball tournaments at Deloitte. Basketball is his favorite, both to play and to watch.

### Music
Trained in Carnatic music from first grade through tenth grade. Performed in temples, sang the title track for a Tamil TV series, and won first place in Jnana Bheri, a state-level singing competition run by the Government of Andhra Pradesh. Founded and ran a 50-person music club at his undergraduate institution. Today it's a way to relax and something he uses to bring friends together.

## Personal Quote
"Hard work is the mother of good luck."
