import React from 'react';
import { Link } from 'react-router-dom';
import goalyLogo from '../../assets/img/the-logo.png';
import Ionicon from 'react-ionicons';
import './header.scss';


const Header = React.memo(({ isAuthenticate, openSideBar }) => (
	<div id="toolbar" className="black">
		<div className="logo">
			<Link to='/'><img src={goalyLogo} height="64" alt=""/></Link>
		</div>
		 {/* {screen.width!=320 &&  */}
			<div className="m-0" style={{margin:'auto'}}>&nbsp;</div>
		{/* }  */}
			
		<div className="open-right">
			{isAuthenticate ? <AuthenticatedMenu /> : <NotAuthenticatedMenu />}
			<button onClick={openSideBar} type="button" className="button-collapse navbar-toggle nav-toggle">
				<span className="sr-only">Toggle navigation</span>
				<span className="icon-bar white"></span>
				<span className="icon-bar white spec"></span>
				<span className="icon-bar white"></span>
			</button>
		</div>
	</div>
));

export default Header;

const AuthenticatedMenu = React.memo(() => (
	<React.Fragment>
		<Link to="/search" className="ion-head">
			<Ionicon icon="md-search" className="hydrated" fontSize="32px" color="#fff" />
		</Link>
		<Link to='/profile' className="ion-head">
			<Ionicon icon="md-person" className="hydrated" fontSize="32px" color="#fff" />
		</Link>
	</React.Fragment>
));

const NotAuthenticatedMenu = React.memo(() => (
	<Link to="/search" className="ion-head">
		<Ionicon icon="md-search" className="hydrated" fontSize="32px" color="#fff" />
	</Link>
));