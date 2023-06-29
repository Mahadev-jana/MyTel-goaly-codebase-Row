import React, { useState, useEffect } from 'react';
import axios from '../../_config/axios';
import { LeagueSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import Albion from '../../assetsStaging/img/ic-albion.png';
import Chelsea from '../../assetsStaging/img/ic-chelsea.png';
import Manchester from '../../assetsStaging/img/ic-mancity.png';
const ClubStandings = (props) => {
    //console.log(props)
    
    const { standings, loadingStandings } = props;
    return (
        <div className="tab-content row">


            {loadingStandings ?
                <>
                    <LeagueSimmer />
                    <LeagueSimmer />
                </>

                :
                <>
                    {standings.length >= 1 ?
                        <div className="standings table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className="bg-dark text-white">
                                        <td colSpan="2">Team</td>
                                        <td>Pts</td>
                                        <td>P</td>
                                        <td>W</td>
                                        <td>D</td>
                                        <td>L</td>
                                        <td>F</td>
                                        <td>A</td>
                                        <td>GD</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {standings && standings.map((standing, key) => {
                                        return <tr key={key}>
                                            <td className="bg-green text-white">{key + 1}.</td>
                                            <td style={{ whiteSpace: "nowrap" }}>
                                                <div className="desc">
                                                    <img src={standing.team_logo} alt=""
                                                    style={{maxWidth:'50px'}} />
                                                    <div className="team">
                                                        <span>{standing.team_name}</span>
                                                        <ul>
                                                            {standing.winner.map((win, key) => {
                                                                if (win.slice(0, 1) == "w" || win.slice(0, 1) == "l") { 
                                                                return <li key={key} className={win.slice(0, 1).toUpperCase() == 'W' ? "bg-green" : win.slice(0, 1).toUpperCase() == 'L' ? 'bg-red' : "bg-orange"}>{win.slice(0, 1).toUpperCase()}</li>
                                                               }
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="smw"><strong>{standing.points}</strong></td>
                                            <td className="smw">{standing.points} <br /> <span className="radius-1 bg-grey" style={{ padding: '4px' }}>-1</span></td>
                                            <td className="smw">{standing.won}</td>
                                            <td className="smw">{standing.draw}</td>
                                            <td className="smw">{standing.lost}</td>
                                            <td className="smw">{standing.goals_scored}</td>
                                            <td className="smw">{standing.goals_against}</td>
                                            <td className="smw">{standing.goal_difference}</td>
                                        </tr>

                                    })}

                                </tbody>
                            </table>
                        </div>

                        :
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                            <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                        </div>

                    }
                </>
            }
        </div>
    )
}
export default ClubStandings;