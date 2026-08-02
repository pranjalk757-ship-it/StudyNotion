# 🎓 StudyNotion

StudyNotion is a full-stack EdTech platform that enables students to enroll in courses, instructors to create and manage courses, and provides secure online payments for course purchases.

## 🚀 Live Demo

- **Frontend:** https://studynotion-tau-coral.vercel.app/
- **Backend:** https://studynotion-backend-rt0n.onrender.com/

---

## ✨ Features

### 👨‍🎓 Student
- User Authentication (JWT)
- Browse Courses
- Purchase Courses
- Watch Course Videos
- Track Learning Progress
- Edit Profile
- Update Password

### 👨‍🏫 Instructor
- Create Courses
- Edit Course Details
- Upload Course Thumbnail
- Add Sections & Lectures
- Upload Videos
- Instructor Dashboard

### 💳 Payments
- Razorpay Integration
- Secure Checkout
- Purchase History

---

## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary
- Razorpay

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 📂 Project Structure

```
StudyNotion
│
├── client
│   ├── public
│   ├── src
│   └── package.json
│
├── server
│   ├── configuration
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/pranjalk757-ship-it/StudyNotion.git
cd StudyNotion
```

### Frontend

```bash
cd client
npm install
npm start
```

### Backend

```bash
cd server
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=4000

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

MAIL_HOST=your_mail_host
MAIL_USER=your_mail_user
MAIL_PASS=your_mail_password

RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

### Frontend (.env)

```env
REACT_APP_BASE_URL=https://studynotion-backend-rt0n.onrender.com/api/v1
REACT_APP_RAZORPAY_KEY=your_razorpay_key
```

---

## 🌐 API Base URL

```
https://studynotion-backend-rt0n.onrender.com/api/v1
```

Example Endpoints

```
GET    /course/showAllCategories
POST   /auth/signup
POST   /auth/login
GET    /profile/getUserDetails
POST   /payment/capturePayment
```

---

## 📦 Build

Create a production build:

```bash
npm run build
```

---

## 👨‍💻 Author

**Pranjal Kashyap**

- GitHub: https://github.com/pranjalk757-ship-it

---

## ⭐ If you like this project

Please consider giving this repository a ⭐ on GitHub.
