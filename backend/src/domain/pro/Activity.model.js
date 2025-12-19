
const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  pro_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pro', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  gallery: [{ type: String }],
  location: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  duration: { type: String },
  maxSeats: { type: Number },
  animator: { type: String },
  color: { type: String },
  cancellationPolicy: { type: String },
  order: { type: Number },
  featured: { type: Boolean, default: false }
});

module.exports = mongoose.model('Activity', ActivitySchema);
