import React from 'react';
import { Helmet } from "react-helmet";
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import icon from '../assets/img/logo-goaly.png';

const Login = () => (
    <React.Fragment>
        {/* <Helmet>
            <title>Goaly | Login</title>
            <link rel="icon" type="image/png" href={icon} sizes="20x20" />
        </Helmet> */}
    
    <Row>
        
     
        <Col xs={12} className="part" style={{margin:5}}>
            <div className="series-title login-title">Login</div>
            <LoginForm />
            {/* <Row>
                <Col xs={12}>
                    <div className="or-log">
                        <span>or login with</span>
                    </div>
                </Col>
            </Row>
            <div className="row" style={{ margin: '0px 10px' }}>
                <div
                    className="col-xs-12 mt-10"
                    style={{
                        textAlign: 'center',
                        background: '#4c68bb',
                        color: '#fff',
                        lineHeight: '45px',
                        fontFamily: `Font Awesome 5 Brands`
                    }}>
                    <a style={{ color: '#fff' }}>
                        <i className="fa fa-facebook"></i>&nbsp;&nbsp;aaaFacebook
						</a>
                </div>
            </div>
            <div className="clearfix"></div>
            <div className="row" style={{ margin: '0px 10px' }}>
                <div
                    className="col-xs-12 mt-10"
                    style={{
                        textAlign: 'center',
                        background: '#00abf0',
                        color: '#fff',
                        lineHeight: '45px',
                        fontFamily: `Font Awesome 5 Brands`
                    }}>
                    <a style={{ color: '#fff' }}>
                        <i className="fa fa-twitter"></i>&nbsp;&nbsp;bbbTwitter
						</a>
                </div>
            </div>
            <div className="col-xs-12">
                <div className="bg-grey">
                    <p className="text-center">Don't have a Goaly account?</p>
                    <Link to='/register'>
                        <button type="button" className="btn-reg">&nbsp; Register Now</button>
                    </Link>
                </div>
            </div> */}
            <div className="clearfix"></div>
        </Col>
    </Row>
    </React.Fragment>
);

export default Login;