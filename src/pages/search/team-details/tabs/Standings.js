import React from 'react';
import { withRouter } from 'react-router-dom';
import { post } from '../../../../api';
import NewsComponent from './NewsComponent';

class Standings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            standing: [],
            league: '',
            loading: false
        }
    }
    componentDidMount() {
        this.getMatches();
    }
    componentWillReceiveProps(oldProps, newProps) {
        if (oldProps !== newProps) {
            this.getMatches();
        }
    }
    getMatches = () => {
        this.setState({ loading: true });
        const payload = new FormData();
        payload.append('id', this.props.search);
        post('teamStanding', payload).then(res => {
            console.warn({ res });
            if (res.data.success == 1) {
                this.setState({
                    standing: res.data.standing,
                    league: res.data.league,
                    loading: false
                });
            }
        }).catch(err => {
            console.error(err);
        })
    }
    render() {
        const { standing, league, loading } = this.state;
        return (
            <div className="tab-pane fade active p-3 in">
                <div className="part" style={{ padding: '10px' }}>
                    <div className="tab-pane fade active p-3 in">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="lm">
                                    <h4>Standing {Boolean(league !== '') && <span style={{
                                        color: '#b9b9b9',
                                        padding: '0 2px',
                                        letterSpacing: '0.8px'
                                    }}
                                    ></span>}</h4>
                                    <div class="liner"></div>
                                    {loading && <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '32px 0px',
                                        background: '#e9e9e9',
                                        color: '#8e8e8e',
                                        letterSpacing: '1px'
                                    }}>
                                        <div>Loading...</div>
                                    </div>}
                                    {!loading && !Boolean(Object.keys(standing).length) && <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '32px 0px',
                                        background: '#e9e9e9',
                                        color: '#8e8e8e',
                                        letterSpacing: '1px'
                                    }}>
                                        <div>Oop!</div>
                                        <div>No standing found!!</div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {Boolean(Object.keys(standing).length) && <div class="standing">
                        <table class="table table-striped table-responsive">
                            <thead>
                                <tr class="clr-aqua">
                                    <th>Pos</th>
                                    <th>Teams</th>
                                    <th>Pl</th>
                                    <th>W</th>
                                    <th>D</th>
                                    <th>L</th>
                                    {/* <th>GD</th> */}
                                    <th>Pts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {standing.map((data, key) => (
                                    <>

                                        <tr className="wpos" key={key}>
                                            <td>{key + 1}</td>
                                            <td>{data.team_name}</td>
                                            <td>{data.games_played}</td>
                                            <td>{data.won}</td>
                                            <td>{data.draw}</td>
                                            <td>{data.lost}</td>
                                            <td><strong>{data.points}</strong></td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                </div>
            </div>
        );
    };
};

export default withRouter(Standings);