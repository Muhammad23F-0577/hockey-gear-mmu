# Hockey Gear MMU

A MERN stack hockey e-commerce web application built using MongoDB, Express.js, React.js, and Node.js. The project provides a complete online shopping experience for hockey equipment with customer and admin functionalities.

---

# Project Features

## Customer Features
- User Registration & Login
- JWT Authentication
- Browse Hockey Products
- Product Search & Filters
- Product Detail Pages
- Shopping Cart System
- Checkout & Order Placement
- Email Order Confirmation
- User Profile Management

## Admin Features
- Product CRUD Operations
- User Management
- Order Management
- Order Status Updates
- Admin Dashboard

---

# Technologies Used

## Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Icons

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JSON Web Token (JWT)

## Additional Tools
- Nodemailer
- dotenv
- CORS

---

# Group Members

| Name | Role |
|------|------|
| Muhammad Talib Hussain | Frontend & Backend Development |
| Muhammad Mursaleen | Backend & Database |
| Muhammad Usman | UI Design & Testing |

---

# Project Structure

```bash
hockey-gear-mmu/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── config/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```

---

# Installation & Setup

## Step 1: Clone Repository

```bash
git clone https://github.com/your-username/hockey-gear-mmu.git
```

---

## Step 2: Open Project

```bash
cd hockey-gear-mmu
```

---

# Backend Setup

## Open Backend Folder

```bash
cd backend
```

## Install Dependencies

```bash
npm install
```

## Create .env File

Create a `.env` file inside backend folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

## Run Backend Server

```bash
npm run dev
```

OR

```bash
node server.js
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## Open Frontend Folder

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Admin Access

To access admin dashboard:

```bash
http://localhost:5173/admin
```

Admin users are controlled using role:

```js
role: "admin"
```

---

# API Routes

## Authentication

```bash
/api/auth/register
/api/auth/login
/api/auth/me
```

## Products

```bash
/api/products
/api/products/:id
```

## Orders

```bash
/api/orders
/api/orders/:id
```

---

# Email Functionality

The project uses Nodemailer with Gmail SMTP service for:

- Order Confirmation Emails
- Customer Notifications

---

# Main Functionalities

- Add to Cart
- Remove from Cart
- Update Quantity
- Product Filtering
- Product Search
- Checkout System
- Order Tracking
- Admin Product Management

---

# Screens Included

- Login Page
- Home Page
- Product Listing
- Cart Page
- Checkout Page
- Admin Dashboard

---

# Security Features

- JWT Authentication
- Protected Routes
- Admin Authorization
- Environment Variables
- Secure API Access

---

# Conclusion

Hockey Gear MMU is a complete MERN stack e-commerce web application developed for learning modern web development concepts. The project demonstrates frontend-backend integration, REST APIs, authentication, database management, and admin operations in a real-world online shopping system.

---

# Developed By
Muhammad 23F-0577
and
Team MMU — Hockey Gear Project
