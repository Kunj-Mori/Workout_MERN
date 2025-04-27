# Workout Tracker MERN Application

A full-stack workout tracking application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. This application allows users to track their workouts with features like authentication, real-time updates, and a modern responsive UI.

![Workout Tracker Demo](demo.gif)

## Features

- **User Authentication**
  - Secure signup and login functionality
  - JWT-based authentication
  - Protected routes and endpoints

- **Workout Management**
  - Create, read, update, and delete workouts
  - Track exercise title, weight (load), and repetitions
  - Real-time workout updates
  - Sort workouts by creation date

- **Modern UI/UX**
  - Responsive design for all devices
  - Clean and intuitive interface
  - Loading states and error handling
  - Interactive feedback for user actions

- **Additional Features**
  - BMI Calculator
  - Sidebar navigation
  - User dashboard
  - Real-time data synchronization

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- Modern CSS with Flexbox/Grid
- Font Awesome icons
- date-fns for date formatting

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- CORS enabled

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd workout-tracker-mern
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Create a `.env` file in the server directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```
The server will run on http://localhost:4000

2. Start the frontend development server:
```bash
cd client
npm start
```
The application will open in your browser at http://localhost:3000

## API Endpoints

### Authentication Routes
- `POST /api/user/signup` - Register a new user
- `POST /api/user/login` - Login user

### Workout Routes (Protected)
- `GET /api/workouts` - Get all workouts for logged in user
- `POST /api/workouts` - Create a new workout
- `GET /api/workouts/:id` - Get a specific workout
- `DELETE /api/workouts/:id` - Delete a workout
- `PATCH /api/workouts/:id` - Update a workout

## Project Structure

```
workout-tracker-mern/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/      # React Context providers
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Page components
│   │   └── App.js        # Main application component
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── controllers/      # Route controllers
    ├── middleware/       # Custom middleware
    ├── models/          # Mongoose models
    ├── routes/          # API routes
    ├── server.js        # Server entry point
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with the MERN stack
- Styled with modern CSS practices
- Implements best practices for authentication and state management
