import React from 'react';
import { filter, size } from 'lodash';

import HomeTeamLineUp from './HomeTeamLineUp';
import AwayTeamLineUp from './AwayTeamLineUp';
import field from '../../../assets/img/detail-match/field.png';
import '../../../assetsStaging/css/lineup.css';
const LineUps = React.memo(({ homeTeamId, awayTeamId,homeTeamName, awayTeamName,homeTeamLogo, awayTeamLogo, lineup,scrolled }) => {
    const homeTeamLineup = filter(lineup, data => data.team_id === homeTeamId);
    const awayTeamLineup = filter(lineup, data => data.team_id === awayTeamId);

    const homeTeamG = filter(homeTeamLineup, lineup => lineup.position === 'G');
    const homeTeamD = filter(homeTeamLineup, lineup => lineup.position === 'D');
    const homeTeamM = filter(homeTeamLineup, lineup => lineup.position === 'M');
    const homeTeamA = filter(homeTeamLineup, lineup => lineup.position === 'A');

    homeTeamD.sort((a, b) => (a.formation_position > b.formation_position) ? 1 : -1)
    homeTeamM.sort((a, b) => (a.formation_position > b.formation_position) ? 1 : -1)
    homeTeamA.sort((a, b) => (a.formation_position > b.formation_position) ? 1 : -1)

    const awayTeamG = filter(awayTeamLineup, lineup => lineup.position === 'G');
    const awayTeamD = filter(awayTeamLineup, lineup => lineup.position === 'D');
    const awayTeamM = filter(awayTeamLineup, lineup => lineup.position === 'M');
    const awayTeamA = filter(awayTeamLineup, lineup => lineup.position === 'A');
    
    awayTeamD.sort((a, b) => (a.formation_position < b.formation_position) ? 1 : -1)
    awayTeamM.sort((a, b) => (a.formation_position < b.formation_position) ? 1 : -1)
    awayTeamA.sort((a, b) => (a.formation_position < b.formation_position) ? 1 : -1)

    return (
        <div class="timeline">
        {!Boolean(Object.keys(lineup).length)  ? 
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
                                                lineHeight:1.3
                                            }}
                                        >
                                        <img src={field} style={{height:100,padding:11}}/>
                                            
                                        <div><span style={{ fontWeight: 800 }}>NO DATA</span></div>
                                        <div>YET FOR THIS MATCH</div>
                            </td>
                                    </tr>
                                </tbody>:
            <div className="field">
            
                <div class="field-wrap">
                <div class="home-info">
                    <div class="name">
                        <img src={homeTeamLogo} style={{height:60,width:60}} alt="" />
                         <div style={{fontSize:'9px',textAlign:'center'}}><span class="notranslate">{homeTeamName}</span> </div>
                    </div>
                    <div class="formation">{size(homeTeamD)}-{size(homeTeamM)}-{size(homeTeamA)}</div>
                </div>
                    <div class="corners">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div class="middle"></div>
                    <div class="circle"></div>
                    <div class="center"></div>
                    <div class="goal-box">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div class="goal-box goal-box-right">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <HomeTeamLineUp G={homeTeamG} D={homeTeamD} M={homeTeamM} A={homeTeamA} />
                    <AwayTeamLineUp G={awayTeamG} D={awayTeamD} M={awayTeamM} A={awayTeamA} />
                    <div class="away-info">
                    <div class="name">
                        <img src={awayTeamLogo} style={{ height:60,width:60 }} alt="" />
                        <div style={{fontSize:'9px',textAlign:'center'}}><span class="notranslate">{awayTeamName}</span></div>
                    </div>
                    <div class="formation">{size(awayTeamD)}-{size(awayTeamM)}-{size(awayTeamA)}</div>
                </div>
                </div>
             
            </div>}
        </div>
    )
});

export default LineUps;