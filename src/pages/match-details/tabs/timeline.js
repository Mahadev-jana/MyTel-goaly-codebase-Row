import React, { Component } from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { post } from '../../../api';
import { CommentarySimmer } from '../../../simmer-loader';
import imgFootBall from '../../../assets/img/footballicon.png';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeline: [],
            loading: false
        }
    }
    componentDidMount() {
        this.setState({ loading: true });
        this.getTimeline();
        this.interval = setInterval(() => {
            this.getTimeline();
        }, 30000);

    }
    getTimeline = () => {
        const _this = this;
        const matchId = this.props.match.params.id;
        const payload = new FormData();
        payload.append('id', matchId);
        post('getMatchDetailsById', payload)
            .then(res => {
                if (res.data.success == 1) {
                    const timeLine = res.data.match_details[0].cards
                    // if (res.data.matchType === 'passed' && res.data.matchType === 'future')
                    //     clearInterval(this.interval);
                    this.setState({ timeline });
                   
                }
            })
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        const { timeline } = this.state;
        return (
            <div className="timeline" style={{ overflow: 'hidden' }}>
                {this.state.loading && <CommentarySimmer />}
                {timeline.hasOwnProperty('event') && timeline.event.map((data, key) => {
                    if (data.eventType === "yellowred")
                        return <YellowRed
                            key={key}
                            data={data}
                            homeTeamId={timeline.homeTeamId}
                            awayTeamId={timeline.awayTeamId}
                        />
                    if (data.eventType === "yellowcard")
                        return <YellowCard
                            key={key}
                            data={data}
                            homeTeamId={timeline.homeTeamId}
                            awayTeamId={timeline.awayTeamId}
                        />
                    if (data.eventType === "missed_penalty")
                        return <MissedPenalty
                            key={key}
                            data={data}
                            homeTeamId={timeline.homeTeamId}
                            awayTeamId={timeline.awayTeamId}
                        />
                    if (data.eventType === "goal")
                        return <Goal
                            key={key}
                            data={data}
                            homeTeamId={timeline.homeTeamId}
                            awayTeamId={timeline.awayTeamId}
                        />
                    if (data.eventType === "penalty")
                        return <Penalty
                            key={key}
                            data={data}
                            homeTeamId={timeline.homeTeamId}
                            awayTeamId={timeline.awayTeamId}
                        />
                    if (data.eventType === "substitution")
                        return <Substitution
                            key={key}
                            data={data}
                            homeTeamId={timeline.homeTeamId}
                            awayTeamId={timeline.awayTeamId}
                        />
                    return null;
                })}
            </div>
        );
    }
};

export default withRouter(Timeline.length);

const YellowRed = ({ data, homeTeamId, awayTeamId }) => (
    <div className="row" style={{ borderBottom: '1px solid #ccc' }}>
        <div className="col-xs-1 pt-5 pb-5">{data.time}'</div>
        <div className="col-xs-4 pt-5 pb-5">{Boolean(homeTeamId === data.team.id) && data.firstPlayer.name}</div>
        <div className={
            classnames("col-xs-2", "pd-0", "pt-5", "pb-5", {
                "text-left": Boolean(homeTeamId === data.team.id)
            }, {
                "text-right": Boolean(awayTeamId === data.team.id)
            })
        }>
            <span className="card-yellow"></span>
            <span className="red-yellow"></span>
        </div>
        <div className="col-xs-5 pt-5 pb-5">{Boolean(awayTeamId === data.team.id) && data.firstPlayer.name}</div>
    </div>
);

const YellowCard = ({ data, homeTeamId, awayTeamId }) => (
    <div className="row" style={{ borderBottom: '1px solid #ccc' }}>
        <div className="col-xs-1 pt-5 pb-5">{data.time}'</div>
        <div className="col-xs-4 pt-5 pb-5">{Boolean(homeTeamId === data.team.id) && data.firstPlayer.name}</div>
        <div className={
            classnames("col-xs-2", "pd-5", {
                "text-left": Boolean(homeTeamId === data.team.id)
            }, {
                "text-right": Boolean(awayTeamId === data.team.id)
            })
        }><span className="card-yellow"></span></div>
        <div className="col-xs-5 pt-5 pb-5">{Boolean(awayTeamId === data.team.id) && data.firstPlayer.name}</div>
    </div>
);

const Substitution = ({ data, homeTeamId, awayTeamId }) => (
    <div className="row" style={{ borderBottom: '1px solid #ccc' }}>
        <div className="col-xs-1 pt-5 pb-5">{data.time}'</div>
        <div className="col-xs-6 pt-5 pb-5">
            {Boolean(homeTeamId === data.team.id) && data.firstPlayer.name}<br />
            {Boolean(homeTeamId === data.team.id) && data.secondPlayer.name + ` (sub)`}
        </div>
        <div className="col-xs-5 pt-5 pb-5">
            {Boolean(awayTeamId === data.team.id) && data.firstPlayer.name}<br />
            {Boolean(awayTeamId === data.team.id) && data.secondPlayer.name + ` (sub)`}
        </div>
    </div>
);

const Goal = ({ data, homeTeamId, awayTeamId }) => (
    <div className="row" style={{ borderBottom: '1px solid #ccc' }}>
        <div className="col-xs-1 pt-5 pb-5">{data.time}'</div>
        <div className="col-xs-4 pt-5 pb-5">
            {Boolean(homeTeamId === data.team.id) && data.firstPlayer.name}<br />
            {Boolean(homeTeamId === data.team.id) && data.secondPlayer.name + ` (sub)`}
        </div>
        <div className={
            classnames("col-xs-2", "pd-5", {
                "text-left": Boolean(homeTeamId === data.team.id)
            }, {
                "text-right": Boolean(awayTeamId === data.team.id)
            })
        }><img src={imgFootBall} /></div>
        <div className="col-xs-5 pt-5 pb-5">
            {Boolean(awayTeamId === data.team.id) && data.firstPlayer.name}<br />
            {Boolean(awayTeamId === data.team.id) && data.secondPlayer.name + ` (sub)`}
        </div>
    </div>
);

const Penalty = ({ data, homeTeamId, awayTeamId }) => (
    <div className="row" style={{ borderBottom: '1px solid #ccc' }}>
        <div className="col-xs-1 pt-5 pb-5">{data.time}'</div>
        <div className="col-xs-4 pt-5 pb-5">
            {Boolean(homeTeamId === data.team.id) && data.firstPlayer.name + ` (penalty)`}
        </div>
        <div className={
            classnames("col-xs-2", "pd-5", {
                "text-left": Boolean(homeTeamId === data.team.id)
            }, {
                "text-right": Boolean(awayTeamId === data.team.id)
            })
        }><img src={imgFootBall} /></div>
        <div className="col-xs-5 pt-5 pb-5">
            {Boolean(awayTeamId === data.team.id) && data.firstPlayer.name + ` (penalty)`}
        </div>
    </div>
);

const MissedPenalty = ({ data, homeTeamId, awayTeamId }) => (
    <div className="row" style={{ borderBottom: '1px solid #ccc' }}>
        <div className="col-xs-1 pt-5 pb-5">{data.time}'</div>
        <div className="col-xs-4 pt-5 pb-5">{Boolean(homeTeamId === data.team.id) && data.firstPlayer.name}</div>
        <div className="col-xs-2 pd-5"
            style={{
                color: 'red',
                letterSpacing: '0.5px',
                lineHeight: '12px',
                textAlign: 'center'
            }}
        >Missed Penalty</div>
        <div className="col-xs-5 pt-5 pb-5">{Boolean(awayTeamId === data.team.id) && data.firstPlayer.name}</div>
    </div>
);
 