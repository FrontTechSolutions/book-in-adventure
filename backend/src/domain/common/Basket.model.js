
const mongoose = require('mongoose');

const BasketSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  status: { type: String, enum: ['pending', 'paid', 'expired'], default: 'pending' },
  total: { type: Number },
  createdAt: { type: Date, default: Date.now },
  paidAt: { type: Date },
  history: [{
    date: Date,
    action: String
  }]
});

module.exports = mongoose.model('Basket', BasketSchema);
