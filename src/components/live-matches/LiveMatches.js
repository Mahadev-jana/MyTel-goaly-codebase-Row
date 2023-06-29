import React from 'react';
import { Link } from 'react-router-dom';
import { isArray, isEmpty } from 'lodash';
import Swiper from 'react-id-swiper';
import axios from '../../_config/axios';
import { LiveMatcheSimmer } from '../../simmer-loader';
import MatchItem from './MatchItem';

const params = {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    loop: true,
    autoplay: {
        delay: 10000,
        disableOnInteraction: false
    }
};

const LiveMatches = () => {
    const [liveMatchList, setLiveMatchList] = React.useState([]);

    React.useEffect(() => {
        axios.post('/getlivematchesNew').then(res => {
            if (res && res.data && res.data.success && res.data.success === 1) {
                if (res.data.matches && res.data.matches && isArray(res.data.matches)) {
                    setLiveMatchList(res.data.matches);
                }
            }
        }).catch(err => {
            console.log({ err })
        });
    }, []);

    return (
        <React.Fragment>
            <div className="hr"></div>
            <div style={{ backgroundColor: '#fff', overflow: 'hidden', padding: '10px 0px', borderTop: '1px solid #D4D7D9' }}>
                <div className="col-xs-12 pd-0">
                    <div className="title2 m-0 ml-10">Live Match Schedule
                            <Link to='/live' style={{
                            float: 'right',
                            fontSize: '14px',
                            marginRight: '10px',
                            fontWeight: 100,
                            lineHeight: '25px'
                        }}>See All</Link>
                    </div>
                    {isEmpty(liveMatchList) && <LiveMatcheSimmer />}
                    {!isEmpty(liveMatchList) && <div className="lm mt-8">
                        <Swiper {...params}>
                            {liveMatchList.map((match, key) => (
                                <Link to={`/match/details/${match.matchId}`} key={key}>
                                    <MatchItem {...match} />
                                </Link>
                            ))}
                        </Swiper>
                    </div>}
                </div>
            </div>
            <div className="clearfix"></div>
        </React.Fragment>
    );
}

export default LiveMatches;
