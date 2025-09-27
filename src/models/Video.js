const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoId: { type: String, unique: true, index: true },
  title: { type: String, required: true, text: true },
  description: { type: String, text: true },
  publishedAt: { type: Date, index: true },
  thumbnails: { type: Object },
  channelTitle: { type: String },
  createdAt: { type: Date, default: Date.now },
});

videoSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Video', videoSchema);
