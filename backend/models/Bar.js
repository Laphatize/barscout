const mongoose = require('mongoose');
const barSchema = new mongoose.Schema({
  name: String,
  location: {
    type: String, // address string
    required: true
  },
  coordinates: {
    type: [Number], // [lng, lat]
    index: '2dsphere',
    default: undefined
  },
  image: String, // URL or base64
  queueCount: { type: Number, default: 0 },
  ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, value: Number }],
  coverFees: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, amount: Number, timestamp: { type: Date, default: Date.now } }],
  trafficReports: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, level: String, timestamp: { type: Date, default: Date.now } }],
});
module.exports = mongoose.model('Bar', barSchema);