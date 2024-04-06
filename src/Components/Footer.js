import '../css/Footer.css';
import { ReactComponent as FacebookImg } from '../img/facebook.svg';
import { ReactComponent as InstagramImg } from '../img/instagram.svg';
import { ReactComponent as TwitterImg } from '../img/twitter.svg';
import { ReactComponent as YoutubeImg } from '../img/youtube.svg';

function Footer() {
    return (
        <div className="footer">
            <div className="footer-codeit-logo">
                ©codeit - 2023
            </div>
            <div className="footer-privacy-faq">
                <a href="/privacy">
                    Privacy Policy
                </a>
                <a href="/faq">
                    FAQ
                </a>
            </div>
            <div className="footer-other-link">
                <a href="https://www.facebook.com">
                    <span className="facebook">
                        <FacebookImg />
                    </span>
                </a>
                <a href="https://www.twitter.com">
                    <span className="twitter">
                        <TwitterImg />
                    </span>
                </a>
                <a href="https://www.youtube.com">
                    <span className="youtube">
                        <YoutubeImg />
                    </span>
                </a>
                <a href="https://www.instagram.com">
                    <span className="instagram">
                        <InstagramImg />
                    </span>
                </a>
            </div>
        </div>
    )
}

export default Footer;