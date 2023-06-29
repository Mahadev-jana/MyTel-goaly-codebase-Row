import React from 'react';
import { withRouter } from 'react-router-dom';
import { post } from '../../../api';
import Moment from 'react-moment';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';


// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';


class Prediction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            pred: {},
            allowZeroExpanded: true,
            prediction: {},
            correct_score: [],
            status: {},
            homeWin: 0,
            awayWin: 0,
            draw: 0,
            homeTeamScore: 0,
            awayTeamScore: 0,
            homeTeam_logo: '',
            awayTeam_logo: '',
        }
    }

    componentDidMount() {
 
        this.setState({ prediction: this.props.prediction.prediction });
        this.setState({ correct_score: this.props.prediction.correct_score });
        this.setState({ status: this.props.prediction.status });
        this.setState({ homeTeam_name: this.props.prediction.teams.homename });
        this.setState({ awayTeam_name: this.props.prediction.teams.awayname });
        this.setState({ homeTeam_logo: this.props.prediction.teams.homebadge });
        this.setState({ awayTeam_logo: this.props.prediction.teams.awaybadge });

        // this.getTeamDetails();
        // const payload = new FormData();
        // payload.append('homeTeam', this.props.homeTeamId);
        // payload.append('awayTeam', this.props.awayTeamId);
        // post('StageGoalyApi/getHeadToHead', payload)
        //     .then(res => {
        //         this.setState({ matches: res.data.matches, pred: res.data.pred });
        //         this.state.matches.forEach((matchDetails, key) => {
        //             if (matchDetails.status == 2) {
        //                 this.state.draw = this.state.draw + 1;
        //             } else {
        //                 if (matchDetails.winnerTeamId == this.props.homeTeam) {
        //                     this.state.homeWin = this.state.homeWin + 1;
        //                 } else {
        //                     this.state.awayWin = this.state.awayWin + 1;
        //                 }
        //             }
        //             if (this.props.homeTeam == matchDetails.homeTeamId) {
        //                 this.state.homeTeamScore = this.state.homeTeamScore + matchDetails.homeTeamScore;
        //             } else if (this.props.homeTeam == matchDetails.awayTeamId) {
        //                 this.state.homeTeamScore = this.state.homeTeamScore + matchDetails.awayTeamScore;
        //             }
        //             if (this.props.awayTeam == matchDetails.homeTeamId) {
        //                 this.state.awayTeamScore = this.state.awayTeamScore + matchDetails.homeTeamScore;

        //             } else if (this.props.awayTeam == matchDetails.awayTeamId) {
        //                 this.state.awayTeamScore = this.state.awayTeamScore + matchDetails.awayTeamScore;
        //             }
        //         })
        //     })
        //     .catch(err => console.log(err));
    }

    // getTeamDetails() {
    //     const payload = new FormData();
    //     payload.append('homeTeam', this.props.homeTeamId);
    //     payload.append('awayTeam', this.props.awayTeamId);
    //     post('StageGoalyApi/getLastMatchByTeam', payload)
    //         .then(res => {
    //             this.setState({ homeTeam_match: res.data.homeTeam_match });
    //             this.setState({ awayTeam_match: res.data.awayTeam_match });
    //             this.setState({ homeTeam_name: res.data.home_name });
    //             this.setState({ awayTeam_name: res.data.away_name });
    //             this.setState({ homeTeam_logo: res.data.home_logo });
    //             this.setState({ awayTeam_logo: res.data.away_logo });
    //         })
    //         .catch(err => console.log(err));
    // }

   
    render() {
        //console.log(this.props.prediction)
        const { matches, pred, prediction, correct_score, status, homeTeam_name,
            awayTeam_name, homeTeam_logo, awayTeam_logo, draw, homeWin, awayWin, homeTeamScore, awayTeamScore } = this.state;

        return (
            <>
                <div className="clearfix"></div>
                {pred && pred.home && <div className="col-xs-12 pd-0 text-center" style={{ background: '#fff' }}>Winning percentage</div>}
                <div className={this.props.scrolled ? "col-xs-12 pd-0 text-center scrolledHeightPlayers":"col-xs-12 pd-0 text-center"} style={{ background: '#fff' }}>
                    {pred && pred.home && <div className="col-xs-6 pd-0">
                        <h1>{pred.hasOwnProperty('home') && <strong>{pred.home}</strong>}</h1>
                    </div>}
                    {pred && pred.away && <div className="col-xs-6 pd-0">
                        <h1>{pred.hasOwnProperty('away') && <strong>{pred.away}</strong>}</h1>
                    </div>}
                </div>

               {!!status && <div className="col-xs-12 pd-0">
                    <div className="lm prediction_list" style={{ padding: '10px', height: 'auto' }}>
                        <div className="widget-content">
                            <div className="widget-content-outer">
                                <div className="widget-content-wrapper">
                                    {homeTeam_name && <div className="widget-content-left">
                                        <div className="text-muted opacity-6">{homeTeam_name}</div>
                                    </div>}
                                    {homeTeam_name && <div className="widget-content-middle">
                                        <div className="text-muted opacity-6">Draw</div>
                                    </div>}
                                    {awayTeam_name && <div className="widget-content-right">
                                        <div className="text-muted opacity-6">{awayTeam_name}</div>
                                    </div>}
                                </div>

                                <div className="widget-content-wrapper">
                                    {status.home && <div className="widget-content-left">
                                        <div className="widget-numbers fsize-3 text-win">{status.home}%</div>
                                    </div>}
                                    {status.draw && <div className="widget-content-middle">
                                        <div className="widget-numbers fsize-3 text-muted">{status.draw}%</div>
                                    </div>}
                                    {status.away && <div className="widget-content-right">
                                        <div className="widget-numbers fsize-3 text-lose">{status.away}% </div>
                                    </div>}
                                </div>
                                {status.home && status.draw && status.away && <div className="widget-progress-wrapper mt-1">
                                    <div className="progress-bar-sm progress-bar-animated-alt progress">
                                        <div className="progress-bar bg-win" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style={{ width: `${status.home}` + "%" }}>
                                        </div>
                                        <div className="progress-bar bg-default" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ width: `${status.draw}` + "%" }}>
                                        </div>
                                        <div className="progress-bar bg-lose" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style={{ width: `${status.away}` + "%" }}>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>


                        {status && Object.keys(status).length != 0 && <>	<h4>Data</h4>
                            <div className="liner"></div>
                            <div >
                                <div style={{ border: 'none' }}>
                                    <div>
                                        <div style={{ padding: 0 }} aria-expanded="true">
                                            <h4 className="title-pred" data-toggle="collapse" data-target="#pred1">Predictions
							<i className="fa fa-arrow-circle-down pull-right"></i>
                                            </h4>                    </div>
                                    </div>
                                    <div style={{ backgroundColor: 'none ' }}>
                                        {status && Object.keys(status).length != 0 && <div className="col-xs-12 pd-0 mt-10">
                                            <div className="widget-content">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="text-muted opacity-6">Both Team To Score</div>
                                                        </div>
                                                        <div className="widget-content-middle">
                                                            <div className="text-muted opacity-6"></div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="text-muted opacity-6">No Score</div>
                                                        </div>
                                                    </div>

                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-numbers fsize-3 text-win2">{status.btts}%</div>
                                                        </div>
                                                        <div className="widget-content-middle">
                                                            <div className="widget-numbers fsize-3 text-muted"></div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers fsize-3 text-lose2">{100 - `${status.btts}`}</div>
                                                        </div>
                                                    </div>

                                                    <div className="widget-progress-wrapper mt-1">
                                                        <div className="progress-bar-sm progress-bar-animated-alt progress">
                                                            <div className="progress-bar bg-win2" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{ width: `${status.btts}` + "%" }}>
                                                            </div>

                                                            <div className="progress-bar bg-lose2" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100" style={{ width: `${100 - status.btts}` + "%" }}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}

                                        {correct_score && correct_score.length != 0 && <div className="col-xs-12 pd-0 mt-10">
                                            <div className="widget-content">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left">
                                                        <div className="text-muted opacity-6">Score Probability</div>
                                                    </div>
                                                    <div className="widget-content-middle">
                                                        <div className="text-muted opacity-6"></div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="text-muted opacity-6"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <table className="table table-striped custab mb-10">
                                                <tbody>

                                                    {correct_score && correct_score.length != 0 && (correct_score).map((pred, key) => {
                                                        return <tr>
                                                            <td width="35%" className="text-spec">
                                                                <div className="col-xs-6 pd-0">
                                                                    <p className="" style={{display: "tableCaption"}}>
                                                                        <img src={homeTeam_logo} style={{ height: 25, width: 23, margin: 6 }} alt="" />
                                                                        <strong style={{ marginLeft: 5 }}><span class="notranslate">{homeTeam_name}</span></strong>
                                                                    </p>
                                                                    <p className="" style={{display: "tableCaption"}}>
                                                                        <img src={awayTeam_logo} style={{ height: 25, width: 23, margin: 6  }} alt="" />
                                                                        <strong style={{ marginLeft: 5 }}><span class="notranslate">{awayTeam_name}</span></strong>
                                                                    </p>
                                                                </div>
                                                                <div className="col-xs-6">
                                                                    <p className="text-left" style={{paddingTop:'20px',textAlign:'right'}}>{pred.homeTeam.score}</p>
                                                                    <p className="text-left" style={{paddingTop:'20px',textAlign:'right'}}>{pred.awayTeam.score}</p>
                                                                </div>
                                                            </td>
                                                            <td width="" className="text-center">
                                                                <div className="widget-content">
                                                                    <div className="widget-content-wrapper">
                                                                        <div className="widget-content-left">
                                                                            <div className="widget-numbers text-win">{pred.awayTeam.prob}%</div>
                                                                        </div>
                                                                        <div className="widget-content-middle">
                                                                            <div className="widget-numbers text-muted"></div>
                                                                        </div>
                                                                        <div className="widget-content-right">
                                                                            <div className="widget-numbers text-lose">{100 - `${pred.awayTeam.prob}`}% </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="progress-bar-sm progress-bar-animated-alt progress mb-0">
                                                                    <div className="progress-bar bg-win" role="progressbar" aria-valuenow="82" aria-valuemin="0" aria-valuemax="100" style={{ width: `${pred.awayTeam.prob}` + "%" }}>
                                                                    </div>

                                                                    <div className="progress-bar bg-default" role="progressbar" aria-valuenow="18" aria-valuemin="0" aria-valuemax="100" style={{ width: `${100 - pred.awayTeam.prob}` + "%" }}>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>}

                                        {status && Object.keys(status).length != 0 && <div className="col-xs-12 pd-0 mt-10">
                                            <div className="widget-content">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="text-muted opacity-6">Under 2 Goals</div>
                                                        </div>
                                                        <div className="widget-content-middle">
                                                            <div className="text-muted opacity-6"></div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="text-muted opacity-6">Over 3 Goals</div>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-numbers fsize-3 text-win2">{status.under_2_5}%</div>
                                                        </div>
                                                        <div className="widget-content-middle">
                                                            <div className="widget-numbers fsize-3 text-muted"></div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers fsize-3 text-lose2">{status.over_2_5}% </div>
                                                        </div>
                                                    </div>
                                                    <div className="widget-progress-wrapper mt-1">
                                                        <div className="progress-bar-sm progress-bar-animated-alt progress">
                                                            <div className="progress-bar bg-win2" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: `${status.under_2_5}` + "%" }}>
                                                            </div>

                                                            <div className="progress-bar bg-lose2" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style={{ width: `${status.over_2_5}` + "%" }}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}

                                        {status && Object.keys(status).length != 0 && <div className="col-xs-12 pd-0 mt-10">
                                            <div className="widget-content">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="text-muted opacity-6">3 or Less Goals</div>
                                                        </div>
                                                        <div className="widget-content-middle">
                                                            <div className="text-muted opacity-6"></div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="text-muted opacity-6">4 or More Goals</div>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-numbers fsize-3 text-win2">{status.under_3_5}%</div>
                                                        </div>
                                                        <div className="widget-content-middle">
                                                            <div className="widget-numbers fsize-3 text-muted"></div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers fsize-3 text-lose2">{status.over_3_5}% </div>
                                                        </div>
                                                    </div>
                                                    <div className="widget-progress-wrapper mt-1">
                                                        <div className="progress-bar-sm progress-bar-animated-alt progress">
                                                            <div className="progress-bar bg-win2" role="progressbar" aria-valuenow="61" aria-valuemin="0" aria-valuemax="100" style={{ width: `${status.under_3_5}` + "%" }}>
                                                            </div>

                                                            <div className="progress-bar bg-lose2" role="progressbar" aria-valuenow="39" aria-valuemin="0" aria-valuemax="100" style={{ width: `${status.over_3_5}` + "%" }}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}

                                        {prediction && prediction.length != 0 && <div className="col-xs-12 pd-0 mt-10">
                                            <div className="widget-content">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="text-muted opacity-6">{homeTeam_name} <br></br> No Score</div>
                                                        </div>
                                                        <div className="widget-content-middle">
                                                            <div className="text-muted opacity-6"></div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="text-muted opacity-6">{homeTeam_name} <br></br> Score At Least 1 </div>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-numbers fsize-3 text-win2">{prediction.HT_under_0_5}%</div>
                                                        </div>
                                                        <div className="widget-content-middle">
                                                            <div className="widget-numbers fsize-3 text-muted"></div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers fsize-3 text-lose2">{prediction.HT_over_0_5}% </div>
                                                        </div>
                                                    </div>
                                                    <div className="widget-progress-wrapper mt-1">
                                                        <div className="progress-bar-sm progress-bar-animated-alt progress">
                                                            <div className="progress-bar bg-win2" role="progressbar" aria-valuenow="29" aria-valuemin="0" aria-valuemax="100" style={{ width: `${prediction.HT_under_0_5}` + "%" }}>
                                                            </div>

                                                            <div className="progress-bar bg-lose2" role="progressbar" aria-valuenow="71" aria-valuemin="0" aria-valuemax="100" style={{ width: `${prediction.HT_over_0_5}` + "%" }}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}

                                        {prediction && Object.keys(prediction).length != 0 && <div className="col-xs-12 pd-0 mt-10">
                                            <div className="widget-content">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="text-muted opacity-6">{awayTeam_name} <br></br>
                                                                No Score</div>
                                                        </div>
                                                        <div className="widget-content-middle">
                                                            <div className="text-muted opacity-6"></div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="text-muted opacity-6">{awayTeam_name} <br></br>
                                                                Score At Least 1 </div>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-numbers fsize-3 text-win2">{prediction.AT_over_0_5}%</div>
                                                        </div>
                                                        <div className="widget-content-middle">
                                                            <div className="widget-numbers fsize-3 text-muted"></div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers fsize-3 text-lose2">{prediction.AT_under_0_5}% </div>
                                                        </div>
                                                    </div>
                                                    <div className="widget-progress-wrapper mt-1">
                                                        <div className="progress-bar-sm progress-bar-animated-alt progress">
                                                            <div className="progress-bar bg-win2" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{ width: `${prediction.AT_over_0_5}` + "%" }}>
                                                            </div>

                                                            <div className="progress-bar bg-lose2" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100" style={{ width: `${prediction.AT_under_0_5}` + "%" }}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                    </div>
                                </div>

                            </div>
                        </>}
                    </div>
                </div>}
            </>
        );
    }
};

export default withRouter(Prediction);