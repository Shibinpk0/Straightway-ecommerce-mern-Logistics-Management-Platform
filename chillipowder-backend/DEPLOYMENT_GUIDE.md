# 🚀 Deployment & Hosting Guide

Your project is now **Production Ready**. I have consolidated the Frontend and Backend so you only need to host **one** service.

## 1. Quick Start: Local Production Mode
Verify everything works in "Production" mode on your computer first:
1. Open terminal in `chillipowder-backend`.
2. Run: `set NODE_ENV=production && npm start` (Windows)
   *Or: `NODE_ENV=production npm start` (Mac/Linux)*
3. Visit `http://localhost:5000`. You will see the full website!

---

## 2. Hosting on Render.com (Recommended & Free)
Render is the easiest way to host this MERN stack app for free.

1. **GitHub**: Push your entire `scratch` folder to a new private GitHub repository.
2. **Render Dashboard**: Click "New" -> **Web Service**.
3. **Connect**: Connect your GitHub repo.
4. **Settings**:
   - **Environment**: `Node`
   - **Build Command**: `npm run heroku-postbuild`
   - **Start Command**: `npm start`
5. **Environment Variables**: Add these in the Render "Env" tab:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: `your_mongodb_atlas_connection_string`
   - `JWT_SECRET`: `a_long_random_string`
   - `PORT`: `5000`

---

## 3. Database (MongoDB Atlas)
If you haven't already:
1. Create a free cluster at [mongodb.com](https://www.mongodb.com/cloud/atlas).
2. "Allow Access from Anywhere" (0.0.0.0/0) in Network Access.
3. Copy your Connection String and paste it into the `MONGO_URI` variable on your hosting provider.

---

## 4. Why this works "Everywhere"
Because the Backend now serves the Frontend `dist` folder:
- **SEO**: Ready.
- **Speed**: Optimized static assets via Vite.
- **Simplicity**: No need to worry about CORS or separate frontend hosting (Vercel/Netlify).

**Your project is now a single, portable unit ready for the world!**
