import React, { useEffect, useState } from 'react';
import { isArray, isEmpty } from 'lodash';

import { Grid, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import axios from '../../../_config/axios';
import loader from '../../../assets/loader/loaderspinner.gif'
import { setUserDetails } from '../../../_helper/authentication';
import field from '../../../assets/img/detail-match/field.png';

const News = (props) => {

        //console.log(props)
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoaading] = React.useState(true);
    const [matchID, setmatchID] = React.useState(props.id);
    const [homeTeam, sethomeTeam] = React.useState(props.homeTeamName);
    const [awayTeam, setawayTeam] = React.useState(props.awayTeamName);
    const [matchDate, setmatchDate] = React.useState(props.dateTime);


    // useEffect(() => {
    //     setIsLoaading(true);
    //     setNews([]);
    //     const payload = new FormData();
    //     payload.append('comp_id', props.id);
    //     axios.post('/allLeagueNews', payload).then(res => {
    //         console.log(res)
    //         if (res.data && res.data.success && res.data.success == 1) {
    //             if (res.data.news && isArray(res.data.news)) {
    //                 setNews(res.data.news);
    //                 setIsLoaading(false);
    //             } else {
    //                 setIsLoaading(false);
    //             }
    //         }
    //     }).catch(err => {
    //         setIsLoaading(false);
    //         console.log({ err });
    //     })
    // }, [props.id]);
    
    useEffect(() => {
        setIsLoaading(true);
       // setNews([]);
       // setmatchID(props.id);
        //sethomeTeam(props.homeTeamName);
        //setawayTeam(props.awayTeamName);
        //setmatchDate(props.dateTime);
        const payload = new FormData();
        //console.log(matchID,matchDate,homeTeam,awayTeam)
        payload.append('id', matchID);
        payload.append('date_time', matchDate);
        payload.append('hometeam', homeTeam);
        payload.append('awayteam', awayTeam);
        axios.post('/StageGoalyApi/getMatchNews', payload).then(res => {
            //console.log(res)
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.News && isArray(res.data.News)) {
                    setNews(res.data.News);
                    setIsLoaading(false);
                } else {
                    setNews(res.data.News);
                    setIsLoaading(false);
                }
            }
            else{
                setNews([]);
                setIsLoaading(false);
            }
        }).catch(err => {
            setIsLoaading(false);
            console.log({ err });
        })
    }, [/*matchID,matchDate,homeTeam,awayTeam*/]);
//console.log(news,isLoading)
    return (
        <Grid fluid={true} className="bg-light">
            <Row className="">
                {isLoading && <> <div class="col-xs-4">
                </div>
                    <div className="col-xs-4" style={{ minHeight: 200, textAlign: 'center', marginTop: 100 }}>
                        <img src={loader} alt="" style={{ height: 60 }} />
                    </div> </>
                }
                {!isLoading && isEmpty(news) &&
                <tbody>
                    <tr>
                        <td colspan="2"
                            style={{
                                fontSize: '25px',
                                color: 'rgb(183, 167, 167)',
                                letterSpacing: '1px',
                                fontWeight: 100,
                                padding: '50px 50px',
                                textAlign: 'center',
                                lineHeight: 1.3
                            }}
                        >
                            <img src={field} style={{ height: 100, padding: 11 }} />

                            <div><span style={{ fontWeight: 800 }}>NO DATA</span></div>
                            <div>YET FOR THIS MATCH</div>
                        </td>
                    </tr>
                </tbody>
                }
                <Col className="pd-10">
                    <div className="team">
                        {!isEmpty(news) && <a href={news[0].url}>
                            <div className="title-img">
                                <img src={news[0].urlToImage} alt=""  style={{height:'100%',width:'100%'}}/>
                            </div>
                            <p className="title-cat" style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{news[0].name}</p>
                            <h2 className="title-main" style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{news[0].title}</h2>
                            <div className="hr"></div>
                            {/* <p className="title-desc" style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{news[0].description}</p> */}
                        </a>}
                        <br />
                        {news.map((eachNews, key) => (
                            <div key={key} className="post post-widget">
                                <a className="post-img" href={eachNews.url}>
                                    <img src={eachNews.urlToImage} alt="" />
                                </a>
                                <div className="post-body">
                                    <p className="title-cat" style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{eachNews.name}</p>
                                    <p className="post-title" style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{eachNews.title}</p>
                                </div>
                            </div>
                        ))}
                        <div className="clearfix"></div>
                    </div>
                </Col>
            </Row>
        </Grid>
    )
}

export default News;