import React from 'react';
import Ionicon from 'react-ionicons';

const CheckMark = () => {
    return <Ionicon
        icon="md-checkmark"
        fontSize="2em"
        color="#69dc14"
        style={{
            position: 'absolute',
            right: '10px',
            top: 0,
            bottom: 0
        }}
    />
}

export default React.memo(CheckMark);