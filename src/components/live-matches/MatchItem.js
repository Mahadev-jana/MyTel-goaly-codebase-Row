import React from 'react';
import imgLive from '../../assets/img/logo-live.png';
import imgMissingLogo from '../../assets/img/missing_photo.png';

const MatchItem = ({ awayTeam, awayTeamBadge, awayTeam_score, homeTeam, homeTeamBadge, homeTeam_score, matchStarted }) => {
    return (
        <React.Fragment>
            <div className="row no-margin">
                <div className="hr"></div>
                <div className="col-xs-5">
                    <p className="badge text-small">In Progress</p>
                </div>
                <div className="col-xs-7">
                    <p className="text-small mt-5"
                        style={{
                            textAlign: 'right',
                            fontSize: '12px',
                            letterSpacing: '1px'
                        }}
                    >{matchStarted}<span className="blink"><img src={imgLive} style={{ height: "20px", width: "48px" }} /></span></p>
                </div>
                <div style={{ clear: 'both' }}></div>
            </div>
            <div className="row">
                <div className="col-xs-6 scrL" style={{ position: 'relative' }}>
                    <img src={homeTeamBadge ? homeTeamBadge : imgMissingLogo} style={{
                        position: 'absolute',
                        left: '50px',
                        top: 0,
                        bottom: 0,
                        margin: 'auto',
                        height: '60px',
                        width: '60px'
                    }} />
                    <div>
                        <span>
                            <label>{homeTeam_score}</label>
                        </span>
                    </div>
                    <div style={{ clear: 'both' }}></div>

                </div>
                <div className="col-xs-6 scrR" style={{ position: 'relative' }}>
                    <img src={awayTeamBadge ? awayTeamBadge : imgMissingLogo} style={{
                        position: 'absolute',
                        right: '50px',
                        top: 0,
                        bottom: 0,
                        margin: 'auto',
                        height: '60px',
                        width: '60px'
                    }} />
                    <div>
                        <span>
                            <label>{awayTeam_score}</label>
                        </span>
                    </div>
                    <div style={{ clear: 'both' }}></div>

                </div>
                <div style={{ clear: 'both' }}></div>
                <div className="col-xs-12">
                    <h4 className="tl" style={{
                        width: '50%',
                        display: 'inline-block',
                        textAlign: 'center',
                        fontSize: '14px',
                        letterSpacing: '1px'
                    }}>{homeTeam}</h4>
                    <h4 className="tl" style={{
                        width: '50%',
                        display: 'inline-block',
                        textAlign: 'center',
                        fontSize: '14px',
                        letterSpacing: '1px'
                    }}>{awayTeam}</h4>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MatchItem;