import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
            videos: [],
            selected: 0
        }
    }
    componentDidMount() {
        post('highlights')
            .then(res => {
                this.setState({
                    videos: res.data.videos
                });
            }).catch(err => console.log(err));
    }
    prev = () => {
        this.setState((prevState) => {
            if (prevState.selected === 0) {
                return ({ selected: prevState.videos.length - 1 });
            } else {
                return ({ selected: prevState.selected - 1 });
            }
        });
    }
    next = () => {
        this.setState((prevState) => {
            if (prevState.selected === prevState.videos.length - 1) {
                return ({ selected: 0 });
            } else {
                return ({ selected: prevState.selected + 1 });
            }
        });
    }
    render() {
        const { latestMatchSlider } = this.props;
        const { videos, selected } = this.state;
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
                        }}>More Videos</Link>
                    </div>
                    {!!videos.length &&<>
                        <div style={{
                            border: '4px solid #d8004b',
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            minHeight: '200px',
                            background: '#000'
                        }}>
                            <Clip url={videos[selected].url} />
                            <div className="swiper-button-prev-custom" onClick={this.prev}></div>
                            <div className="swiper-button-next-custom" onClick={this.next}></div>
                        </div>
                        <div style={{ 
                            background: '#D8004B',
                            borderTop: '1px solid white',
                            textAlign: 'center',
                            fontSize: '18px',
                            color: '#fff',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                         }}>Video {selected + 1}</div></>}
                </div>
                <div className="clearfix"></div>
            </Fragment>
        );
    }
}

export default withRouter(Highlights);

function Clip({ url }) {
    if (url.length)
        return (
            <video name="media" style={{ width: '100%', height: 'auto' }} src={url} controls autoPlay />
        );
    return '';
}

