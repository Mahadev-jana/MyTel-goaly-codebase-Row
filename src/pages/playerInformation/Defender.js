import React,{Fragment} from 'react';

const Defender = (props) =>{
    const {playerInfo}=props;
    return(
        <Fragment>
            <div className="tab-content row">

                <div className="block bg-grey">
                    <div className="player-stats-main block bg-white shadow radius-1">
                        <div className="box border-right border-bottom">Match Played<br />
                            <strong>{playerInfo.appearences==='' ? 0 : playerInfo.appearences}</strong>

                        </div>
                        <div className="box border-bottom border-left">{/*Clean Sheets*/}Tackle<br />

                            <strong>{playerInfo.cleansheet===''? 0 : playerInfo.cleansheet}</strong>
                        </div>
                        <div className="w-100 d-flex j-center">
                            <div className="progress-circle c100 p75 m-0 green" style={{ margin: "-13% 0" }}>
                                <span>
                                    <strong>Goals</strong>
                                    <span>{playerInfo.goals===''? 0 : playerInfo.goals}</span>
                                </span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                        <div className="box border-top border-right"><strong>{playerInfo.minutes===''? 0 : playerInfo.minutes}</strong> <br />Minutes</div>
                        <div className="box border-left border-top"><strong>{playerInfo.pass_accurate==='' ? 0 : playerInfo.pass_accurate}</strong> <br />{/*Pass Accuracy*/}Interception</div>
                    </div>
                </div>
                <div className="player-stats-detail block" style={{ backgroundColor: '#fff' }}>
                    <h3 className="m-0 p-1 bg-dark text-white text-center">Defences</h3>
                    <div className="block bg-white shadow">
                        <ul>
                            <li>
                                <span>Tackle</span>
                                <span>{playerInfo.tackles===''? 0 : playerInfo.tackles}</span>
                            </li>

                            <li>
                                <span>Interception</span>
                                <span>{playerInfo.interception===''? 0 : playerInfo.interception}</span>
                            </li>
                            <li>
                                <span>Fouls Drawn</span>
                                <span>{playerInfo.foul_drawn===''? 0 : playerInfo.foul_drawn}</span>
                            </li>
                            <li>
                                <span>Blocks</span>
                                <span>{playerInfo.blocks===''? 0 : playerInfo.blocks}</span>
                            </li>
                            <li>
                                <span>Own Goals</span>
                                <span>{playerInfo.own_goal===''? 0 : playerInfo.own_goal}</span>
                            </li>
                            <li>
                                <span>Duel Won</span>
                                <span>{playerInfo.duel_own===''? 0 : playerInfo.duel_own}</span>
                            </li>
                            {/* <li>
                                <span>Duel Lost</span>
                                <span>{playerInfo.own_goal===''? 0 : playerInfo.own_goal}</span>
                            </li> */}

                        </ul>
                    </div>
                </div>
                <div className="player-stats-detail block" style={{ backgroundColor: '#fff' }}>
                    <h3 className="m-0 p-1 bg-dark text-white text-center">Attacks</h3>
                    <div className="block bg-white shadow">
                        <ul>
                            <li>
                                <span>Goals</span>
                                <span>{playerInfo.goals===''? 0 : playerInfo.goals}</span>
                            </li>

                            <li>
                                <span>Penalties Scores</span>
                                <span>{playerInfo.penalty_scores===''? 0 : playerInfo.penalty_scores}</span>
                            </li>
                            <li>
                                <span>Duels Won</span>
                                <span>{playerInfo.duel_own===''? 0 : playerInfo.duel_own}</span>
                            </li>

                            <li>
                                <span>Total Shots</span>
                                <span>{playerInfo.short_total===''? 0 : playerInfo.short_total}</span>
                            </li>
                            <li>
                                <span>Shots on Target</span>
                                <span>{playerInfo.short_on_target===''? 0 : playerInfo.short_on_target}</span>
                            </li>

                            <li>
                                <span>Shots off target</span>
                                <span>{playerInfo.short_off_target===''? 0 : playerInfo.short_off_target}</span>
                            </li>
                            <li>
                                <span>Dribbles</span>
                                <span>{playerInfo.dribbles_attempts===''? 0 : playerInfo.dribbles_attempts}</span>
                            </li>

                            

                        </ul>
                    </div>
                </div>
                <div className="player-stats-detail block" style={{ backgroundColor: '#fff' }}>
                    <h3 className="m-0 p-1 bg-dark text-white text-center">Team Play</h3>
                    <div className="block bg-white shadow">
                        <ul>
                        <li>
                                <span>Crosses</span>
                                <span>{playerInfo.cross_total===''? 0 : playerInfo.cross_total}</span>
                            </li>

                            <li>
                                <span>Cross Accurate</span>
                                <span>{playerInfo.crosses_accurate===''? 0 : playerInfo.crosses_accurate}</span>
                            </li>
                            <li>
                                <span>Passes</span>
                                <span>{playerInfo.pass_total===''? 0 : playerInfo.pass_total}</span>
                            </li>
                            <li>
                                <span>Assists</span>
                                <span>{playerInfo.assist===''? 0 : playerInfo.assist}</span>
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
                                <span>{playerInfo.red_card===''? 0 : playerInfo.red_card}{playerInfo.red_card}</span>
                            </li>
                            <li>
                                <span>Fouls</span>
                                <span>{playerInfo.foul_commited==='' ? 0 : playerInfo.foul_commited}</span>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    
    )
}
export default Defender;