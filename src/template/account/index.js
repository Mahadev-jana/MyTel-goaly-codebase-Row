import React from 'react';
import imgDefaultAccount from '../../assets/img/acc-default.png';
import { isAuthenticate, getUserDetails } from '../../_helper/authentication';
import { Link, NavLink } from 'react-router-dom';

const Account = (props) => (
    <div className="account">
        <div className="list-block media-list">
            <ul>
                <li>
                    <div className="item-link item-content d-flx">
                        <div className="item-media" >
                                {isAuthenticate() ? <img src={getUserDetails().image} style={{
                                    height: '40px',
                                    width: '52px',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    borderRadius: '50%'
                                }} /> : <img src={imgDefaultAccount} width="80"
                                    style={{
                                        height: '40px',
                                        width: '52px',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        borderRadius: '50%'
                                    }} />}
                        </div>
                        <div className="item-inner">
                            <div className="item-title text-white">{isAuthenticate() ? getUserDetails().first_name + ' ' + getUserDetails().last_name : 'Demo Goaly'}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
);

export default Account;