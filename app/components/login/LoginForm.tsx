import { useNavigate } from 'react-router';
import { FormInput } from '~/components/common/inputs/FormInput';
import { FederatedAuth } from '../federated-auth/FederatedAuth';
import axios from 'axios';
import './LoginForm.css';
import { useForm, type SubmitHandler } from 'react-hook-form';

const formFieldOrder = ['email', 'password'];

function LoginForm() {
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm<FormDataType>();

  const formFormat: FormFormat = {
    email: {
      label: 'Email',
      type: 'text',
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      required: true
    },
    password: {
      label: 'Password',
      type: 'password',
      required: true
    }
  };

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    if(true){
      const response = axios.post(apiUrl + '/login', data).then(response=>{
        console.log("Login successful:", response.data);
        navigate('/home');
      }).catch(error=>{
        console.error("Login failed:", error);
      });
    }
  }

  const handleSocialLogin = (provider: string) => {
    // ⚠️ In a real app, this is where you'd redirect to Google/Apple's OAuth flow
    console.log(`Signing in with ${provider}...`);
    alert(`Redirecting to ${provider} login...`);
  };

  return (
    <div className="login-container">
      <h1>Welcome Back!</h1>

      {/* --- Standard Username/Password Form --- */}
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        {
          formFieldOrder.map(field=>{
            return (<FormInput
              key={field}
              name={field}
              label={formFormat[field].label}
              type={formFormat[field].type}
              required={formFormat[field].required}
              validate={formFormat[field].validate}
              minLength={formFormat[field].minLength}
              maxLength={formFormat[field].maxLength}
              register={register}
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