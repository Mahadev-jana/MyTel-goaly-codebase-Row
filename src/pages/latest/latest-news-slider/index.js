import React, { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import ClampLines from 'react-clamp-lines';


import { randomNewsBanner } from '../../../_helper/random-image';
import { Link, withRouter } from 'react-router-dom';
import './index.css';

const params = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    // renderBullet: (index, className) => {
    //     return '<span class="' + className + '">' + (index + 1) + '</span>';
    // },

};

const LatestNewsSlider = React.memo(({ news }) => {
    const newsMore = (more, id) => {
        if (Boolean(more)) {
            const newsLinks = ["www.goal.com"];
            if (newsLinks.indexOf(more.split("/")[2]) > -1) {
                window.location.href = more;
            } else {
                this.props.history.push(`/latest/${id}`);
            }
        }
    }
    //console.log(news)
    return (
        <div className="row" style={{ backgroundColor: '#fff' }}>
            <Swiper {...params} wrapperStyle={{ marginBotton: '24px' }}>
                {news && news.map((data, key) => (
                    <a key={key} href={data.url}>
                        <div className="main-news row">
                            <div id="main-news-slider" className="carousel slide" data-ride="carousel">

                                <div className="carousel-inner" role="listbox">
                                    <div className="item active">
                                       {/* <img src={data.urlToImage === '' ? randomNewsBanner() : data.urlToImage} alt="" style={{ height: '270px' }} />*/}
                                       <img  style={{borderRadius:'29px',padding:'18px',height:'270px'}}src={data.urlToImage === '' ? randomNewsBanner() : data.urlToImage} alt="" onError={(e)=>{e.target.onerror = null; e.target.src=randomNewsBanner()}}/>
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
                    </a>
                    // <a key={key} href={data.url}>
                    //     <div className="title-img">
                    //         <img src={data.urlToImage === '' ? randomNewsBanner() : data.urlToImage} alt="" />
                    //     </div>
                    //     <p className="title-cat">{data.name}</p>
                    //     {data.title && <ClampLines
                    //         text={data.title}
                    //         id={key}
                    //         lines={1}
                    //         ellipsis="..."
                    //         buttons={false}
                    //         className="title-main"
                    //         innerElement="h2"
                    //     />}
                    //     <div className="hr"></div>
                    //     {data.description && <ClampLines
                    //         text={data.description}
                    //         id={key}
                    //         lines={2}
                    //         ellipsis="..."
                    //         buttons={false}
                    //         className="title-desc"
                    //         innerElement="div"
                    //     />}
                    // </a>
                ))}
            </Swiper>
        </div>
    );
});

export default withRouter(LatestNewsSlider);