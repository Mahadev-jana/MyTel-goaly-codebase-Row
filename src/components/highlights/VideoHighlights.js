import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isArray } from 'lodash';
import axios from '../../_config/axios';
import './style.scss';

const VideoHighlights = () => {
    const [videos, setVideos] = React.useState([]);
    const [selected, setSelected] = React.useState(0);

    React.useEffect(() => {
        axios.post('/highlights').then(res => {
            if (res && res.data && res.data.success && res.data.success === 1) {
                if (res.data.videos && isArray(res.data.videos)) {
                    setVideos(res.data.videos);
                }
            }
        }).catch(err => {
            console.log({ err })
        })
    }, []);


    const prev = () => {
        setSelected(selected => selected === 0 ? videos.length - 1 : selected - 1);
    }
    
    const next = () => {
        setSelected(selected => selected === videos.length - 1 ? 0 : selected + 1);
    }
    
    return (
        <React.Fragment>
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
                {!!videos.length && <>
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
                        <div className="swiper-button-prev-custom" onClick={prev}></div>
                        <div className="swiper-button-next-custom" onClick={next}></div>
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
        </React.Fragment>
    );
}

export default withRouter(VideoHighlights);

function Clip({ url }) {
    if (url.length)
        return (
            <video name="media" style={{ width: '100%', height: 'auto' }} src={url} controls autoPlay />
        );
    return '';
}

