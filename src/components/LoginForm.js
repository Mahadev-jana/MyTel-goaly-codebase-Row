import React, { Fragment, useState } from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import Loader from '../simmer-loader/SubmitLoader';

import axios from '../_config/axios';

const initUser = { email: '', password: '' };

const LoginForm = ({ location, history }) => {
    const [{ email, password }, setUser] = useState(initUser);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState({});

    const onChange = name => event => {
        const { value } = event.target;
        setUser(prevUser => Object.assign({}, prevUser, { [name]: value }));
    }

    const onSubmit = event => {
        event.preventDefault();
        const error = {};
        if (email === '') {
            error.email = 'Email is required.';
        } else if (!isEmail(email)) {
            error.email = 'Email is invalid.';
        }
        if (password.trim() === '') {
            error.password = 'Password is required.';
        }
        if (Object.keys(error).length === 0) {
            setLoading(true);
            const payload = new FormData();
            payload.append('email', email);
            payload.append('password', password);
            axios.post('api/login', payload).then(res => {
                setLoading(false);
                if (res.data && res.data.success && res.data.success == 1) {
                    if (res.data.data && res.data.data.JWT && res.data.data.user_details) {
                        localStorage.setItem('JWT', res.data.data.JWT);
                        localStorage.setItem('userDetails', JSON.stringify(res.data.data.user_details));
                        localStorage.setItem('JWTforPopup', res.data.data.JWT);
                        localStorage.setItem('userDetailsforPopup', JSON.stringify(res.data.data.user_details));
                        const state = location.state;
                        if (state && state.hasOwnProperty('path')) {
                            history.replace(state.path);
                        } else {
                            history.replace('/');
                        }
                    }
                } else {
                    Swal.fire({
                        type: 'error',
                        title: res.data.message
                    });
                }
            }).catch(err => {
                setLoading(false);
            });
        }
        setError(error);
    }

    return (
        <Fragment>
            {isLoading && <Loader title="Login" />}
            <form onSubmit={onSubmit}>
                <div className="col-xs-12 mt-10">
                    <div className="pt-form">
                        <div className="pt-input">
                            <label htmlFor="pt-user">Email Address</label>
                            <input
                                type="text"
                                placeholder="Email Address"
                                onChange={onChange('email')}
                                className={classnames({ "input-error": error.hasOwnProperty('email') })}
                            />
                            {error.hasOwnProperty('email') && <p>{error.email}</p>}
                        </div>
                        <div className="pt-input">
                            <label htmlFor="pt-user">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={onChange('password')}
                                className={classnames({ "input-error": error.hasOwnProperty('password') })}
                            />
                            {error.hasOwnProperty('password') && <p>{error.password}</p>}
                        </div>
                    </div>
                </div>
                <div className="col-xs-6">
                    <Link to='/register' className="forgot">New User?</Link>
                </div>
                <div className="col-xs-6 text-right">
                    <button
                        type="submit"
                        className="btn-sign"
                        disabled={isLoading}
                    >Sign in</button>
                </div>
            </form>
        </Fragment >
    )
};

export default withRouter(LoginForm);