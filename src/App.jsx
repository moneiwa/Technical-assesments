import { useState, useEffect } from 'react';
import Auth from './components/Auth';
import './components/index.css';
import Shop from './components/Shop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';

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
      <Routes>
        <Route path="/auth" element={<Auth setAuthToken={setAuthToken} />} />
        
    
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/admin" element={authToken ? <Admin /> : <Auth setAuthToken={setAuthToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
