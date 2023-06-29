import React, { Fragment } from 'react';

const GoalKeeper = (props) => {
    const {playerInfo}=props;
    return (
        <Fragment>
            <div className="tab-content row">

                <div className="block bg-grey">
                    <div className="player-stats-main block bg-white shadow radius-1">
                        <div className="box border-right border-bottom">Match Played<br />
                            <strong>{playerInfo.appearences==='' ? 0 : playerInfo.appearences}</strong>

                        </div>
                        <div className="box border-bottom border-left">Saves<br />

                            <strong>{playerInfo.goals_saves===''? 0 : playerInfo.goals_saves}</strong>
                        </div>
                        <div className="w-100 d-flex j-center">
                            <div className="progress-circle c100 p75 m-0 green" style={{ margin: "-13% 0" }}>
                                <span>
                                    <strong>Clean<br />Sheets</strong>
                                    <span>{playerInfo.cleansheet===''? 0 : playerInfo.cleansheet}</span>
                                </span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="box border-top border-right"><strong>{playerInfo.minutes===''? 0 : playerInfo.minutes}</strong> <br />Minutes</div>
                        <div className="box border-left border-top"><strong>{playerInfo.interception===''? 0 : playerInfo.interception}</strong> <br />Interception</div>
                    </div>
                </div>
                <div className="player-stats-detail block" style={{ backgroundColor: '#fff' }}>
                    <h3 className="m-0 p-1 bg-dark text-white text-center">Goal Keeping</h3>
                    <div className="block bg-white shadow">
                        <ul>
                            <li>
                                <span>Saves</span>
                                <span>{playerInfo.goals_saves===''? 0 : playerInfo.goals_saves}</span>
                            </li>

                            <li>
                                <span>Inside Box Saves</span>
                                <span>{playerInfo.goals_insidebox_save==='' ? 0 : playerInfo.goals_insidebox_save}</span>
                            </li>
                            <li>
                                <span>Penalties Saves</span>
                                <span>{playerInfo.goals_saves===''? 0 : playerInfo.goals_saves}</span>
                            </li>
                            <li>
                                <span>Penalties Missed</span>
                                <span>{playerInfo.penalty_scores===''? 0 : playerInfo.penalty_scores}</span>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="player-stats-detail block" style={{ backgroundColor: '#fff' }}>
                    <h3 className="m-0 p-1 bg-dark text-white text-center">Defence</h3>
                    <div className="block bg-white shadow">
                        <ul>
                            <li>
                                <span>Own Goal</span>
                                <span>{playerInfo.own_goal===''? 0 : playerInfo.own_goal}</span>
                            </li>

                            <li>
                                <span>Clean Sheets</span>
                                <span>{playerInfo.cleansheet===''? 0 : playerInfo.cleansheet}</span>
                            </li>
                            

                        </ul>
                    </div>
                </div>
                <div className="player-stats-detail block" style={{ backgroundColor: '#fff' }}>
                    <h3 className="m-0 p-1 bg-dark text-white text-center">Team Play</h3>
                    <div className="block bg-white shadow">
                        <ul>
                            <li>
                                <span>Goals</span>
                                <span>{playerInfo.goals===''? 0 : playerInfo.goals}</span>
                            </li>

                            <li>
                                <span>Assists</span>
                                <span>{playerInfo.assist===''? 0 : playerInfo.assist}</span>
                            </li>
                            <li>
                                <span>Passes</span>
                                <span>{playerInfo.pass_total===''? 0 : playerInfo.pass_total}</span>
                            </li>
                            <li>
                                <span>Cross Accurate</span>
                                <span>{playerInfo.crosses_accurate===''? 0 : playerInfo.crosses_accurate}</span>
                            </li>
                        </ul>
                    </div>
                </div><div className="player-stats-detail block" style={{ backgroundColor: '#fff' }}>
                    <h3 className="m-0 p-1 bg-dark text-white text-center">Discipline</h3>
                    <div className="block bg-white shadow">
                        <ul>
                            <li>
                                <span>Yellow card</span>
                                <span>{playerInfo.yellow_card===''? 0 : playerInfo.yellow_card}</span>
                            </li>

                            <li>
                                <span>Red Card</span>
                                <span>{playerInfo.red_card===''? 0 : playerInfo.red_card}</span>
                            </li>
                            <li>
                                <span>Fouls</span>
                                <span>{playerInfo.foul_drawn===''? 0 : playerInfo.foul_drawn}</span>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default GoalKeeper;