# 🌿 Straight Way Oil & Flour Mill - Digital Marketplace

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-emerald.svg)](https://www.mongodb.com/mern-stack)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB.svg)](https://reactjs.org/)

A premium, full-stack e-commerce and logistics management platform built for **Straight Way Oil & Flour Mill**. This application features a futuristic, minimal dark-themed interface with glassmorphic elements and a sophisticated real-time order tracking system.

---

## 🚀 Key Features

### 🛒 Customer Experience
- **Futuristic UI**: A high-end "Glassmorphic" dark-mode interface designed for a premium shopping experience.
- **Live Order Tracking**: A custom interactive timeline (Logistics Path) showing real-time updates for Placed, Paid, Dispatched, and Arrived status.
- **Smart Cart System**: Responsive shopping cart with real-time total calculations and persistence.
- **Unified Profile**: User account management for updating security settings and personal information.
- **Comprehensive History**: Dedicated "My History" page for reviewing past orders and tracking statuses.

### 🛡️ Administrative Control (Control Center)
- **Logistics Management**: Advanced dashboard for monitoring all transaction records.
- **Manual Payment Verification**: Secure "Verify Paid" toggle for admins to confirm manual transfers or COD, instantly updating the user's timeline.
- **Dispatch Orchestration**: One-click dispatch triggers that advance order stages in real-time.
- **Analytics & Inventory**: Integrated views for managing stock and viewing business performance.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Vanilla CSS (Custom Design System), Lucide React (Icons).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt.js encryption.
- **API**: RESTful architecture with Axios integration.

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account

### 2. Installation
From the root directory:
```bash
npm run install-all
```

### 3. Environment Configuration
Create a `.env` file in the `chillipowder-backend` directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Running the Project
**Development Mode:**
```bash
# Start Backend
npm run dev:backend

# Start Frontend
npm run dev:frontend
```

---

## 🌐 Deployment

This project is optimized for **Single-Unit Hosting**. The Backend is configured to serve the production-ready Frontend build.

**To Build for Production:**
1. Run `npm run heroku-postbuild` from the root.
2. Set `NODE_ENV=production` on your hosting provider.
3. Use `npm start` as the launch command.

Refer to the [Detailed Deployment Guide](./chillipowder-backend/DEPLOYMENT_GUIDE.md) for hosting on Render, Railway, or VPS.

---

*Engineered with precision for advanced agentic performance.*
