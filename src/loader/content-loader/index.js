import React from 'react';
import imgLoad from './load.gif';

const ContentLoader = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '360px'
    }}>
        <div>
            <img src={imgLoad} alt="" />
        </div>
    </div>
);
 
export default ContentLoader;