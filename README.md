# 🎓 Edemy – Full-Stack Learning Management System (LMS)

**Edemy** is a full-stack **Learning Management System (LMS)** that allows educators to create and manage courses while students can enroll, learn, track progress, and rate courses. It supports **role-based dashboards**, **Stripe payments**, **video lessons**, and **real-time progress tracking**.

🌐 **Live Website:** https://edemy-frontend-eosin.vercel.app  
📦 **Repository:** https://github.com/Amit-0011/LMS

---

## ✨ Features

### 👩‍🎓 Student Features
- Secure Authentication (Clerk)
- Browse & Purchase Courses
- Course Enrollment & Progress Tracking
- Watch Video Lectures (YouTube integration)
- Chapter-wise Course Structure
- Course Ratings & Reviews
- My Enrollments Dashboard

### 👨‍🏫 Educator Features
- Educator Dashboard
- Create & Publish Courses
- Add Chapters & Lessons
- Upload Course Thumbnails
- Track Enrollments
- View Course Earnings
- Manage Course Status

### 💳 Payments & Platform
- Stripe Payment Integration
- Secure Checkout Flow
- Revenue Tracking for Educators
- Role-based Access Control
- Responsive UI for all devices

> Edemy is a **production-style LMS platform**, not a basic CRUD app.

---

## 🛠 Tech Stack

### 🌐 Frontend

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=ffffff)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=ffffff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=ffffff)
![Clerk](https://img.shields.io/badge/Clerk-3B82F6?logo=clerk&logoColor=ffffff)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=ffffff)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=ffffff)
![Quill](https://img.shields.io/badge/Quill_Editor-000000?logo=quill&logoColor=ffffff)
![YouTube](https://img.shields.io/badge/YouTube_Player-FF0000?logo=youtube&logoColor=ffffff)

---

### 🖥 Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=ffffff)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=ffffff)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=ffffff)
![Mongoose](https://img.shields.io/badge/Mongoose-888888?logo=mongodb&logoColor=ffffff)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=ffffff)
![Clerk](https://img.shields.io/badge/Clerk_Auth-3B82F6?logo=clerk&logoColor=ffffff)

---

### 🔌 Utilities & Services

![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=ffffff)
![Multer](https://img.shields.io/badge/Multer-FF6F00?logo=node.js&logoColor=ffffff)
![Svix](https://img.shields.io/badge/Svix_Webhooks-0F172A?logo=webhooks&logoColor=ffffff)
![dotenv](https://img.shields.io/badge/dotenv-000000?logo=dotenv&logoColor=ffffff)
![CORS](https://img.shields.io/badge/CORS-FF6347?logo=cors&logoColor=ffffff)

---

## 📁 Project Structure

```
LMS/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── dashboards/
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── EducatorDashboard.jsx
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── webhooks/
│   ├── utils/
│   ├── .env
│   └── server.js
│
└── README.md
```

---

## 🧠 How Edemy Works

### 🔐 Authentication & Roles
- Authentication handled via **Clerk**
- Users can act as **Students** or **Educators**
- Role-based access enforced on backend APIs

### 📚 Courses
- Educators create courses with rich text descriptions
- Chapters and lessons structured hierarchically
- Course thumbnails uploaded to Cloudinary

### 🎥 Learning Experience
- Video lectures powered by **YouTube embeds**
- Progress tracked chapter-wise
- Completion status visible to students

### 💳 Payments & Earnings
- Students purchase courses using **Stripe Checkout**
- Educator earnings tracked per course
- Webhooks handled using **Svix**

---

## 📌 Core Functionalities

| Feature | Description |
|------|------------|
| Student Dashboard | Enrollments & progress |
| Educator Dashboard | Courses, earnings, students |
| Course Builder | Chapters & lessons |
| Payments | Stripe checkout |
| Media Uploads | Cloudinary |
| Ratings | Course feedback system |

---

## 📌 API Endpoints (Core)

| Method | Endpoint | Description |
|------|--------|-------------|
| POST | `/api/courses` | Create course |
| GET | `/api/courses` | Fetch courses |
| POST | `/api/enroll` | Enroll in course |
| POST | `/api/stripe/checkout` | Create checkout session |
| POST | `/api/webhook/stripe` | Stripe webhook |

---

## ⚙️ Environment Variables

Create a `.env` file inside **server/**:

```
##################################
# Server Configuration
##################################
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

##################################
# Authentication (Clerk)
##################################
CLERK_SECRET_KEY=your_clerk_secret_key

##################################
# Database
##################################
MONGO_URI=your_mongodb_connection_string

##################################
# Cloudinary (Media Storage)
##################################
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

##################################
# Stripe (Payments)
##################################
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

⚠️ Never commit `.env` files to GitHub.

---

## 🚀 Getting Started

### Backend

```
cd server
npm install
npm run dev
```

### Frontend

```
cd client
npm install
npm run dev
```

---

## 🔒 Security Notes

- Authentication managed by Clerk
- Role-based API protection
- Secure Stripe payment flow
- Webhook signature verification
- Secrets stored in environment variables

---

## 📈 Future Improvements

- Course certificates
- Instructor analytics charts
- Advanced search & filtering
- Course completion badges
- Refund handling

---

## 🏁 Conclusion

**Edemy** is a full-featured LMS platform demonstrating **authentication, role-based dashboards, course management, payments, and media handling** using modern web technologies.

This project reflects **real-world ed-tech architecture**, not a tutorial build.
