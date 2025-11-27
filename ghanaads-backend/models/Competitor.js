const mongoose = require('mongoose');

const CompetitorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  competitorHandle: { type: String, required: true },
  platform: { type: String, enum: ['facebook', 'twitter', 'instagram'] },
  followers: { type: Number, default: 0 },
  avgEngagement: { type: Number, default: 0 },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Competitor', CompetitorSchema);