
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  pro_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pro', required: true },
  amount: { type: Number, required: true },
  commission: { type: Number },
  status: { type: String, enum: ['pending', 'succeeded', 'failed', 'refunded'], default: 'pending' },
  refund: { type: Boolean, default: false },
  history: [{
    date: Date,
    action: String
  }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
