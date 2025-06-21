# MineGuard

Welcome! To this amazing project for Mines.

## Getting Started

> **Prerequisites:**
> - [NodeJS](https://nodejs.org/en/) (v16 or higher)
> - [MongoDB](https://docs.mongodb.com/manual/installation/) (for local development)
> - Git

## Quick Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd MineGuard-1
   ```

2. **Run the setup script:**
   ```bash
   npm run setup
   ```
   This will:
   - Create a `.env` file from the template
   - Set up MongoDB data directory
   - Check if MongoDB is installed

3. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

4. **Configure environment variables:**
   Edit the `.env` file with your actual values:
   ```env
   # Civic Authentication
   VITE_CIVIC_APP_ID=your_civic_app_id_here
   VITE_CIVIC_AUTH_SERVER_URL=https://auth.civic.com

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/mineguard

   # Server Configuration
   PORT=5001

   # Gemini AI Configuration
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. **Start the development environment:**
   ```bash
   npm run dev:setup
   ```
   This will start:
   - Frontend (Vite) on http://localhost:5173
   - Backend (Express) on http://localhost:5001
   - MongoDB database

## Available Scripts

- `npm run setup` - Initial project setup
- `npm run dev` - Start all services (frontend, backend, MongoDB)
- `npm run dev:setup` - Setup MongoDB data directory and start all services
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:backend` - Start only the backend
- `npm run dev:mongodb` - Start only MongoDB
- `npm run install:all` - Install dependencies for both frontend and backend
- `npm run build` - Build the project for production

## Environment Configuration

The project uses a single `.env` file in the root directory for all environment variables:

- **Civic Authentication**: Configure your Civic App ID and Auth Server URL
- **MongoDB**: Set your MongoDB connection string (local or Atlas)
- **Server**: Configure the backend port
- **Gemini AI**: Set your Gemini API key for AI features

## MongoDB Setup

### Local Development
The project is configured to use a local MongoDB instance by default. The data will be stored in `./data/db/`.

### MongoDB Atlas (Cloud)
To use MongoDB Atlas instead of local MongoDB:

1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Update the `MONGODB_URI` in your `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mineguard
   ```

## Project Structure

```
MineGuard-1/
├── src/                    # Frontend React application
├── server/                 # Backend Express server
├── public/                 # Static assets
├── data/                   # MongoDB data directory (created automatically)
├── .env                    # Environment variables (create from env.example)
├── env.example            # Environment template
├── setup.js               # Setup script
└── package.json           # Root package.json with scripts
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is installed and running
- Check your `MONGODB_URI` in the `.env` file
- For local development, make sure the `data/db` directory exists

### Port Conflicts
- Frontend runs on port 5173 (Vite default)
- Backend runs on port 5001 (configurable via `PORT` env var)
- MongoDB runs on port 27017 (default)

### Environment Variables
- Make sure all required environment variables are set in `.env`
- Copy `env.example` to `.env` if you haven't already
- Restart the development server after changing environment variables

## Deployment

To build the project for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

For more detailed setup instructions, check the individual setup files:
- `CIVIC_SETUP.md` - Civic authentication setup
- `MONGODB_SETUP.md` - MongoDB configuration details
- `GEMINI_SETUP.md` - Gemini AI integration setup
