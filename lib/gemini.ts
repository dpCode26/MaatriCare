import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

interface VisitData {
  bpSystolic: number;
  bpDiastolic: number;
  weightKg: number;
  hemoglobin: number;
  swellingFeet: boolean;
  swellingFace: boolean;
  fetalMovement: string;
  bleeding: boolean;
  urineAlbumin?: string;
}

interface PatientData {
  weeksPregnant: number;
  age: number;
  gravida: number;
  parity: number;
}

interface PreviousVisit {
  bpSystolic: number;
  bpDiastolic: number;
}

export interface RiskResult {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  flags: string[];
  recommendation: string;
  escalate: boolean;
}

interface DistrictStats {
  district: string;
  weekEnd: string;
  total: number;
  highRisk: number;
  critical: number;
  newAlerts: number;
  topFlags: string[];
  unresolved: number;
}

//  Risk Analyzer — called after every visit

export async function analyzePregnancyRisk(
  visitData: VisitData,
  patientData: PatientData,
  previousVisits: PreviousVisit[]
): Promise<RiskResult | null> {
  const bpTrend = previousVisits
    .slice(-3)
    .map(v => `${v.bpSystolic}/${v.bpDiastolic}`)
    .join(', ');

  const prompt = `You are a maternal health risk assessment AI for rural India.
Analyze this patient data and return ONLY valid JSON, no extra text.

Patient: ${patientData.weeksPregnant} weeks pregnant, age ${patientData.age}, gravida ${patientData.gravida}, parity ${patientData.parity}
Latest visit: BP ${visitData.bpSystolic}/${visitData.bpDiastolic} mmHg, weight ${visitData.weightKg}kg, Hb ${visitData.hemoglobin}g/dL
Swelling feet: ${visitData.swellingFeet}, Swelling face: ${visitData.swellingFace}
Fetal movement: ${visitData.fetalMovement}, Bleeding: ${visitData.bleeding}
Urine albumin: ${visitData.urineAlbumin ?? 'not_checked'}
Previous 3 visits BP: ${bpTrend || 'no prior data'}

Return ONLY this JSON:
{
  "riskLevel": "low|medium|high|critical",
  "flags": ["specific reason 1", "specific reason 2"],
  "recommendation": "one actionable sentence for the ASHA worker",
  "escalate": true or false
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    if (
      !parsed.riskLevel ||
      !parsed.recommendation
    ) {
      throw new Error(
        "Invalid Gemini response"
      );
    }

    return parsed as RiskResult;
  } catch (err) {
    console.error('Gemini risk check failed:', err);
    return null; // Never block visit saving on AI failure
  }
}


//  Hindi Advice — for patient symptom logger 
export async function getHindiAdvice(
  symptoms: string[],
  severity: number,
  weeksPregnant: number
): Promise<string> {
  const prompt = `You are a helpful maternal health assistant speaking to a pregnant woman in rural India.
She has reported these symptoms: ${symptoms.join(', ')} with severity ${severity}/10.
She is ${weeksPregnant} weeks pregnant.

Respond ONLY in simple Hindi (Devanagari script).
Tell her: 1) kya yeh normal hai, 2) abhi kya karein, 3) kab ASHA worker ko bulayein.
Keep it under 4 sentences. Use simple village-level Hindi.
Be warm and reassuring. Never diagnose. Never say "doctor ke paas jao" without first telling her what to do at home.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error('Gemini Hindi advice failed:', err);
    return 'कृपया अपनी ASHA कार्यकर्ता से संपर्क करें।';
  }
}

// 3. Weekly District Summary — for doctor dashboard 
export async function getDistrictSummary(stats: DistrictStats): Promise<string> {
  const prompt = `You are a public health analyst. Write a brief summary for a busy PHC doctor.
District: ${stats.district}, Week ending: ${stats.weekEnd}
Total active patients: ${stats.total}
High risk: ${stats.highRisk}, Critical: ${stats.critical}
New alerts this week: ${stats.newAlerts}
Most common risk flags: ${stats.topFlags.join(', ')}
Unresolved alerts: ${stats.unresolved}

Write exactly 3 sentences of plain English. End with: "Immediate action required for ${stats.unresolved} unresolved alerts."
Be direct. The doctor is busy.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error('Gemini district summary failed:', err);
    return 'Unable to generate summary. Please check patient records manually.';
  }
}