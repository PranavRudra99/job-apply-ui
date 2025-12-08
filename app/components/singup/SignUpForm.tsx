import React, { useState } from 'react';
import { redirect } from 'react-router';
import GoogleLogo from '../../../assets/google.svg';
import AppleLogo from '../../../assets/apple.svg';
import './SignUpForm.css'; // We will assume a similar CSS file structure

function SignUpForm() {

  // 1. State for all input fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  // 2. Generic handler to update state based on input 'name' attribute
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialSignUp = (provider) => {
    // ⚠️ In a real app, this is where you'd redirect to Google/Apple's OAuth flow
    console.log(`Signing in with ${provider}...`);
    alert(`Redirecting to ${provider} login...`);
  };

  // 3. Form Submission Handler
  const handleSignUp = (event) => {
    event.preventDefault();

    // Basic Validation Check
    if (formData.password !== formData.confirmPassword) {
      alert("Error: Passwords do not match!");
      return;
    }

    // ⚠️ Real Registration Logic (e.g., API POST request)
    console.log('Attempting registration with:', formData);
    alert(`Registration successful for user: ${formData.username}`);

    // On successful signup, you might redirect to a welcome page or the login page
    // redirect('/welcome'); 
  };

  // 4. Navigation to Login Page Handler
  const handleLoginClick = (event) => {
    event.preventDefault();
    redirect('/login'); // Assuming '/login' is the route for your login page
  };

  return (
    <div className="signup-container">
      <h1>Create Your Account</h1>

      <form onSubmit={handleSignUp} className="signup-form">
        
        {/* Row 1: First Name & Last Name */}
        <div className="input-group">
        <label htmlFor="firstName">First Name</label>
        <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
        />
        </div>
        <div className="input-group">
        <label htmlFor="lastName">Last Name</label>
        <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
        />
        </div>

        {/* Row 2: Username & Email */}
        <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
        />
        </div>
        <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
        />
        </div>

        {/* Row 3: Phone Number */}
        <div className="input-group full-width">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
        />
        </div>
        <div className="input-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
        />
        </div>

        {/* Sign Up Button */}
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>

      {/* --- Separator and Alternative Options --- */}
      <div className="separator">
        <p>OR</p>
      </div>

      {/* --- Social Login Buttons --- */}
      <div className="social-signup">
        <button 
          className="google-button" 
          onClick={() => handleSocialSignUp('Google')}
        >
          <div className="center">
            <img className="logo-img" src={GoogleLogo} alt="Google Icon" />
            <p>Sign up with Google</p>
          </div>
        </button>
        <button 
          className="apple-button" 
          onClick={() => handleSocialSignUp('Apple')}
        >
          <div className="center">
            <img className="logo-img" src={AppleLogo} alt="Apple Icon" />
            <p>Sign up with Apple</p>
          </div>
          </button>
      </div>

      {/* --- Signup Link/Button --- */}
      <div className="login-option">
        <p>
          Already have an account? 
          <a href="/login"> Log In</a>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;