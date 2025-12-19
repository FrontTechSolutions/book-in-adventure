
const mongoose = require('mongoose');

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
  registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
