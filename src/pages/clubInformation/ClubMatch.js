import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../_config/axios';
import * as moment from 'moment';
import Countdown from 'react-countdown';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import { PlayersSimmer, PlayerMatchesSimmer, MatchesHeadingSimmer } from '../../simmer-loader/index';
import Chelsea from '../../assetsStaging/img/ic-chelsea.png';
import Albion from '../../assetsStaging/img/ic-albion.png';
const ClubMatch = (props) => {
     
          //console.log(props)
    const { clubDetail, matches, loadingMatch } = props;
    //console.log(props, loadingMatch, 'cfhcg');
    return (
        <div className="tab-content row">


            <div className="tag"><u><b>{clubDetail.team_league}</b></u></div>
            {loadingMatch ?
                <PlayerMatchesSimmer />
                :
                <>
                    {matches.length >= 1 ?
                        <div className="container-matches">
                            {matches && matches.map((data, key) => {
                                return <div className="matches" key={key}>
                                    <div className="d-flex j-center">
                                        <div className="club-left mx-1 text-center">
                                            <div className="logo" onClick={() => props.clubIdChange(data.home_team_id)}
                                                style={{ maxWidth: '75px' }}><img src={data.home_team_logo} alt="" style={{
                                                    width: '60px',
                                                    maxWidth: '60px',
                                                    height: '60px',
                                                    maxHeight: '60px'
                                                }} /></div>
                                            <h5 style={{ marginBottom: '-6px', fontSize: '10px' }} className="notranslate">{data.home_team_name.split(' ')[0]}</h5>
                                            <h5 style={{ marginBottom: '-6px', fontSize: '10px' }} className="notranslate">{data.home_team_name.split(' ')[1]}</h5>
                                            <h5 style={{ marginBottom: '-6px', fontSize: '10px' }} className="notranslate">{data.home_team_name.split(' ')[2]}</h5>
                                        </div>
                                        <div className="mid mx-2 d-flex flex-column my-auto">
                                            {data.status==='NS'?<>
                                            <div className="border radius-1 px-2 py-1"
                                                style={{
                                                    width: '120px',
                                                    maxWidth: '120px'
                                                }}> - | -</div>
                                            </>:<>
                                            <div className="border radius-1 px-2 py-1"
                                                style={{
                                                    width: '120px',
                                                    maxWidth: '120px'
                                                }}>{data.home_team_score} : {data.away_team_score}</div>
                                                <span className="my-1">{utcToLocal(data.date_time)}</span>
                                                <span className="btn-pill bg-red">Finished</span>
                                            </>}
                                            
                                            {/* <div className="border radius-1 px-2 py-1">{data.vanue_name.split(' ')[1]}</div>
                                            <div className="border radius-1 px-2 py-1">{data.vanue_name.split(' ')[2]}</div> */}

                                            <CounterToMatchStart matchStartTime={data.current_date} currentTime={data.time} />
                                        </div>
                                        <div className="club-right mx-1 text-center">
                                            <div className="logo" onClick={() => props.clubIdChange(data.away_team_id)}
                                                style={{ maxWidth: '75px' }}><img src={data.away_team_logo} alt="" style={{
                                                    width: '60px',
                                                    maxWidth: '60px',
                                                    height: '60px',
                                                    maxHeight: '60px'
                                                }} /></div>
                                            <h5 style={{ marginBottom: '-6px', fontSize: '10px' }} className="notranslate">{data.away_team_name.split(' ')[0]}</h5>
                                            <h5 style={{ marginBottom: '-6px', fontSize: '10px' }} className="notranslate">{data.away_team_name.split(' ')[1]}</h5>
                                            <h5 style={{ marginBottom: '-6px', fontSize: '10px' }} className="notranslate">{data.away_team_name.split(' ')[2]}</h5>

                                        </div>
                                    </div>
                                </div>
                            })}


                        </div>

                        :
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                            <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                        </div>
                    }
                </>
            }

        </div>

    )
}
{/* <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div> */}
export default withRouter(ClubMatch);
const Completionist = () => <></>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <Completionist />;
    } else {
        // Render a countdown
        return <h3 className="my-1" style={{ fontSize: '12px' }}><strong>{days}d:{hours}h:{minutes}m:{seconds}s</strong></h3>;
    }
};
export const CounterToMatchStart = (props) => {
    // console.log(props.currentTime)
    // console.log(props.matchStartTime)
    var now = utcToLocal(props.currentTime);
    var then = utcToLocal(props.matchStartTime);
    var ms = moment(now, "YYYY/MM/DD HH:mm:ss").diff(moment(then, "YYYY/MM/DD HH:mm:ss"));
    return (
        <Countdown
            date={Date.now() + ms}
            renderer={renderer}
        />
    )
}
const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}