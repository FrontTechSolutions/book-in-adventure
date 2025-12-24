
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'pro'], required: true },
  notifications: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false }
  },
  baskets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Basket' }],
  attachedBookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  registrationDate: { type: Date, default: Date.now },
  birthDate: { type: Date },
  isVerified: { type: Boolean, default: false },
  verificationCodeHash: { type: String },
  verificationCodeExpiresAt: { type: Date },
  verificationAttempts: { type: Number, default: 0 },
  passwordRequestCodeHash: { type: String },
  passwordResetExpiresAt : { type: Date },
  passwordResetAttempts : { type: Number, default: 0 },
  passwordIsVerified: { type: Boolean, default: false },
  // Professional user fields
  companyName: { type: String },
  companyAddress: { type: String },
});

const User = mongoose.model('User', UserSchema);
export default User;
