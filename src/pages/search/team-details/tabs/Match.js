import React from 'react';
import { withRouter } from 'react-router-dom';
import { post } from '../../../../api';
import imgLive from '../../../../assets/img/logo-live.png';
import Moment from 'react-moment';

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchList: [],
            fixtures: [],
            team: '',
            loading: false
        }
    }
    componentDidMount() {
        console.log(this.props);
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
        payload.append('id', this.props.id);
        post('api/getTeamDetailsById', payload).then(res => {
            if (res.data.success == 1) {
                this.setState({
                    matchList: res.data.matches,
                    fixtures: res.data.fixtures,
                    team: res.data.team_name,
                    loading: false
                });
            }
        }).catch(err => {
            console.error(err);
        })
    }
    render() {
        const { matchList, fixtures, team, loading } = this.state;

        let resultStatus = [];
        resultStatus[2] = `<div class="bdstat draw">D</div>`;
        resultStatus[0] = `<div class="bdstat lose">L</div>`;
        resultStatus[1] = `<div class="bdstat win">W</div>`;
        return (
            <div className="tab-pane fade active p-3 in">
                <h4>Match</h4>
                <div class="lm bg-f4">
                    <table class="table table-striped custab">
                        <tbody>

                            {this.props.matchList && this.props.matchList.map((data, key) => {
                              return  <tr>
                                    <td class="text-small">
                                    
                                    <div class="matchdate" style={{color:'black',fontWeight: 600,fontSize: 10,letterSpacing: 0}}>{data.status=='CANCL'? 'CANCEL' :data.status }</div>
                                    
                                    <Moment format="ddd, DD/MM/YY">{data.date_time}</Moment> 
                                        <img src='' alt="" />
                                    </td>
                                    <td>
                                        <div class="col-xs-6 scrL">
                                            <img src={data.homeTeam_logo} alt="" style={{padding: 8}}/>
                                            {data.status!="NS" && data.status!="POSTP" && data.status!="CANCL" ? <span>{data.homeTeam_score}</span>
                                            : <span>-</span>}
                                            <h4 class="tl mt-10" style={{textAlign: 'center'}}>{data.homeTeam_name}</h4>
                                        </div>
                                        <div class="col-xs-6 scrR">
                                            {data.status!="NS" && data.status!="POSTP" && data.status!="CANCL" ? <span>{data.awayTeam_score}</span>
                                            :<span>-</span>}

                                            <img src={data.awayTeam_logo} alt="" style={{padding: 8}}/>
                                            <h4 class="tl mt-10" style={{textAlign: 'center'}}>{data.awayTeam_name}</h4>
                                        </div>
                                    </td>
                                </tr>
                            })
                            }
                        </tbody></table>
                </div>
            </div>
        );
    };
};

export default withRouter(Match);
