import React, { useState } from 'react';
import GoogleLogo from '../../../assets/google.svg';
import AppleLogo from '../../../assets/apple.svg';
import './LoginForm.css'; // Assuming you have a CSS file for basic styling

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // ⚠️ In a real app, this is where you'd send data to your backend API
    console.log('Attempting login with:', username, password);
    alert(`Login attempted for user: ${username}`);
  };

  const handleSocialLogin = (provider) => {
    // ⚠️ In a real app, this is where you'd redirect to Google/Apple's OAuth flow
    console.log(`Signing in with ${provider}...`);
    alert(`Redirecting to ${provider} login...`);
  };

  return (
    <div className="login-container">
      <h1>Welcome Back!</h1>

      {/* --- Standard Username/Password Form --- */}
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <label htmlFor="username">Username/Email</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>

      {/* --- Separator and Alternative Options --- */}
      <div className="separator">
        <p>OR</p>
      </div>

      {/* --- Social Login Buttons --- */}
      <div className="social-login">
        <button 
          className="google-button" 
          onClick={() => handleSocialLogin('Google')}
        >
          <div className="center">
            <img className="logo-img" src={GoogleLogo} alt="Google Icon" />
            <p>Sign in with Google</p>
          </div>
        </button>
        <button 
          className="apple-button" 
          onClick={() => handleSocialLogin('Apple')}
        >
          <div className="center">
            <img className="logo-img" src={AppleLogo} alt="Apple Icon" />
            <p>Sign in with Apple</p>
          </div>
        </button>
      </div>

      {/* --- Signup Link/Button --- */}
      <div className="signup-option">
        <p>
          Don't have an account? 
          <a href="/signup"> Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;