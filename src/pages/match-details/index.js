import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import MenuCategory from '../../components/menu-category';
import { post } from '../../api';
import { ItemSliderSimmer } from '../../simmer-loader';
import Summary from './summary';
import TabComponent from './tab-component';
import { MatchDetailsSimmer } from '../../simmer-loader';
import { dateTimeFomat } from '../../_helper/date-format';
import imgMissingLogo from '../../assets/img/missing_photo.png';
import MatchTabs from '../home/live-matches/MatchTabs';
import LineUp from '../home/live-matches/LineUps';
import { isObject, has, hasIn, size, keys, isEmpty, isArray } from 'lodash';
import { Tabs, Tab } from 'react-bootstrap';
import axios from '../../_config/axios';
import LastMatch from '../score-prediction/LastMatch';
import HeadToHead from '../score-prediction/HeadToHead';
import moment from 'moment';
import Moment from 'react-moment';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
// import moment from 'moment';
import '../../assetsStaging/css/detail-match.css';
import '../../assetsStaging/css/util.css';
import Manchester from '../../assets/img/Manchester united.svg';
import Chelsea from '../../assets/img/Chelsea.svg';
import goal from '../../assets/img/detail-match/goal.png';
import redcard from "../../assets/img/detail-match/reedcard.png";
import yellowcard from "../../assets/img/detail-match/yellowcard.png";
import field from '../../assets/img/detail-match/field.png';
const MatchDetails = (props) => {
    //console.log(props)
    const [matchInfo, setMatchInfo] = useState({});
    const [goals, setGoals] = useState([]);
    const [matchId, setMatchId] = useState(props.match.params.id);
    const [noDataMatchInfo, setNoDataMatchInfo] = useState(false);

    const [comment,setComment]=useState([]);
    const [noDataComment, setNoDataMatchInfoComment] = useState(false);
    const [lineup,setlineup]=useState([]);
    const [noDataLineup, setNoDataLineup] = useState(false);
    const[loadingCommentLineup,setLoadingCommentLineup]=useState(false);
    const[showtimeline,setShowtimeline]=useState(false);

    const[playerStat,setPlayerStat]=useState([]);
    const[loadingPlayerStat,setLoadingPlayerStat]=useState(false);

    const[prediction,setPrediction]=useState([]);
    const[loadingPrediction,setLoadingPrediction]=useState(true);
    useEffect(() => {
        matchBasicDetails();
        commentAndLineupDetails();
        playersStatDetails();
        predictionDetails();
    }, [])

    const matchBasicDetails = () => {
        const payload = new FormData();
        payload.append('id', matchId);
        axios.post('/StageGoalyApi/getMatchDetailsById', payload)
            .then(res => {
                //console.log(matchId)
                //console.log(res.data)
                if (res.data.success == 1) {
                    setMatchInfo(res.data.match_details[0]);
                    setGoals(res.data.match_details[0].goals)
                }
                if (res.data.success == 0) {
                    setNoDataMatchInfo(true)
                }
            }).catch(err => {

                console.log(err);
            })

    }

    const commentAndLineupDetails = () => {
        setLoadingCommentLineup(true);
        const payload = new FormData();
        payload.append('id', matchId);
        axios.post('/StageGoalyApi/getMatchCommentsAndLineupById', payload)
            .then(res => {
                //console.log(res.data)
                if (res.data.success == 1) {
                    setComment(res.data.match_details[0].comments);
                    setlineup(res.data.match_details[0].lineup);
                    setLoadingCommentLineup(false);
                    setShowtimeline(true)
                }
                if (res.data.success == 0) {
                    // setNoData(true)
                    setLoadingCommentLineup(false)
                }
            }).catch(err => {

                console.log(err);
            })

    }
    const playersStatDetails = () => {
        setLoadingPlayerStat(true);
        const payload = new FormData();
        payload.append('id', matchId);
        axios.post('/StageGoalyApi/getMatchPlayersStatsById', payload)
            .then(res => {
               // console.log(res.data)
                if (res.data.success == 1) {
                    setPlayerStat(res.data.match_players_stats[0].playersStats);
                    setLoadingPlayerStat(false);
                }
                if (res.data.success == 0) {
                    setLoadingPlayerStat(false);
                }
            }).catch(err => {

                console.log(err);
            })

    }
    const predictionDetails = () =>{
        setLoadingPlayerStat(true);
        const payload = new FormData();
        payload.append('id', matchId);
        axios.post('/StageGoalyApi/getMatchPredictionsById', payload)
            .then(res => {
               // console.log(res.data.match_probability[0].predictions)
                if (res.data.success == 1) {
                    setPrediction(res.data.match_probability[0].predictions);
                    setLoadingPrediction(false);
                }
                if (res.data.success == 0) {
                    setLoadingPrediction(false);
                }
            }).catch(err => {

                console.log(err);
            })
    }
    
    // console.log(matchInfo)
    // console.log(comment)
    // console.log(lineup)
    //console.log(playerStat)
    const homeTeamGoals = goals.filter(goals => goals.team_id == matchInfo.home_team_id);
    const awayTeamGoals = goals.filter(goals => goals.team_id ==  matchInfo.away_team_id);
    return (
        <div>

            <div className="row detail-match" style={{ paddingTop: " 6px" }}>
                {!Boolean(Object.keys(matchInfo).length) && !noDataMatchInfo && <MatchDetailsSimmer />}
                {Boolean(Object.keys(matchInfo).length>0) &&
                <div className="detail-match-header">
                    <h4>{matchInfo.league_name}</h4>
                    <div className="row">
                        <div className="col-xs-4 club"
                        //  onClick={() => this.props.history.push(`/team/${homeTeamId}`)}
                        >
                            <img src={matchInfo.home_team_logo ? matchInfo.home_team_logo : imgMissingLogo} alt=""
                            />
                            <p><span class="notranslate">{matchInfo.home_team_name}</span></p>
                        </div>
                        <div className="col-xs-4">
                            <div className="score-board">
                                <div className="date">
                                    <Moment format="DD/MM/YYYY  HH:mm">{utcToLocal(matchInfo.date_time)}</Moment>
                                </div>
                                {/* {(matchDetails.status === 'FT' || matchDetails.status === 'AET' || matchDetails.status === 'LIVE' || matchDetails.status === 'HT') && */}
                                {/*console.log(matchInfo)*/}
                                {matchInfo.status==="NS"?
                                 <div className="score">{/*matchInfo.home_team_score*/} - : -{/*matchInfo.away_team_score*/}</div>:
                                 <div className="score notranslate">{matchInfo.home_team_score} : {matchInfo.away_team_score}</div>}
                                {/*<div className="score notranslate">{matchInfo.home_team_score} : {matchInfo.away_team_score}</div>*/}
                                {/* } */}
                            </div>
                        </div>
                        <div className="col-xs-4 club"
                        //  onClick={() => this.props.history.push(`/team/${awayTeamId}`)}
                        >
                            <img src={matchInfo.away_team_logo ? matchInfo.away_team_logo : imgMissingLogo} alt=""
                            />
                            <p><span class="notranslate">{matchInfo.away_team_name}</span></p>
                        </div>
                    </div>
                    {/* {(matchDetails.status === 'AET' || matchDetails.status === 'FT' || matchDetails.status === 'LIVE' || matchDetails.status === 'HT') && */}

                    <div className="sec-3">
                        {goals.length > 0 &&
                            <div className="card">

                                <div className="row row-no-gutters d-flex ais-stretch" style={{ fontSize: '12px' }}>
                                    <div className="col-xs-5 d-flex ais-center j-start">

                                        <table>
                                        <tbody>
                                            {(homeTeamGoals.length > 0) && homeTeamGoals.map((goal,key) => (
                                                <tr key={key}><td><span class="notranslate">{goal.player_name}</span>-</td><td className="pl-3">{goal.minute}'</td></tr>
                                            ))}
                                            </tbody>
                                        </table>

                                    </div>
                                    <div className="col-xs-2 d-flex ais-center j-center">
                                        <img src={goal} alt="" />
                                    </div>
                                    <div className="col-xs-5 d-flex ais-center j-center">

                                        <table>
                                        <tbody>
                                            {awayTeamGoals.map((goal,key) => (
                                            <tr key={key}><td><span class="notranslate">{goal.player_name}</span>-</td><td className="pl-3">{goal.minute}'</td></tr>
                                             ))}
                                           </tbody>
                                        </table>

                                    </div>
                                </div>

                            </div>
                        }
                    </div>

                    <div className="row row-no-gutters">
                        <div className="col-xs-6 stadium" style={{ borderRight: '1px solid white' }}>
                            Stadium: <br /> <div style={{ textTransform: 'uppercase' }}>{matchInfo.venue}</div>
                        </div>
                        <div className="col-xs-6 referee">
                            Referee: <br /><div style={{ textTransform: 'uppercase' }}><span class="notranslate">{matchInfo.referee}</span></div>
                        </div>
                    </div>


                    <div className="clearfix"></div>
                </div>
                
            }
            {noDataMatchInfo && <tbody>
                                    <tr>
                                        <td colspan="2"
                                            style={{
                                                fontSize: '25px',
                                                color: 'rgb(183, 167, 167)',
                                                letterSpacing: '1px',
                                                fontWeight: 100,
                                                padding: '50px 50px',
                                                textAlign: 'center',
                                                lineHeight:1.3
                                            }}
                                        >
                                        <img src={field} style={{height:100,padding:11}}/>
                                            
                                        <div><span style={{ fontWeight: 800 }}>NO DATA</span></div>
                                        <div>YET FOR THIS MATCH</div>
                            </td>
                                    </tr>
                                </tbody>}

            </div>
            {/*console.log(matchInfo)*/}
            {/*console.log(matchInfo.home_team_id,matchInfo.away_team_id)*/}
            {!!keys(matchInfo).length && <MatchTabs comment={comment} lineup={lineup}
             homeTeamId={matchInfo.home_team_id}  awayTeamId={matchInfo.away_team_id}
             homeTeamName={matchInfo.home_team_name}  awayTeamName={matchInfo.away_team_name}
             homeTeamLogo={matchInfo.home_team_logo}  awayTeamLogo={matchInfo.away_team_logo}
             homeTeamId={matchInfo.home_team_id}  awayTeamId={matchInfo.away_team_id}
             loadingCommentLineup={loadingCommentLineup} showtimeline={showtimeline}
             playersStats={playerStat} loadingPlayerStat={loadingPlayerStat}
             matchId={matchInfo.match_id} dateTime={matchInfo.date_time}
             prediction={prediction} loadingPrediction={loadingPrediction}
             status={matchInfo.status}
             />}
        </div>

    )
}
export default withRouter(MatchDetails);

const ScorePredictionSlider = (props) => {
    const params = {
        slidesPerView: 2,
        spaceBetween: 10,
    };
    const { data } = props;
    if (data.length)
        return (
            <Swiper {...params}>
                {data && data.map((value, key) => (
                    <div key={key}>
                        <Slide match={value} />
                    </div>
                ))}
            </Swiper>
        );
    return (<ItemSliderSimmer />);
};

const Slide = ({ match }) => (
    <Link to={`score-preiction/${match.id}`} className="link display-block">
        <div className="thumb">
            <div className="cover-bg" style={{ background: `url(${match.warbanner}) center`, backgroundSize: 'cover' }}>
            </div>
            <div className="thumb-meta">
                <p>{match.team1} VS {match.team2}</p>
            </div>
        </div>
    </Link>
);


const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}

// class MatchDetails extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             // matchDetails: {},
//             // homeTeamName: '',
//             // homeTeamId: 0,
//             // awayTeamId: 0,
//             // homeTeamname: '',
//             // cards: [],
//             // goals: []
//         }
//     }

//     componentDidMount() {
//         this.getPredictionList();
//         this.interval = setInterval(() => {
//             this.getPredictionList();
//         }, 30000);
//     }

//     getPredictionList = () => {
//         const payload = new FormData();
//         payload.append('id', this.props.match.params.id);
//         post('StageGoalyApi/getMatchDetailsByIdNew', payload)
//             .then(res => {
//                 if (res.data.success === 1) {
//                     if (res.data.match_details.length) {
//                         const matchDetails = res.data.match_details[0];
//                         this.setState({ homeTeamId: matchDetails.homeTeam.id });
//                         this.setState({ awayTeamId: matchDetails.awayTeam.id });
//                         this.setState({ homeTeamname: matchDetails.homeTeam.name });
//                         this.setState({ matchDetails });
//                         this.setState({ goals: matchDetails.goals })
//                     }
//                 }
//             })
//             .catch(err => console.log(err));
//     }

//     componentWillUnmount() {
//         clearInterval(this.interval);
//     }


//     render() {
//         const { matchDetails, homeTeamId, awayTeamId, goals } = this.state;
//         console.log(homeTeamId, awayTeamId)
//         console.log(matchDetails)
//         // const goalsTeamId = goals.map(goal=>goal.team_id)
//         // console.log(goalsTeamId)
//         //    const goalsHomeTeamIdArray= goalsTeamId.filter(goalsTeamId=>goalsTeamId==homeTeamId)
//         //    console.log(goalsHomeTeamIdArray)
//         const homeTeamGoals = goals.filter(goals => goals.team_id == homeTeamId)
//         console.log(homeTeamGoals)
//         const awayTeamGoals = goals.filter(goals => goals.team_id == awayTeamId)
//         console.log(awayTeamGoals)
//         // if(homeTeamGoals.length>=awayTeamGoals.length){
//         //     const goalsLines=homeTeamGoals.length

//         // }
//         // else{
//         //     const goalsLines=awayTeamGoals.length

//         // }
//         // console.log(goalsLins)
//         return (
//             <Fragment>
//                 {/* <Helmet>
//                     <title>Goaly | Match Details</title>
//                     <link rel="icon" type="image/png" href={icon} sizes="20x20" />
//                 </Helmet> */}
//                 <div>

//                     <div class="row detail-match" style={{ paddingTop: " 6px" }}>
//                         {!Boolean(Object.keys(matchDetails).length) && <MatchDetailsSimmer />}
//                         {Boolean(Object.keys(matchDetails).length) &&
//                             <div className="detail-match-header">
//                                 <h4>{matchDetails.league_name}</h4>
//                                 <div class="row">
//                                     <div class="col-xs-4 club" onClick={() => this.props.history.push(`/team/${homeTeamId}`)}>
//                                         <img src={matchDetails.homeTeam.logo_path ? matchDetails.homeTeam.logo_path : imgMissingLogo} alt=""
//                                         />
//                                         <p>{matchDetails.homeTeam.name}</p>
//                                     </div>
//                                     <div class="col-xs-4">
//                                         <div class="score-board">
//                                             <div class="date">
//                                                 <Moment format="DD/MM/YYYY  HH:mm">{utcToLocal(matchDetails.date_time)}</Moment>
//                                             </div>
//                                             {(matchDetails.status === 'FT' || matchDetails.status === 'AET' || matchDetails.status === 'LIVE' || matchDetails.status === 'HT') &&
//                                                 <div class="score">{matchDetails.homeTeam.score} : {matchDetails.awayTeam.score}</div>
//                                             }
//                                         </div>
//                                     </div>
//                                     <div class="col-xs-4 club" onClick={() => this.props.history.push(`/team/${awayTeamId}`)}>
//                                         <img src={matchDetails.awayTeam.logo_path ? matchDetails.awayTeam.logo_path : imgMissingLogo} alt=""
//                                         />
//                                         <p>{matchDetails.awayTeam.name}</p>
//                                     </div>
//                                 </div>
//                                 {(matchDetails.status === 'AET' || matchDetails.status === 'FT' || matchDetails.status === 'LIVE' || matchDetails.status === 'HT') &&

//                                     <div class="sec-3">
//                                         {matchDetails.goals.length > 0 &&
//                                             <div class="card">

//                                                 <div class="row row-no-gutters d-flex ais-stretch" style={{ fontSize: '12px' }}>
//                                                     <div class="col-xs-5 d-flex ais-center j-start">
//                                                         {console.log(matchDetails.homeTeam.id)}

//                                                         {/* { console.log(found)} */}
//                                                         {/* {(matchDetails.homeTeam.id===matchDetails.goals.team_id) && */}
//                                                         <table>

//                                                             {(homeTeamGoals.length > 0) && homeTeamGoals.map(goal => (
//                                                                 <tr><td>{goal.player_name}-</td><td class="pl-3">{moment.duration(goal.minute, "minutes").format("*mm")}'</td></tr>
//                                                             ))}
//                                                         </table>
//                                                         {/* } */}

//                                                     </div>
//                                                     <div class="col-xs-2 d-flex ais-center j-center">
//                                                         <img src={goal} alt="" />
//                                                     </div>
//                                                     <div class="col-xs-5 d-flex ais-center j-center">

//                                                         <table>
//                                                             {awayTeamGoals.map(goal => (
//                                                                 <tr><td>{goal.player_name}-</td><td class="pl-3">{moment.duration(goal.minute, "minutes").format("*mm")}'</td></tr>
//                                                             ))}
//                                                         </table>

//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         }
//                                     </div>
//                                 }
//                                 <div class="row row-no-gutters">
//                                     <div class="col-xs-6 stadium" style={{ borderRight: '1px solid white' }}>
//                                         Stadium: <br /> <div style={{ textTransform: 'uppercase' }}>{matchDetails.venue.name}</div>
//                                     </div>
//                                     <div class="col-xs-6 referee">
//                                         Referee: <br /><div style={{ textTransform: 'uppercase' }}>{matchDetails.referee.fullname}</div>
//                                     </div>
//                                 </div>


//                                 <div className="clearfix"></div>
//                             </div>}
//                     </div>
//                     {!!keys(matchDetails).length && <MatchTabs match={matchDetails} totallinesOfcardsGoals={matchDetails.goals.length + matchDetails.cards.length} />}
//                 </div>

//             </Fragment>
//         );

//     }
// };



