# ShowCase - MERN Product Gallery

A product gallery website with image upload.
Data and images are stored in MongoDB Atlas.

**Student:** Frances Reyes - INF238

## Live Links
- Website (Vercel): https://showcase-gallery-olive.vercel.app/
- API (Render): https://showcase-gallery-obtp.onrender.com

## Tech Stack
MongoDB Atlas · Express.js · React (Vite) · Node.js
## Run locally
```bash
# API
cd server && cp .env.example .env   # fill in MONGO_URI
npm install && npm start

# Client (new terminal)
cd client && cp .env.example .env   # set VITE_API_URL=http://localhost:5000
npm install && npm run dev
```
