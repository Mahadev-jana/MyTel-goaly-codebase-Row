import React from 'react';
import { withRouter } from 'react-router-dom';
import { post } from '../../api';
import Moment from 'react-moment';
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemPanel,
	AccordionItemButton
} from 'react-accessible-accordion';
import juventus from '../../assets/icon/j.png';
import acmilan from '../../assets/icon/ac.png';

import juve from '../../assets/img/tm-juventus.png';
import milan from '../../assets/img/milan.png';
import { CommentarySimmer } from "../../simmer-loader";
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import Prediction from '../match-details/tabs/predictions';

class HeadToHead extends React.Component {
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
			homeTeamid: 0,
			awayTeamid: 0,
			loading:false
		}
	}

	componentDidMount() {
		this.setState({loading:true})
		// console.log(this.props.awayTeamId,this.props.homeTeamId)
		const payload = new FormData();
		payload.append('homeTeam', this.props.homeTeamId);
		payload.append('awayTeam', this.props.awayTeamId);
		post('StageGoalyApi/getHeadToHead', payload)
			.then(res => {
				//console.log(res)
				this.setState({ matches: res.data.matches });
				let draw=0;
				let homeWin=0;
				let awayWin=0;
				let homeTeamScore=0;
				let awayTeamScore=0;
				this.state.matches.forEach((matchDetails, key) => {
					if (matchDetails.status == 2) {
						draw = draw + 1;
						this.setState({draw});
					} else {	
						if(matchDetails.winnerTeamId !='draw'){
							if (matchDetails.winnerTeamId == this.props.homeTeamId) {
								homeWin = homeWin + 1;
								this.setState({homeWin});
							} else {
								awayWin = awayWin + 1;
								this.setState({awayWin});
							}
						}
					}
					
					if (this.props.homeTeamId == matchDetails.homeTeamId) {
						homeTeamScore = homeTeamScore + matchDetails.homeTeamScore;
					} else if (this.props.homeTeamId == matchDetails.awayTeamId) {
						homeTeamScore = homeTeamScore + matchDetails.awayTeamScore;
					}
					if (this.props.awayTeamId == matchDetails.homeTeamId) {
						awayTeamScore = awayTeamScore + matchDetails.homeTeamScore;
	
					} else if (this.props.awayTeamId == matchDetails.awayTeamId) {
						awayTeamScore = awayTeamScore + matchDetails.awayTeamScore;
					}
					this.setState({loading:false})
					this.setState({homeTeamScore});
					this.setState({awayTeamScore});
				})
			})
			.catch(err => console.log(err));
			this.getTeamDetails();
	}

	getTeamDetails() {
		this.setState({loading:true})
		const payload = new FormData();
		payload.append('homeTeam', this.props.homeTeamId);
		payload.append('awayTeam', this.props.awayTeamId);
		post('StageGoalyApi/getLastMatchByTeam', payload)
			.then(res => {
				//console.log(res)
				this.setState({ homeTeamid: res.data.home_id });
				this.setState({ awayTeamid: res.data.away_id })
				this.setState({ homeTeam_match: res.data.homeTeam_match });
				this.setState({ awayTeam_match: res.data.awayTeam_match });
				this.setState({ homeTeam_name: res.data.home_name });
				this.setState({ awayTeam_name: res.data.away_name });
				this.setState({ homeTeam_logo: res.data.home_logo });
				this.setState({ awayTeam_logo: res.data.away_logo });
				this.setState({loading:false})
			})
			.catch(err => console.log(err));
	}

	// getData() {
	// 	const payload = new FormData();
	// 	payload.append('fixture_id', this.props.match.params.id);
	// 	post('getContestProbability', payload)
	// 		.then(res => {
	// 			if (res.data.success == 1) {
	// 				this.setState({ prediction: res.data.prediction });
	// 				this.setState({ correct_score: res.data.correct_score });
	// 				this.setState({ status: res.data.status });
	// 				this.setState({ homeTeam_name: res.data.teams.homename });
	// 				this.setState({ awayTeam_name: res.data.teams.awayname });
	// 			}
	// 		})
	// 		.catch(err => console.log(err));
	// }

	render() {

		const { matches,loading, pred, prediction, correct_score, status, homeTeam_name, homeTeamid, awayTeamid,
			awayTeam_name, homeTeam_logo, awayTeam_logo, draw, homeWin, awayWin, homeTeamScore, awayTeamScore } = this.state;

		return (
			<>


				<div className="clearfix"></div>
				{loading ?
				<div>
					<CommentarySimmer/>
					<CommentarySimmer/>
				</div>
				:

				<div className={this.props.scrolled ? "col-xs-12 pd-0 scrolledHeightPlayers":"col-xs-12 pd-0"}>
					<div className="lm prediction_list" style={{ padding: '15px', height: 'auto' }}>
						<h4>Head to Head</h4>
						<div className="liner"></div>
						<table className="table table-striped mb-10 text-small">
							<tbody>
								<tr>
									<td width="" className="text-left">
										<img src={homeTeam_logo} height="50" alt="" />
									</td>
									<td width="" className="text-center bdr1">
										<span className="ctr notranslate">{homeWin}</span>
										<span class="notranslate">Wins</span>
								</td>
									<td width="" className="text-c</span>enter bdr1">
										<span className="ctr notranslate">{draw}</span>
										<span class="notranslate">Draw</span>
								</td>
									<td width="" className="text-center">
										<span className="ctr notranslate">{awayWin}</span>
										<span class="notranslate">Wins</span>
								</td>
									<td width="" className="text-right">
										<img src={awayTeam_logo} height="50" alt="" />
									</td>
								</tr>

							</tbody>
						</table>

						<div className="widget-content">
							<div className="widget-content-wrapper">
								<div className="widget-content-left">
									<div className="widget-numbers fsize-3 text-win">{homeTeamScore}</div>
								</div>
								<div className="widget-content-middle">
									<div className="widget-numbers fsize-3 text-muted">GOALS SCORED</div>
								</div>
								<div className="widget-content-right">
									<div className="widget-numbers fsize-3 text-lose">{awayTeamScore} </div>
								</div>
							</div>
						</div>
						<div className="progress-bar-sm progress-bar-animated-alt progress">
							<div className="progress-bar bg-win" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"
								style={{ width: `${(100 * homeTeamScore) / (homeTeamScore + awayTeamScore)}` + "%" }}>
							</div>
							<div className="progress-bar bg-lose" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100"
								style={{ width: `${(100 * awayTeamScore) / (homeTeamScore + awayTeamScore)}` + "%" }}
							>
							</div>
						</div>
						{/* <h5>Serie A</h5> */}
						<table className="table table-striped custab mb-10">
							<tbody>
								{console.log(matches)}
								{!!matches && matches.map((match, key) => (
									<tr key={key}>
										<td width="50" className="text-date">
											<Moment format="ddd, DD/MM/YY">{match.date}</Moment>
										</td>
										<td>
											<div className="col-xs-2" style={{ margin: 0, padding: 0, top: 5, textAlign: 'center' }}>
												<p className="">
													<span class="notranslate">{match.homeTeam}</span>
												</p>
											</div>
											<div className="col-xs-2" style={{ margin: 0, padding: 0, textAlign: 'center' }}>
												<img src={match.homeTeamLogo} style={{ height: 27, padding: 2, margin: 2 }} />
											</div>
											<div className="col-xs-4" style={{ margin: 0, padding: 0, top: 5, textAlign: 'center' }}>
												<strong>{match.homeTeamScore} - {match.awayTeamScore}</strong>
											</div>
											<div className="col-xs-2" style={{ margin: 0, padding: 0, textAlign: 'center' }}>
												<img src={match.awayTeamLogo} style={{ height: 27, padding: 2, margin: 2 }} />
											</div>
											<div className="col-xs-2" style={{ margin: 0, padding: 0, top: 5, textAlign: 'center' }}>
												<p className="">
													<span class="notranslate">{match.awayTeam}</span>
												</p>
											</div>

										</td>
										<td width="45" className="text-center">&nbsp;
									</td>
									</tr>
								))}

							</tbody>
						</table>


					</div>
				</div>
			
			}</>
		);
	}
};

export default withRouter(HeadToHead);