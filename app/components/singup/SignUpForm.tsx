import React, { useState } from 'react';
import { redirect } from 'react-router';
import axios from 'axios';
import { FormInput } from '~/components/common/inputs/FormInput';
import { FederatedAuth } from '~/components/federated-auth/FederatedAuth';
import './SignUpForm.css';

const formFormat: FormFormat = {
  firstName: {
    label: 'First Name',
    type: 'text',
    required: true
  },
  lastName: {
    label: 'Last Name',
    type: 'text',
    required: true
  },
  userName: {
    label: 'User Name',
    type: 'text',
    required: true
  },
  email: {
    label: 'Email',
    type: 'email',
    required: true
  },
  phoneNumber: {
    label: 'Phone Number',
    type: 'tel',
    required: true
  },
  password: {
    label: 'Password',
    type: 'password',
    required: true
  },
  confirmPassword: {
    label: 'Confirm Password',
    type: 'password',
    required: true
  }
};

const formFieldOrder = ['firstName', 'lastName', 'userName', 'email', 'phoneNumber', 'password', 'confirmPassword'];

function SignUpForm() {

  // 1. State for all input fields
  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialSignUp = (provider: string) => {
    // ⚠️ In a real app, this is where you'd redirect to Google/Apple's OAuth flow
    console.log(`Signing in with ${provider}...`);
    alert(`Redirecting to ${provider} login...`);
  };

  // 3. Form Submission Handler
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic Validation Check
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage({
        ...errorMessage,
        confirmPassword: 'Passwords do not match.'
      })
    }
    try{
      const response = axios.post('http://localhost:8081/register', formData).then(response=>{
        console.log("Registration successful:", response.data);
      })
    } catch (error) {
      console.error("Registration failed:", error);
    }
    redirect('/login');
  };

  return (
    <div className="signup-container">
      <h1>Create Your Account</h1>
      <form onSubmit={handleSignUp} className="signup-form">
        {
          formFieldOrder.map(field=>{
            return (<FormInput
              key={field}
              name={field}
              label={formFormat[field].label}
              type={formFormat[field].type}
              value={formData[field]}
              onChange={handleChange}
              error={errorMessage[field]}
              required={formFormat[field].required}
            />)
          })
        }
        {/* Sign Up Button */}
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <FederatedAuth
        handleFederatedAuth={handleSocialSignUp}
        prefixText="Sign in with"
      />

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