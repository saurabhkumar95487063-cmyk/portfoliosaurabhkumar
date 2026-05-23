# Saurabh Kumar - Full-Stack Cyber Portfolio ⚡

A high-fidelity, visually-stunning dark/cyber-themed developer portfolio tailored for **Saurabh Kumar** (BCA Student & Aspiring Software Developer). The application is structured in two separate folders to accommodate a full-stack deployment architecture.

## 🚀 Tech Stack

- **Frontend (`/frontend`)**: React, Vite, Lucide Icons, Premium Glassmorphism CSS. Styled and optimized for **Vercel** deployment.
- **Backend (`/backend`)**: Node.js, Express, MongoDB/Mongoose (database), CORS, Dotenv. Styled and optimized for **Render** deployment.

---

## 💻 Local Development Setup

To run the application locally on your computer, follow these simple steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).

---

### Step 1: Start the Backend API
Open a terminal in the root directory and navigate to the `backend` folder:
```bash
cd backend
```
1. Install the backend dependencies:
   ```bash
   npm install
   ```
2. Start the development server (runs on `http://localhost:5000`):
   ```bash
   npm start
   ```
   *(If you have `nodemon` installed globally, you can also run `npm run dev` to enable auto-reloading).*

---

### Step 2: Start the Frontend App
Open a **new** terminal window at the root directory and navigate to the `frontend` folder:
```bash
cd frontend
```
1. Install the frontend dependencies:
   ```bash
   npm install
   ```
2. Start the development server (runs on `http://localhost:3000`):
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your web browser.

---

## ✉️ Checking Contact Form Submissions

Whenever a user submits the "Send a Message" form, the details (Name, Email, Message, and Timestamp) are saved directly inside the MongoDB database.

To view these submissions:
1. Make sure the backend server is running.
2. Open your browser or API testing tool (like Postman or curl).
3. Access: `http://localhost:5000/api/messages?key=saurabh123`
   *(Note: The default `key` is `saurabh123`. You can customize this by changing the `ADMIN_KEY` inside your `.env` file).*

---

## 🌐 Production Deployment Guide

Here is how you can deploy your portfolio live to Vercel and Render:

### Part A: Deploy Backend to Render (https://render.com)
1. **Prepare your Github Repository**: Push the entire folder (including `frontend` and `backend` folders) to a new Git repository.
2. **Create Web Service on Render**:
   - Create a free account on [Render](https://render.com).
   - Click **New +** and select **Web Service**.
   - Connect your Git repository.
3. **Configure Settings**:
   - **Name**: `saurabh-portfolio-api` (or similar)
   - **Root Directory**: `backend` (This points Render to compile just the backend folder)
   - **Environment / Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables**:
   - Under the **Environment** tab, click **Add Environment Variable**:
     - `PORT`: `10000` (Render sets this dynamically, but good to add if needed)
     - `ADMIN_KEY`: `your_custom_admin_password`
     - `MONGODB_URI`: `your_mongodb_atlas_connection_string` (e.g., mongodb+srv://...)
5. Click **Create Web Service**! Render will deploy your API and provide a live URL (e.g. `https://saurabh-portfolio-api.onrender.com`).

---

### Part B: Deploy Frontend to Vercel (https://vercel.com)
1. **Edit Endpoint Proxy**:
   - Open [frontend/vercel.json](file:///c:/Users/Lenovo/OneDrive/Desktop/New%20folder/frontend/vercel.json).
   - Replace the `destination` URL `https://saurabh-portfolio-backend.onrender.com/api/$1` with your actual Render API URL followed by `/api/$1`.
2. **Create Project on Vercel**:
   - Log into [Vercel](https://vercel.com) and click **Add New** -> **Project**.
   - Import your Git repository.
3. **Configure Settings**:
   - **Framework Preset**: `Vite` (Vercel detects this automatically)
   - **Root Directory**: `frontend` (This points Vercel to compile just the frontend folder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**! Vercel will build your static assets and host your frontend portfolio under a clean `.vercel.app` domain.

---

## 🎨 Customizing Content

To update the default details (text, skills, project links, email, etc.):
- Open [frontend/src/config.js](file:///c:/Users/Lenovo/OneDrive/Desktop/New%20folder/frontend/src/config.js).
- Modify the values inside the `DEVELOPER_PROFILE` object. It updates the UI automatically!
