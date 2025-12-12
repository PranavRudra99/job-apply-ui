import { ErrorMessage } from '../errors/ErrorMessage';
import './FormInput.css';
import type { UseFormRegister } from 'react-hook-form';

interface FormInputProps {
    name: string
    label: string
    type: string
    required: boolean
    minLength?: number
    maxLength?: number
    register: UseFormRegister<FormDataType>
    validate?: (val: string) => string
    pattern?: RegExp
    error?: string
    customValidationMessage?: string
}

export const FormInput = (props: FormInputProps) => {
    console.log(props)
    return (
        <div className="input-group">
            {props.error && <ErrorMessage text={props.error}/>}
            <label htmlFor={props.name}>{props.label}</label>
            <input
                type={props.type}
                id={props.name}
                {...props.register(props.name, {
                    required:{
                        value: props.required,
                        message: `${props.label} is required`
                    },
                    minLength: {
                        value: props.minLength || 0,
                        message: `${props.label} must be at least ${props.minLength} characters`
                    },
                    maxLength: {
                        value: props.maxLength || Infinity,
                        message: `${props.label} must be at most ${props.maxLength} characters`
                    },
                    pattern: {
                        value: props.pattern || /.*/,
                        message: props.customValidationMessage || `Invalid ${props.label}`
                    },
                    validate: {
                        value: props.validate || (()=>'')
                    }
                })}
            />
        </div>
    );
}