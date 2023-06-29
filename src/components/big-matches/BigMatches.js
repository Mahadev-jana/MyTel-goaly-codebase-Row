import React from 'react';
import { Link } from 'react-router-dom';
import { isArray } from 'lodash';
import Swiper from 'react-id-swiper';
import axios from '../../_config/axios';
import imgLiveMatch from '../../assets/img/bg.png';
import { BigMatchSimmer } from '../../simmer-loader';
// import styles from './bigmatch.css';

const params = {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    autoplay: {
        delay: 10000,
        disableOnInteraction: false
    }
};

const BigMatches = () => {
    const [bigMatchList, setBigMatchList] = React.useState([]);
    React.useEffect(() => {
        axios.post('/getbigmatchinfo').then(res => {
            if (res && res.data && res.data.success && res.data.success === 1) {
                if (res.data.matches && isArray(res.data.matches)) {
                    setBigMatchList(res.data.matches);
                }
            }
        }).catch(err => {
            console.log({ err })
        });
    }, []);

    return (
        <div style={{ backgroundColor: '#fff', overflow: 'auto', padding: '10px 0px', borderTop: '1px solid #D4D7D9' }}>
            <div className="col-xs-12 pd-0">
                <div className="title2 m-0 ml-10">Big Matches
                            <Link to='/live' style={{
                        float: 'right',
                        fontSize: '14px',
                        marginRight: '10px',
                        fontWeight: 100,
                        lineHeight: '25px'
                    }}>See All</Link>
                </div>
                {!Boolean(bigMatchList.length) && <BigMatchSimmer />}
                {Boolean(bigMatchList.length) && <Swiper {...params}>
                    {bigMatchList.map((data, key) => (
                        <Link to="/contest" key={key} className="lm mt-10" style={{ overflow: 'auto' }}>
                            <div style={{
                                position: 'relative',
                                overflow: 'auto'
                            }}>
                                <img src={imgLiveMatch} className="img-responsive" alt="" />
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        width: '49%',
                                        display: 'inline-table',
                                        textAlign: 'center'
                                    }}>
                                        <img src={data.homeTeamBadge} style={{
                                            height: '100px',
                                            width: '100px'
                                        }} />
                                    </div>
                                    <div style={{
                                        width: '49%',
                                        display: 'inline-table',
                                        textAlign: 'center'
                                    }}>
                                        <img src={data.awayTeamBadge} style={{
                                            height: '100px',
                                            width: '100px'
                                        }} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 pd-5">
                                <h4 className="m-0" style={{ fontSize: '15px', lineHeight: '21px' }}>{data.news}</h4>
                            </div>
                        </Link>
                    ))}
                </Swiper>}
            </div>
        </div>
    );
}

export default BigMatches;