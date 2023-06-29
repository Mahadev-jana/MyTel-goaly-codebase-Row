import React from 'react';
//import { Modal, Button } from 'react-bootstrap';
import Modal from 'react-responsive-modal';

import { post } from '../../api';

import thumb from '../../assets/thumb/thumb.jpg';
import playImage from '../../assets/thumb/thumblinimage.jpg';

import thumb1 from '../../assets/thumb/th1.jpg';
import thumb2 from '../../assets/thumb/th2.jpg';
import thumb3 from '../../assets/thumb/th3.jpg';
import thumb4 from '../../assets/thumb/th4.jpg';
import playIcon from '../../assets/thumb/thumb-youtube-play-small.png';
import axios from '../../_config/axios';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';

import { VideoMoreSimmer } from '../../simmer-loader';

class VideoMore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            videos: [],
            selectData: {},
            loading: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        const payload = new FormData();
        payload.append('category', this.props.match.params.videotype);
        axios.post('/football_transferVideo', payload).then(res => {
            const resVideos = res.data.videos;
            const videos = [];
            for (let i = 0; i < resVideos.length; i += 2) {
                videos.push(resVideos.slice(i, i + 2));
            }
            this.setState({
                videos,
                loading: false
            })
        })
            .catch(err => console.log(err));
    }
    openModal = selectData => {
        this.setState({ selectData, modal: true });
    }
    // setModal = () => {
    //     this.setState({ selectData: {}, modal: false });
    // }
    render() {
        const { selectData, videos, modal } = this.state;
        // const [{ open, predictionId }, setModal] = useState({ open: false, predictionId: null });

        return (
            <React.Fragment>
                {/* <Helmet>
                    <title>Goaly | Videos</title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
                {!!Object.keys(selectData).length &&
                    <Modal open={modal} onClose={() => this.setState({ selectData: {}, modal: false })} center
                        styles={{
                            modal: {
                                borderRadius: '5px',
                            }
                        }}
                        showCloseIcon={true}
                        focusTrapped={true}
                        onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
                    >
                            <div style={{width:320,height:180}}>
                        <iframe
                            className="youtube-video"
                            id="OttuX3_xWDU"
                            frameBorder="0"
                            allowFullScreen="1"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            title="YouTube video player"
                            width="323px"
                            height="195px"
                            src={selectData.location}
                        ></iframe>
                        </div>

                    </Modal>}

                <div style={{ background: '#eee' }}>
                    <div className="col-xs-12 ct">
                        <div className="title2 mt-10">Latest Videos</div>
                        {this.state.loading && <>
                            <div className="col-xs-6 pd-5"><VideoMoreSimmer /></div>
                            <div className="col-xs-6 pd-5"><VideoMoreSimmer /></div>
                            <div className="col-xs-6 pd-5"><VideoMoreSimmer /></div>
                            <div className="col-xs-6 pd-5"><VideoMoreSimmer /></div>
                            <div className="col-xs-6 pd-5"><VideoMoreSimmer /></div>
                            <div className="col-xs-6 pd-5"><VideoMoreSimmer /></div>
                        </>}
                        {videos.map((video, key) => (
                            <div key={key} className="row">
                                {video.map((data, key) => (
                                    <div key={key} className="col-xs-6 pd-5">
                                        <a onClick={() => this.openModal(data)}>
                                            <div style={{ position: 'relative' }}>
                                                {/* <img src={data.image == null ? data.image : playImage} alt="" /> */}
                                                <img src={data.image} alt="" style={{ height: '100px' }} />

                                                <span style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)'
                                                }}>
                                                    <img src={playIcon} alt="" />
                                                </span>
                                            </div>
                                            <figcaption>
                                                <span className="title video-desc">{data.title}</span>
                                                {/* <time className="published">{data.date}</time> */}
                                            </figcaption>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    {/* <div className="col-xs-12 ct">
		  	        <div className="title2 mt-10">Goal of the day</div>
                        {videos.map((data, key) => (
                            <div key={key} className="col-xs-6 pd-0">
                                <a onClick={()=>this.openModal(data)}>
                                    <div style={{position: 'relative'}}>
                                        <img src={thumb} alt=""/>
                                        <span style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)'
                                        }}>
                                            <img src={playIcon} alt=""/> 
                                        </span>
                                    </div>
                                    <figcaption>
                                        <span className="title">{data.headline}</span>
                                        <time className="published">{data.date}</time>
                                    </figcaption>
                                </a>
                            </div>
                        ))}
		            </div> */}
                    <div className="clearfix"></div>
                </div>
            </React.Fragment>
        );
    }
};

export default VideoMore;