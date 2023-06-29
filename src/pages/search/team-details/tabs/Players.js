import React from 'react';
import { withRouter } from 'react-router-dom';
import { post } from '../../../../api';
import NewsComponent from './NewsComponent';

class Players extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            team: '',
            loading: false
        }
    }
    componentDidMount() {
        this.getPlayers();
    }
    componentWillReceiveProps(oldProps, newProps) {
        if (oldProps !== newProps ) {
            this.getMatches();
        }
    }
    getPlayers = () => {
        this.setState({loading: true})
        const payload = new FormData();
        payload.append('id', this.props.search);
        post('getteamplayers', payload).then(res => {
            console.warn({res});
            if (res.data.success == 1) {
                this.setState({
                    players: res.data.players,
                    team: res.data.team,
                    loading: false
                });
            }
        }).catch(err => {
            console.error(err);
        })
    }
    render() {
        const { news, players, team, loading } = this.state;
        console.table(news);
        return(
            <div className="tab-pane fade active p-3 in">
                <div className="part" style={{padding: '10px'}}>
                    <div className="tab-pane fade active p-3 in">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="lm">
                                    <h4>Players {Boolean(team !== '') && <span style={{
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
                                    {!loading && !Boolean(players.length) && <div style={{
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
                                        <div>Players not found!!</div>
                                    </div>}
                               
                                <div className="row">
                                    {players && players.map((data, key)=>(
                                        <div key={key} className="col-xs-4" style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <img src={data.image_path} alt="" className="rounded img-responsive" /> 
                                            <h4 style={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                maxWidth: '100%',
                                                textAlign: 'center',
                                                fontSize: '11px',
                                                letterSpacing: '0.5px'
                                            }}>{data.lastname}</h4>
                                            {/* <h5>Forward</h5> */}
                                        </div>
                                    ))}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default withRouter(Players);

const dateFormat = (date) => {
	// console.log({date});
	const array = date.split(' ');
	// console.log({array});
	return date;
}