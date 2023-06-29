import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import 'swiper/dist/css/swiper.min.css';
import { randomNewsBanner } from '../../_helper/random-image';
import imgLatestNews from '../../assets/img/latest_news.png';
import './style.scss';
// import {LatestMatchSliderSimmer} from '../../simmer-loader';

const params = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
};

class LatestMatchSlider extends React.Component {
    news = (more, id) => {
        if (Boolean(more)) {
            const newsLinks = ["www.goal.com"];
            if (newsLinks.indexOf(more.split("/")[2]) > -1) {
                window.location.href = more;
            } else {
                this.props.history.push(`/latest/${id}`);
            }
        }
    }
    render() {
    const {latestMatchSlider} = this.props;
    return(
        <Fragment>
             <div className="latest"> 
                <Swiper {...params}>
                 {
                     latestMatchSlider && latestMatchSlider.map((value, key) => (
                        <div key={key} onClick={() => this.news(value.more, value.id)}>
                            <div className="post post-thumb">
                                <a className="post-img">
                                    <img src={value.media_url===''?randomNewsBanner():value.media_url} className="img-responsive" alt="" style={{
                                        height: '200px',
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }}/>
                                </a>
                                <div className="post-body">
                                    <div className="post-meta">
                                        <a className="post-category cat-3">Headline News</a>
                                        <span className="post-date" style={{
                                            textShadow: '1px 1px #6b6767'
                                        }}>{dateFormat(value.publishedDate)}</span>
                                    </div>
                                    <h3 className="post-title"><a>{value.title}</a></h3>
                                </div>
                            </div>
                        </div>
                       ))
                       }
                </Swiper>
             </div> 
            <div className="clearfix"></div>
        </Fragment>
    );
}
}


export default withRouter(LatestMatchSlider);

const dateFormat = (date) => {
    date = new Date(date+' GMT-0100').toLocaleDateString();
    const month = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    date = date.split('/');
    return `${date[2]}-${month[parseInt(date[0])-1]}-${date[1]}`;
}
 