const express = require('express');
const Video = require('../models/Video');
const router = express.Router();

// GET /videos - paginated, sorted by publishedAt desc
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const videos = await Video.find()
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit);
  const total = await Video.countDocuments();
  res.json({
    page,
    limit,
    total,
    videos,
  });
});

// GET /videos/search?q=... - search by title/description
router.get('/search', async (req, res) => {
  const q = req.query.q || '';
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const videos = await Video.find({
    $text: { $search: q },
  })
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit);
  const total = await Video.countDocuments({ $text: { $search: q } });
  res.json({
    page,
    limit,
    total,
    videos,
  });
});

module.exports = router;
