import React, { useEffect, useState, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { isObject, isEmpty, keys } from 'lodash';
import ResponsiveEmbed from 'react-responsive-embed';
import axios from '../../_config/axios';
import Iframe from 'react-iframe';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Transfer = () => {
    const [video, setVideo] = useState([]);

    useEffect(() => {
        const payload = new FormData();
        payload.append('limit', 1);
        payload.append('category', 'transfer');
        axios.post('/football_transferVideo', payload).then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                // if (res.data.video && isObject(res.data.video)) {
                //     setVideo(res.data.video);
                // }
                const video = res.data.videos[0];
                setVideo(video);
            }
        }).catch(err => {
            console.log({ err });
        })
    }, []);
    return (
        <Row>
            <Col xs={12} className="pd-0 mt-10">
                <div class="new-ct">
                    <div class="lf">
                        Transfer
					</div>
                    <div class="rg">
                        <Link to='/transfer/video-more'>See All</Link>
                    </div>
                    <div class="liner2"></div>
                    {<Fragment>
                        <div id="random_number1" class="carousel slide youtube-carousel" data-ride="carousel" data-interval="false">
                            <div class="carousel-inner">
                                <div style={{ marginBottom: '-7%' }}>
                                    {/* <ResponsiveEmbed src={video.url} ratio='4:3' /> */}
                                    {/* <ResponsiveEmbed src={video.location} ratio='4:3' /> */}
                                    <Iframe url={video.url}
                                        width="100%"
                                        height="302px"
                                        id="myId"
                                        margin="0px"
                                    />
                                    <div class="carousel-caption new-pos" style={{ display: 'block' }}>{video.title}</div>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <h4 class="text-big">{video.desc}</h4>
                        </div>
                    </Fragment>}
                </div>
            </Col>
        </Row>
    )
};

export default Transfer;