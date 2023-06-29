import React, {Component, Fragment} from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false}
    }
    openSideBar = () => {
        document.getElementById('pageOverlay').classList.add('page-overlay');
        this.setState({open: true})
    }
    closeSideBar = () => {
        document.getElementById('pageOverlay').classList.remove('page-overlay');
        this.setState({open: false})
    }
    render() {
        return(
            <Fragment>
                <Header openSideBar={this.openSideBar} />
                <div className="clearfix"></div>
                <Sidebar open={this.state.open} closeSideBar={this.closeSideBar}/>
                {this.props.children}
                <Footer />
            </Fragment>
        );
    }
};

export default Template;
