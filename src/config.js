require('dotenv').config();

module.exports = {
  YOUTUBE_API_KEYS: process.env.YOUTUBE_API_KEYS ? process.env.YOUTUBE_API_KEYS.split(',') : [],
  SEARCH_QUERY: process.env.SEARCH_QUERY || 'cricket',
  FETCH_INTERVAL: parseInt(process.env.FETCH_INTERVAL, 10) || 10, // seconds
  MONGO_URI: process.env.MONGO_URI || 'mongodb://mongo:27017/notify_me',
  PORT: process.env.PORT || 3000,
};
