# TaskFlow – Smart Task Tracker

TaskFlow is a complete, production-ready MERN Stack application for managing tasks. 
It features a modern SaaS design, dark mode, robust JWT authentication, and a fully-featured dashboard.

## Features
- **Authentication**: JWT based Login, Register, Logout.
- **Task Management**: Full CRUD operations.
- **Advanced Features**: Real-time Search, Filtering, Sorting, Pagination.
- **UI/UX**: Responsive modern design, Light/Dark mode, Toast notifications, Activity Timeline.

## Technology Stack
- **Frontend**: React.js (Vite), Tailwind CSS, React Hook Form, React Router DOM, Axios.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs.

## Folder Structure
- `backend/`: Node.js Express server.
- `frontend/`: React Vite application.

## Installation Steps
1. Clone the repository.
2. `cd backend` and `npm install`.
3. `cd ../frontend` and `npm install`.
4. Copy `backend/.env.example` to `backend/.env` and update the values.
5. Copy `frontend/.env.example` to `frontend/.env` and update values if needed.
6. Start both servers:
   - Backend: `npm run dev`
   - Frontend: `npm run dev`

## Environment Variables
See the `.env.example` files in both `backend` and `frontend` directories.

## Deployment
- Backend is optimized for Render.
- Frontend is optimized for Vercel.
- Database uses MongoDB Atlas.

## License
MIT
