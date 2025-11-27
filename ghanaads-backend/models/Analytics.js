const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  platform: { type: String, enum: ['facebook', 'twitter', 'instagram'] },
  metrics: {
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    reach: { type: Number, default: 0 },
    engagement: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);