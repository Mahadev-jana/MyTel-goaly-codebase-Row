import React, { Fragment } from 'react';
import Swiper from 'react-id-swiper';
import Default from '../../assetsStaging/img/newsdefault.png';
import { LeagueSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';

const PlayerNews = (props) => {
    const params = {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,

        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,

        }
    };
    const { news, newsLoading } = props;
    //console.log(news)
    return (
        <Fragment>
            {newsLoading ?
                <>
                    <LeagueSimmer />
                    <LeagueSimmer />
                    <LeagueSimmer />
                </>
                :
                <>
                    {news && news.length >= 1 ?
                        <div className="tab-content">

                            <div className="main-news">
                                <div id="main-news-slider" className="carousel slide" data-ride="carousel">

                                    <Swiper {...params}>
                                        {news && news.slice(0, 2).map((data, key) => {
                                            return <div className="carousel-inner" role="listbox" key={key}>
                                                <a href={data.url}>
                                                <div className="item active">
                                                    <img src={data.urlToImage} alt="" />
                                                    <div className="carousel-caption" style={{ display: 'block' }}>
                                                        <h3>{data.title.slice(0, 50)}...</h3>
                                                        <p>{data.description.slice(0, 50)}...</p>
                                                    </div>
                                                </div>
                                                </a>
                                            </div>
                                        })}

                                    </Swiper>

                                </div>
                            </div>
                            {news && news.map((data, key) => {
                                return <div className="block bg-white" key={key}>
                                    <a href={data.url}>
                                    <div className="news">
                                        <div className="news-cover" style={{ maxWidth: '80px', width: '1300px' }}><img src={data.urlToImage} alt="" style={{ maxWidth: '80px', width: '80px' }} /></div>
                                        <div className="news-title">
                                            <h5>{data.title.slice(0, 30)}...</h5>
                                            <span>{data.description.slice(0, 50)}...</span>
                                        </div>
                                    </div>
                                    <span className="news-devider"></span>
                                    </a>
                                </div>
                            })}





                            {/* <a className="btn btn-lg btn-dark w-100" >See All</a> */}


                        </div>
                        :
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                            <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                        </div>
                    }
                </>
            }


        </Fragment>
    )
}
export default PlayerNews;