import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { Dot } from 'react-animated-dots';

const SubmitLoader = ({ title }) => {
    useEffect(() => { 
        document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
        return () => {
            document.getElementsByTagName('html')[0].style.overflowY = 'scroll';
        }
    }, []);
    return (
        <div style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 999999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                width: '80%',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                padding: '10px 15px',
                borderRadius: 1
            }}>
                <Loader
                    type="Oval"
                    color="#4d0053"
                    height={50}
                    width={50}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                />
                <span style={{
                    fontSize: 19,
                    letterSpacing: 1,
                    marginLeft: 10,
                }}>{title}<Dot>.</Dot><Dot>.</Dot><Dot>.</Dot></span>
            </div>
        </div>
    )
};

export default SubmitLoader;