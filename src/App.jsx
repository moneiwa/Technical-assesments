import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Shop from './components/Shop';
import Admin from './components/Admin';
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
        <Route path="/shop" element={<Shop />} />

       
        <Route path="/auth" element={<Auth setAuthToken={setAuthToken} />} />

      
        <Route
          path="/admin"
          element={
            <ProtectedRoute authToken={authToken}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
