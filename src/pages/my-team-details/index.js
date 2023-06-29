import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { post } from '../../api';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import imgLatestNews from '../../assets/img/latest_news.png';
import NewsComponent from './NewsComponent';
class MyTeamDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            news: [],
            loading: false
        }
    }
    componentDidMount() {
        this.getMyTeamDetails();
    }
    getMyTeamDetails = () => {
        const id = this.props.match.params.id;
        this.setState({ loading: true });
        const payload = new FormData();
        payload.append('search', id);
        post('favteamdata', payload)
            .then(res => {
                this.setState({
                    matches: res.data.matches,
                    news: res.data.news,
                    loading: false
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        const { loading, search, suggestion, matches, news } = this.state;
        return (
            <React.Fragment>
                {/* <Helmet>
                    <title>Goaly | Team Details</title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
                <div className="page-content mt-10">
                    <div className="col-xs-12 main-cat">
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
                        {!loading && <div class="well">
                            <div class="team mt-0">
                                {news && Boolean(news.length) && <>
                                    <h4>News</h4>
                                    {news && news.map((data, key) => (<NewsComponent key={key} data={data} />))}
                                    <div class="clearfix"></div>
                                </>}
                                {matches && Boolean(matches.length) && <>
                                    <h4>Match</h4>
                                    <div class="lm bg-f4">
                                        <table class="table table-striped custab">
                                            <tbody>
                                                {matches && matches.map((data, key) => {
                                                    if (Boolean(data.type === 'current'))
                                                        return (<tr key={key} className="clickable-row" onClick={() => this.props.history.push(`/match/details/${data.id}`)}>
                                                            <td className="text-small" style={{ fontSize: '9px', padding: '8px 0px' }}>
                                                                {dateFormat(data.started)} <br />
                                                                <img src={imgLive} />
                                                            </td>
                                                            <td>
                                                                <div className="col-xs-6 scrL">
                                                                    <img src={data.homeTeam.badge} alt="" style={{ height: '50px', width: '50px' }} />
                                                                    <span>{data.homeTeam.score}</span>
                                                                    <h4 className="tl mt-10">{data.homeTeam.name}</h4>
                                                                </div>
                                                                <div className="col-xs-6 scrR">
                                                                    <span>{data.awayTeam.score}</span>
                                                                    <img src={data.awayTeam.badge} alt="" style={{ height: '50px', width: '50px' }} />
                                                                    <h4 className="tl mt-10">{data.awayTeam.name}</h4>
                                                                </div>
                                                            </td>
                                                        </tr>);

                                                    if (Boolean(data.type === 'passed'))
                                                        return (<tr key={key} className="clickable-row" onClick={() => this.props.history.push(`/match/details/${data.id}`)}>
                                                            <td className="text-small" style={{ fontSize: '9px', padding: '8px 0px' }}>
                                                                {dateFormat(data.started)} <br />
                                                                {/* <img src={imgLive} /> */}
                                                            </td>
                                                            <td>
                                                                <div className="col-xs-6 scrL">
                                                                    <img src={data.homeTeam.badge} alt="" style={{ height: '50px', width: '50px' }} />
                                                                    <span>{data.homeTeam.score}</span>
                                                                    <h4 className="tl mt-10">{data.homeTeam.name}</h4>
                                                                </div>
                                                                <div className="col-xs-6 scrR">
                                                                    <span>{data.awayTeam.score}</span>
                                                                    <img src={data.awayTeam.badge} alt="" style={{ height: '50px', width: '50px' }} />
                                                                    <h4 className="tl mt-10">{data.awayTeam.name}</h4>
                                                                </div>
                                                            </td>
                                                        </tr>);
                                                    return (<tr key={key} className="clickable-row" >
                                                        <td className="text-small" style={{ fontSize: '9px', padding: '8px 0px' }}>
                                                            {dateFormat(data.started)}
                                                        </td>
                                                        <td>
                                                            <div className="col-xs-6 scrL">
                                                                <img src={data.homeTeam.badge} alt="" style={{ height: '50px', width: '50px' }} />
                                                                <span>-</span>
                                                                <h4 className="tl mt-10">{data.homeTeam.name}</h4>
                                                            </div>
                                                            <div className="col-xs-6 scrR">
                                                                <span>-</span>
                                                                <img src={data.awayTeam.badge} alt="" style={{ height: '50px', width: '50px' }} />
                                                                <h4 className="tl mt-10">{data.awayTeam.name}</h4>
                                                            </div>
                                                        </td>
                                                    </tr>);
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </>}
                            </div>
                            <div class="clearfix"></div>
                        </div>}
                    </div>
                    <div className="clearfix"></div>
                </div>
            </React.Fragment>
        );
    }
};

export default withRouter(MyTeamDetails);

// const NewsComponent = ({data}) => (
//     <div className="post post-widget">
//         <Link to={`/latest/${data.id}`} className="post-img">
//             <img src={data.media_url===''? imgLatestNews : data.media_url} alt="" />
//         </Link>
//         <div className="post-body">
//             <h3 className="post-title">
//                 <Link to={`/latest/${data.id}`}>{data.title}</Link>
//             </h3>
//         </div>
//     </div>
// );

const dateFormat = (date) => {
    const array = date.split(' ');
    return date;
}