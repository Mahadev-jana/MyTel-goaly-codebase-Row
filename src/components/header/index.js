import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../../_helper/authentication';
import goalyLogo from '../../assets/img/the-logo.png';
import Ionicon from 'react-ionicons';
import './header.scss';

class Header extends Component {
    render() {
        return(
			<Fragment>
				<div id="toolbar" className="purple botorange">
					<div className="logo">
						<Link to='/'><img src={goalyLogo} height="60" /></Link>
					</div>
					<div className="m-0">&nbsp;</div>
					<div className="open-right">
						{isAuthenticate()?<AuthenticatedMenu />:<NotAuthenticatedMenu />}
						<button onClick={this.props.openSideBar} type="button" className="button-collapse navbar-toggle nav-toggle">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar white"></span>
							<span className="icon-bar white spec"></span>
							<span className="icon-bar white"></span>
						</button>
					</div>
				</div>
			</Fragment>
        );
    }
}

export default Header;

const AuthenticatedMenu = () => (
	<>
		<Link to="/search" className="ion-head">
			<Ionicon icon="md-search" className="hydrated" fontSize="32px" color="#fff" />
		</Link>
		<Link to='/profile' className="ion-head">
			<Ionicon icon="md-person" className="hydrated" fontSize="32px" color="#fff" />
		</Link>
	</>
);

const NotAuthenticatedMenu = () => (
	<>
		<Link to="/search" className="ion-head">
			<Ionicon icon="md-search" className="hydrated" fontSize="32px" color="#fff" />
		</Link>
	</>
);