import React, { useEffect, useState, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import Moment from 'react-moment';
import { isArray, isEmpty } from 'lodash';
import axios from '../../_config/axios';
import thumb from '../../assets/thumb/thumblinimage.jpg';
import playIcon from '../../assets/thumb/thumb-youtube-play-small.png';
import ReactPlayer from 'react-player';
import ResponsiveEmbed from 'react-responsive-embed';
import Iframe from 'react-iframe';
import Modal from 'react-responsive-modal';
import { thumblinimage } from '../../assets/thumb/thumblinimage.jpg';

const params = {
    slidesPerView: 2,
    spaceBetween: 10
};

const GoalyTV = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.post('/highLightsVideo').then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                console.log('goalytv');
                console.log(res.data.videos);
                if (res.data.videos && isArray(res.data.videos)) {
                    setVideos(res.data.videos);
                }
            }
        }).catch(err => {
            console.log({ err });
        })
    }, []);
    return (
        <Row>
            <Col className="pd-0 mt-10">
                <div class="new-ct">
                    <div class="lf">Goaly TV</div>
                    <div class="liner2"></div>
                    {!isEmpty(videos) &&
                        <div id="random_number1" >
                            <Iframe url={videos[0].url}
                                width="100%"
                                height="302px"
                                id="myId"
                                margin="0px"
                            />

                            <div class="carousel-caption new-pos" style={{ display: 'block' }}>{videos[0].desc}</div>
                        </div>}
                    <div class="liner2"></div>
                    <GoalyTvSlider videos={videos} />
                </div>
            </Col>
        </Row>
    )
}

export default GoalyTV;

const GoalyTvSlider = ({ videos }) => {
    const [{ open, video }, setModal] = useState({ open: false, video: {} });
    if (isEmpty(videos)) return null;
    return (
        <Fragment>
            <Modal open={open} onClose={() => setModal({ open: false, video: {} })} center
                styles={{
                    modal: {
                        borderRadius: '5px',
                    }
                }}
                showCloseIcon={false}
                focusTrapped={false}
                onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
            >
                {!isEmpty(video) && <Fragment>
                    <div id="random_number1" class="carousel slide youtube-carousel" data-ride="carousel" data-interval="false" style={{ height: '200px', width: '290px' }}>
                        <div class="carousel-inner">
                            <div style={{ marginBottom: '-7%' }}>
                                <ResponsiveEmbed src={video.url} ratio='4:3' />
                                <div class="carousel-caption new-pos" style={{ display: 'block' }}>{video.desc}</div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <h4 class="text-big">{video.desc}</h4>
                    </div>
                </Fragment>}
                <div style={{ justifyContent: 'center' }}>
                    <button type="button" class="btn-reg" onClick={() => setModal({ open: false, video: {} })}>
                        <strong>Close</strong>
                    </button>
                </div>
            </Modal>
            <Swiper {...params} >

                {videos.map((video, key) => (
                    <a key={key} onClick={() => setModal({ open: true, video })} style={{ marginTop: '25px' }}>
                        <div style={{ position: 'relative' }}>
                            {video.image && <img src={video.image} alt="" style={{ height: '122px' }} />}
                            {!video.image && <img src={thumblinimage} alt="" style={{ height: '122px' }} />}

                            <span class="thumb-play" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                margin: 'auto',
                            }}>
                                <img src={playIcon} alt="" style={{ width: 'auto' }} />
                            </span>
                        </div>
                        <figcaption>
                            <span class="title">{video.desc}</span>
                            {/* <Moment format="DD/MM/YYYY" class="published" style={{textAlign:'center'}}>{video.date}</Moment> */}
                        </figcaption>
                    </a>
                ))}
            </Swiper>
        </Fragment>

    );
}


