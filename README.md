# StyleSync

### Fashion and Personal Wardrobe Management Platform

**Live Website:** https://swynex-style-sync.vercel.app/

**Backend API:** https://stylesyncbackend-qhvr.onrender.com/

## About the Project

StyleSync is a full-stack fashion and personal wardrobe management web application. It helps users organize their clothing collections, explore fashion categories, manage wardrobe items, and maintain a wishlist through a clean, responsive interface.

## Technology Stack

- React.js
- Vite
- Tailwind CSS
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- REST API
- Git and GitHub

## Features

- Responsive home page and navigation
- Explore clothing categories
- Add clothing items to a personal wardrobe
- View and organize wardrobe items
- Edit clothing details
- Delete wardrobe items
- Search and filter clothing
- Wishlist management
- Responsive design for mobile and desktop

## Project Architecture

The application follows a client-server architecture:

- **Frontend:** React.js application deployed on Vercel.
- **Backend:** Node.js and Express.js REST API deployed on Render.
- **Database:** MongoDB Atlas.

## Project Structure

```text
SWYNEX-StyleSync/
|
|-- frontend/
|   |-- src/
|   |-- public/
|   |-- package.json
|
|-- backend/
|   |-- src/
|   |   |-- config/
|   |   |-- models/
|   |   |-- routes/
|   |   |-- controllers/
|   |-- .env.example
|   |-- package.json
|
|-- ARCHITECTURE.md
|-- README.md
```

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/patelmuskan09/SWYNEX-StyleSync.git
cd SWYNEX-StyleSync
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create your local environment file from the example:

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

Open `backend/.env` and add your own MongoDB Atlas connection string:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

### 3. Set up the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local frontend URL displayed by Vite in your terminal.

## Environment Variables

The backend requires a MongoDB connection string through `MONGO_URI`.

Refer to `backend/.env.example` for the required variable names.

**Security note:** Never commit your actual `.env` file or database credentials to GitHub.

## Deployment

- Frontend hosting: Vercel
- Backend hosting: Render
- Database hosting: MongoDB Atlas

## Documentation

Refer to [ARCHITECTURE.md](ARCHITECTURE.md) for system architecture, database design, API routes, and frontend screens.

## Future Enhancements

- User authentication and individual accounts
- Outfit combination planner
- Enhanced personalization features

## Project Status

Frontend, backend, database integration, and deployment completed.

## Author

Muskan Patel
