import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FormInput } from '~/components/common/inputs/FormInput';
import { FederatedAuth } from '~/components/federated-auth/FederatedAuth';
import { validateSignUpForm } from '~/utils/Utility';
import axios from 'axios';
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
    required: false
  }
};

const formFieldOrder = ['firstName', 'lastName', 'userName', 'email', 'phoneNumber', 'password', 'confirmPassword'];

function SignUpForm() {
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
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
  }

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(validateSignUpForm({ formData, formFieldOrder, formFormat, errorMessage, setErrorMessage })){
      const response = await axios.post(apiUrl + '/register', formData).then(response=>{
        console.log("Registration successful:", response.data);
        navigate('/login');
      }).catch(error=>{
        console.error("Registration failed:", error);
      });
    }
  }

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