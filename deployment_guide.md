# Deployment Guide

This document outlines how to deploy the Prep2Place Full Stack Application.

## Prerequisites
- GitHub account
- Vercel account (for Frontend)
- Render or Railway account (for Backend & DB)
- Google Cloud account (for Gemini API)

## 1. Database (PostgreSQL on Render/Railway)
1. Create a new PostgreSQL instance on your preferred provider.
2. Note the **External Database URL**.
3. It should look like: `postgresql://user:password@host:port/dbname`

## 2. Backend Deployment (Render)
1. Create a new **Web Service**.
2. Connect your GitHub repository.
3. Set the **Root Directory** to `server`.
4. **Build Command**: `npm install && npx prisma generate && npx tsc`
5. **Start Command**: `npm start`
6. Add the following Environment Variables:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `JWT_SECRET`: A secure random string for signing tokens.
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - `FRONTEND_URL`: The URL of your soon-to-be-deployed Vercel app (e.g. `https://prep2place.vercel.app`).
   - `PORT`: `5000` (Render will override this, but it's good practice).
7. Deploy. Wait for the service to become live and note the backend URL.

## 3. Database Migration
1. From the Render Shell (or locally connected to the remote DB):
   ```bash
   npx prisma migrate deploy
   ```
2. (Optional) Run your database seeds to populate initial opportunities.

## 4. Frontend Deployment (Vercel)
1. Create a new Project in Vercel.
2. Connect your GitHub repository.
3. Set the **Root Directory** to `client`.
4. Framework Preset should auto-detect as **Next.js**.
5. Add the following Environment Variables:
   - `NEXT_PUBLIC_API_BASE_URL`: The URL of your deployed Render backend appended with `/api/v1` (e.g., `https://your-backend.onrender.com/api/v1`).
6. Deploy.

## Post-Deployment Verification
- Navigate to your Vercel URL.
- Register a new account.
- Upload a Resume (Ensure the Render backend has write access to the filesystem if using local disk storage, otherwise this feature will require migrating `multer` to AWS S3 in production).
- Test the AI Coach to ensure the Gemini API key is correctly configured on the backend.
