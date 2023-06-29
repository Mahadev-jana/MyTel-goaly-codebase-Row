import React from 'react';
import field from '../../../assets/img/detail-match/field.png';
const Players = React.memo(({ playersStats,loadingPlayerStat }) => {
    // console.log("players");
    // console.log(players);

    return (

        <div className="timeline">
            {playersStats.length==0 && !loadingPlayerStat && <tbody>
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
            </tbody>}
            {loadingPlayerStat &&
            <div>loading....</div>
            }
            <div className="row" style={{ color: '#000', padding: 16 }}>
                {playersStats.final_passes && <div style={{ height: "33px", background: "#D9004B", color: "white", lineHeight: 3, padding: "0 10px" }}>
                    <div className="pull-left">
                        <strong>Passes</strong>
                    </div>
                    <div className="pull-right">
                        Successfull/Total
                    </div>
                </div>}
                {playersStats.final_passes && <table className="table table-responsive players">
                    <tbody>
                        {playersStats.final_passes.map((pass, key) => (
                            <tr key={key}>
                                <td className="one">
                                    <img src={pass.team_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td className="ver-mid">
                                    <span class="notranslate">{pass.players_name}</span>
                                </td>
                                <td className="one">
                                    <img src={pass.players_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td className="text-right">
                                    <strong>{Math.round(pass.passes_success==null ? 0 : pass.passes_success)}</strong> / {pass.passes_total==null? 0 : pass.passes_total}
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>}


                {playersStats.final_passingAccuracy && <div className="goaly" style={{ height: "33px", background: "#D9004B", color: "white", lineHeight: 3, padding: "0 10px" }}>
                    <div className="pull-left">
                        <strong>Passing Accuracy (Final Third)</strong>
                    </div>
                    <div className="pull-right">
                        &nbsp;
										</div>
                </div>}
                {playersStats.final_passingAccuracy && <table className="table table-responsive players">
                    <tbody>
                        {playersStats.final_passingAccuracy.map((accuray, key) => (
                            <tr key={key}>
                                <td className="one" style={{paddingLeft:'13px'}}>
                                    <img src={accuray.team_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td className="ver-mid">
                                    <span class="notranslate">{accuray.players_name}</span>
                                </td>
                                <td className="one" style={{paddingRight:'25px'}}>
                                    <img src={accuray.players_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td className="text-right">
                                    <strong>{accuray.passing_accuracy==null ? 0 : accuray.passing_accuracy}%</strong>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>}

                {playersStats.final_crosses && <div className="goaly" style={{ height: "33px", background: "#D9004B", color: "white", lineHeight: 3, padding: "0 10px" }}>
                    <div className="pull-left">
                        <strong>Crosses</strong>
                    </div>
                    <div className="pull-right">
                        Successfull/Total
										</div>
                </div>}
                {playersStats.final_crosses && <table className="table table-responsive players">
                    <tbody>
                        {playersStats.final_crosses.map((cross, key) => (
                            <tr key={key}>
                                <td className="one">
                                    <img src={cross.team_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td className="ver-mid">
                                    <span class="notranslate">{cross.players_name}</span>
                                </td>
                                <td className="one" style={{paddingLeft:0,paddingRight:'16px'}}>
                                    <img src={cross.players_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td className="text-right">
                                    <strong>{cross.crosses_accuracy==null ? 0 : cross.crosses_accuracy }</strong> / {cross.crosses_total==null ? 0 : cross.crosses_total}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
                {playersStats.final_shots && <div className="goaly" style={{ height: "33px", background: "#D9004B", color: "white", lineHeight: 3, padding: "0 10px" }}>
                    <div className="pull-left">
                        <strong>Shots</strong>
                    </div>
                    <div className="pull-right">
                        Goal / On Target / Total
										</div>
                </div>}
                {playersStats.final_shots && <table className="table table-responsive players">
                    <tbody>
                        {playersStats.final_shots.map((shorts, key) => (
                            <tr key={key}>
                                <td className="one" style={{paddingLeft:'13px'}}>
                                    <img src={shorts.team_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td className="ver-mid" style={{paddingLeft:'35px'}}>
                                    <span class="notranslate">{shorts.players_name}</span>
                                </td>
                                <td className="one" style={{paddingLeft:'16px'}}>
                                    <img src={shorts.players_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td></td>
                                <td className="text-right">
                                    <strong>{shorts.shots_goal==null? 0 : shorts.shots_goal}</strong> / {shorts.shots_onTarget==null ? 0 : shorts.shots_onTarget} / {shorts.shots_total==null ? 0 : shorts.shots_total}
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>}

                {playersStats.final_changesCreated && <div className="goaly" style={{ height: "33px", background: "#D9004B", color: "white", lineHeight: 3, padding: "0 10px" }}>
                    <div className="pull-left">
                        <strong>Chances Created</strong>
                    </div>
                    <div className="pull-right">
                        Assists / Chances
										</div>
                </div>}

                {playersStats.final_changesCreated && <table className="table table-responsive players">
                    <tbody>
                        {playersStats.final_changesCreated.map((assists, key) => (
                            <tr key={key}>
                                <td className="one">
                                    <img src={assists.team_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td className="ver-mid">
                                    <span class="notranslate">{assists.players_name}</span>
                                </td>
                                <td className="one" style={{paddingLeft:'0px',paddingRight:'20px'}}>
                                    <img src={assists.players_logo} alt="" style={{ height: 25, width: 25 }} />
                                </td>
                                <td className="text-right">
                                    <strong>{assists.created_assists==null ? 0 : assists.created_assists}</strong> / {assists.created_chances==null ? 0 : assists.created_chances}
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>}
            </div>
        </div>
    )
});

export default Players;