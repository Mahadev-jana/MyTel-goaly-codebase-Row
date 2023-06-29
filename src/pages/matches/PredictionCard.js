import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { isNull } from 'lodash';
import Modal from 'react-responsive-modal';
import bgContentgame from '../../assets/img/bg-contentgame.jpg';
import bgContentgame1 from '../../assets/img/bg-contentgame.jpg';
import icoStadium from '../../assets/thumb/ico-stadium.png';
import { dateTimeFomat } from '../../_helper/date-format';
import UserPlayContest from './UserPlayContest';
import Chelsea from '../../assets/img/Chelsea.svg';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
const PredictionCard = (props) => {
    const [{ open, predictionId }, setModal] = useState({ open: false, predictionId: null });

    //console.log('props');
    //console.log(props);
    const loginCheck = () => {
        
            
            const loginUserInfo = JSON.parse(localStorage.getItem('userDetails'));
            // const jwtloginUserInfo = localStorage.getItem('JWT')
            // console.log(loginUserInfo.status)
            // console.log(jwtloginUserInfo)
            if(loginUserInfo == null) {
                console.log('inactive status user');
                Swal.fire({
                    type: 'info',
                    title: 'Login first to play',
                    confirmButtonText: 'login',
                }).then(result => {
                    if (result.value) {
                        props.history.push('/login');
                    }
                });
            }
            else {
                console.log('logged in user');
                
                props.history.push(`/contest/${props.prediction.id}`,
                { matchId: props.prediction.match_id, hometeamid: props.prediction.hometeamid, awayteamid: props.prediction.awayteamid })
           

            }
        }

    return (
        <Fragment>
            <Modal open={open} onClose={() => setModal({ open: false, tab: '' })} center
                styles={{
                    modal: {
                        borderRadius: '5px'
                    }
                }}
                showCloseIcon={false}
                focusTrapped={false}
                onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
            >
                {!isNull(predictionId) && <UserPlayContest predictionId={predictionId} closeModal={() => setModal({ open: false, predictionId: null })} />}
            </Modal>
            <div>
                <div className="ct-page" style={{ backgroundImage: `url(${bgContentgame})`, height: ' auto' }}>
                    



                    <div class="predic">
                        <div class="d-flex j-center mt-2">
                            <div class="club-left mx-1 text-center">
                                <Link to={`/my-team/${props.prediction.hometeamid}`}>
                                    <div class="logo">

                                        <img src={props.prediction.hometeamlogo} alt="" />
                                    </div>
                                </Link>
                                <h5 class="mb-0">{props.prediction.hometeam}</h5>
                            </div>
                            <div class="mid mx-2 d-flex ais-center">
                                <div class="h-max-c">
                                    <div class="date p-1"><Moment format="dddd DD/MM/YY">{props.prediction.match_start}</Moment></div>
                                    <div class="place p-1">{props.prediction.venue}</div>
                                </div>
                            </div>
                            <div class="club-right mx-1 text-center">
                                <Link to={`/my-team/${props.prediction.awayteamid}`}>
                                    <div class="logo">

                                        <img src={props.prediction.awayteamlogo} alt="" />

                                    </div>
                                </Link>
                                <h5 class="mb-0">{props.prediction.awayteam}</h5>
                            </div>
                        </div>
                        {(props.date.current_date < props.prediction.pred_start) && (props.date.current_date < props.prediction.pred_end) && <button type="button" class="btn btn-lg btn-grey w-100 my-2" style={{ fontSize: "11pt" }}
                    >Coming Up</button>}

                    {(props.date.current_date >= props.prediction.pred_start) && (props.date.current_date <= props.prediction.pred_end) && 
                    
                    <div>
                        <li>
                                        <span type="button" className="btn btn-lg btn-success my-2" style={{ fontSize: "11pt",backgroundColor: '#fff', color: 'black', margin: ' 0 25px 0px -17px', padding: '13px' }}
                                          
                                        >Weekly Contest</span>
                                        <span type="button" className="btn btn-lg btn-success my-2" style={{ fontSize: "11pt", backgroundColor: '#fff', color: 'black', padding: '5px' }}

                                        >  <img src={props.prediction.league_logo} height="35" />{props.prediction.league}</span>
                                    </li>
                        <button type="button" class="btn btn-lg btn-success w-100 my-2" style={{ fontSize: "11pt" }}
                        onClick={loginCheck}
                        // onClick={() =>
                            // props.history.push(`/contest/${props.prediction.id}`,
                            //     { matchId: props.prediction.match_id, hometeamid: props.prediction.hometeamid, awayteamid: props.prediction.awayteamid })}
                                >LET'S PLAY</button>
                                </div>
                                }
                        {(props.date.current_date > props.prediction.pred_end) && (props.date.current_date > props.prediction.pred_start) &&
                            <button type="button" class="btn btn-lg btn-grey w-100 my-2" style={{ fontSize: "11pt" }}
                            >Time Up</button>}
                        <span class="d-block mb-2 text-center" style={{ color: ' white', fontSize: "13pt" }}><strong>Prediction :</strong></span>
                        <div class="card p-2">
                            <div class="row row-no-gutters">
                                <div class="col-xs-6 text-center py-1 border-right">Start: <br /> <strong><Moment format="ddd, DD/MM/YY">{props.prediction.pred_start}</Moment></strong></div>
                                <div class="col-xs-6 text-center py-1">End: <br /> <strong><Moment format="ddd, DD/MM/YY">{props.prediction.pred_end}</Moment></strong></div>
                                <div class="col-xs-12 text-center py-2 border-top mt-1">Total point can win: <b>{props.winPoint.winpoint}</b></div>
                                <div>
                                {props.prediction.players && !!props.prediction.players.length && 
                                <div class="col-xs-12 text-center py-2 border-top">User who play:
                                </div>}
                                {props.prediction.players.map((player, key) => (
                                    <b>{key + 1}. {player.name} ({player.pts})</b>
                                ))} 
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-lg btn-purple mt-2" onClick={() => setModal({ open: true, predictionId: props.prediction.id })}>See Who Play</button>
                    </div>




                    
                </div>
            </div>
        </Fragment>
    )
}

export default withRouter(PredictionCard);



{/* <Fragment>
            <Modal open={open} onClose={() => setModal({ open: false, tab: '' })} center
                styles={{
                    modal: {
                        borderRadius: '5px'
                    }
                }}
                showCloseIcon={false}
                focusTrapped={false}
                onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
            >
                {!isNull(predictionId) && <UserPlayContest predictionId={predictionId} closeModal={() => setModal({ open: false, predictionId: null })} />}
            </Modal>
            <div className="col-xs-12 lm ct mt-10 pd-0">
                <div className="ct-page" style={{ backgroundImage: `url(${bgContentgame})` }}>
                    {(props.date.current_date < props.prediction.pred_start) && (props.date.current_date < props.prediction.pred_end) && <span style={{
                        position: 'absolute',
                        top: '35%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: '#fff',
                        padding: '10px 20px',
                        fontSize: '20px',
                        letterSpacing: '1px',
                        borderRadius: '5px'
                    }}
                    >Coming Up</span>}

                    {(props.date.current_date >= props.prediction.pred_start) && (props.date.current_date <= props.prediction.pred_end) && <span style={{
                        position: 'absolute',
                        top: '35%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: '#fff',
                        padding: '10px 20px',
                        fontSize: '20px',
                        letterSpacing: '1px',
                        borderRadius: '5px'
                    }}
                        onClick={() => 
                            props.history.push(`/contest/${props.prediction.id}`,
                            {matchId: props.prediction.match_id ,hometeamid:props.prediction.hometeamid,awayteamid:props.prediction.awayteamid})}                    >Let's Play</span>}

                    {(props.date.current_date > props.prediction.pred_end) && (props.date.current_date > props.prediction.pred_start) && <span style={{
                        position: 'absolute',
                        top: '35%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: '#fff',
                        padding: '10px 20px',
                        fontSize: '20px',
                        letterSpacing: '1px',
                        borderRadius: '5px'
                    }}
                    >Time Up</span>}



                    <div className="head">
                        <div className="col-xs-5 pl-10 pr-5">
                            <div className="left">
                                <img src={props.prediction.league_logo} height="34" alt="" />
                                &nbsp; {props.prediction.league}
                            </div>
                        </div>
                        <div className="col-xs-7 pr-10 pl-10 text-right">
                            <div className="right">

                                <div className="matchdate"><Moment format="ddd, DD/MM/YY">{props.prediction.match_start}</Moment></div>

                                <div className="stadium">
                                    {props.prediction.venue} &nbsp;
                            <img src={icoStadium} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mid">
                        {/* <div className="col-xs-3 pd-0"> */}
        //                 <div>
        //                     <Link to={`/my-team/${props.prediction.hometeamid}`}>
        //                         <div className="square">
        //                             <img src={props.prediction.hometeamlogo} height="60" alt="" />
        //                         </div>
        //                     </Link>
        //                 </div>
        //                 {/* <div className="col-xs-6 pd-0"> */}
        //                 <div style={{
        //                     display: 'block',
        //                     position: 'absolute',
        //                     top: 0,
        //                     bottom: 0,
        //                     left: '95px',
        //                     right: '95px',
        //                 }}>
        //                     <div className="">
        //                         <div className="left" style={{ width: 77, fontSize: 13, fontWeight: 600, float: 'left' }}>
        //                             <h3 style={{ width: 20, fontSize: 13, fontWeight: 600 }}>{props.prediction.hometeam} </h3>
        //                             {props.prediction.status && props.prediction.status == "FT" && <div style={{ float: 'right', marginTop: -25 }}>{props.prediction.score_home}</div>}
        //                         </div>
        //                         <div className="right" style={{ width: 77, fontSize: 13, fontWeight: 600, float: 'right' }}>
        //                             {props.prediction.status && props.prediction.status == "FT" && <div style={{ float: 'right', marginTop: 20 }}>{props.prediction.score_away}</div>}
        //                             <h3 style={{ width: 70, fontSize: 13, fontWeight: 600 }}>{props.prediction.awayteam}
        //                             </h3>
        //                         </div>

        //                     </div>
        //                 </div>
        //                 {/* <div className="col-xs-3 pd-0"> */}
        //                 <div>
        //                     <Link to={`/my-team/${props.prediction.awayteamid}`}>
        //                         <div className="square2">
        //                             <img src={props.prediction.awayteamlogo} height="60" alt="" />
        //                         </div>
        //                     </Link>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="bt-page">
        //             <ul>
        //                 <li>
        //                     <strong>Prediction:</strong>
        //                     <span className="pre-date"><strong>Start:</strong> <Moment format="ddd, DD/MM/YY">{props.prediction.pred_start}</Moment>  &nbsp;&nbsp;|&nbsp;&nbsp; <strong>End:</strong> <Moment format="ddd, DD/MM/YY">{props.prediction.pred_end}</Moment></span>
        //                 </li>
        //                 <li>
        //             <strong>Total point can win:{props.winPoint.winpoint}</strong>
        //                 </li>
        //                 <li>
        //                     {props.prediction.players && !!props.prediction.players.length && <strong>User who play:</strong>}
        //                     <span className="pre-date">
        //                         {props.prediction.players.map((player, key) => (
        //                             <span key={key} style={{ marginRight: '10px' }}>{key + 1}. {player.name} ({player.pts})</span>
        //                         ))}
        //                     </span>
        //                 </li>
        //                 <li className="text-center">
        //                     <a className="btn btn-who" onClick={() => setModal({ open: true, predictionId: props.prediction.id })}>Show Who Play</a>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </Fragment> */}