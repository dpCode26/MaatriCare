import mongoose, { Document, Model, Schema } from 'mongoose';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type OutcomeStatus = 'ongoing' | 'delivered' | 'loss' | 'referred';

export interface IPatient extends Document {
  userId:           mongoose.Types.ObjectId;
  ashaId:           mongoose.Types.ObjectId;
  doctorId?:        mongoose.Types.ObjectId;

  // Identity
  aadhaarLast4?:    string;
  age:              number;
  bloodGroup?:      BloodGroup;

  // Pregnancy
  lmp:              Date; //last menstrual cycle
  edd?:             Date; //exp. delivery date
  gravida:          number; //total preg.
  parity:           number; //births beyond viable gestation
  abortions:        number; //terminations

  // Risk
  riskLevel:        RiskLevel;
  riskFlags:        string[];
  riskUpdatedAt?:   Date;

  // Contact
  emergencyContact?: string;
  emergencyPhone?:   string;
  address?:          string;
  village?:          string;
  district?:         string;

  // Status
  isActive:         boolean;
  deliveryDate?:    Date;
  outcome:          OutcomeStatus;

  createdAt:        Date;
  updatedAt:        Date;

  // Virtual
  weeksPregnant:    number;
}

const patientSchema = new Schema<IPatient>(
  {
    userId:   { type: Schema.Types.ObjectId, ref: 'User'},
    ashaId:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'User' },

    // Identity
    aadhaarLast4: { type: String, maxlength: 4 },
    age:          { type: Number, required: true },
    bloodGroup:   { type: String, enum: ['A+','A-','B+','B-','AB+','AB-','O+','O-'] as const },

    // Pregnancy
    lmp:       { type: Date, required: true },
    edd:       { type: Date },
    gravida:   { type: Number, default: 1 },
    parity:    { type: Number, default: 0 },
    abortions: { type: Number, default: 0 },

    // Risk
    riskLevel:     { type: String, enum: ['low', 'medium', 'high', 'critical'] as const, default: 'low' },
    riskFlags:     [{ type: String }],
    riskUpdatedAt: { type: Date },

    // Contact
    emergencyContact: { type: String },
    emergencyPhone:   { type: String },
    address:          { type: String },
    village:          { type: String },
    district:         { type: String },

    // Status
    isActive:     { type: Boolean, default: true },
    deliveryDate: { type: Date },
    outcome:      { type: String, enum: ['ongoing', 'delivered', 'loss', 'referred'] as const, default: 'ongoing' },
  },
  {
    timestamps: true,
    toJSON:     { virtuals: true },  // include virtuals in API responses
    toObject:   { virtuals: true },
  }
);

patientSchema.index({ ashaId: 1 });               // ASHA fetches her patients
// patientSchema.index({ userId: 1 }, { unique: true }); // one patient profile per user
patientSchema.index({ riskLevel: 1 });             // filter by risk
patientSchema.index({ village: 1, district: 1 });  // location-based queries

// Auto-compute EDD from LMP (LMP + 280 days)
patientSchema.pre('save', function () {  //pre-save Hook (middleware executed)
  if (this.lmp && !this.edd) {
    const edd = new Date(this.lmp);
    edd.setDate(edd.getDate() + 280);
    this.edd = edd;
  }
});

patientSchema.virtual('weeksPregnant').get(function () {
  if (!this.lmp) return 0;
  const diff = Date.now() - new Date(this.lmp).getTime(); //preg. duration
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
});

const Patient: Model<IPatient> =
  (mongoose.models.Patient as Model<IPatient>) ||
  mongoose.model<IPatient>('Patient', patientSchema);

export default Patient;