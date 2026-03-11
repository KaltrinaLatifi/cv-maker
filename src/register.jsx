import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      // 1) Register
      await axios.post('http://localhost:4000/api/register', {
        fullName,
        email,
        password,
      });

      // 2) Auto-login (best UX)
      try {
        const res = await axios.post('http://localhost:4000/api/login', {
          email,
          password,
        });

        // Save token + set user via context
        await loginWithToken(res.data.token);

        // Optional: store role if you use it later
        if (res.data.role) localStorage.setItem('role', res.data.role);
        localStorage.setItem('isAuthenticated', 'true');

        // 3) Redirect to home (or dashboard)
        navigate('/', { replace: true });
      } catch (autoLoginErr) {
        console.error('[auto-login] error', autoLoginErr?.response?.data || autoLoginErr.message);
        // If auto-login fails, gracefully send user to /login
        alert('Account created! Please log in.');
        navigate('/login', { replace: true });
      }
    } catch (regErr) {
      console.error('[register] error', regErr?.response?.data || regErr.message);
      alert(regErr?.response?.data?.error || 'Registration failed!');
    }
  };

  return (
    <div className="auth-container register-container">
      <div className="login-card">
        <h2 className="login-title">Register</h2>
        <p className="login-subtitle">Create a new account to get started</p>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name*"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="email"
            placeholder="Email address*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Confirm Password*"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="login-input"
          />
          <div className="forgot-password">
            <Link to="/login">Already have an account? Log in</Link>
          </div>
          <button type="submit" className="login-button">
            Register →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
