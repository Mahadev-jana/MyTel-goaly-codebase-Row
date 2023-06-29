import React from 'react';
import Swiper from 'react-id-swiper';
import { isArray } from 'lodash';
import { ContestSliderSimmer } from '../simmer-loader';
import axios from '../_config/axios';

const params = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    }
};

const ContestSlider = (props) => {
    const [bannerList, setBannerList] = React.useState([]);
    React.useEffect(() => {
        axios.post('api/getgoalybannerlist').then(res => {
            if (res && res.data && res.data.success && res.data.success === 1) {
                if (res.data.banner_details && isArray(res.data.banner_details)) {
                    setBannerList(res.data.banner_details);
                }
            }
        }).catch(err => {
            console.log({ err })
        })
    }, []);

    if (bannerList.length === 0)
        return (<ContestSliderSimmer />)

    return (
        <React.Fragment>
            <Swiper {...params} >
                {bannerList.map((value, key) => (
                    <div key={key} style={{ marginBottom: '-40px' }}>
                        <a href={value.link} target="_self">
                            <img src={value.banner_image} />
                        </a>
                    </div>
                ))}
            </Swiper>
            <div className="clearfix"></div>
        </React.Fragment>
    );
};

export default ContestSlider;
