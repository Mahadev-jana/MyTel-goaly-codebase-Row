import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import { isArray } from 'lodash';
import axios from '../../../_config/axios';
// import { MatchSeriesSimmer } from '../../simmer-loader';
import { MatchSeriesSimmer } from '../../../simmer-loader';
import loader from '../../../assets/loader/loaderspinner.gif'


const Stats = React.memo((props) => {

    const [isLoading, setIsLoaading] = React.useState(true);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = React.useState(false);
    const [leagueStatus, setLeagueStatus] = useState([]);

    useEffect(() => {
        setStats([]);
        const saveleagueStatus = JSON.parse(localStorage.getItem('status'));
        if (saveleagueStatus == null || saveleagueStatus == undefined) {
            setLoading(true);
            const payload = new FormData();
            payload.append('comp_id', props.id);
            axios.post('/stats', payload).then(res => {
                if (res.data && res.data.success && res.data.success == 1) {
                    if (res.data.stats && isArray(res.data.stats)) {
                        //  setStats(res.data.stats);
                        const saveStatus = {
                            'comp_id': res.data.league_id,
                            'satus': JSON.stringify(res.data.stats)
                        }
                        leagueStatus.push(saveStatus);
                        localStorage.setItem('status', JSON.stringify(leagueStatus));

                        const saveleagueStatus = JSON.parse(localStorage.getItem('status'));
                        const data = saveleagueStatus.find(data => data.comp_id == props.id);
                        const status = JSON.parse(data.satus);
                        setLeagueStatus(status);

                        setLoading(false);
                    }
                } else {
                    setLoading(false);
                    setStats([]);
                }
            }).catch(err => {
                console.log({ err });
                setLoading(false);

            });
        }

        else {
            const saveleagueStatus = JSON.parse(localStorage.getItem('status'));
            const data = saveleagueStatus.find(data => data.comp_id == props.id);
            //console.log(data);
           
                if (data) {
                    const status = JSON.parse(data.satus);
                    setLeagueStatus(status);
                } else {
                    setLoading(true);
                    const payload = new FormData();
                    payload.append('comp_id', props.id);
                    console.log(payload);
                    axios.post('/stats', payload).then(res => {
                        if (res.data && res.data.success && res.data.success == 1) {
                            if (res.data.stats && isArray(res.data.stats)) {
                                const saveStatus = {
                                    'comp_id': res.data.league_id,
                                    'satus': JSON.stringify(res.data.stats)
                                }
                                let leagueStatus = JSON.parse(localStorage.getItem('status'));
                                leagueStatus.push(saveStatus);
                                localStorage.setItem('status', JSON.stringify(leagueStatus));
                                const saveleagueStatus = JSON.parse(localStorage.getItem('status'));
                                const data = saveleagueStatus.find(data => data.comp_id == props.id);
                                const status = JSON.parse(data.satus);
                                setLeagueStatus(status);
                                setLoading(false);
                            }
                        } else {
                            console.log('else else');
                            setLeagueStatus([]);
                            setLoading(false);
                            setStats([]);
                        }
                    }).catch(err => {
                        console.log({ err });
                        setLoading(false);
                    });
                }
        }



    }, [props.id]);


    return (
        <div>
            {loading && <> <div className="col-xs-4">
            </div>
                <div className="col-xs-4" style={{ minHeight: 200, textAlign: 'center', marginTop: 100 }}>
                    <img src={loader} alt="" style={{ height: 60 }} />
                </div> </>
            }
            {!loading && leagueStatus.length == 0 && <> <div className="col-xs-4">
            </div>
                <div className="col-xs-4" style={{ minHeight: 200, textAlign: 'center', marginTop: 100, width: '100%', color: 'black' }}>
                    No Record Found							</div> </>
            }
            {!loading && <Grid fluid={true} className="bg-light">
                <Row>
                    <Col xs={12} className="pd-0">
                        <div className="standing standing-home">
                            {leagueStatus && leagueStatus.map((stat, key) => <StatPlayers key={key} {...stat} />)}
                        </div>
                    </Col>
                </Row>
            </Grid>}

        </div>
    )
});

export default Stats;

const StatPlayers = React.memo(({ title, data }) => {
    return (
        <div>
            <Fragment>
                <h2 class="ml-10">{title}</h2>
                <table class="table table-striped table-responsive">
                    <thead>
                        <tr class="clr-aqua">
                            <th class="fs-12">Players</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th class="cds"  style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{title}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((player, key) => <StatPlayerSummery key={key} {...player} />)}
                    </tbody>
                </table>
            </Fragment>
        </div>

    )
});

const StatPlayerSummery = React.memo(({ pos, name, image_path, scores, team_name,team_logo }) => {
    return (
        <tr class="wpos">
            <td class="pos_num"  style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{pos}</td>
            <td class="ply">
                <img class="ply-sz" src={image_path} alt="" />
            </td>
            <td class="ply">
                <img class="ply-sz" src={team_logo} alt="" />
            </td>
            <td class="nam">
                <div class="nam-sz"  style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{name}</div>
                <div class="">
                    <span class="">
                        <img src="img/logo-Manchester_City_FC.png" height="22" alt="" />
                    </span>
                    <span class="nam-cl"  style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{team_name}</span>
                </div>
            </td>
            <td class="val"  style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{scores}</td>
        </tr>
    )
});