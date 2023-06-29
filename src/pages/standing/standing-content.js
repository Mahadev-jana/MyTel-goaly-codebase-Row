import React from 'react';
import { Link } from 'react-router-dom';
import { post } from '../../api';
import champiounsLeague from '../../assets/json/standing_json.json';

class StandingContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            standing: [],
            loading: true,
            flag: true
        }
    }
    componentDidMount() {
        this.getStandingDetails(this.props.id);
    }
    componentWillReceiveProps(props) {
        this.getStandingDetails(props.id);
    }
    getStandingDetails = (id) => {
  
        this.setState({ loading: true });
        if (id == 1) {
            this.setState({
                standing: champiounsLeague.standing,
                loading: false
            })
        } else {
            const payload = new FormData();
            payload.append('comp_id', id);
            post('standing', payload)
                .then(res => {
                    this.setState({ standing: [] });

                    if (res.data.success == 1) {
                        this.setState({
                            standing: res.data.standing,
                            loading: false
                        })
                    } else {
                        this.setState({ standing: [] });

                        this.setState({ flag: false });
                        this.setState({ loading: false });
                    }
                })
                .catch(err => console.log(err))
        }
    }

    render() {
        const { loading, standing, flag } = this.state;
        const { title } = this.props;
        return (
            <div className="tab-content mt-5" id="myTabContent">
                <div className="tab-pane fade active p-3 in" id="one" aria-labelledby="one-tab">
                    <div className="part">
                        <div className="series-title">{title.length > 15 ? title.slice(0, 15) + '...' : title}</div>
                        <Link to="/live" className="stand btn btn-default chk2">
                            <i className="fas fa-arrow-left"></i>&nbsp; Back
                        </Link>
                        <div className="col-xs-12 mt-10">
                            <div className="standing">
                                <h2>{title} Standing</h2>
                                {loading && <div style={{
                                    width: '100%',
                                    height: '300px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '18px',
                                    color: '#ababab',
                                    letterSpacing: '1px'
                                }}>Loading...</div>}
                                {!loading && standing && <table className="table table-striped table-responsive">
                                    <thead>
                                        <tr className="clr-aqua">
                                            <th>Pos</th>
                                            <th>Teams</th>
                                            <th>Pl</th>
                                            <th>W</th>
                                            <th>D</th>
                                            <th>L</th>
                                            <th>Pts</th>
                                        </tr>
                                    </thead>
                                    {/* <tbody>
                                        {Object.entries(standing).map((data, key) => (
                                            <>
                                                {data[0].trim() !== '' && <tr><td colSpan="7" key={key} style={{
                                                    fontWeight: '600',
                                                    fontSize: '16px',
                                                    letterSpacing: '1px',
                                                    color: '#c5c5c5'
                                                }}>{data[0]}</td></tr>}
                                                {data[1].map((data, key) => (
                                                    <tr className="wpos" key={key}>
                                                        <td>{key + 1}</td>
                                                        <td><img src={data.team_logo} height="22" />&nbsp; {data.team_name.slice(0, 3).toUpperCase()}</td>
                                                        <td>{data.pl}</td>
                                                        <td>{data.w}</td>
                                                        <td>{data.d}</td>
                                                        <td>{data.l}</td>
                                                        <td><strong>{data.pts}</strong></td>
                                                    </tr>
                                                ))}
                                            </>
                                        ))}
                                    </tbody> */}

                                    <tbody>
                                        {(standing).map((data, key) => (
                                            <>
                                                {<tr><td colSpan="7" key={key} style={{
                                                    fontWeight: '600',
                                                    fontSize: '16px',
                                                    letterSpacing: '1px',
                                                    color: '#c5c5c5'
                                                }}>{data.group_name}</td></tr>}
                                                {data.data.map((data, key) => (
                                                    <tr className="wpos" key={key}>
                                                        <td>{key + 1}</td>
                                                        <td><img src={data.team_logo} height="22" />&nbsp; {data.team_name.slice(0, 3).toUpperCase()}</td>
                                                        <td>{data.games_played}</td>
                                                        <td>{data.won}</td>
                                                        <td>{data.draw}</td>
                                                        <td>{data.lost}</td>
                                                        <td><strong>{data.points}</strong></td>
                                                    </tr>
                                                ))}
                                            </>
                                        ))}
                                    </tbody>

                                </table>}
                                {!loading && !flag && standing.length==0 &&
                                    <>
                                        <div style={{ textAlign: 'center', fontSize: 18 }}>No Record Found !</div>
                                    </>

                                }
                            </div>
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        );
    }
};

export default StandingContent;