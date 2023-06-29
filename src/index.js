import 'core-js';
import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'swiper/dist/css/swiper.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import './assets/css/home.css';
import './assets/css/main.css';
import './assets/css/style.css';
// import './assets/css/lineup.css';
// import './index.scss';
import './index.css';


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ScrollToTop from 'react-router-scroll-top';
import PageRoutes from './pages';
import EmailVerification from './pages/email-verification/EmailVerification';

const Index = (props) => (
    <BrowserRouter>
        <ScrollToTop>
            <Switch>
                <Route path="/emailvarification/:key" component={EmailVerification} />
                <Route path="/" component={PageRoutes} />
                <Redirect to='/' />
            </Switch>
        </ScrollToTop>
    </BrowserRouter>
);

const wrapper = document.getElementById("index");
wrapper ? ReactDOM.render(<Index />, wrapper) : false;