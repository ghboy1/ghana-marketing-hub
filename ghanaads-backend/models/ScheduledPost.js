const mongoose = require('mongoose');

const ScheduledPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  platforms: [{ type: String, enum: ['facebook', 'twitter', 'instagram'] }],
  content: { type: String, required: true },
  imageURL: { type: String },
  scheduledTime: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['draft', 'scheduled', 'published', 'failed'], 
    default: 'draft' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScheduledPost', ScheduledPostSchema);