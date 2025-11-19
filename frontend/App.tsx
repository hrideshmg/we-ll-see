
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './app/providers';
import RootLayout from './app/layout';
import Page from './app/page';
import LeaderboardPage from './app/leaderboard/page';
import ProfilePage from './app/profile/page';
import LoginPage from './app/login/page';
import RegisterPage from './app/register/page';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return <div className="min-h-screen bg-brand-dark flex items-center justify-center text-white">Loading...</div>;
  
  // Render nothing while waiting for the useEffect to redirect
  if (!isAuthenticated) return null;

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route path="/" element={
        <PrivateRoute>
          <RootLayout><Page /></RootLayout>
        </PrivateRoute>
      } />
      
      <Route path="/leaderboard" element={
        <PrivateRoute>
          <RootLayout><LeaderboardPage /></RootLayout>
        </PrivateRoute>
      } />
      
      <Route path="/profile" element={
        <PrivateRoute>
          <RootLayout><ProfilePage /></RootLayout>
        </PrivateRoute>
      } />
      
      <Route path="/u/:username" element={
        <PrivateRoute>
          <RootLayout><ProfilePage /></RootLayout>
        </PrivateRoute>
      } />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </HashRouter>
  );
};

export default App;
