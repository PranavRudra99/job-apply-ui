interface ValidationRequestType{
    formData: FormDataType 
    formFieldOrder: string[] 
    formFormat: FormFormat 
    errorMessage: ErrorMessageType 
    setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageType>>
}

export const isNotEmpty = (text: string) => {
    return text !== null && text.trim().length > 0;
}

export const validateSignUpForm = (request: ValidationRequestType): boolean => {
    return validateFields(request) 
      && validConfirmPassword(request);
}

export const validateLoginForm = (request: ValidationRequestType): boolean => {
    return validateFields(request);
}

const validateFields = (request: ValidationRequestType): boolean => {
    let count: number = 0;
    const newErrors: ErrorMessageType = { ...request.errorMessage };
    request.formFieldOrder.forEach(field=>{
      if(request.formFormat[field].required && !isNotEmpty(request.formData[field])){
        newErrors[field] = `${request.formFormat[field].label} is required.`;
        count++;
      }
      else{
        newErrors[field] = '';
      }
      if(request.formFormat[field].validation && request.formFormat[field].validation === 'email' && isNotEmpty(request.formData[field])){
        if(!validEmail(request.formData[field])){
          newErrors[field] = `Please enter a valid email address.`;
          count++;
        } else {
          newErrors[field] = '';
        }
      }
      if(request.formFormat[field].validation && request.formFormat[field].validation === 'tel' && isNotEmpty(request.formData[field])){
        if(!validPhoneNumber(request.formData[field])){
          newErrors[field] = `Please enter a valid phone number.`;
          count++;
        } else {
          newErrors[field] = '';
        }
      }
      if(request.formFormat[field].validation && request.formFormat[field].validation === 'email | tel' && isNotEmpty(request.formData[field])){
        if(!validPhoneNumber(request.formData[field]) && !validEmail(request.formData[field])){
          newErrors[field] = `Please enter a valid email address or phone number.`;
        } else {
          newErrors[field] = '';
        }
      }
      if(request.formFormat[field].validation && request.formFormat[field].validation === 'password' && isNotEmpty(request.formData[field])){
        if(!validPassword(request.formData[field])){
          newErrors[field] = `Password must be at least 10 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.`;
          count++;
        } else {
          newErrors[field] = '';
        }
      }
    })
    request.setErrorMessage(newErrors);
    return count === 0;
}

const validPassword = (input: string): boolean => {
    const passwordRegex: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/;
    console.log(passwordRegex.test(input));
    return passwordRegex.test(input);
}

const validEmail = (input: string): boolean => {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(input);
}

const validPhoneNumber = (input: string): boolean => {
    const phoneRegex: RegExp = /(?:\d{1}-?\s?)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/;
    return phoneRegex.test(input);
}

const validConfirmPassword = (request: ValidationRequestType): boolean => {
    let count: number = 0;
    const newErrors: ErrorMessageType = { ...request.errorMessage };
    if (request.formData.password !== request.formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      count++;
    } else {
      newErrors.confirmPassword = '';
    }
    request.setErrorMessage(newErrors);
    return count === 0;
}