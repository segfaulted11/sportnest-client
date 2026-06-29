# 🏟️ SportNest

SportNest is a full-stack sports facility booking platform where users can browse sports venues, view facility details, book available time slots, and manage their own facilities. The application is built using the MERN stack with modern authentication, cloud image hosting, and responsive UI design.

## 🌐 Live Website

**Client:** https://sportnest-client-gules.vercel.app/

**Server:** https://sportnest-server-zy32.onrender.com/

---

## ✨ Features

* User Registration & Login
* Google Authentication
* Browse all available sports facilities
* Search and filter facilities
* View detailed facility information
* Book available time slots
* View personal bookings
* Add new facilities
* Update existing facilities
* Delete facilities
* Upload facility images using ImgBB
* Responsive design for desktop and mobile
* Light/Dark theme toggle
* Smooth UI animations

---

## 🛠️ Technologies Used

### Frontend

* React
* React Router DOM
* Vite
* Tailwind CSS
* DaisyUI
* Axios
* Better Auth
* React Hot Toast
* Framer Motion
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Better Auth
* Cookie Parser
* CORS
* Dotenv

### Cloud Services

* MongoDB Atlas
* Render
* Vercel
* ImgBB

---

## 📂 Project Structure

### Client

```
src/
│
├── assets/
├── components/
├── context/
├── hooks/
├── layouts/
├── lib/
├── pages/
├── routes/
├── services/
├── utils/
├── App.jsx
└── main.jsx
```

### Server

```
config/
controllers/
lib/
middleware/
routes/
services/
utils/
index.js
```

---

## ⚙️ Environment Variables

### Client (.env)

```
VITE_API_URL=YOUR_BACKEND_API_URL
VITE_AUTH_URL=YOUR_BACKEND_URL
VITE_IMGBB_API_KEY=YOUR_IMGBB_API_KEY
```

### Server (.env)

```
PORT=5000

MONGODB_URI=YOUR_MONGODB_URI

CLIENT_URL=YOUR_FRONTEND_URL

BETTER_AUTH_SECRET=YOUR_SECRET

BETTER_AUTH_URL=YOUR_BACKEND_URL

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

---

## 🚀 Installation

### Clone the repositories

Client

```bash
git clone <client-repository-url>
```

Server

```bash
git clone <server-repository-url>
```

---

### Install dependencies

Client

```bash
npm install
```

Server

```bash
npm install
```

---

### Run locally

Server

```bash
npm run dev
```

Client

```bash
npm run dev
```


---

## 👨‍💻 Author

**Seg Fault**

GitHub: https://github.com/segfaulted11

---

## 📄 License

This project was developed for educational purposes.
