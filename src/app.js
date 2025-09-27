const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const videoRoutes = require('./routes/videos');
const { fetchLatestVideos } = require('./services/youtubeFetcher');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/videos', videoRoutes);

app.get('/', (req, res) => {
  res.send('YouTube Video Fetcher API');
});

// Poll YouTube API every FETCH_INTERVAL seconds
setInterval(fetchLatestVideos, config.FETCH_INTERVAL * 1000);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
