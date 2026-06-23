import mongoose, { Document, Model, Schema } from 'mongoose';

export type FetalMovement = 'normal' | 'reduced' | 'none' | 'not_checked';
export type VomitingLevel = 'none' | 'mild' | 'severe';
export type UrineAlbumin = 'negative' | 'trace' | 'positive' | 'not_checked';
export type VisitRiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface IAiRiskResult {
  riskLevel: VisitRiskLevel;
  flags: string[];
  recommendation: string;
  escalate: boolean;
  raw?: string;   // full Gemini response for debugging
}

export interface IVisit extends Document {
  patientId: mongoose.Types.ObjectId;
  ashaId: mongoose.Types.ObjectId;
  visitDate: Date;

  // Vitals
  weightKg?: number;
  bpSystolic?: number;
  bpDiastolic?: number;
  hemoglobin?: number;
  fundalHeight?: number;   // cm — matches weeks if normal
  fetalHeartRate?: number;  // bpm, normal 110–160

  // Observations
  fetalMovement?: FetalMovement;
  swellingFeet: boolean;
  swellingFace: boolean;
  bleeding: boolean;
  vomiting?: VomitingLevel;
  urineAlbumin?: UrineAlbumin;

  // Documents
  labReportUrl?: string;   // Cloudinary URL
  labReportType?: string;   // e.g. "blood_test", "urine_test", "ultrasound"

  // Notes
  notes?: string;
  nextVisitDate?: Date;

  reviewedByDoctor: boolean;

  // AI
  aiRiskResult?: IAiRiskResult;

  createdAt: Date;
  updatedAt: Date;
}

const visitSchema = new Schema<IVisit>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    ashaId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    visitDate: { type: Date, required: true, default: Date.now },

    // Vitals
    weightKg: { type: Number, min: 20, max: 200 },
    bpSystolic: { type: Number, min: 60, max: 250 },
    bpDiastolic: { type: Number, min: 40, max: 150 },
    hemoglobin: { type: Number, min: 3, max: 20 },
    fundalHeight: { type: Number, min: 0, max: 50 },
    fetalHeartRate: { type: Number, min: 60, max: 220 },

    // Observations
    fetalMovement: { type: String, enum: ['normal', 'reduced', 'none', 'not_checked'] as const },
    swellingFeet: { type: Boolean, default: false },
    swellingFace: { type: Boolean, default: false },
    bleeding: { type: Boolean, default: false },
    vomiting: { type: String, enum: ['none', 'mild', 'severe'] as const },
    urineAlbumin: { type: String, enum: ['negative', 'trace', 'positive', 'not_checked'] as const },

    // Documents
    labReportUrl: { type: String },
    labReportType: { type: String },

    // Notes
    notes: { type: String, maxlength: 1000 },
    nextVisitDate: { type: Date },
    reviewedByDoctor: {
      type: Boolean,
      default: false,
    },

    // AI Risk Result
    aiRiskResult: {
      riskLevel: { type: String, enum: ['low', 'medium', 'high', 'critical'] as const },
      flags: [{ type: String }],
      recommendation: { type: String },
      escalate: { type: Boolean },
      raw: { type: String },
    },
  },
  { timestamps: true }
);

visitSchema.index({ patientId: 1, visitDate: -1 });       // patient visit history, newest first
visitSchema.index({ ashaId: 1, visitDate: -1 });          // ASHA's visits by date
visitSchema.index({ 'aiRiskResult.escalate': 1 });        // quickly find visits needing escalation
visitSchema.index({ 'aiRiskResult.riskLevel': 1 });       // filter by AI risk level

const Visit: Model<IVisit> =
  (mongoose.models.Visit as Model<IVisit>) ||
  mongoose.model<IVisit>('Visit', visitSchema);

export default Visit;