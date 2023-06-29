import React, { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import ClampLines from 'react-clamp-lines';

import { randomNewsBanner } from '../../_helper/random-image';
import { Link, withRouter } from 'react-router-dom';

const params = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        
    }
};
const LocalNewsSlider = (props) =>{
    const {news} = props;
    //console.log(news.id)
    return(
          
          <div className="row" style={{ backgroundColor: '#fff' }}>
          <Swiper {...params} wrapperStyle={{ marginBotton: '24px' }}>
              {news && news.map((data, key) => (
                  <Link key={key} to={`/local/${data.id}`}>
                      <div className="main-news row">
                          <div id="main-news-slider" className="carousel slide" data-ride="carousel">

                              <div className="carousel-inner" role="listbox">
                                  <div className="item active">
                                      <img style={{borderRadius:'29px',padding:'18px',height:'270px'}} src={data.urlToImage === '' ? randomNewsBanner() : data.urlToImage} alt="" /*style={{ height: '270px' }} *//>
                                      <div className="carousel-captionh" style={{
                                          backgroundColor: 'white',
                                          position: 'initial',
                                          textAlign: 'left',
                                          padding: '2em 2em 2em'
                                      }}>
                                          <h3 style={{
                                              margin: 0,
                                              color: 'black',
                                              fontSize: '15pt'
                                          }}>{data.title.slice(0, 30)}...</h3>
                                          <p>{data.publishedAt}</p>
                                      </div>
                                  </div>


                              </div>
                          </div>
                      </div>
                  </Link>
                 
              ))}
          </Swiper>
      </div>
  
    )
}
export default withRouter(LocalNewsSlider);