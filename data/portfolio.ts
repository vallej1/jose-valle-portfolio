export interface Metric {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  title: string;
  role: string;
  dateRange: string;
  shortDescription: string;
  challenge: string;
  painPoints: string[];
  approach: string[];
  metrics: Metric[];
  learnings: string[];
  color: string;
}

export interface Experience {
  company: string;
  companyDescription: string;
  role: string;
  location: string;
  dateRange: string;
  startYear: number;
  endYear: number;
  highlights: string[];
  caseStudyId?: string;
}

export const personalInfo = {
  name: "Jose Valle",
  title: "Strategic Product Manager",
  location: "Derby, CT",
  email: "J.B.Valle@me.com",
  phone: "(203) 722-9485",
  linkedin: "https://www.linkedin.com/in/jose-b-valle/",
  summary: "Strategic Product Manager imbued with Army discipline, corporate innovation, and 20 years finding product market fit for new and existing B2B SaaS products in startups and enterprises. Expert at scaling customer use cases including driving $20M in revenue for startups and enterprises.",
  tagline: "Driving product-market fit and revenue growth for B2B SaaS",
};

export const heroStats = [
  { value: "20+", label: "Years Experience" },
  { value: "$20M+", label: "Revenue Driven" },
  { value: "5", label: "Product Launches" },
  { value: "100%", label: "Deadline Hit Rate" },
];

export const coreSkills = [
  { category: "Product Vision & Strategy", skills: ["Roadmap Creation", "Prioritization (RICE/ICE)", "Product-Led Growth", "OKRs"] },
  { category: "Leadership", skills: ["Cross-functional Teams", "Stakeholder Alignment", "Product Lifecycle Management"] },
  { category: "Customer-Centric", skills: ["Voice of Customer", "Feedback Integration", "Adoption & Retention"] },
  { category: "Data & Analytics", skills: ["User Behavior Tracking", "Product Analytics", "Executive Reporting"] },
  { category: "Technical", skills: ["AI/ML Products", "APIs & Integration", "Cybersecurity", "AWS & Cloud"] },
];

export const tools = [
  "ProductBoard", "Jira", "Heap", "Salesforce", "Excel", "PowerBI",
  "GitHub", "SQL", "LLMs", "LangFlow", "N8N", "Figma"
];

export const experiences: Experience[] = [
  {
    company: "Onyx CenterSource",
    companyDescription: "A mature market leader in hospitality B2B payments automating commission processing between hotels and travel agencies.",
    role: "Product Manager",
    location: "Remote",
    dateRange: "Jan 2023 - Sep 2025",
    startYear: 2023,
    endYear: 2025,
    highlights: [
      "Prioritized integrations with 6 Fortune 50 hotels using JTBD friction analysis, generating $200K ARR",
      "Revitalized 1099 compliance solution, slashing missing/invalid data by 98%",
      "Applied RICE/ICE frameworks, accelerating high-value feature delivery by 20%",
      "Leveraged AI to accelerate prototyping and PRD drafting, speeding delivery by 30%"
    ],
    caseStudyId: "commission-engine"
  },
  {
    company: "Very Good Security",
    companyDescription: "A Series C-funded platform in payment tokenization transforming sensitive data from a compliance liability into an operational asset.",
    role: "Product Manager",
    location: "Remote",
    dateRange: "Nov 2021 - Nov 2022",
    startYear: 2021,
    endYear: 2022,
    highlights: [
      "Championed PLG initiative, boosting conversions by 15%",
      "Enhanced data pipeline accuracy by 10% via strategic partnerships",
      "Directed real-time billing feature release, reducing churn by 10%"
    ],
    caseStudyId: "usage-accuracy"
  },
  {
    company: "Quadient Inc.",
    companyDescription: "A legacy-to-digital transformation company bridging traditional mail operations with modern SaaS-based customer experience management.",
    role: "Principal Product Engineer",
    location: "Milford, CT",
    dateRange: "Jan 2019 - Nov 2021",
    startYear: 2019,
    endYear: 2021,
    highlights: [
      "Orchestrated US/Canada product launches driving $3M in new revenue",
      "Prioritized features using quant/qual data, boosting sales by 20%",
      "Orchestrated $1.5M device replacement program for 3,000+ units"
    ],
    caseStudyId: "psd-replacement"
  },
  {
    company: "Neopost USA",
    companyDescription: "Global Provider of Mailing Systems enabling businesses to process, send, and track mail efficiently.",
    role: "Senior Product Engineer",
    location: "Milford, CT",
    dateRange: "Jul 2012 - Jan 2019",
    startYear: 2012,
    endYear: 2019,
    highlights: [
      "Led vision, strategy, and launch of Cell Device enabling sales on secure networks, driving $70K in 3 months",
      "Led team to update SSL certificates on 160K systems, saving ~$500K",
      "Authored security white papers to accelerate approvals and adoption"
    ],
    caseStudyId: "secure-router"
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: "secure-router",
    company: "Neopost",
    title: "Secure 3G/LTE Router",
    role: "Senior Product Engineer",
    dateRange: "2018 - 2019",
    shortDescription: "Bring-your-own internet solution to unblock enterprise sales in locked-down environments",
    challenge: "Sales was consistently blocked in Finance and Government sectors because customers would not allow mailing systems onto their corporate LAN due to strict security policies. An average of $50K in deals were blocked each month.",
    painPoints: [
      "Prospects blocked local network connectivity",
      "Sales losing new logos monthly",
      "No compliant connection option available"
    ],
    approach: [
      "Led discovery with Sales to validate pain and target segments (Finance/Gov)",
      "Engaged router manufacturer and cellular provider for vendor alignment",
      "Designed allowlist security model to prevent restricted usage and overages",
      "Ran customer pilot, refined process, and coordinated GTM launch",
      "Defined SLA, escalation path, and fleet monitoring via cellular portal"
    ],
    metrics: [
      { value: "$200K", label: "ARR by Year End" },
      { value: "$70K", label: "Revenue in 3 Months" },
      { value: "~50%", label: "Margin on Bundled Offer" },
      { value: "5-10%", label: "Attachment Rate" }
    ],
    learnings: [
      "Converting compliance risks into controlled pathways unlocks enterprise deals",
      "Multi-vendor coordination requires clear SLAs and escalation paths",
      "Security-first design accelerates procurement approval"
    ],
    color: "#3b82f6"
  },
  {
    id: "commission-engine",
    company: "Onyx CenterSource",
    title: "Performance Commission Engine",
    role: "Product Manager",
    dateRange: "2023 - 2024",
    shortDescription: "White-glove automation solution eliminating manual commission processing for hotels",
    challenge: "A major hotel chain was spending nearly 1 month processing pay-for-performance commissions manually. Complex rules with 3-tier promotion systems across 100+ agencies and 100+ properties created thousands of rule combinations.",
    painPoints: [
      "~1 month manual processing time",
      "Complex 3-tier promotion system",
      "Rules varied by property, agency, and date ranges"
    ],
    approach: [
      "Worked directly with hotel client to understand commission flows",
      "Created flowcharts for 30+ rules detailing all nuances",
      "Translated business rules into technical requirements",
      "Created Jira stories with detailed acceptance criteria",
      "Customer verified sample output before go-live"
    ],
    metrics: [
      { value: "$50K", label: "ARR Upsell" },
      { value: "35", label: "Rules Automated" },
      { value: "~1mo → Instant", label: "Processing Time" },
      { value: "6 Months", label: "Delivery Time" }
    ],
    learnings: [
      "Complex business logic requires constant customer validation",
      "Never assume understanding is correct - verify everything",
      "White-glove delivery builds lasting customer relationships"
    ],
    color: "#10b981"
  },
  {
    id: "1099-compliance",
    company: "Onyx CenterSource",
    title: "1099 Compliance Solution",
    role: "Product Manager",
    dateRange: "2023 - 2024",
    shortDescription: "Tax service enabling hotels to accurately report tax information on 1099 submissions",
    challenge: "Hotels must submit 1099 forms in January for all agency payments above $600. 60% of agency data was missing or invalid, resulting in IRS fines per infraction and customer satisfaction below 10%.",
    painPoints: [
      "60% of agency tax data missing or invalid",
      "IRS fines per incorrect filing",
      "Manual chasing process couldn't scale"
    ],
    approach: [
      "Interviewed hotel customers and collaborated with internal teams",
      "Applied for IRS validation access for data verification",
      "Integrated external data broker to enrich missing records",
      "Implemented real-time validation at input",
      "Created validated reports available on-demand in portal"
    ],
    metrics: [
      { value: "98%", label: "Data Accuracy" },
      { value: "75%", label: "CSAT Increase" },
      { value: "15%", label: "ARR Increase" },
      { value: "$0", label: "IRS Fines" }
    ],
    learnings: [
      "Sometimes you have to build the bridge while crossing it",
      "Data quality issues often require multiple solution layers",
      "Strong cross-functional alignment enables complex pivots"
    ],
    color: "#f59e0b"
  },
  {
    id: "psd-replacement",
    company: "Quadient",
    title: "PSD Replacement Program",
    role: "Principal Product Engineer",
    dateRange: "2019 - 2020",
    shortDescription: "USPS mandate compliance program for field retrofit of 3,000+ postal security devices",
    challenge: "USPS expanded required usage metrics captured by the Postal Security Device. The PSD is tamper-resistant and cannot be updated remotely, requiring physical replacement of 3,000+ already-shipped systems within 9 months.",
    painPoints: [
      "Hardware cannot be remotely updated",
      "3,000+ systems non-compliant",
      "Strict 9-month USPS deadline"
    ],
    approach: [
      "Convened cross-functional team with 100+ participants",
      "Created unified database from disparate data sources",
      "Segmented by channel (Dealer vs Direct) for targeted execution",
      "Ran pilot, refined process, scaled in cohorts",
      "Weekly governance with velocity dashboards and USPS reporting"
    ],
    metrics: [
      { value: "98%", label: "Final Compliance" },
      { value: "3,000+", label: "Devices Replaced" },
      { value: "$1.5M", label: "Program Value" },
      { value: "9 Months", label: "Delivery Timeline" }
    ],
    learnings: [
      "Complex projects need tight management and coordination",
      "Always test assumptions with pilots before scaling",
      "Decisive leadership prevents churn and ambiguity"
    ],
    color: "#8b5cf6"
  },
  {
    id: "usage-accuracy",
    company: "Very Good Security",
    title: "Usage Accuracy & Billing",
    role: "Product Manager",
    dateRange: "2021 - 2022",
    shortDescription: "Modernized customer event-usage pipeline to eliminate recurring billing disputes",
    challenge: "Customers reported 3-5% usage discrepancies every billing cycle. Multiple data sources returned different answers, with billing pulled from Aurora DB while portal usage came from Redshift with inconsistent logic.",
    painPoints: [
      "3-5% usage mismatch per billing cycle",
      "Multiple conflicting data sources",
      "Portal didn't match billed usage"
    ],
    approach: [
      "Mapped end-to-end data lineage across all systems",
      "Hired external consultant for Kafka + Flink implementation",
      "Standardized billable vs non-billable event classification",
      "Established Redshift as canonical reporting source",
      "Aligned portal display with billing definitions"
    ],
    metrics: [
      { value: "10%", label: "Pipeline Accuracy Gain" },
      { value: "20%", label: "Retention Improvement" },
      { value: "80%", label: "Ticket Reduction" },
      { value: "2 Months", label: "Delivery Time" }
    ],
    learnings: [
      "Data consistency requires a single source of truth",
      "Customer trust is built on billing transparency",
      "Pipeline modernization pays dividends in reduced support load"
    ],
    color: "#ec4899"
  }
];

export const education = {
  school: "Southern CT State University",
  location: "New Haven, CT",
  degree: "BS, Computer Science",
  dateRange: "Sep 2003 - Jun 2007"
};

// System prompt for Claude chatbox
export const chatSystemPrompt = `You are a professional AI assistant representing Jose Valle's portfolio. Answer questions about Jose's experience, skills, and projects based on the following information:

PROFESSIONAL SUMMARY:
${personalInfo.summary}

EXPERIENCE:
${experiences.map(exp => `
${exp.company} (${exp.dateRange}) - ${exp.role}
${exp.companyDescription}
Key achievements:
${exp.highlights.map(h => `- ${h}`).join('\n')}
`).join('\n')}

CASE STUDIES:
${caseStudies.map(cs => `
${cs.company}: ${cs.title}
Challenge: ${cs.challenge}
Approach: ${cs.approach.join('; ')}
Results: ${cs.metrics.map(m => `${m.value} ${m.label}`).join(', ')}
`).join('\n')}

CORE SKILLS:
${coreSkills.map(cat => `${cat.category}: ${cat.skills.join(', ')}`).join('\n')}

TOOLS: ${tools.join(', ')}

EDUCATION: ${education.degree} from ${education.school}

Guidelines:
- Answer professionally and concisely as if representing Jose
- Reference specific projects and quantifiable results when relevant
- Stay factual - only use information provided above
- If asked about something not covered, politely say you don't have that information
- Suggest follow-up questions to keep engagement`;
