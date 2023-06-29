import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { isAuthenticate } from '../../_helper/authentication';
import MyRewards from './my-rewards';

class MyRewardComonent extends Component {
    render() {
        return(
            <div className="columns">
                <div className="column col-12 col-xs-12 pd-0">
                    <div className="columns">
                        <div className="col-xs-12 pd-0">
                            {isAuthenticate()?
                                <MyRewards />
                            :
                            <div style={{
                                padding: '20px',
                                textAlign: 'center',
                                letterSpacing: '0.2px'
                            }}>
                                <p>Login First! to show your reward.</p>
                                <p><Link to={'/login'}>Login</Link></p>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default MyRewardComonent;