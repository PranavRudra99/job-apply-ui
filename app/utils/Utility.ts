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
    return validateRequiredFields(request) && validConfirmPassword(request);
}

export const validateLoginForm = (request: ValidationRequestType): boolean => {
    return validateRequiredFields(request);
}

const validateRequiredFields = (request: ValidationRequestType): boolean => {
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
    })
    request.setErrorMessage(newErrors);
    return count === 0;
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