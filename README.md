<div align="center">
  <img src="frontend/public/favicon.svg" alt="TaskFlow Logo" width="80" height="80">
  <h1>TaskFlow – Smart Task Tracker</h1>
  <p>A production-ready MERN Stack task management application featuring a modern SaaS aesthetic.</p>
</div>

---

## 🚀 Features

- **Robust Authentication**: Secure JWT-based Login and Registration.
- **Task Management**: Full CRUD capabilities (Create, Read, Update, Delete).
- **Dashboard Overview**: High-level statistical summaries and urgent task tracking.
- **My Tasks View**: Dedicated data grid with Real-time Search, Priority Filtering, Status Filtering, and Pagination.
- **Interactive Calendar**: Custom month-view calendar mapping tasks dynamically by due date.
- **Profile Settings**: Dedicated settings portal for updating name, email, password, and preferences.
- **Modern UI/UX**: 
  - Glassmorphism design system
  - Native Light/Dark Mode toggle
  - Responsive layouts (Mobile, Tablet, Desktop)
  - Beautiful Toast notifications

## 🛠️ Technology Stack

**Frontend**
- React.js 19 (Bootstrapped with Vite)
- Tailwind CSS v4
- React Router DOM
- Axios (with Interceptors)
- React Hook Form
- React Hot Toast

**Backend**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcryptjs (Password Hashing)

## 📁 Project Structure

```text
├── backend/
│   ├── config/         # Database connection logic
│   ├── controllers/    # API endpoint logic (auth, tasks)
│   ├── middleware/     # JWT Protection & Error handling
│   ├── models/         # Mongoose Schemas (User, Task)
│   ├── routes/         # Express routing definitions
│   └── server.js       # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI pieces (Cards, Modals, Navbar)
    │   ├── context/    # Global State (AuthContext, ThemeContext)
    │   ├── layouts/    # Page Wrappers (MainLayout, AuthLayout)
    │   ├── pages/      # Route Components (Dashboard, Tasks, Calendar, etc.)
    │   └── services/   # Axios API configurations
    └── package.json
```

## ⚙️ Local Development Setup

### 1. Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local instance or MongoDB Atlas)

### 2. Clone the Repository
```bash
git clone https://github.com/bipladipsaha/COLL-EDGE-CONNECT-Assignment.git
cd COLL-EDGE-CONNECT-Assignment
```

### 3. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```
Start the backend server:
```bash
npm run dev
```

### 4. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```

### 5. Access the Application
Open your browser and navigate to `http://localhost:5173`.

---
*Built with ❤️ for production-readiness and beautiful user experiences.*
