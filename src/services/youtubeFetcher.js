const axios = require('axios');
const Video = require('../models/Video');
const config = require('../config');

let apiKeyIndex = 0;

function getApiKey() {
  return config.YOUTUBE_API_KEYS[apiKeyIndex % config.YOUTUBE_API_KEYS.length];
}

function rotateApiKey() {
  apiKeyIndex = (apiKeyIndex + 1) % config.YOUTUBE_API_KEYS.length;
}

async function fetchLatestVideos() {
  const apiKey = getApiKey();
  const publishedAfter = new Date(Date.now() - config.FETCH_INTERVAL * 1000).toISOString();
  const url = `https://www.googleapis.com/youtube/v3/search`;
  try {
    const response = await axios.get(url, {
      params: {
        key: apiKey,
        q: config.SEARCH_QUERY,
        part: 'snippet',
        type: 'video',
        order: 'date',
        publishedAfter,
        maxResults: 10,
      },
    });
    const items = response.data.items || [];
    for (const item of items) {
      const videoData = {
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnails: item.snippet.thumbnails,
        channelTitle: item.snippet.channelTitle,
      };
      await Video.updateOne(
        { videoId: videoData.videoId },
        { $setOnInsert: videoData },
        { upsert: true }
      );
    }
  } catch (err) {
    if (err.response && err.response.status === 403) {
      rotateApiKey();
    }
    // Log error
  }
}

module.exports = { fetchLatestVideos };
