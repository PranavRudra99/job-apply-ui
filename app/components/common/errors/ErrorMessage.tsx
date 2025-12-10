import './ErrorMessage.css';

interface ErrorMessageProps{
    text: string;
}

export const  ErrorMessage = (props: ErrorMessageProps) => {
    return <p className="error-message">{props.text}</p>
}