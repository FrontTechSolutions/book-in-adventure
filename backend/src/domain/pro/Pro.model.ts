
import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  formatted: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  street_number: { type: String },
  route: { type: String },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
}, { _id: false });

const ProSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  description: { type: String },
  photos: {
    profile: { type: String },
    cover: { type: String },
    gallery: [{ type: String }]
  },
  color: { type: String },
  socialNetworks: {
    facebook: { type: String },
    instagram: { type: String },
    others: [{ type: String }]
  },
  openingHours: { type: Object },
  address: { type: AddressSchema },
  cancellationPolicy: { type: String },
  animators: [{ type: String }],
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
  displayOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
  stripeAccountId: { type: String }
});

module.exports = mongoose.model('Pro', ProSchema);
