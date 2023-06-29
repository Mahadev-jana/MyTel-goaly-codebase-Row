import React from 'react';
import { Link } from 'react-router-dom';
import {getYear} from '../../helper';
import theLogoLeagues from '../../assets/img/the-logo-leagues.png';
import logoGoaly from '../../assets/img/goaltserverinfo.txt.png';

import './footer.scss';

const Footer = () => (
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
                <a href="#cookie-policy">Cookie Policy</a> 
                <a href="#work-with-us">Work with Us</a> 
                <a href="#contact-us">Contact Us</a>
            </div>
            <div className="copyright">@{getYear()}. Sport. All Right Reserved.</div>
        </div>
    </footer>
);

export default Footer;