import React, { Fragment, useState } from 'react';
import Swiper from 'react-id-swiper';
import NewsImg from '../../assetsStaging/img/news/e.png';
import NewsImgSmall1 from '../../assetsStaging/img/news/a.png';
import NewsImgSmall2 from '../../assetsStaging/img/news/c.png';
import NewsImgSmall3 from '../../assetsStaging/img/news/d.png';
import Default from '../../assetsStaging/img/newsdefault.png';

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
const News = (props) => {
    const [limit, setLimit] = useState(10);

    const allNews = (len) => {
        console.log(len, 'allNews');
        setLimit(len)
    }
    //console.log(props.news)
    const { news } = props;
    return (
        <Fragment>
            <div className="tab-content">

                <div className="main-news">
                    <div id="main-news-slider" className="carousel slide" data-ride="carousel">

                        <Swiper {...params}>
                            {news && news.slice(0, 3).map((data, key) => {
                                return <div className="carousel-inner" role="listbox" key={key}>
                                    <a href={data.url}>
                                    <div className="item active">
                                        <img src={data.urlToImage === null ? Default : data.urlToImage} alt="" style={{height: '250px'}}/>
                                        <div className="carousel-caption" style={{ display: 'block' }}>
                                            <h3>{data.title.slice(0,30)}.....</h3>
                                            <p>EXPECTED GOALS {data.publishedAt}</p>
                                        </div>
                                    </div>
                                    </a>
                                </div>
                            })
                            }
                            {/* <div className="carousel-inner" role="listbox">
                                <div className="item active">
                                    <img src={NewsImg} alt="" />
                                    <div className="carousel-caption" style={{ display: 'block' }}>
                                        <h3>STANDOUT STATISTICS FROM FANTASY PREMIER LEAGUE GW25</h3>
                                        <p>EXPECTED GOALS05 FEB 2020</p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-inner" role="listbox">
                                <div className="item active">
                                    <img src={NewsImg} alt="" />
                                    <div className="carousel-caption" style={{ display: 'block' }}>
                                        <h3>STANDOUT STATISTICS FROM FANTASY PREMIER LEAGUE GW25</h3>
                                        <p>EXPECTED GOALS05 FEB 2020</p>
                                    </div>
                                </div>
                            </div> */}
                        </Swiper>

                    </div>
                </div>
                {/* <div className="my-2"></div> */}
                {news && news.slice(0, limit).map((data, key) => {

                    return <div className="block bg-white" key={key}>
                        <a href={data.url}>
                        <div className="news">
                            <div className="news-cover"  style={{ maxWidth: '80px', width: '1300px' }}><img src={data.urlToImage === null ? Default : data.urlToImage} alt="" style={{ maxWidth: '80px', width: '80px' }} /></div>
                            <div className="news-title">
                                <h5>{data.title}</h5>
                                <span>EXPECTED GOALS {data.publishedAt}</span>
                            </div>
                        </div>
                        <span className="news-devider"></span>
                        </a>
                    </div>
                })}

                {/* <div className="my-2"></div> */}
                {/* <div className="block bg-white">
                    <div className="news">
                        <div className="news-cover"><img src={NewsImgSmall2} alt="" /></div>
                        <div className="news-title">
                            <h5>STANDOUT STATISTICS FROM FANTASY PREMIER LEAGUE GW25</h5>
                            <span>EXPECTED GOALS05 FEB 2020</span>
                        </div>
                    </div>
                    <span className="news-devider"></span>
                </div> */}
                {/* <div className="my-2"></div> */}
                {/* <div className="block bg-white">
                    <div className="news">
                        <div className="news-cover"><img src={NewsImgSmall3} alt="" /></div>
                        <div className="news-title">
                            <h5>STANDOUT STATISTICS FROM FANTASY PREMIER LEAGUE GW25</h5>
                            <span>EXPECTED GOALS05 FEB 2020</span>
                        </div>
                    </div>
                    <span className="news-devider"></span>
                </div> */}
                {/* <div className="my-2"></div> */}
                {/* <div className="block bg-white"> */}
                {/* <div className="news">
                        <div className="news-cover"><img src={NewsImgSmall1} alt="" /></div>
                        <div className="news-title">
                            <h5>STANDOUT STATISTICS FROM FANTASY PREMIER LEAGUE GW25</h5>
                            <span>EXPECTED GOALS05 FEB 2020</span>
                        </div>
                    </div> */}
                {/* <span className="news-devider"></span> */}
                {limit < news.length &&
                    <a className="btn btn-lg btn-dark w-100" onClick={() => { allNews(news.length) }}>See All</a>
                }

                {/* </div> */}
            </div>
        </Fragment>
    )
}
export default News;