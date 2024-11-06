import React, { useState } from 'react';
import './index.css'; 
import { useNavigate } from 'react-router-dom'; 

function Auth({ setAuthToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true); 
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const url = isSignUp ? 'http://localhost:8080/signup' : 'http://localhost:8080/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

   
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          setAuthToken(data.token); 
          localStorage.setItem('authToken', data.token); 

         
          navigate('/'); 
        }
      } else {
        const data = await response.json();
        setError(data.error || 'An unknown error occurred');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-left">
          <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
        <div className="auth-right">
          <img src="/login.jpg" alt="Auth Illustration" />
        </div>
      </div>
    </div>
  );
}

export default Auth;
