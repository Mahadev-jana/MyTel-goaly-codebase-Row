import React, { useEffect, useState } from 'react';
import { isArray, isEmpty } from 'lodash';

import { Grid, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import axios from '../../../_config/axios';
import loader from '../../../assets/loader/loaderspinner.gif'

const News = React.memo((props) => {


    const [news, setNews] = useState([]);
    const [isLoading, setIsLoaading] = React.useState(true);
    const [matchID, setmatchID] = React.useState('');
    const [homeTeam, sethomeTeam] = React.useState('');
    const [awayTeam, setawayTeam] = React.useState('');
    const [matchDate, setmatchDate] = React.useState('');


    // useEffect(() => {
    //     setIsLoaading(true);
    //     setNews([]);
    //     setmatchID(props.matchDetails.id);
    //     sethomeTeam(props.matchDetails.homeTeam.name);
    //     setawayTeam(props.matchDetails.awayTeam.name);
    //     setmatchDate(props.matchDetails.date_time);
    //     const payload = new FormData();
    //     payload.append('id', matchID);
    //     payload.append('date_time', matchDate);
    //     payload.append('hometeam', homeTeam);
    //     payload.append('awayteam', awayTeam);
    //     axios.post('/getMatchNews', payload).then(res => {
    //         if (res.data && res.data.success && res.data.success == 1) {
    //             if (res.data.News && isArray(res.data.News)) {
                   
    //                 setNews(res.data.News);
    //                 setIsLoaading(false);
    //             } else {
    //                 setIsLoaading(false);
    //             }
    //         }else{
    //             setIsLoaading(false);
    //         }
    //     }).catch(err => {
    //         setIsLoaading(false);
    //         console.log({ err });
    //     })
    // }, [matchID,matchDate,homeTeam,awayTeam]);

    useEffect(() => {
        setIsLoaading(true);
        setNews([]);
        const payload = new FormData();
        payload.append('comp_id', props.id);
        axios.post('/allLeagueNews', payload).then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.news && isArray(res.data.news)) {
                    setNews(res.data.news);
                    setIsLoaading(false);
                } else {
                    setIsLoaading(false);
                }
            }
        }).catch(err => {
            setIsLoaading(false);
            console.log({ err });
        })
    }, [props.id]);
    return (
        <Grid fluid={true} className="bg-light">
        {/*console.log(news)*/}
            <Row class="part">
                {isLoading && <> <div class="col-xs-4">
                </div>
                    <div class="col-xs-4" style={{ minHeight: 200, textAlign: 'center', marginTop: 100 }}>
                        <img src={loader} alt="" style={{ height: 60 }} />
                    </div> </>
                }
                {isEmpty(news) && !isLoading && 
                    <> <div class="col-xs-4">
            </div>
                <div class="col-xs-4" style={{ minHeight: 200, textAlign: 'center', marginTop: 100, width: '100%', color: 'black' }}>
                    No Record Found							</div> </>
                }
                <Col className="pd-10">
                    <div className="team">
                        {!isEmpty(news) && <a href={news[0].url}>
                            <div className="title-img">
                                <img src={news[0].urlToImage} alt="" style={{height:'100%',width:'100%'}}/>
                            </div>
                            <p class="title-cat" style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0,height:'100%',width:'100%'}}>{news[0].name}</p>
                            <h2 class="title-main" style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{news[0].title}</h2>
                            <div class="hr"></div>
                            {/* <p class="title-desc" style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{news[0].description}</p> */}
                        </a>}
                        <br />
                        {news.map((eachNews, key) => (
                            <div key={key} class="post post-widget">
                                <a class="post-img" href={eachNews.url}>
                                    <img src={eachNews.urlToImage} alt="" />
                                </a>
                                <div class="post-body">
                                    <p class="title-cat" style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{eachNews.name}</p>
                                    <p class="post-title" style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{eachNews.title}</p>
                                </div>
                            </div>
                        ))}
                        <div class="clearfix"></div>
                    </div>
                </Col>
            </Row>
        </Grid>
    )
});

export default News;