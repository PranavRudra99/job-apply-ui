import { useNavigate } from 'react-router';
import { FormInput } from '~/components/common/inputs/FormInput';
import { FederatedAuth } from '~/components/federated-auth/FederatedAuth';
import axios from 'axios';
import './SignUpForm.css';
import { useForm, type SubmitHandler } from 'react-hook-form';

const formFieldOrder = ['firstName', 'lastName', 'email', 'phoneNumber', 'password', 'confirmPassword'];

function SignUpForm() {
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataType>();

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
    email: {
      label: 'Email',
      type: 'text',
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      required: true
    },
    phoneNumber: {
      label: 'Phone Number',
      type: 'tel',
      required: false,
      pattern: /(?:\d{1}-?\s?)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/
    },
    password: {
      label: 'Password',
      type: 'password',
      pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/,
      minLength: 10,
      customValidationMessage: 'Password must contain atleast an uppercase letter, lowercase letter, number, and a special character',
      required: true
    },
    confirmPassword: {
      label: 'Confirm Password',
      type: 'password',
      required: true,
      validate: (val: string) => {
        return val === watch('password') ? '' : 'Passwords do not match.';
      }
    }
  };

  const handleSocialSignUp = (provider: string) => {
    // ⚠️ In a real app, this is where you'd redirect to Google/Apple's OAuth flow
    console.log(`Signing in with ${provider}...`);
    alert(`Redirecting to ${provider} login...`);
  }

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    if(true){//replace with validation logic if needed
      const response = axios.post(apiUrl + '/register', data).then(response=>{
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
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
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
              pattern={formFormat[field].pattern}
              maxLength={formFormat[field].maxLength}
              customValidationMessage={formFormat[field].customValidationMessage}
              error={errors[field]?.message}
              register={register}
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