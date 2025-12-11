import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FormInput } from '~/components/common/inputs/FormInput';
import { FederatedAuth } from '../federated-auth/FederatedAuth';
import { validateLoginForm } from '~/utils/Utility';
import axios from 'axios';
import './LoginForm.css';


const formFormat: FormFormat = {
  credential: {
    label: 'Email or Phone Number',
    type: 'email | tel',
    required: true
  },
  password: {
    label: 'Password',
    type: 'password',
    required: true
  }
};

const formFieldOrder = ['credential', 'password'];



function LoginForm() {
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataType>({
    credential: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>({
    credential: '',
    password: ''
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(validateLoginForm({ formData, formFieldOrder, formFormat, errorMessage, setErrorMessage })){
      try {
        const response = await axios.post(apiUrl + '/login', formData);
        console.log("Login successful:", response.data);
        navigate('/register');
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialLogin = (provider: string) => {
    // ⚠️ In a real app, this is where you'd redirect to Google/Apple's OAuth flow
    console.log(`Signing in with ${provider}...`);
    alert(`Redirecting to ${provider} login...`);
  };

  return (
    <div className="login-container">
      <h1>Welcome Back!</h1>

      {/* --- Standard Username/Password Form --- */}
      <form onSubmit={handleLogin} className="login-form">
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
        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>
      <FederatedAuth
        handleFederatedAuth={handleSocialLogin}
        prefixText="Sign in with"
      />
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