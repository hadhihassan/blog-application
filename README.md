# Blog Application with User Management

A full-stack Blog Application built with **Next.js**, **Express.js**, **Node.js**, **TypeScript** and **MongoDB**. The project includes user authentication, role-based access, CRUD operations for blog posts, and user profile management.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Running the Project](#running-the-project)
6. [GitHub Repository](#github-repository)
7. [Deployment](#deployment)
8. [Live Demo](#live-demo)
---

## Project Overview
This project is a full-stack Blog Application designed to demonstrate a production-like setup with:

- User authentication (registration, login, logout) using JWT.
- Role-based access control: Admin can manage all posts and users, while regular users can manage only their own posts.
- CRUD operations for blog posts with fields: title, content, author, and created/updated dates.
- Public blog listing page and single blog detail page.
- User profile management, including editing profile and viewing own posts.
- Backend implemented with Express.js and MongoDB.
- Frontend implemented with Next.js and styled using Tailwind CSS and Ant Design.

---

## Tech Stack
**Frontend**
- Next.js (React framework)
- React
- Tailwind CSS
- Ant Design
- Axios (HTTP client)

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation
- cors and helmet for security

---

## Installation

### Clone the repository
```bash
git clone https://github.com/hadhihassan/blog-application.git
cd blog-application
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=sever_port
MONGODB_URI=your_monodb_url
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=jwt_expire
NODE_ENV=environemnt
FRONTEND_URL=frontend_url
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=NEXT_PUBLIC_API_URL/api
```

Start the frontend development server:
```bash
npm start
```


---

## Deployment

**Frontend Deployment**

* Deployed on **Vercel**
* Environment variable `NEXT_PUBLIC_API_URL` set to the backend API URL (production URL)

**Backend Deployment**

* Deployed on **Render**
* Environment variables:

  * `PORT`
  * `MONGODB_URI`
  * `JWT_SECRET`
  * `JWT_EXPIRE`
  * `NODE_ENV`
  * `FRONTEND_URL`

**MongoDB**

* Hosted on **MongoDB Atlas** (Free Tier)

> Make sure environment variables in production match the deployed services URLs.

---

## Live Demo

* **Deployed Application:** [https://blog-application-lvjk.vercel.app/](https://blog-application-lvjk.vercel.app/)
* **GitHub Repository:** [https://github.com/hadhihassan/blog-application](https://github.com/hadhihassan/blog-application)

---

