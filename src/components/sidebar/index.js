import React, { Component } from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { isAuthenticate } from '../../_helper/authentication';
import './sidebar.scss';
import Account from '../account';
import Subscribe from '../../components/subscibe';

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		}
	}
	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
		// document.addEventListener('mousewheel', Go);
		// document.addEventListener('DOMMouseScroll', Go);
		document.onmousewheel = false;
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
		// document.removeEventListener('mousewheel', Go);
		// document.removeEventListener('DOMMouseScroll', Go);
	}

	setWrapperRef = (node) => {
		this.wrapperRef = node;
	}

	handleClickOutside = (event) => {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.props.closeSideBar();
		}
	}
	subscribe = () => {
		this.props.closeSideBar();
		this.setState({show:true});
	}
	handleClose = () => {
		this.setState({show: false});
	}
	render() {
		const language = { "en": "English", "id": "Indonesia", "ms": "Malaysia", "nl": "Deutch" };
		const { show } = this.state;
	return(
	<>
	<Subscribe show={show} handleClose={this.handleClose}/>
	<nav ref={this.setWrapperRef} className={classNames("sideNav", "bgImg2",{open: this.props.open})}>
		<div className="page-content notop bg-main" /*style={{backgroundColor:'purple'}}*/>
			<Account />
			<div className="list-block mt-15">
				<div className="list-group">
					<nav>
						<div className="list-block">
							<ul>
								<li className="divider" style={{marginBottom: '6px'}}>Menu</li>
								<li>
									{isAuthenticate()?
										<NavLink exact to='/' className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={()=>this.props.closeSideBar()}>
											<div className="item-media"><i className="fa fa-home"></i></div>
											<div className="item-inner">
												<div className="item-title">Home</div>
											</div>
										</NavLink>
									:
										<NavLink to='/login' className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={()=>this.props.closeSideBar()}>
											<div className="item-media"><i className="fa fa-sign-in"></i></div>
											<div className="item-inner">
												<div className="item-title">Login</div>
											</div>
										</NavLink>
									}
								</li>
								<li>
									<NavLink to="/contest" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={()=>this.props.closeSideBar()}>
										<div className="item-media"><i className="fa fa-bookmark"></i></div>
										<div className="item-inner">
											<div className="item-title">Contest</div>                                
										</div>
									</NavLink>                     
								</li>
								<li>
									<NavLink to="/reward" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={()=>this.props.closeSideBar()}>
										<div className="item-media"><i className="fa fa-trophy"></i></div>
										<div className="item-inner">
											<div className="item-title">Rewards</div>
										</div>
									</NavLink>
								</li>
								<li>
									<NavLink to="/leaderboard" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={()=>this.props.closeSideBar()}>
										<div className="item-media"><i className="fa fa-trophy"></i></div>
										<div className="item-inner">
											<div className="item-title">Leaderboard</div>
										</div>
									</NavLink>
								</li>
								<li> 
									<NavLink to="/language" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={()=>this.props.closeSideBar()}>
										<div className="item-media">
											<i className="fa fa-globe"></i>
										</div>
										<div className="item-inner">
											<div className="item-title">Language</div>
											<div className="item-after">{language[selectedLanguage()]}</div>
										</div>
									</NavLink>
								</li>
								<li>
									{isAuthenticate()&&
										<Link to='/logout' className="item-link close-panel item-content" onClick={()=>this.props.closeSideBar()}>
											<div className="item-media"><i className="fa fa-sign-out"></i></div>
											<div className="item-inner">
												<div className="item-title">Logout</div>
											</div>
										</Link>}
								</li>
								<li className="divider" style={{
									marginTop: '10px',
									marginBottom: '10px'
								}}></li>
								<li>
									<NavLink to="/faq" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={()=>this.props.closeSideBar()}>
										<div className="item-media"><i className="fa fa-question-circle"></i></div>
										<div className="item-inner">
											<div className="item-title">FAQ</div>
										</div>
									</NavLink>
								</li>
								<li>
									<NavLink to="/privacy" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={()=>this.props.closeSideBar()}>
										<div className="item-media"><i className="fa fa-question-circle"></i></div>
										<div className="item-inner">
											<div className="item-title">Privacy Policy</div>
										</div>
									</NavLink>
								</li>
								<li>
									<NavLink to="/service" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={()=>this.props.closeSideBar()}>
										<div className="item-media"><i className="fa fa-question-circle"></i></div>
										<div className="item-inner">
											<div className="item-title">Terms of Service</div>
										</div>
									</NavLink>
								</li>
								<li className="divider" style={{
									marginTop: '10px',
									marginBottom: '10px'
								}}></li>
								<li>
									<a className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={this.subscribe}>
										<div className="item-media"><i className="fa fa-question-circle"></i></div>
										<div className="item-inner">
											<div className="item-title">Subscribe</div>
										</div>
									</a>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</div>
	</nav>
	</>
);
}
}
		
export default Sidebar;

const selectedLanguage = () => {
	var name = 'googtrans';
	var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	if (match) return match[2].split('/')[2];
	return 'en';
}
