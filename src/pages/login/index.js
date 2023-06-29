import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { post } from '../../api';
import Swal from 'sweetalert2';
import { isValidEmail } from '../../_helper/formValidation';
import { setUserDetails } from '../../_helper/authentication';
import SubmitLoader from '../../loader/submit-loader/SubmitLoader';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: {},
			loader: false
		}
	}
	handleOnChange = prop => event => {
		this.setState({[prop]: event.target.value});
	}
	handleOnSubmit = event => {
		event.preventDefault();
		const { email, password } = this.state;
		const error = {};
		if (email.trim() === '') {
			error.email = 'Email is required.';
		} else if (!isValidEmail(email)) {
			error.email = 'Email is invalid.';
		}
		if (password.trim() === '') {
			error.password = 'Password is required.';
		}
		if (Object.keys(error).length === 0) {
			// Set loader
			const _self = this;
			this.setState({loader: true});
			const payload = new FormData();
			payload.append('email', email);
			payload.append('password', password);
			post('login', payload)
			.then( res => {
				if (res.data.success == 1) {
					localStorage.setItem('JWT', res.data.data.JWT);
					setUserDetails(res.data.data.user_details);
					_self.setState({loader: false});
					const state = _self.props.location.state;
					if (state && state.hasOwnProperty('path')) {
						_self.props.history.replace(state.path);
					} else {
						_self.props.history.replace('/');
					}
				} 
				if (res.data.success == 0) {
					_self.setState({loader: false});
					Swal.fire({
						type: 'error',
						title: res.data.message
					});
				}
				// _self.setState({loader: false});
			})
			.catch( err => console.log(err));
		}
		this.setState({error});
	}
    render() {
		const { error, loader } = this.state;
        return(
			<Fragment>
            <div className="page-content mt-10" style={{overflow: 'hidden'}}>
	
		  	<div className="clearfix"></div>
  			<div className="part">
		  		<div className="series-title login-title">Login</div> 
				<form onSubmit={this.handleOnSubmit}>
					<div className="col-xs-12 mt-10">
						<div className="pt-form">
							<div className="pt-input">
								<label htmlFor="pt-user">Email Address</label>
								<input 
									type="text" 
									placeholder="Email Address" 
									onChange={this.handleOnChange('email')}
									className={classnames({"input-error":error.hasOwnProperty('email')})}
								/>
								{error.hasOwnProperty('email') && <p>{error.email}</p>} 
							</div>
							<div className="pt-input">
								<label htmlFor="pt-user">Password</label>
								<input 
									type="password" 
									placeholder="Password" 
									onChange={this.handleOnChange('password')}
									className={classnames({"input-error":error.hasOwnProperty('password')})}
								/>
								{error.hasOwnProperty('password') && <p>{error.password}</p>}
							</div>
						</div>
					</div>
					<div className="col-xs-6">
						{/* <a href="" className="forgot">Forgot login details?</a> */}
					</div>
					<div className="col-xs-6 text-right">
						<button 
							type="submit" 
							className="btn-sign"
							disabled={loader}
						>Sign in</button>
					</div>
				</form>
				<div className="row">
					<div className="col-xs-12">
						<div className="or-log">
							<span>or login with</span>
						</div>
					</div>
				</div>
				<div className="row" style={{margin: '0px 10px'}}>
					<div 
						className="col-xs-12 mt-10" 
						style={{
							textAlign: 'center', 
							background: '#4c68bb', 
							color: '#fff', 
							lineHeight: '45px',
							fontFamily: `Font Awesome 5 Brands`
						}}>
						<a style={{color: '#fff'}}>
							<i className="fa fa-facebook"></i>&nbsp;&nbsp;Facebook
						</a>
					</div>
				</div>
				<div className="clearfix"></div>
				<div className="row" style={{margin: '0px 10px'}}>
					<div 
						className="col-xs-12 mt-10" 
						style={{
							textAlign: 'center', 
							background: '#00abf0', 
							color: '#fff', 
							lineHeight: '45px',
							fontFamily: `Font Awesome 5 Brands`
						}}>
						<a style={{color: '#fff'}}>
							<i className="fa fa-twitter"></i>&nbsp;&nbsp;Twitter
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
				</div>
				<div className="clearfix"></div>
		  	</div>
	  </div>
	  { loader && <SubmitLoader title="Login..." /> }
	  </Fragment>
        );
    }
};

export default withRouter(Login);