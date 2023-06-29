import React from 'react';
import { LeagueSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import {withRouter} from 'react-router-dom';
import Face1 from '../../assetsStaging/img/face.png';

const ClubPlayer = (props) => {
    const { goalkeepers, defenders, attackers, midfilders, loadingPlayers } = props;
    //console.log(props)
    // console.log(goalkeepers);
    // console.log(defenders);
    // console.log(attackers);
    // console.log(midfilders);
    return (
        <div className="tab-content row">
             <div className="standings table-responsive">
                <table className="table">
                    {loadingPlayers
                        ?
                        <LeagueSimmer />
                        :
                        <>
                            {midfilders.length >= 1 ?
                                <>
                                    <thead>
                                        <tr className="bg-dark text-white">
                                            <td>No.</td>
                                            <td>Midfilders</td>
                                            <td>Played</td>
                                            <td>Goals</td>
                                            <td>Yellow</td>
                                            <td>Red</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {midfilders && midfilders.map((midfilder, key) => {
                                            return <tr key={key} onClick={() => props.history.push({
                                                pathname: `/player-info/${midfilder.player_id}`,
                                                state: { playerId:midfilder.player_id, compId:midfilder.competition_id }
                                            })}>
                                                <td>{key + 1}</td>
                                                <td style={{ whiteSpace: 'normal' }}>
                                                    <div className="desc" style={{width:'210px'}}>
                                                        <img src={midfilder.player_image} alt="" style={{ width: '55px', maxWidth: '55px' }} />
                                                        <div className="team">
                                                            <span>{midfilder.player_name}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{(midfilder.played === null || midfilder.played === '') ? 0 : midfilder.played}</td>
                                                <td>{(midfilder.goals === null || midfilder.goals === '') ? 0 : midfilder.goals}</td>

                                                <td>{(midfilder.yellowcards === null || midfilder.yellowcards === '') ? 0 : midfilder.yellowcards}</td>
                                                <td>{(midfilder.redcards === null || midfilder.redcards === '') ? 0 : midfilder.redcards}</td>
                                            </tr>
                                        })}
                                    </tbody>

                                </>
                                :
                                <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                                    <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                                </div>

                            }
                        </>
                    }
                </table>
            </div>

            <div className="standings table-responsive">
                <table className="table">
                    {loadingPlayers
                        ?
                        <LeagueSimmer />
                        :
                        <>
                            {goalkeepers.length >= 1 ?
                                <>
                                    <thead>
                                        <tr className="bg-dark text-white">
                                            <td>No.</td>
                                            <td>Goal Keepers</td>
                                            <td>Played</td>
                                            <td>Save</td>
                                            <td>Yellow</td>
                                            <td>Red</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {goalkeepers && goalkeepers.map((goalkeeper, key) => {
                                            return <tr key={key}
                                             onClick={() => props.history.push({
                                                pathname: `/player-info/${goalkeeper.player_id}`,
                                                state: { playerId:goalkeeper.player_id, compId:goalkeeper.competition_id }
                                            })}
                                             >
                                                <td>{key + 1}</td>
                                                <td style={{ whiteSpace: 'normal' }}>
                                                    <div className="desc" style={{width:'210px'}}>
                                                        <img src={goalkeeper.player_image} alt="" style={{ width: '55px', maxWidth: '55px' }} />
                                                        <div className="team">
                                                            <span>{goalkeeper.player_name}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{(goalkeeper.played === null || goalkeeper.played === '') ? 0 : goalkeeper.played}</td>
                                                <td>{(goalkeeper.saves === null || goalkeeper.saves === '') ? 0 : goalkeeper.saves}</td>

                                                <td>{(goalkeeper.yellowcards === null || goalkeeper.yellowcards === '') ? 0 : goalkeeper.yellowcards}</td>
                                                <td>{(goalkeeper.redcards === null || goalkeeper.redcards === '') ? 0 : goalkeeper.redcards}</td>
                                            </tr>

                                        })}

                                    </tbody>

                                </>
                                :
                                <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                                    <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                                </div>

                            }
                        </>
                    }

                </table>
            </div>

            <div className="standings table-responsive">
                <table className="table">
                    {loadingPlayers
                        ?
                        <LeagueSimmer />
                        :
                        <>
                            {defenders.length >= 1 ?
                                <>
                                    <thead>

                                        <tr className="bg-dark text-white">
                                            <td>No.</td>
                                            <td>Defenders</td>
                                            <td>Played</td>
                                            <td>Save</td>
                                            <td>Yellow</td>
                                            <td>Red</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {defenders && defenders.map((defender, key) => {
                                            return <tr key={key} onClick={() => props.history.push({
                                                pathname: `/player-info/${defender.player_id}`,
                                                state: { playerId:defender.player_id, compId:defender.competition_id }
                                            })}>
                                                <td>{key + 1}</td>
                                                <td style={{ whiteSpace: 'normal' }}>
                                                    <div className="desc" style={{width:'210px'}}>
                                                        <img src={defender.player_image} alt="" style={{ width: '55px', maxWidth: '55px' }} />
                                                        <div className="team">
                                                            <span>{defender.player_name}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{(defender.played === null || defender.played === '') ? 0 : defender.played}</td>
                                                <td>{(defender.saves === null || defender.saves === '') ? 0 : defender.saves}</td>

                                                <td>{(defender.yellowcards === null || defender.yellowcards === '') ? 0 : defender.yellowcards}</td>
                                                <td>{(defender.redcards === null || defender.redcards === '') ? 0 : defender.redcards}</td>

                                            </tr>
                                        })}

                                    </tbody>

                                </>
                                :
                                <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                                    <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                                </div>
                            }
                        </>
                    }
                </table>
            </div>

            <div className="standings table-responsive">
                <table className="table">
                    {loadingPlayers
                        ?
                        <LeagueSimmer />
                        :
                        <>
                            {attackers.length >= 1 ?
                                <>
                                    <thead>
                                        <tr className="bg-dark text-white">
                                            <td>No.</td>
                                            <td>Attackers</td>
                                            <td>Played</td>
                                            <td>Goals</td>
                                            <td>Yellow</td>
                                            <td>Red</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {console.log(props.compId,'clubID')} */}
                                        {attackers && attackers.map((attacker, key) => {
                                            return <tr key={key} onClick={() => props.history.push({
                                                pathname: `/player-info/${attacker.player_id}`,
                                                state: { playerId:attacker.player_id, compId:attacker.competition_id}
                                            })}>
                                                <td>{key + 1}</td>
                                                <td style={{ whiteSpace: 'normal' }}>
                                                    <div className="desc" style={{width:'210px'}}>
                                                        <img src={attacker.player_image} alt="" style={{ width: '55px', maxWidth: '55px' }} />
                                                        <div className="team">
                                                            <span>{attacker.player_name}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{(attacker.played === null || attacker.played === '') ? 0 : attacker.played}</td>
                                                <td>{(attacker.goals === null || attacker.goals === '') ? 0 : attacker.goals}</td>

                                                <td>{(attacker.yellowcards === null || attacker.yellowcards === '') ? 0 : attacker.yellowcards}</td>
                                                <td>{(attacker.redcards === null || attacker.redcards === '') ? 0 : attacker.redcards}</td>
                                            </tr>
                                        })}
                                    </tbody>

                                </>
                                :
                                <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                                    <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                                </div>
                            }
                        </>
                    }
                </table>
            </div>

           
        </div>
    )
}
export default withRouter(ClubPlayer);