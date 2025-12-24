
import mongoose from 'mongoose';

const SlotSchema = new mongoose.Schema({
  activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
  date: { type: Date, required: true },
  duration: { type: String },
  animator: { type: String },
  recurrence: { type: String },
  status: { type: String, enum: ['available', 'full', 'cancelled'], default: 'available' },
  history: [{
    date: Date,
    action: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  notifications: [{ type: String }],
  seatsLeft: { type: Number }
});

module.exports = mongoose.model('Slot', SlotSchema);
