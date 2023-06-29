import React from 'react';
import { withRouter } from 'react-router-dom';
import { post } from '../../../../api';
import imgLive from '../../../../assets/img/logo-live.png';
class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchList: [],
            team: ''
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.getMatches(id);
    }
    getMatches = (id) => {
        const payload = new FormData();
        payload.append('search', this.props.search);
        post('getteammatches', payload).then(res => {
            console.warn({res});
            if (res.data.success == 1) {
                this.setState({
                    matchList: res.data.matches,
                    team: res.data.team
                });
            }
        }).catch(err => {
            console.error(err);
        })
    }
    render() {
        const { matchList, team } = this.state;
        console.table(matchList);
        return(
            <div className="tab-pane fade active p-3 in">
                <div className="part">
                    <div className="row">
                        <div className="col-xs-9">
                            <div className="pt-team">
                                <img src="img/psg.png" height="24px" alt=""/>{team}
                            </div>
                        </div>
                        <div className="col-xs-3">
                        </div>
                    </div>
                </div>
                <div class="part" id="myTabContent">
                    <div class="tab-pane fade active p-3 in" id="one" aria-labelledby="one-tab">
                        <div className="row">
                            <div class="col-xs-12">
                                <div class="lm" style={{marginLeft: '10px'}}>
                                    <h4>Matches</h4>
                                </div>
                                <div className="lm bg-f4">
								    <table className="table table-striped custab">
									    <tbody>
                                            {matchList && matchList.map((data, key)=> {
                                            if (Boolean(data.type==='current'))
                                                return(<tr key={key} className="clickable-row" onClick={()=>this.props.history.push(`/match/details/${data.id}`)}>
                                                    <td className="text-small" style={{fontSize: '9px', padding: '8px 0px'}}>
                                                        {dateFormat(data.started)} <br/>
                                                        <img src={imgLive}/>
                                                    </td>
                                                    <td>
                                                        <div className="col-xs-6 scrL">
                                                            <img src={data.homeTeam.badge} alt="" style={{height: '50px', width: '50px'}}/>
                                                            <span>{data.homeTeam.score}</span>
                                                            <h4 className="tl mt-10">{data.homeTeam.name}</h4>
                                                        </div>
                                                        <div className="col-xs-6 scrR">
                                                            <span>{data.awayTeam.score}</span>
                                                            <img src={data.awayTeam.badge} alt="" style={{height: '50px', width: '50px'}}/>
                                                            <h4 className="tl mt-10">{data.awayTeam.name}</h4>
                                                        </div>
                                                    </td>
                                                </tr>);
                                            if (Boolean(data.type === 'passed'))
                                                return (<tr key={key} className="clickable-row" onClick={() => this.props.history.push(`/match/details/${data.id}`)}>
                                                    <td className="text-small" style={{fontSize: '9px', padding: '8px 0px'}}>
                                                        {dateFormat(data.started)} <br />
                                                        {/* <img src={imgLive} /> */}
                                                    </td>
                                                    <td>
                                                        <div className="col-xs-6 scrL">
                                                            <img src={data.homeTeam.badge} alt="" style={{height: '50px', width: '50px'}}/>
                                                            <span>{data.homeTeam.score}</span>
                                                            <h4 className="tl mt-10">{data.homeTeam.name}</h4>
                                                        </div>
                                                        <div className="col-xs-6 scrR">
                                                            <span>{data.awayTeam.score}</span>
                                                            <img src={data.awayTeam.badge} alt="" style={{height: '50px', width: '50px'}}/>
                                                            <h4 className="tl mt-10">{data.awayTeam.name}</h4>
                                                        </div>
                                                    </td>
                                                </tr>);
                                            return(<tr key={key} className="clickable-row" data-href="matches-timeline.php">
                                                <td className="text-small" style={{fontSize: '9px', padding: '8px 0px'}}>
                                                    {dateFormat(data.started)}
                                                </td>
                                                <td>
                                                    <div className="col-xs-6 scrL">
                                                        <img src={data.homeTeam.badge} alt="" style={{height: '50px', width: '50px'}}/>
                                                        <span>-</span>
                                                        <h4 className="tl mt-10">{data.homeTeam.name}</h4>
                                                    </div>
                                                    <div className="col-xs-6 scrR">
                                                        <span>-</span>
                                                        <img src={data.awayTeam.badge} alt="" style={{height: '50px', width: '50px'}}/>
                                                        <h4 className="tl mt-10">{data.awayTeam.name}</h4>
                                                    </div>
                                                </td>
                                            </tr>);
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default withRouter(Match);

const dateFormat = (date) => {
	const array = date.split(' ');
	return date;
}