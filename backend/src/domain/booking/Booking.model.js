
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  slot_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
  activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
  basket_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Basket' },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'paid', 'cancelled', 'refunded'], default: 'pending' },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  cancellationPolicy: { type: String },
  review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
  seats: { type: Number, default: 1 },
  price: { type: Number }
});

module.exports = mongoose.model('Booking', BookingSchema);
