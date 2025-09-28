import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AdminLayout } from './components/layout/AdminLayout';
import { LoginPage } from './components/auth/LoginPage';
import { useAuth } from './contexts/AuthContext';
import './globals.css';

function AppContent() {
  const { user } = useAuth();
  
  if (!user) {
    return <LoginPage />;
  }

  return <AdminLayout />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;