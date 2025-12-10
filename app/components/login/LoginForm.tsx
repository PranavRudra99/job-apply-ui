import React, { useState } from 'react';
import './LoginForm.css';
import { FormInput } from '~/components/common/inputs/FormInput';
import { FederatedAuth } from '../federated-auth/FederatedAuth';


const formFormat: FormFormat = {
  userName: {
    label: 'User Name',
    type: 'text',
    required: true
  },
  password: {
    label: 'Password',
    type: 'password',
    required: true
  }
};

const formFieldOrder = ['userName', 'password'];



function LoginForm() {  
  
  const [formData, setFormData] = useState<FormDataType>({
    userName: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>({
    userName: '',
    password: ''
  });

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
              required={formFormat[field].required}
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