import './FedaratedAuth.css';
import GoogleLogo from '~/../assets/google.svg';
import AppleLogo from '~/../assets/apple.svg';

interface FederatedAuthProps {
    handleFederatedAuth: (provider: string) => void;
    prefixText: string;
}

export const FederatedAuth = (props: FederatedAuthProps) => {
    return (
        <div>
            <div className="separator">
                <p>OR</p>
            </div>
            <div className="social-container">
                <button 
                className="google-button"
                onClick={() => props.handleFederatedAuth('Google')}
                >
                <div className="center">
                    <img className="logo-img" src={GoogleLogo} alt="Google Icon" />
                    <p>{props.prefixText} Google</p>
                </div>
                </button>
                <button 
                className="apple-button" 
                onClick={() => props.handleFederatedAuth('Apple')}
                >
                <div className="center">
                    <img className="logo-img" src={AppleLogo} alt="Apple Icon" />
                    <p>{props.prefixText} Apple</p>
                </div>
                </button>
            </div>
        </div>
    )
}