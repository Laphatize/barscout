# BarScout - Bar Discovery and Social Platform

BarScout is a modern web application that helps users discover and explore bars, share experiences, and connect with fellow bar enthusiasts. The application consists of a Next.js frontend and an Express.js backend.

https://barscout.ctfguide.com

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- AWS Account (for image storage)
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:5000`

## 🏗️ Architecture

### Frontend (Next.js)

- **Framework**: Next.js 14.2.3 with React 18.2.0
- **Styling**: TailwindCSS for responsive design
- **State Management**: React Context API
- **Real-time Communication**: Socket.IO Client
- **UI Components**: 
  - HeroIcons for icons
  - Framer Motion for animations
  - Lucide React for additional icons
- **PWA Support**: next-pwa for Progressive Web App capabilities

Key Features:
- Server-side rendering for better performance
- Progressive Web App (PWA) support
- Responsive design with TailwindCSS
- Real-time updates using WebSocket
- Modern and intuitive user interface

### Backend (Express.js)

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt
- **File Storage**: AWS S3 with multer-s3
- **Real-time Communication**: Socket.IO

Key Features:
- RESTful API endpoints
- JWT-based authentication
- Real-time WebSocket communication
- AWS S3 integration for image storage
- CORS support
- Environment-based configuration

## 📁 Project Structure

### Frontend Structure
```
frontend/
├── components/     # Reusable React components
├── context/       # React Context providers
├── pages/         # Next.js pages and API routes
├── public/        # Static assets
├── styles/        # Global styles and Tailwind config
└── next.config.js # Next.js configuration
```

### Backend Structure
```
backend/
├── config/      # Configuration files
├── middleware/  # Express middlewares
├── models/      # Mongoose models
├── routes/      # API route handlers
└── server.js    # Main application entry
```

## 🔒 Security

- JWT-based authentication
- Secure password hashing with bcrypt
- Environment variables for sensitive data
- CORS protection
- Secure file upload handling

## 📱 Progressive Web App

The application is PWA-enabled, allowing users to:
- Install it on their devices
- Access it offline
- Receive push notifications
- Experience app-like behavior

## 🚀 Deployment

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

### Backend Deployment
1. Ensure all environment variables are set
2. Start the production server:
   ```bash
   npm start
   ```

## 📄 License

This project is licensed under the MIT License. 
