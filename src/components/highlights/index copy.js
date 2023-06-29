import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import 'swiper/dist/css/swiper.min.css';
import { randomNewsBanner } from '../../_helper/random-image';
import imgLatestNews from '../../assets/img/latest_news.png';
import './style.scss';
// import {LatestMatchSliderSimmer} from '../../simmer-loader';

import { post } from '../../api';

const params = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom'
    }
};

class Highlights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: []
        }
    }
    componentDidMount() {
        post('highlights')
            .then(res => {
                console.log(res);
                this.setState({
                    videos: res.data.videos
                });
            }).catch(err => console.log(err));
    }
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
    setCss = event => {
        // var iframe = document.getElementById("myFrame");
        // var elmnt = iframe.contentWindow.document.getElementsByClassName("mediaplayer")[0];
        // elmnt.style.display = "none";
    }
    render() {
        const { latestMatchSlider } = this.props;
        const { videos } = this.state;
        return (
            <Fragment>
                <div className="latest">
                    <div className="title2 m-0 ml-10" style={{
                        background: '#fff',
                        padding: '10px',
                        marginTop: '-8px',
                        marginLeft: '0px'
                    }}>Video Highlight
                    <Link to="/video-more" style={{
                            float: 'right',
                            fontSize: '14px',
                            marginRight: '10px',
                            fontWeight: 100,
                            lineHeight: '25px'
                        }}>More Videos</Link></div>
                    {Boolean(videos.length) &&
                        <Swiper {...params}
                            
                        >
                            {
                                videos.map((value, key) => (
                                    <div key={key} className="youtube-carousel">
                                        <div className="video-container item active" style={{
                                            backgroundColor: '#000',
                                            paddingBottom: '40%'
                                        }}>
                                            <iframe
                                                className="youtube-video"
                                                id="myFrame"
                                                frameBorder="0"
                                                allowFullScreen="1"
                                                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                                title="YouTube video player"
                                                width="640"
                                                height="360"
                                                src={value.url}
                                                onLoad={this.setCss}
                                            ></iframe>
                                            <div className="carousel-caption" style={{ display: 'block' }}>Video {key + 1}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Swiper>}
                </div>
                <div className="clearfix"></div>
            </Fragment>
        );
    }
}


export default withRouter(Highlights);
const dateFormat = (date) => {
    const month = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    date = date.split(' ');
    date = date[0].split('-');
    return `${date[2]}-${month[parseInt(date[1]) - 1]}-${date[0]}`;
}
