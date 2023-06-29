import React from 'react';
import { Grid } from 'react-bootstrap';
import { isAuthenticate } from '../_helper/authentication';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Footer from './Footer';

const Template = ({ children }) => {
    const [show, setShow] = React.useState(false);
    const showSidebar = () => {
        setShow(true);
        document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
    }
    const hideSidebar = () => {
        setShow(false);
        document.getElementsByTagName('html')[0].style.overflowY = 'scroll';
    }
    return (
        <React.Fragment>
            <Header openSideBar={showSidebar} isAuthenticate={Boolean(isAuthenticate())} />
            <div className="clearfix"></div>
            <Sidebar open={show} closeSideBar={hideSidebar} />
            <Grid fluid={true} className="page-content">{children}</Grid>
            <Footer />
        </React.Fragment>
    );
};

export default Template;
