import React from 'react';
import imgLogo from '../assets/img/logo-goaly.png';
const LazyLoading = () => (
    <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff'
    }}>
        <img src={imgLogo} />
    </div>
);

export default LazyLoading;