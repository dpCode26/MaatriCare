import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export type UserRole = 'asha' | 'patient' | 'doctor'; 
export type UserLanguage = 'hi' | 'en';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  village?: string;
  district?: string;
  block?: string;
  language: UserLanguage;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role:     { type: String, enum: ['asha', 'patient', 'doctor'] as const, required: true },
    phone:    { type: String, trim: true },
    village:  { type: String, trim: true },
    district: { type: String, trim: true },
    block:    { type: String, trim: true },
    language: { type: String, enum: ['hi', 'en'] as const, default: 'hi' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);


userSchema.index({ role: 1 });
userSchema.index({ village: 1, district: 1 });  // domain driven optimisation
userSchema.pre('save', async function ()  
{
  if (!this.isModified('password')) return;  // this must refer to curr document
  this.password = await bcrypt.hash(this.password, 12);
});


userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>('User', userSchema);

export default User;