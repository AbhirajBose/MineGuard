import { CivicAuthProvider } from '@civic/auth/react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { DashboardAdmins } from './screens/DashboardAdmins';
import { LandingPage } from './screens/LandingPage/LandingPage';
import { LoginPage } from './screens/LoginPage';
import { BatchDetailsPage } from './screens/BatchDetailsPage';
import { DatabaseInitializer } from './Module/databaseInit';

// The User type is not directly exported by Civic, so we define it based on expected properties
type User = {
  name?: string;
  email?: string;
  id?: string;
  avatar?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
};

const AppContent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await DatabaseInitializer.initializeDatabase();
        setDbInitialized(true);
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setDbInitialized(true);
      }
    };

    initializeDatabase();
    
    // Check for a stored user session
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    sessionStorage.setItem('user', JSON.stringify(loggedInUser)); // Persist user
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user'); // Clear user
    navigate('/login');
  };
  
  const handleNavigateToDashboard = () => {
    navigate('/login');
  };
  
  const handleNavigateToLanding = () => {
    navigate('/');
  };

  if (!dbInitialized) {
    return (
      <div className="w-full h-screen bg-[#1e1e1e] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <p className="ml-4 text-lg">Initializing Database...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage onNavigateToDashboard={handleNavigateToDashboard} />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/batch/:batchId" element={<BatchDetailsPage />} />
      <Route
        path="/dashboard"
        element={
          user ? (
            <DashboardAdmins user={user} onLogout={handleLogout} onNavigateToLanding={handleNavigateToLanding} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      {/* Add a catch-all or a 404 page if desired */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export const App = (): JSX.Element => {
  const civicAppId = import.meta.env.VITE_CIVIC_APP_ID || "67d7e55d-719e-42b5-859a-ab4dfae9de62";

  return (
    <CivicAuthProvider clientId={civicAppId}>
      <Router>
        <div className="w-full h-full bg-[#1e1e1e]">
          <AppContent />
        </div>
      </Router>
    </CivicAuthProvider>
  );
};