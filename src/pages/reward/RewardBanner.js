import React from 'react';
import { Link } from 'react-router-dom';
import { isArray, isEmpty } from 'lodash';
import OwlCarousel from 'react-owl-carousel';
import axios from '../../_config/axios';
import { RewardBannerSimmer } from '../../simmer-loader';

const RewardBanner = (props) => {
    const [banners, setBanners] = React.useState([]);

    React.useEffect(() => {
        axios.post('api/rewards_banner').then(res => {
            if (res && res.data && res.data.success && res.data.success == 1) {
                if (res.data.banner_rwd_details && isArray(res.data.banner_rwd_details)) {
                    setBanners(res.data.banner_rwd_details);
                }
            }
        }).catch(err => {
            console.error(err);
        });
    }, []);

    return (
        <div className="columns slide-show2">
            <div className="column col-12 col-xs-12 pd-0">
                {isEmpty(banners) && <RewardBannerSimmer />}
                {!isEmpty(banners) && <OwlCarousel
                    className="owl-theme"
                    loop={true}
                    items={1}
                    margin={10}
                    lazyLoad={true}
                    lazyContent={true}
                    autoplay={true}
                >
                    {banners.map((banner, key) => (
                        <div key={key} className="item" style={{ position: 'relative' }}>
                            <Link to={`/reward/${banner.reward_id}`}>
                                <img height="200" src={banner.banner_image} />
                            </Link>
                            <div style={{
                                position: 'absolute',
                                zIndex: '1000',
                                left: 0,
                                bottom: 0,
                                right: 0,
                                width: '100%',
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                textAlign: 'center',
                                height: 'auto',
                                padding: '10px',
                                color: '#fff',
                                pointerEvents: 'none'
                            }}
                            >
                                {banner.banner_description}</div>
                        </div>
                    ))}
                </OwlCarousel>}
            </div>
        </div>
    );
}

export default RewardBanner;