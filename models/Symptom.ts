import mongoose, { Document, Model, Schema } from 'mongoose';

export const SYMPTOM_OPTIONS = [
  'headache', 'blurred_vision', 'abdominal_pain', 'reduced_fetal_movement',
  'bleeding', 'swelling', 'fever', 'vomiting', 'breathlessness',
  'burning_urination', 'dizziness', 'weakness', 'other',
] as const;

export type SymptomOption = typeof SYMPTOM_OPTIONS[number];

export interface ISymptom extends Document {
  patientId:  mongoose.Types.ObjectId;
  loggedAt:   Date;
  symptoms:   SymptomOption[];
  severity:   number;           // 1–10
  notes?:     string;           // Patient writes in Hindi
  aiAdvice?:  string;           // Gemini response in Hindi
  escalated:  boolean;
  createdAt:  Date;
  updatedAt:  Date;
}

const symptomSchema = new Schema<ISymptom>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    loggedAt:  { type: Date, default: Date.now },
    symptoms:  [{ type: String, enum: SYMPTOM_OPTIONS }],
    severity:  { type: Number, min: 1, max: 10, required: true },
    notes:     { type: String, maxlength: 500 },
    aiAdvice:  { type: String, maxlength: 2000 },  // Gemini can be verbose
    escalated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

symptomSchema.index({ patientId: 1, loggedAt: -1 });  // patient symptom history
symptomSchema.index({ escalated: 1, loggedAt: -1 });  // dashboard: escalated alerts
symptomSchema.index({ severity: -1 });                // sort by most severe

const Symptom: Model<ISymptom> =
  (mongoose.models.Symptom as Model<ISymptom>) ||
  mongoose.model<ISymptom>('Symptom', symptomSchema);

export default Symptom;
