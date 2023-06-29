import React from 'react';
import logoGoaly from '../assets/img/logo-goaly.png';

const PageRoutingLoader = () => (
    <div style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 998,
        background: '#eaeaea'
    }}>
        <img className="loader-logo-golay" src={logoGoaly} alt="goaly logo" />
    </div>
);

export default PageRoutingLoader;