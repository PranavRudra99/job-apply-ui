import ApplyOnceLogo from '~/../assets/apply-once.png';
import "./navbar.css";

export const Logo = () => {
    return (
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold logo-container">
                <div>
                    <img className="h-16" src={ApplyOnceLogo} alt="Apply Once Logo" />
                </div>
                <div className="center">
                    <p className='apply-text'>Apply <span className='once-text'>Once</span></p>
                </div>
            </a>
          </div>
    );
}