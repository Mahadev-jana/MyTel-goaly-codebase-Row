import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { MatchSeriesSimmer } from '../../simmer-loader';
import { post } from '../../api';
import imgLive from '../../assets/img/logo-live.png';
import { gmtToLocalTime } from '../../_helper/authentication';
import { dateTimeFomat } from '../../_helper/date-format';
import './style.css';

class LiveMatchDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveMatches: [],
            loading: true,
            filter: 'tomorrow'
        }
    }
    componentDidMount() {
        this.getLiveMatchList(this.props.id);
    }
    onClickFilter = filter => {
        if (this.state.filter !== filter) {
            this.setState({ filter });
            if (filter === 'live')
                this.filterLiveMatch();
            else {
                this.filterByDate(filter);
            }
        } else {
            this.setState({ filter: '' });
            this.getLiveMatchList(this.props.id);
        }
    }
    filterLiveMatch = () => {
        this.setState({ loading: true });
        const payload = new FormData();
        payload.append('comp_id', this.props.id);
        post('matchByLeague', payload)
            .then(res => {
                const liveMatches = res.data.matches;
                let filterFiveMatches = {};
                for (var key in liveMatches) {
                    const filterLiveMatch = liveMatches[key].filter(match => match.type === "current");
                    if (Boolean(filterLiveMatch.length))
                        filterFiveMatches[key] = filterLiveMatch;
                }
                this.setState({
                    liveMatches: filterFiveMatches,
                    loading: false
                });
            })
            .catch(err => console.log(err));
    }
    filterByDate = dayType => {
        this.setState({ loading: true });
        let toDay = new Date();
        toDay = new Date(toDay.toLocaleDateString())
        let filterFiveMatches = {};
        const payload = new FormData();
        payload.append('comp_id', this.props.id);
        post('matchByLeague', payload)
            .then(res => {
                const liveMatches = res.data.matches;
                if (dayType == 'yesterday') {
                    for (var key in liveMatches) {
                        const filterLiveMatch = liveMatches[key].filter(match => matchDate(match.started).getTime() < toDay.getTime());
                        if (Boolean(filterLiveMatch.length))
                            filterFiveMatches[key] = filterLiveMatch;
                    }
                }

                if (dayType == 'today') {
                    for (var key in liveMatches) {
                        const filterLiveMatch = liveMatches[key].filter(match => matchDate(match.started).getTime() === toDay.getTime());
                        if (Boolean(filterLiveMatch.length))
                            filterFiveMatches[key] = filterLiveMatch;
                    }
                }

                if (dayType == 'tomorrow') {
                    for (var key in liveMatches) {
                        const filterLiveMatch = liveMatches[key].filter(match => matchDate(match.started).getTime() > toDay.getTime());
                        if (Boolean(filterLiveMatch.length))
                            filterFiveMatches[key] = filterLiveMatch;
                    }
                }
                this.setState({
                    liveMatches: filterFiveMatches,
                    loading: false
                });
            })
            .catch(err => console.log(err));



    }
    componentWillReceiveProps(props) {
        this.getLiveMatchList(props.id);
    }
    getLiveMatchList = (id) => {
        const _this = this;
        this.setState({ loading: true });
        const payload = new FormData();
        payload.append('comp_id', id);
        post('matchByLeague')
            .then(res => {
                _this.setState({ liveMatches: res.data.matches, loading: false });
            })
            .catch(err => console.log(err));
    }
    render() {
        const { title } = this.props;
        const { liveMatches, loading } = this.state;
        return (
            <div>
                <div className="row" style={{
                    marginTop: '15px'
                }}>
                    <div className="col-xs-3" style={{
                        textAlign: 'center'
                    }}>
                        <span className={
                            classnames(
                                "filter-button",
                                {
                                    "filter-button-active": Boolean(this.state.filter === 'live')
                                }
                            )
                        }
                            onClick={() => this.onClickFilter('live')}
                        ><img src={imgLive} alt="live logo" /></span>
                    </div>
                    <div className="col-xs-9" style={{
                        textAlign: 'right'
                    }}>
                        <span className={
                            classnames(
                                "datetime", "btn", "btn-default",

                            )
                        }
                            style={Boolean(this.state.filter === 'yesterday') ? { background: '#D8004B', color: '#fff' } : { background: '#fff', color: '#000' }}
                            onClick={() => this.onClickFilter('yesterday')}
                        >Previous </span>
                        <span className={
                            classnames(
                                "datetime", "btn", "btn-default",

                            )
                        }
                            style={Boolean(this.state.filter === 'today') ? { background: '#D8004B', color: '#fff' } : { background: '#fff', color: '#000' }}
                            onClick={() => this.onClickFilter('today')}
                        >Today</span>
                        <span className={
                            classnames(
                                "datetime", "btn", "btn-default",

                            )
                        }
                            style={Boolean(this.state.filter === 'tomorrow') ? { background: '#D8004B', color: '#fff' } : { background: '#fff', color: '#000' }}
                            onClick={() => this.onClickFilter('tomorrow')}
                        >Next</span>
                    </div>
                </div>
                {loading && <MatchSeriesSimmer />}
                {!loading && <div className="part" style={{ marginTop: '20px' }}>
                    <div className="series-title">{title.length > 15 ? title.slice(0, 15) + '...' : title}</div>
                    <Link to="/standing/8" className="stand btn btn-default chk2">
                        <i className="fas fa-table"></i>&nbsp; Standing
                    </Link>
                    <div className="col-xs-12 mt-10">
                        <div className="lm">
                            <table className="table table-striped custab">
                                <thead>
                                    <tr>
                                        <th><strong>Matches</strong></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                {!Boolean(Object.keys(liveMatches).length) && <tbody>
                                    <tr>
                                        <td colspan="2"
                                            style={{
                                                fontSize: '18px',
                                                color: 'rgb(171, 171, 171)',
                                                letterSpacing: '1px',
                                                fontWeight: 600,
                                                padding: '50px 0',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <div>Oops!</div>
                                            <div>Match not found!!</div>
                                        </td>
                                    </tr>
                                </tbody>}
                                {Boolean(Object.keys(liveMatches).length) && <tbody>
                                    {Object.entries(liveMatches).map((live, key) => (
                                        <React.Fragment>
                                            {Boolean(live[0] !== '') && <tr>
                                                <td
                                                    colSpan="2"
                                                    style={{
                                                        fontSize: '18px',
                                                        color: '#b1b1b1',
                                                        letterSpacing: '1px',
                                                        fontWeight: 600
                                                    }}
                                                >{live[0]}</td>
                                            </tr>}

                                            {live && live[1].map((data, key) => {
                                                if (Boolean(data.type === 'current'))
                                                    return (<tr key={key} className="clickable-row" onClick={() => this.props.history.push(`/match/details/${data.id}`)}>
                                                        <td className="text-small">
                                                            {dateTimeFomat(data.started)} <br />
                                                            <img src={imgLive} />
                                                        </td>
                                                        <td>
                                                            <div className="col-xs-6 scrL">
                                                                <img src={data.homeTeam.badge} alt="" />
                                                                <span>{data.homeTeam.score}</span>
                                                                <h4 className="tl mt-10">{data.homeTeam.name}</h4>
                                                            </div>
                                                            <div className="col-xs-6 scrR">
                                                                <span>{data.awayTeam.score}</span>
                                                                <img src={data.awayTeam.badge} alt="" />
                                                                <h4 className="tl mt-10">{data.awayTeam.name}</h4>
                                                            </div>
                                                        </td>
                                                    </tr>);
                                                if (Boolean(data.type === 'passed'))
                                                    return (<tr key={key} className="clickable-row" onClick={() => this.props.history.push(`/match/details/${data.id}`)}>
                                                        <td className="text-small">
                                                            {dateTimeFomat(data.started)} <br />
                                                        </td>
                                                        <td>
                                                            <div className="col-xs-6 scrL">
                                                                <img src={data.homeTeam.badge} alt="" />
                                                                <span>{data.homeTeam.score}</span>
                                                                <h4 className="tl mt-10">{data.homeTeam.name}</h4>
                                                            </div>
                                                            <div className="col-xs-6 scrR">
                                                                <span>{data.awayTeam.score}</span>
                                                                <img src={data.awayTeam.badge} alt="" />
                                                                <h4 className="tl mt-10">{data.awayTeam.name}</h4>
                                                            </div>
                                                        </td>
                                                    </tr>);
                                                return (<tr key={key} className="clickable-row" onClick={() => this.props.history.push(`/match/details/${data.id}`)}>
                                                    <td className="text-small">
                                                        {dateTimeFomat(data.started)}
                                                    </td>
                                                    <td>
                                                        <div className="col-xs-6 scrL">
                                                            <img src={data.homeTeam.badge} alt="" />
                                                            <span>-</span>
                                                            <h4 className="tl mt-10">{data.homeTeam.name}</h4>
                                                        </div>
                                                        <div className="col-xs-6 scrR">
                                                            <span>-</span>
                                                            <img src={data.awayTeam.badge} alt="" />
                                                            <h4 className="tl mt-10">{data.awayTeam.name}</h4>
                                                        </div>
                                                    </td>
                                                </tr>);
                                            })}
                                        </React.Fragment>
                                    ))}
                                </tbody>}
                            </table>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>}
            </div>
        );
    }
};

export default withRouter(LiveMatchDetails);

const matchDate = date => {
    const time = `${date} GMT`;
    var myDate = new Date(time);
    myDate.setHours(myDate.getHours() - 1);
    myDate = myDate.toLocaleDateString();
    return new Date(myDate);
}