# 🚀 DOS Club Contact Us Portal

A modern and responsive **full-stack Contact Us Portal** developed for the DOS Club at **Saveetha Engineering College**.

The project allows students and visitors to submit their queries through a contact form, while administrators can securely manage and monitor submitted messages through an admin dashboard.

---
## 🌐 Live Demo

👉 [View Live Website](https://dos-club-contact-us.onrender.com)
---
## ✨ Features

### 🌐 User Side

- Responsive Contact Us page
- Modern dark-themed user interface
- Home, About, Events, Gallery and Contact sections
- Contact form validation
- Name, email, phone, subject and message fields
- Success message after form submission
- Clickable email and phone links
- Mobile-friendly navigation
- Scroll animations
- Back-to-top button
- Responsive design for desktop, tablet and mobile devices

### 🔐 Admin Side

- Secure admin login
- Password show/hide option
- Protected admin dashboard
- View submitted contact messages
- Search messages
- Mark messages as Read
- Delete messages
- Display total message count
- Logout functionality
- Session-based authentication

### 🗄️ Database

- SQLite database
- Stores contact form submissions
- Automatically creates the required database table
- Stores message status such as Read and Unread

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Font Awesome
- Google Fonts

### Backend

- Node.js
- Express.js

### Database

- SQLite
- better-sqlite3

### Authentication & Security

- Express Session
- bcryptjs
- dotenv

---

## 📂 Project Structure

```text
ContactUs/
│
├── index.html
├── style.css
├── script.js
│
├── admin-login.html
├── admin-login.js
├── admin.html
├── admin.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```
### 🔄 How It Works
```
User
  ↓
Contact Form
  ↓
JavaScript Validation
  ↓
POST /api/contact
  ↓
Node.js + Express
  ↓
SQLite Database
  ↓
Admin Login
  ↓
Admin Dashboard
  ↓
View / Search / Read / Delete Messages
```
### 📋 Contact Form Validation
```
The contact form includes client-side validation for:

Name – accepts letters and spaces
Email – checks for a valid email format
Phone – optional 10-digit Indian mobile number
Subject – minimum character requirement
Message – minimum character requirement

Invalid information is rejected before the form is submitted.
```
### 🔐 Admin Dashboard
```
The administrator can access the dashboard after successful authentication.

The dashboard provides the ability to:

View all contact messages
Search messages
Check message status
Mark messages as Read
Delete messages
View total number of messages
Logout securely
```