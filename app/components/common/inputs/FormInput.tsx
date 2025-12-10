import * as Utility from '~/utils/Utility';
import { ErrorMessage } from '../errors/ErrorMessage';
import './FormInput.css';

interface FormInputProps {
    name: string
    label: string
    error: string
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormInput = (props: FormInputProps) => {
    return (
        <div className="input-group">
            {Utility.isNotEmpty(props.error) && <ErrorMessage text={props.error}/>}
            <label htmlFor={props.name}>{props.label}</label>
            <input
                type={props.type}
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}