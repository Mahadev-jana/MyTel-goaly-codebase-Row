import React from 'react';
import moment from 'moment';
import { Tabs, Tab } from 'react-bootstrap';
import 'moment-timezone';
import Swiper from 'react-id-swiper';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { isObject, has, hasIn, size, keys, isEmpty, isArray } from 'lodash';
import axios from '../../../_config/axios';
import MatchSummery from './MatchSummery';
import MatchTabs from './MatchTabs';
import loader from '../../../assets/loader/loaderspinner.gif';
// import loader from '../../../assets/loader/loaderspinner.gif';
import { isAuthenticate } from '../../../_helper/authentication';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import News from '../list-matches/News';



var tz = moment.tz.guess();

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

const LiveMatches = React.memo(() => {
    const [matches, setMatches] = React.useState([]);
    const [livechat, setlivechat] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [isLogin, setisLogin] = React.useState(false);
    const [tab, setTab] = React.useState('matches');
    const [userid, setUserid] = React.useState('');
    const [news, setNews] = React.useState([]);
    const [msg, setmsg] = React.useState('');
    



    React.useEffect(() => {
        getLiveScore();

    }, []);

    const getLiveScore = () => {
        const payload = new FormData();
        // payload.append('type', 'matches');
        const user = JSON.parse(localStorage.getItem('userDetails'));
        if (user) {
            setUserid(user.id);
            setLoading(true);
            setisLogin(true);

            payload.append('user_id', user.id);
            axios.post('/getAllMatches', payload).then(res => {
                if (res.data && res.data.success && res.data.success == 1) {
                    console.log(res.data)
                    if (res.data.matches && isArray(res.data.matches)) {
                        
                        setMatches(res.data.matches);
                        setLoading(false);
                    }
                    if (res.data.matches  && res.data.success==0 && isEmpty(res.data.matches)) {
                        setmsg(res.data.message)
                        
                    }
                    
                }
                if (res.data.matches  && res.data.success==0 && isEmpty(res.data.matches)) {
                    setmsg(res.data.message)
                    setLoading(false);
                }
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                setMatches([]);
                console.log({ err });
            });
        }
    }

    const chnageStatus = (e) => {
        setMatches([]);
        setLoading(true);
        setTab(e);
        if (e == 'live') {
            const payload = new FormData();
            payload.append('type', 'live');
            const user = JSON.parse(localStorage.getItem('userDetails'));
            if (user) {
                setLoading(true);
                setisLogin(true);
                payload.append('user_id', user.id);
                axios.post('/getLiveMatches', payload).then(res => {
                    if (res.data && res.data.success && res.data.success == 1) {
                        if (res.data.matches && isArray(res.data.matches)) {
                            setMatches(res.data.matches);
                            setLoading(false);
                        }
                        if (res.data.matches  && res.data.success==0 && isEmpty(res.data.matches)) {
                            setmsg(res.data.message)
                            
                        }
                    }
                    if (res.data.matches  && res.data.success==0 && isEmpty(res.data.matches)) {
                        setmsg(res.data.message)
                        setLoading(false);
                    }
                    setLoading(false);
                }).catch(err => {
                    setLoading(false);
                    console.log({ err });
                    setMatches([]);
                });
            }
        }
        if (e == 'finish') {
            setNews([]);
            const payload = new FormData();
            payload.append('type', 'finish');
            const user = JSON.parse(localStorage.getItem('userDetails'));
            if (user) {
                setLoading(true);
                setisLogin(true);
                payload.append('user_id', user.id);
                axios.post('/getPastMatches', payload).then(res => {
                    
                    if (res.data && res.data.success && res.data.success == 1) {
                        if (res.data.matches && isArray(res.data.matches)) {
                            setMatches(res.data.matches);
                            setLoading(false);
                        }
                        if (res.data.matches && res.data.success==0 && isEmpty(res.data.matches)) {
                            setmsg(res.data.message)
                            
                        }
                    }
                    if (res.data.matches  && res.data.success==0 && isEmpty(res.data.matches)) {
                        setmsg(res.data.message)
                        setLoading(false);
                    }
                    setLoading(false);
                }).catch(err => {
                    setLoading(false);
                    console.log({ err });
                    setMatches([]);
                });
            }
        } if (e == 'matches') {
            setNews([]);

            setLoading(false);
            getLiveScore();
        }
        if (e == 'news') {
            setMatches([]);
            setLoading(false);
            const payload = new FormData();
            const user = JSON.parse(localStorage.getItem('userDetails'));
            if (user) {
                setLoading(true);
                setisLogin(true)
                payload.append('user_id', user.id);
                axios.post('/fevTeamNews', payload).then(res => {
                    if (res.data && res.data.success && res.data.success == 1) {
                        if (res.data.matches && isArray(res.data.matches)) {
                            setNews(res.data.matches);
                            setLoading(false);
                        }
                        if (res.data.matches  && isEmpty(res.data.matches)) {
                            setmsg(res.data.message)
                            setLoading(false);
                        }
                        
                          
                    }
                    if (res.data.matches  && res.data.success==0 && isEmpty(res.data.matches)) {
                        setmsg(res.data.message)
                        setLoading(false);
                    }
                }).catch(err => {
                    setLoading(false);
                    console.log({ err });
                    setMatches([]);
                });
            }
        }
    }

    return (
        <Row>
            <Col xs={12} className="mt-10 pd-0">
                <div class="wrapnya">
                    <div class="tuhed">
                        <div class="up" style={{ backgroundColor: " rgb(77, 0, 83)" }}>
                            <i class="fas fa-award"></i> &nbsp;&nbsp;MyTeam 
                            <Link to="/matches" class="rg" style={{ textAlign: 'right', width: '100%', marginRight: 10, color: '#fff' }}>See All</Link>
                        </div>
                        <div className="batbat">
                            <Tabs id="list-match-tabs" activeKey={tab} onSelect={(tab) => chnageStatus(tab)}
                                className="card-header tab-card-header">
                                <Tab eventKey="matches" title="Matches" tabClassName="nav-item" >
                                </Tab>
                                <Tab eventKey="live" title="Live" tabClassName="nav-item"  >
                                </Tab>
                                <Tab eventKey="finish" title="Finish" tabClassName="nav-item" >
                                </Tab>
                                <Tab eventKey="news" title="News" tabClassName="nav-item" >
                                </Tab>
                            </Tabs>
                        </div>

                        <div class="mid">
                            <div style={{ minHeight: 300, backgroundColor: '#fff' }} >
                                <div style={{ backgroundColor: '#fff', height: 'auto' }}>
                                    {((loading && matches.length == 0) || (loading && news.length == 0)) && <div style={{ height: 360 }}><img src={loader} style={{ height: '40px', width: '40px', top: 0, textAlign: 'center', marginLeft: '40%', marginTop: '40%' }} /></div>}
                                    
                                    {matches && !!matches.length  && tab != "news" && <Swiper style {...params}>
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
                                    
                                    {/* {console.log(matches,news)} */}
                                    {!loading && matches && matches.length == 0 && news.length==0 && <Grid className="batbat" style={{ height: 360 }}>
                                        <Row class="part" style={{ marginBottom: '40px' }}>
                                            <Col xs={12} className="lm mt-10" style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>
                                                <div style={{ marginTop: '50%' }}> { msg } </div>
                                            </Col>
                                        </Row>
                                    </Grid>}
                                    {/* {!loading && news && news.length == 0 && <Grid className="batbat" style={{ height: 360 }}>
                                        <Row class="part" style={{ marginBottom: '40px' }}>
                                            <Col xs={12} className="lm mt-10" style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>
                                                <div style={{ marginTop: '50%' }}> No news Found</div>
                                            </Col>
                                        </Row>
                                    </Grid>} */}
                                    {!loading && tab == "news" && news && <Grid className="batbat" >
                                        <Row class="part" style={{ marginBottom: '40px' }}>
                                            <Col xs={12} className="lm mt-10" style={{ fontWeight: '600', color: 'black', textAlign: 'center'}}>
                                                {news.map((eachNews, key) => (
                                                    <div key={key} class="post post-widget">
                                                        <a class="post-img" href={eachNews.url}>
                                                            <img src={eachNews.urlToImage} alt="" style={{ height: 80 }} />
                                                        </a>
                                                        <div class="post-body">
                                                            <p class="title-cat" style={{ color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{`${eachNews.name}`.substring(0, 8)}...</p>
                                                            <p class="post-title" style={{ color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{`${eachNews.title}`.substring(0, 25)}...</p>
                                                        </div>
                                                    </div>
                                                ))}
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
});

export default LiveMatches;
