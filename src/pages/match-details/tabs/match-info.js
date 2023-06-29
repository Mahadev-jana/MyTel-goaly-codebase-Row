import React, { Component } from 'react';
import { post } from '../../../api';
import imgYellowCard from '../../../assets/img/ycard.png';
import imgFootBall from '../../../assets/img/footballicon.png';
class MatchInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchInfo: {}
        }
    }
    componentDidMount() {
        this.getPredictionList()
    }
    getPredictionList = () => {
        const payload = new FormData();
        payload.append('id', this.props.id);
        post('matchinfo', payload)
        .then(res => {
            const matchInfo = res.data.events;
            this.setState({ matchInfo});
        })
        .catch(err=>console.log(err));
    }
    render() {
        const { matchInfo } = this.state;

        return(
            <div className="col-xs-12 lm">
                {matchInfo && matchInfo.hasOwnProperty('event') && matchInfo.event.map((data, key)=>{
                    switch (data.eventType) {
                        case "goal":
                            return (<div className="row" key={key} style={{borderBottom: '1px solid #ececec'}}>
                                    <div className="col-xs-1">{`${data.time}'`}</div>
                                    <div className="col-xs-4">
                                        {Boolean(matchInfo.awayTeamId==data.team.id) && <div>
                                                <div style={{display: 'inline-block', marginRight: '2px'}}>{data.firstPlayer.name}</div>
                                                <img style={{height: '15px', margin: '2px'}} src={imgFootBall} />
                                            </div>}
                                    </div>
                                    <div className="col-xs-3"></div>
                                    <div className="col-xs-4">
                                        {Boolean(matchInfo.homeTeamId==data.team.id) && <div>
                                            <div style={{display: 'inline-block', marginRight: '2px'}}>{data.firstPlayer.name}</div>
                                            <img style={{height: '15px', margin: '2px'}} src={imgFootBall} />
                                        </div>}
                                    </div>
                                </div>);
                        case "substitution":
                             return (<div className="row" key={key} style={{borderBottom: '1px solid #ececec'}}>
                                        <div className="col-xs-1">{`${data.time}'`}</div>
                                        <div className="col-xs-4">{data.eventType}</div>
                                        <div className="col-xs-3">{data.firstPlayer.name}</div>
                                        <div className="col-xs-4">{data.secondPlayer.name}</div>
                                    </div>)
                        case "yellowcard":
                             return (<div className="row" key={key} style={{borderBottom: '1px solid #ececec'}}>
                                        <div className="col-xs-1">{`${data.time}'`}</div>
                                        <div className="col-xs-4" style={{textAlign: 'right'}}>
                                            {Boolean(matchInfo.awayTeamId==data.team.id) && <div>
                                                <div style={{display: 'inline-block', marginRight: '2px'}}>{data.firstPlayer.name}</div>
                                                <img style={{height: '15px', margin: '2px'}} src={imgYellowCard} />
                                            </div>}
                                        </div>
                                        <div className="col-xs-3"></div>
                                        <div className="col-xs-4">
                                            {Boolean(matchInfo.homeTeamId==data.team.id) && 'yellocard'}
                                        </div>
                                    </div>);
                        default:
                            return null;
                    }
                })}
            </div>
        );
    }
};

export default MatchInfo;