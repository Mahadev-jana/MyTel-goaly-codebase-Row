import React from 'react';
import Swiper from "react-id-swiper";

function slider(props){
    const params = {
        lazy: true,
        autoplay: {
        delay: 2700,
        disableOnInteraction: false
      },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // }
    }
    console.log(props)
    return(
        
    <div>
      
      { Boolean(props.sliderData.length) && <Swiper {...params}>
      {props.sliderData.map(item => (
        <div class="carousel-inner" role="listbox">
        <div class="item active">
        <div key={item.id}>
          <img src={item.url} alt="img" className="swiper-lazy" />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
        </div>
        </div>
        </div>
      ))}
      </Swiper>}
    </div>
    
    );
}
export default slider;