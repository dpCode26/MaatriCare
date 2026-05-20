import mongoose, { Document, Model, Schema } from 'mongoose';

export type AlertTrigger  = 'visit' | 'symptom' | 'ai' | 'manual';
export type AlertSeverity = 'medium' | 'high' | 'critical';

export interface IAlert extends Document {
  patientId:   mongoose.Types.ObjectId;
  ashaId?:     mongoose.Types.ObjectId;
  doctorId?:   mongoose.Types.ObjectId;

  triggeredBy: AlertTrigger;
  severity:    AlertSeverity;
  message:     string;        // AI-generated plain English
  flags:       string[];      // Risk flags from Gemini

  // Resolution
  resolved:    boolean;
  resolvedBy?: mongoose.Types.ObjectId;
  resolvedAt?: Date;
  resolution?: string;        // Doctor's note on resolution

  // Notifications
  emailSent:   boolean;
  smsSent:     boolean;

  createdAt:   Date;
  updatedAt:   Date;
}

const alertSchema = new Schema<IAlert>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    ashaId:    { type: Schema.Types.ObjectId, ref: 'User' },
    doctorId:  { type: Schema.Types.ObjectId, ref: 'User' },

    triggeredBy: { type: String, enum: ['visit', 'symptom', 'ai', 'manual'] as const, required: true },
    severity:    { type: String, enum: ['medium', 'high', 'critical'] as const, required: true },
    message:     { type: String, required: true, maxlength: 1000 },
    flags:       [{ type: String }],

    // Resolution
    resolved:   { type: Boolean, default: false },
    resolvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    resolvedAt: { type: Date },
    resolution: { type: String, maxlength: 1000 },

    // Notifications
    emailSent: { type: Boolean, default: false },
    smsSent:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

alertSchema.index({ patientId: 1, createdAt: -1 });       // patient alert history
alertSchema.index({ ashaId: 1, resolved: 1 });            // ASHA's unresolved alerts
alertSchema.index({ doctorId: 1, resolved: 1 });          // doctor's pending alerts
alertSchema.index({ severity: 1, resolved: 1 });          // dashboard: critical unresolved
alertSchema.index({ resolved: 1, createdAt: -1 });        // global alert queue by time

// Ensure resolvedAt is set when resolved is true
alertSchema.pre('save', function () {
  if (this.resolved && !this.resolvedAt) {
    this.resolvedAt = new Date();
  }
});

const Alert: Model<IAlert> =
  (mongoose.models.Alert as Model<IAlert>) ||
  mongoose.model<IAlert>('Alert', alertSchema);

export default Alert;