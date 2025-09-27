# Notify_me: YouTube Video Fetcher API

## Features
- Fetches latest YouTube videos for a search query every 10 seconds
- Stores video data in MongoDB
- GET API for paginated, sorted video list
- Search API for partial matches in title/description
- Supports multiple YouTube API keys (auto-rotation)
- Dockerized (MongoDB + Node.js)

## Setup & Run

### 1. Clone & Configure
```
git clone <repo-url>
cd Notify_me
```

Edit `docker-compose.yml` and set your YouTube API keys:
```
YOUTUBE_API_KEYS=YOUR_API_KEY1,YOUR_API_KEY2
SEARCH_QUERY=cricket
```

### 2. Build & Start
```
docker-compose up --build
```

### 3. API Endpoints
- `GET /videos?page=1&limit=10` — Paginated, sorted by publishedAt desc
- `GET /videos/search?q=your+query&page=1&limit=10` — Search by title/description

## Notes
- MongoDB runs in a container, data persisted in `mongo_data` volume
- API keys rotate automatically if quota exhausted
- Change `SEARCH_QUERY` in `docker-compose.yml` for different topics

## Tech Stack
- Node.js (Express)
- MongoDB (Mongoose)
- Axios
- Docker

## Contact
Send your submission (Git repository) link at wasil@serri.club
