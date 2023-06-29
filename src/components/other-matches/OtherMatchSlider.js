import React from 'react';
import Swiper from 'react-id-swiper';
import SlideItem from './SliderItem';

const params = {
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
};

const OtherMatchSlider = ({matches}) => {
    return( 
        <Swiper {...params}>
            {matches.map((match, key)=>(
                <div key={key}>
                    <SlideItem {...match}/>
                </div>
            ))}
        </Swiper>        
    );
};



export default OtherMatchSlider;