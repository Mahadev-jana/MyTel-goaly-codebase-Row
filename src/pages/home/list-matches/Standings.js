import React, { useState, useEffect } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import { isArray } from 'lodash';
import axios from '../../../_config/axios';
import loader from '../../../assets/loader/loaderspinner.gif';
import lostMatch from '../../../assets/icon/cross.png';
import drawMatch from '../../../assets/icon/draw.png';
import winMatch from '../../../assets/icon/tick.png';
import { Link } from 'react-router-dom';


const Standings = React.memo((props) => {

    const [isLoading, setIsLoaading] = React.useState(true);
    const [standings, setStandings] = useState([]);
    const [standingsLeagues, setLeaguesStandings] = useState([]);

    useEffect(() => {
        setStandings([]);
        setLeaguesStandings([]);
        getStanding();
    }, [props.id])

    const getStanding = () => {
        setIsLoaading(true);

        const payload = new FormData();
        payload.append('comp_id', props.id);
        axios.post('/standing', payload).then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.status == 1 && res.data.standing && isArray(res.data.standing)) {
                    setLeaguesStandings(res.data.standing);
                    setIsLoaading(false);
                }
                if (res.data.status == 0 && res.data.standing && isArray(res.data.standing)) {
                    setStandings(res.data.standing[0].data);
                    setIsLoaading(false);
                }
            }
            else {
                setStandings([]);
                setLeaguesStandings([]);
                setIsLoaading(false);
            }
        }).catch(err => {
            setIsLoaading(false);
            setStandings([]);
            setLeaguesStandings([]);
        })
    }


    return (
        

        <Grid fluid={true} className="bg-light">
            {!isLoading && <Row>
                <Col xs={12} className="pd-0">
                    <div class="standing text-black">
                        <Table striped condensed hover responsive>
                            <thead>
                                <tr className="clr-aqua">
                                    <th style={{ padding: 3 }}>Pos</th>
                                    <th style={{ padding: 3 }}>Team</th>
                                    <th style={{ padding: 3 }}>Name</th>
                                    <th style={{ padding: 3 }}>Pl</th>
                                    <th style={{ padding: 3 }}>W</th>
                                    <th style={{ padding: 3 }}>D</th>
                                    <th style={{ padding: 3 }}>L</th>
                                    <th style={{ padding: 3 }}>GD</th>
                                    <th style={{ padding: 3 }}>Pts</th>
                                    <th style={{ padding: 3, float: 'left',paddingLeft:'50px' }}>Last 5</th>
                                    <th ></th>
                                    <th ></th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody className="fs-12 standing_table">
                                {standings && standings.map((standing, key) => (
                                    <tr key={key}>
                                        <td style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{standing.position}</td>
                                        <td ><img src={standing.team_logo} style={{ padding: 3, height: 25, width: 25 }} /></td>
                                        <td className="oneline-text" style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>
                                            <Link to={`/team/${standing.team_Id}`} style={{ color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{standing.team_name}</Link>

                                        </td>
                                        <td style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{standing.games_played}</td>
                                        <td style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{standing.won}</td>
                                        <td style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{standing.draw}</td>
                                        <td style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{standing.lost}</td>
                                        <td style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{standing.goal_difference}</td>
                                        <td style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}><strong>{standing.points}</strong></td>
                                        <td style={{ display: 'inline-block', width: 140 }}
                                        >
                                            {standing.winner[0] == "win" && <div style={{ padding: 3, float: 'left' }}><img src={winMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                            {standing.winner[0] == "loss" && <div style={{ padding: 3, float: "left" }}><img src={lostMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                            {standing.winner[0] == "draw" && <div style={{ padding: 3, float: "left" }}><img src={drawMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}

                                            {standing.winner[1] == "win" && <div style={{ padding: 3, float: "left" }}><img src={winMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                            {standing.winner[1] == "loss" && <div style={{ padding: 3, float: "left" }}><img src={lostMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                            {standing.winner[1] == "draw" && <div style={{ padding: 3, float: "left" }}><img src={drawMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}

                                            {standing.winner[2] == "win" && <div style={{ padding: 3, float: "left" }}><img src={winMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                            {standing.winner[2] == "loss" && <div style={{ padding: 3, float: "left" }}><img src={lostMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                            {standing.winner[2] == "draw" && <div style={{ padding: 3, float: "left" }}><img src={drawMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}


                                            {standing.winner[3] == "win" && <div style={{ padding: 3, float: "left" }}><img src={winMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                            {standing.winner[3] == "loss" && <div style={{ padding: 3, float: "left" }}><img src={lostMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                            {standing.winner[3] == "draw" && <div style={{ padding: 3, float: "left" }}><img src={drawMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}



                                            {standing.winner[4] == "win" && <div style={{ padding: 3, float: "left" }}><img src={winMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                            {standing.winner[4] == "loss" && <div style={{ padding: 3, float: "left" }}><img src={lostMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                            {standing.winner[4] == "draw" && <div style={{ padding: 3, float: "left" }}><img src={drawMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                        </td>


                                    </tr>
                                ))}
                                {standingsLeagues && standingsLeagues.map((standing, key) => (
                                    <>
                                        <tr style={{ fontSize: '14px', color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0, whiteSpace: 'nowrap' }}>
                                            {standing.group_name}
                                        </tr>
                                        {standing.data && standing.data.map((teamTable, key) => (
                                            <tr>
                                                <td style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{teamTable.position}</td>
                                                <td style={{ padding: 3 }}><img src={teamTable.team_logo} style={{ height: 15, width: 15 }} /></td>
                                                <td className="oneline-text" style={{ padding: 3, fontSize: '14px', color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0, }}>
                                                    <Link to={`/team/${teamTable.team_Id}`} style={{ color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{teamTable.team_name}</Link></td>
                                                <td style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{teamTable.games_played}</td>
                                                <td style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{teamTable.won}</td>
                                                <td style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{teamTable.draw}</td>
                                                <td style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{teamTable.lost}</td>
                                                <td style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}>{teamTable.goal_difference}</td>
                                                <td style={{ padding: 3, color: 'black', fontWeight: 600, fontSize: 13, letterSpacing: 0 }}><strong>{teamTable.points}</strong></td>
                                                <td style={{ display: 'inline-block', width: 140 }}>
                                                    {teamTable.winner[0] == "win" && <div style={{ padding: 3, float: 'left' }}><img src={winMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                                    {teamTable.winner[0] == "loss" && <div style={{ padding: 3, float: "left" }}><img src={lostMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                                    {teamTable.winner[0] == "draw" && <div style={{ padding: 3, float: "left" }}><img src={drawMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}

                                                    {teamTable.winner[1] == "win" && <div style={{ padding: 3, float: "left" }}><img src={winMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                                    {teamTable.winner[1] == "loss" && <div style={{ padding: 3, float: "left" }}><img src={lostMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                                    {teamTable.winner[1] == "draw" && <div style={{ padding: 3, float: "left" }}><img src={drawMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}

                                                    {teamTable.winner[2] == "win" && <div style={{ padding: 3, float: "left" }}><img src={winMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                                    {teamTable.winner[2] == "loss" && <div style={{ padding: 3, float: "left" }}><img src={lostMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                                    {teamTable.winner[2] == "draw" && <div style={{ padding: 3, float: "left" }}><img src={drawMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}

                                                    {teamTable.winner[3] == "win" && <div style={{ padding: 3, float: "left" }}><img src={winMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                                    {teamTable.winner[3] == "loss" && <div style={{ padding: 3, float: "left" }}><img src={lostMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                                    {teamTable.winner[3] == "draw" && <div style={{ padding: 3, float: "left" }}><img src={drawMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}

                                                    {teamTable.winner[4] == "win" && <div style={{ padding: 3, float: "left" }}><img src={winMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                                    {teamTable.winner[4] == "loss" && <div style={{ padding: 3, float: "left" }}><img src={lostMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                                    {teamTable.winner[4] == "draw" && <div style={{ padding: 3, float: "left" }}><img src={drawMatch} style={{ height: "16px", width: "15px", margin: "2px" }} /></div>}
                                                </td>

                                            </tr>
                                        ))}
                                    </>
                                ))}
                                {!isLoading && standings.length == 0 && standingsLeagues.length == 0 && <> <div class="col-xs-12">
                                </div>
                                    <div class="col-xs-12" style={{ minHeight: 200, textAlign: 'center', marginTop: 100, marginLeft: 80 }}>
                                        No Record Found
							</div> </>
                                }

                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>}
            {isLoading && <> <div class="col-xs-4 ">
            </div>
                <div class="col-xs-4 " style={{ minHeight: 200, textAlign: 'center', marginTop: 100 }}>
                    <img src={loader} alt="" style={{ height: 60 }} />
                </div> </>
            }

        </Grid>
    )
});

export default Standings;