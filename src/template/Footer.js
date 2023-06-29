import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import theLogoLeagues from '../assets/img/the-logo-leagues.png';
import logoGoaly from '../assets/img/goaltserverinfo.txt.png';

const Footer = React.memo(() => (
    <footer>
        <div className="top">
            <img src={theLogoLeagues} className="img-responsive" alt=""/> 
        </div>
        <div className="bottom">
            <div className="text-center">
                <img src={logoGoaly} height="50px" alt=""/>
            </div>
            <div className="text-footer">
                <Link to="/service">Term of Conditions</Link>
                <Link to="/privacy">Privacy Policy</Link>
                {/* <a href="#cookie-policy">Cookie Policy</a>  */}
                {/* <a href="#work-with-us">Work with Us</a> 
                <a href="#contact-us">Contact Us</a> */}
            </div>
            <CopyRight />
        </div>
    </footer>
));

export default Footer;

const CopyRight = React.memo(() => (
    <div className="copyright">@<Moment format="YYYY">{new Date().toDateString()}</Moment><span class="notranslate">.Goaly.Linkit360. All Right Reserved</span></div>
));