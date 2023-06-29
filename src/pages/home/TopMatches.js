import React, { useEffect, useState, Fragment } from 'react';
import { Tabs, Tab, Row, Col, Grid } from 'react-bootstrap';
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
import { Link } from 'react-router-dom';
import MatchSummery from './live-matches/MatchSummery';
import { keys } from 'lodash';
import loader from '../../assets/loader/loaderspinner.gif';



const params = {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
    height: '30px',
    backgroundColor: '#fff',
    slidesPerView: 1,
    spaceBetween: 10
};


const TopMatches = () => {
    const [tab, setTab] = React.useState('finished');
    const [liveMatch, setliveMatch] = React.useState([]);
    const [finishedMatch, setfinishedMatch] = React.useState([]);
    const [nextMatch, setnextMatch] = React.useState([]);
    const [matches, setMatches] = React.useState([]);
    const [loading, setLoading] = React.useState(false);



    useEffect(() => {
        setLoading(true);
        axios.post('/topMatchByLeague').then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.matches) {
                    if (res.data.matches.live) {
                        setliveMatch(res.data.matches.live);
                    }
                    if (res.data.matches.coming_up) {
                        setnextMatch(res.data.matches.coming_up);
                    }
                    if (res.data.matches.finish) {
                        console.log('finished');
                        setfinishedMatch(res.data.matches.finish);
                        setMatches(res.data.matches.finish);
                    }
                    setLoading(false);
                }
            } else {
                setMatches([]);
            }
        }).catch(err => {
            console.log({ err });
        })

    }, []);



    const chnageStatus = (e) => {
        console.log(finishedMatch);
        console.log(liveMatch);

        console.log(nextMatch);

        console.log(matches);

        // setMatches([]);
        setTab(e);
        if (e == "live") {
            setMatches(liveMatch);
        }
        if (e == "finished") {
            setMatches(finishedMatch)
        }
        if (e == "comingup") {
            setMatches(nextMatch);
        }

    }


    return (
        <Row>
            <Col xs={12} className="mt-10 pd-0">
                <div class="wrapnya">
                    <div class="tuhed">
                        <div class="up" style={{ backgroundColor: " rgb(77, 0, 83)" }}>
                            <i class="fas fa-award"></i> &nbsp;&nbsp;Top Matches
                        </div>
                        <div className="batbat">
                            <Tabs id="list-match-tabs" className="card-header tab-card-header" style={{ display: 'flex', justifyContent: 'center' }}
                                activeKey={tab} onSelect={(tab) => chnageStatus(tab)}
                            >
                                <Tab eventKey="finished" title="Finish" tabClassName="nav-item">
                                </Tab>

                                <Tab eventKey="live" title="Live" tabClassName="nav-item">
                                </Tab>

                                <Tab eventKey="comingup" title="ComingUp" tabClassName="nav-item">
                                </Tab>
                            </Tabs>
                        </div>
                        <div class="mid" >
                            <div style={{ minHeight: 300, backgroundColor: '#fff' }} >
                                <div style={{ backgroundColor: '#fff', height: 'auto' }}>
                                    {loading && matches.length == 0 && <div style={{ height: 360 }}><img src={loader} style={{ height: '40px', width: '40px', top: 0, textAlign: 'center', marginLeft: '40%', marginTop: '40%' }} /></div>}
                                    {!!matches.length && <Swiper style {...params}>
                                        {matches.map((match, key) => (
                                            <Grid fluid={true} key={key} className="batbat" style={{ height: 'auto' }}>
                                                <Row class="part" style={{ marginBottom: '40px' }}>
                                                    <Col xs={12} className="lm mt-10">
                                                        {keys(match).length && <MatchSummery {...match} />}
                                                    </Col>
                                                </Row>
                                            </Grid>
                                        ))}
                                    </Swiper>}
                                    {!loading && matches && matches.length == 0 && <Grid className="batbat" style={{ height: 300, marginTop: 0 }}>
                                        <Row class="part" style={{ marginBottom: '40px' }}>
                                            <Col xs={12} className="lm mt-10" style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>
                                                <div style={{ marginTop: '50%' }}> No Match Found</div>
                                            </Col>
                                        </Row>
                                    </Grid>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default TopMatches;

