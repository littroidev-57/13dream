// lib/ragKnowledge.js
// Context-Injected RAG Knowledge Base for 13 Dreams Consultants
// Optimized for token efficiency (< 2,500 tokens) to ensure 100% compatibility with Groq TPM limits.

export const CORE_AGENCY_SUMMARY = `
# 13 DREAMS CONSULTANTS — OFFICIAL COUNSELING KNOWLEDGE BASE

## 1. ABOUT 13 DREAMS CONSULTANTS
- **Full Legal Name**: 13 Dreams Consultants Private Limited
- **Director / Founder**: Mr. Harpreet Singh
- **Core Specialization**: Overseas Education Counseling, University Admissions, Student Visa Filing, IELTS & PTE Test Coaching, In-House Education Loans.
- **Experience**: 15+ Years of excellence in international education.
- **Visa Success Rate**: Industry-leading 99% visa approval rate.
- **Partner Universities**: 150+ top global universities and government colleges across 10+ countries.
- **Counseling Policy**: 100% FREE initial profile evaluation, university shortlisting, and career counselling with ZERO hidden service fees.
- **Accreditations**: Official e-lodgment authorized by Australian Department of Home Affairs, direct university partnerships worldwide.
- **In-House Education Loan Service**: Complete financial guidance and in-house loan processing for both **secured and UNSECURED education loans** (up to INR 25–35+ Lakhs) with nationalized and private banking partners. Fast sanctions for UK, Australia, New Zealand, Canada, and Germany.
- **Branch Locations & Contact**:
  - **Bareilly Head Office**: Luthra Tower 2nd Floor, C-56 Ekta Nagar, Opp. LIC Office, Model Town, Bareilly (UP), India.
  - **Khatima Branch**: Tanakpur Road, Opp. Canara Bank, Khatima (Uttarakhand), India.
  - **Helpline Phone / WhatsApp**: +91 9759053463
  - **Email**: contact@13dreamsconsultants.com | info@13dreamsconsultants.com
  - **Website**: https://13dreamsconsultants.com

## 2. QUICK COUNTRY RULES & VISA ESSENTIALS
- **Germany 🇩🇪**:
  - Public universities have ZERO tuition fees (€0). Practice universities (SRH, UEG, GISMA) €9k–€12k/yr with scholarships.
  - **CRITICAL**: **PTE is STRICTLY NOT ACCEPTABLE for German university admissions or APS verification!** Only IELTS is accepted: 6.5 overall (min 6.0).
  - **Summer 2027**: DMAT is mandatory for PG APS verification in IT, Commerce, Finance, Engineering.
  - Blocked Account: **€12,135 approx** (€992/month withdrawal limit). 18-month Job Seeking Visa after graduation.
- **United Kingdom (UK) 🇬🇧**:
  - **12th English Waiver**: Students with **60%–65%+ in 12th Board English** get **100% Full IELTS/PTE Waiver** (No test required).
  - 1-Year Fast-Track Master's degrees, 2-Year Graduate Route PSW, Unsecured loans up to INR 25–30 Lakhs for 28-day funds.
  - Key partners: UWS, London Met, West London, Sunderland, Middlesex, BPP, Suffolk, Coventry, Brighton, UCLan, Bedfordshire.
- **Australia 🇦🇺**:
  - Subclass 500 Student Visa. Requires min 65% in 4 main subjects. Accepted tests: IELTS (6.0 UG, 6.5 PG), PTE, TOEFL.
  - Financials: 1-Year tuition + **AUD $29,710 living costs** + AUD $2,000–$3,000 travel. Embassy fee: AUD $2,500.
  - Work rights: 48 hrs/fortnight during study, 2 to 4 years Subclass 485 PSW.
- **New Zealand 🇳🇿**:
  - 12th with 55%–60%+. Bachelors IELTS 6.0 (5.5) / PTE 50 (42); PG IELTS 6.5 (6.0) / PTE 58 (50).
  - **AIP (Approval in Principle)**: Students do NOT pay tuition fees until Immigration NZ issues conditional approval!
  - Financials: INR 30–35 Lakhs bank balance (6 months old), NZD 20,000 Fund Transfer Scheme (FTS), NZD 850 visa fee. Up to 3-year PSW.
- **Canada 🇨🇦**:
  - SDS Route: IELTS 6.0 each band or PTE 60+. CAD $20,635 GIC deposit + 1st year tuition.
  - Up to 3-year PGWP, Express Entry PR pathways.
- **United States (USA) 🇺🇸**:
  - Form I-20, SEVIS fee, consular mock interview training by 13 Dreams. Minimum IELTS 6.5 or DET 115+. 1-year OPT + 2-year STEM extension (3 years total).
- **Netherlands (Holland) 🇳🇱**:
  - Continental Europe's top destination for English degrees (2,100+ programs). Top 100 global unis (TU Delft, UvA).
  - **Zoekjaar (Orientation Year)**: 1-year unrestricted post-study work permit.
  - IND application filed directly by the university. Proof of funds approx €12,500/yr.
- **Malta 🇲🇹**:
  - Affordable European education starting from €5,000 to €8,500/year. 100% English taught.
  - **English Waiver / MOI**: Students with good 12th English or English medium degrees can enroll with NO IELTS/PTE.
  - Schengen Privileges: Travel freely across 27 Schengen nations. Work 20 hrs/week after 90 days under Jobsplus.
- **Singapore 🇸🇬**:
  - Asia's corporate capital. Accelerated degrees: 2-Year Bachelor's, 1-Year Master's from Australian/UK branch campuses (JCU Singapore, Curtin, PSB, Kaplan).
  - **SOLAR+ System**: 100% digital student pass with **ZERO embassy interview**; IPA approval in 2 to 4 weeks.
  - Internal English placement tests accepted by partner institutions with NO IELTS/PTE required.
- **IELTS & PTE Coaching**:
  - Master trainers with 7.5+ band in IELTS and 65+ in PTE. Daily 1-on-1 speaking mocks, weekly computer-delivered exam simulations.
`;

export const SECTION_GERMANY = `
### GERMANY 🇩🇪 (Detailed Manual)
- Public Universities: €0 tuition fees. Semester contribution €250–€350.
- Universities of Applied Sciences: SRH (Berlin, Dresden, Hamburg, Heidelberg, Leipzig), UEG, GISMA. Tuition €9,000–€12,000/yr with generous institutional scholarships.
- Eligibility: 12th with 70%+ overall for UG. Bachelor's in relevant stream for PG.
- **DMAT MANDATORY**: Effective Summer Intake 2027, DMAT is required for APS certificate in PG IT, Commerce, Finance, Engineering.
- **English Test**: Only IELTS 6.5 (min 6.0 in each section). PTE is STRICTLY NOT ACCEPTABLE for APS/embassy.
- Blocked Account: €12,135 approx (€992/month withdrawal limit).
- Embassy Visa Fee: INR 10,000. Booked at VFS Global. No embassy interview in standard processing.
- Work Rights: 20 hrs/week during study. 18-month Job Seeking Visa after graduation leading to EU Blue Card PR.
`;

export const SECTION_AUSTRALIA = `
### AUSTRALIA 🇦🇺 (Subclass 500 Visa Detailed Manual)
- Group of Eight (Go8) & top universities. Min 65% in 4 main subjects.
- Accepted tests: IELTS (6.0 UG, 6.5 PG), PTE Academic (50-58 UG, 58-65 PG), TOEFL iBT.
- Genuine Student (GS) Financial Proof: 1-Year tuition + AUD $29,710 living cost + AUD $2,000–$3,000 travel.
- OSHC Health Cover: AUD $2,000–$2,500 (UG), AUD $1,000–$1,500 (PG). CoE issued upon initial payment.
- Visa Fee: AUD $2,500. Work rights: 48 hrs/fortnight during term, full-time in breaks.
- Subclass 485 Temporary Graduate Visa: 2 to 4 years open work permit.
`;

export const SECTION_NEW_ZEALAND = `
### NEW ZEALAND 🇳🇿 (Detailed Manual)
- Academic criteria: 12th with 55%–60%+. UG IELTS 6.0 (5.5) / PTE 50 (42); PG IELTS 6.5 (6.0) / PTE 58 (50).
- **AIP (Approval in Principle)**: Immigration NZ evaluates your file first. Students pay tuition fees ONLY AFTER AIP conditional approval is granted!
- Financial Requirements: Bank balance of INR 30–35 Lakhs shown in bank account (funds must be held for 6 months).
- Living costs: Fund Transfer Scheme (FTS) of NZD 20,000 deposited in ANZ Bank NZ.
- Embassy fee: NZD 850. Up to 3-year open post-study work permit. Green List occupations offer fast-track PR.
`;

export const SECTION_UK = `
### UNITED KINGDOM (UK) 🇬🇧 (Detailed Manual)
- 1-Year Master's degrees save 1 full year of tuition and living expenses compared to Canada/Australia.
- **12th English Waiver**: 60%–65%+ in 12th English marks = 100% Full IELTS/PTE Waiver (No test needed).
- Study Gaps: 2 to 8+ years accepted with authentic experience letters and salary proofs.
- Unsecured Education Loans: Up to INR 25–30 Lakhs available without collateral for 28-day maintenance funds.
- Top Partner Universities: UWS, London Met, West London, Sunderland, Middlesex, BPP, Suffolk, Coventry, Brighton, UCLan, Bedfordshire.
- 2-Year Graduate Route Post-Study Work Permit for Bachelor's and Master's graduates.
`;

export const SECTION_CANADA = `
### CANADA 🇨🇦 (Detailed Manual)
- SDS (Student Direct Stream): IELTS 6.0 each band or PTE 60+.
- Financials: 1st year tuition fee receipt + CAD $20,635 Guaranteed Investment Certificate (GIC).
- Designated Learning Institutions (DLIs) across Ontario, British Columbia, Alberta.
- Work Rights: 20 hrs/week part-time. Up to 3-year Post-Graduation Work Permit (PGWP).
- Direct pathways to Permanent Residency through Canadian Experience Class (Express Entry) and Provincial Nominee Programs (PNPs).
`;

export const SECTION_USA = `
### UNITED STATES (USA) 🇺🇸 (Detailed Manual)
- World's top research institutions. Form I-20 issued by SEVP-certified universities.
- SEVIS fee payment, DS-160 filing, and mandatory consular mock interview coaching with 13 Dreams advisors.
- Tests: IELTS 6.5+ or Duolingo English Test (DET 115+) widely accepted.
- 1-Year OPT (Optional Practical Training) + 2-Year STEM extension = 3 full years of work authorization for STEM graduates.
`;

export const SECTION_MALTA = `
### MALTA 🇲🇹 (Detailed Manual)
- Enchanting English-speaking EU island nation in the Mediterranean.
- Extremely affordable European tuition: €5,000 to €8,500 per academic year.
- **English Waiver & MOI**: Medium of Instruction English letters or good 12th English scores waive IELTS/PTE!
- Partner Institutions: University of Malta, MCAST, Global College Malta, Domain Academy, Ascencia Business School.
- Schengen Privileges: Visa-free travel across 27 Schengen countries during breaks.
- Work Rights: Legal permission to work 20 hrs/week under Jobsplus license after 90 days of stay.
`;

export const SECTION_SINGAPORE = `
### SINGAPORE 🇸🇬 (Detailed Manual)
- Asia's premier financial and technological hub. Safe, clean, and English-speaking corporate capital.
- Top Universities: NUS (#8 globally), NTU (#15 globally), SMU.
- Top International Branch Campuses: James Cook University (JCU) Singapore (Australian public uni campus), Curtin Singapore, PSB Academy, Kaplan Singapore, MDIS.
- Fast-Track Degrees: 2-Year Bachelor's (trimester system) and 1-Year Master's degrees, saving tuition and living expenses.
- English Waiver: Internal English placement tests available at Kaplan, PSB, and JCU Singapore with NO IELTS/PTE needed.
- **SOLAR+ Visa**: 100% digital visa via Singapore ICA. ZERO embassy interview. In-Principle Approval (IPA) within 2–4 weeks.
`;

export const SECTION_NETHERLANDS = `
### NETHERLANDS (HOLLAND) 🇳🇱 (Detailed Manual)
- 2,100+ programs taught 100% in English. Top 100 world universities (TU Delft, University of Amsterdam, Erasmus Rotterdam, Utrecht).
- **Zoekjaar (Orientation Year)**: 1-year open work permit allowing graduates to work without sponsor quotas or work permits.
- Visa: MVV/VVR applied directly by your Dutch sponsor university through IND (Immigration and Naturalisation Service).
- Proof of living funds: ~€12,500/year.
- Generous scholarships: NL Scholarship (€5,000) and university merit waivers.
`;

export const SECTION_TESTS = `
### IELTS & PTE COACHING DETAILS
- Master trainers with 7.5+ band in IELTS and 65+ in PTE.
- Daily 1-on-1 speaking mock sessions with individual fluency and pronunciation feedback.
- Weekly full-length computer-delivered mock exam simulations in real testing conditions.
- Score Conversions: PTE 50–57 = IELTS 6.0 | PTE 58–64 = IELTS 6.5 | PTE 65–72 = IELTS 7.0 | PTE 73–78 = IELTS 7.5 | PTE 79+ = IELTS 8.0+.
- Classroom batches at Bareilly Head Office (Luthra Tower, Ekta Nagar) & Khatima branch, plus live interactive online batches.
`;

export const SECTION_SPECIAL = `
### SPECIAL CIRCUMSTANCES & LOANS
- **Study Gaps**: 13 Dreams has successfully placed students with study gaps of 2 to 10+ years by compiling authentic work experience letters, salary slips, and professional portfolios.
- **Previous Visa Refusals**: We specialize in analyzing previous refusal letters (CAIPS/GCMS notes) and crafting strategic re-application files with high approval rates.
- **In-House Education Loans**: We assist with both **secured and UNSECURED education loans** up to INR 25–35+ Lakhs through partner banks without requiring collateral for eligible profiles.
`;

export const SECTION_EMAGAZINES = `
### OFFICIAL STUDY VISA E-MAGAZINES
- 13 Dreams publishes interactive 3D digital study abroad magazines updated for 2025–2026/2027 intakes.
- Free interactive reading available at: https://13dreamsconsultants.com/e-magazine
- Available Editions: Germany Free Education Guide, Australia Subclass 500 Guide, New Zealand AIP Handbook, UK 1-Year Master's Handbook, Canada SDS Blueprint, USA STEM OPT Guide.
`;

/**
 * Dynamically selects and assembles relevant knowledge based on the conversation text.
 * Keeps the total token size between 1,500 and 2,500 tokens, perfectly fitting within Groq's 8,000 TPM limit.
 */
export function getRelevantRagKnowledge(messages = []) {
  const text = (Array.isArray(messages) ? messages.map((m) => m.content || '').join(' ') : String(messages)).toLowerCase();

  let context = CORE_AGENCY_SUMMARY;

  // Append specific country deep dives when relevant
  if (text.includes('german') || text.includes('aps') || text.includes('srh') || text.includes('ueg') || text.includes('gisma') || text.includes('dmat')) {
    context += '\n' + SECTION_GERMANY;
  }
  if (text.includes('australia') || text.includes('subclass 500') || text.includes('oshc') || text.includes('gs') || text.includes('coe')) {
    context += '\n' + SECTION_AUSTRALIA;
  }
  if (text.includes('zealand') || text.includes('nz') || text.includes('aip') || text.includes('fts')) {
    context += '\n' + SECTION_NEW_ZEALAND;
  }
  if (text.includes('uk') || text.includes('britain') || text.includes('london') || text.includes('england') || text.includes('cas') || text.includes('russell')) {
    context += '\n' + SECTION_UK;
  }
  if (text.includes('canada') || text.includes('gic') || text.includes('sds') || text.includes('pgwp')) {
    context += '\n' + SECTION_CANADA;
  }
  if (text.includes('usa') || text.includes('america') || text.includes('states') || text.includes('f-1') || text.includes('opt') || text.includes('sevis')) {
    context += '\n' + SECTION_USA;
  }
  if (text.includes('netherland') || text.includes('holland') || text.includes('dutch') || text.includes('zoekjaar') || text.includes('delft') || text.includes('amsterdam')) {
    context += '\n' + SECTION_NETHERLANDS;
  }
  if (text.includes('malta') || text.includes('schengen') || text.includes('jobsplus') || text.includes('mcast')) {
    context += '\n' + SECTION_MALTA;
  }
  if (text.includes('singapore') || text.includes('solar') || text.includes('jcu') || text.includes('curtin') || text.includes('psb') || text.includes('kaplan')) {
    context += '\n' + SECTION_SINGAPORE;
  }
  if (text.includes('ielts') || text.includes('pte') || text.includes('toefl') || text.includes('duolingo') || text.includes('band') || text.includes('score') || text.includes('coaching') || text.includes('waiver')) {
    context += '\n' + SECTION_TESTS;
  }
  if (text.includes('loan') || text.includes('gap') || text.includes('refusal') || text.includes('rejection') || text.includes('backlog')) {
    context += '\n' + SECTION_SPECIAL;
  }
  if (text.includes('magazine') || text.includes('brochure') || text.includes('pdf') || text.includes('book')) {
    context += '\n' + SECTION_EMAGAZINES;
  }

  return context;
}

// Fallback constant for backwards compatibility
export const RAG_KNOWLEDGE_BASE = CORE_AGENCY_SUMMARY;
