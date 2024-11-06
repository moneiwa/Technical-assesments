
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Shop from './components/Shop';
import Auth from './components/Auth';
import Navbar from './components/Navbar'; 
import './components/index.css';

function ProtectedRoute({ children, authToken }) {
  if (!authToken) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [authToken]);

  return (
    <Router>
      <Navbar authToken={authToken} setAuthToken={setAuthToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        
    
        <Route 
          path="/shop" 
          element={authToken ? <Navigate to="/cart" replace /> : <Shop authToken={authToken} />} 
        />
        
  
        <Route 
          path="/cart" 
          element={
            authToken ? (
              <Shop authToken={authToken} />
            ) : (
              <Navigate to="/auth" replace />
            )
          } 
        />
        
        <Route path="/auth" element={<Auth setAuthToken={setAuthToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
