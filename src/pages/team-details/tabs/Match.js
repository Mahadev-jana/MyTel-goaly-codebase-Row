import React from 'react';
import { withRouter } from 'react-router-dom';
import { post } from '../../../api';
import imgLive from '../../../assets/img/logo-live.png';
import Moment from 'react-moment';
import loader from '../../../assets/loader/loaderspinner.gif';
import moment from 'moment';
import Chelsea from '../../../assets/img/Chelsea.svg';
import '../../../assets/css/detail-club.css';
import Manchester from '../../../assets/img/Manchester united.svg';
import calendar from '../../../assets/img/detail-club/calendar.png';
import surface1 from '../../../assets/img/detail-club/surface1.png';
import time from '../../../assets/img/detail-club/time.png';
import classnames from 'classnames';
import {isEmpty} from 'lodash';
class Match extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			matchList: [],
			fixtures: [],
			team: '',
			teamDetails: [],
			isLoading: false,
			hoemTeamLogo: '',
			tab:0,
			listOpen:false,
			matchType:'Past Matches'
			// hometeamName: '',
			// venue:'',
			// city:''
		}
	}
	sendData = (props) => {
		// this.props.parentCallback("hbjhhj");
	}

	componentDidMount() {
		this.setState({
			isLoading: true
		});
		const id = this.props.match.params.id;
		this.getMatches(id);
		this.sendData();

	}

	getMatches = (id) => {
		const _this = this;
		const payload = new FormData();
		payload.append('id', id);
		post('getTeamDetailsById', payload).then(res => {
			if ((res.data.success == 0 && res.data.error ==1) || (res.data.success == 1 && res.data.error ==0)) {
				_this.setState({
					matchList: res.data.matches,
					name: res.data.team_name,
					fixturesList: res.data.fixtures,
					hoemTeamLogo: res.data.team_logo,
					// hometeamName: res.data.team_name,
					// venue:res.data.team_venuename,
					// city:res.data.team_city
				});
				_this.props.parentCallback(res.data.team_logo,res.data.team_name,res.data.team_venuename,res.data.team_city,res.data.team_league,res.data.team_country,res.data.country_logo,res.data.league_logo);
				_this.setState({
					isLoading: false
				});
			} else {
				this.setState({
					isLoading: false
				});

			}

		}).catch(err => {
			console.error(err);
			this.setState({
				isLoading: false
			});
		})
	}
	spreadList=()=>{
		console.log('open listttttt')
		this.setState(prevState => ({
			listOpen: !prevState.listOpen
		  }))
	}
	setTab = (tab,name)=> { this.setState({ tab,listOpen:false,matchType:name}) }

	render() {
		// console.log(this.props.id + 'idididid')
		const { matchList, fixtures, team, teamDetails, fixturesList, name, isLoading, hometeamName, hoemTeamLogo,tab,listOpen } = this.state;
		let resultStatus = [];
		resultStatus['D'] = `<div class="bdstat draw">D</div>`;
		resultStatus['L'] = `<div class="bdstat lose">L</div>`;
		resultStatus['W'] = `<div class="bdstat win">W</div>`;
		
		
		return (
			<div class=" matches" style={{ background: "#f1f1f1", padding: "12px" }} >

				<div role="tabpanel" class=" row tab-pane active" id="Matches" style={{ background: "#f1f1f1" }}>
						
				{/* <div className="tab-menu">
                            <ul className="nav nav-tabs" style={{borderBottom: 'hidden'}}>
                                <li className={classnames("nav-item-past", { "active": Boolean(tab === 0) })} onClick={() => this.setTab(0)}>
                                    <a className="nav-link" style={{ fontSize: 14 }}>Past Matches</a>
                                </li>
                                <li className={classnames("nav-item-future", { "active": Boolean(tab === 1) })} onClick={() => this.setTab(1)}>
                                    <a className="nav-link" style={{ fontSize: 14 }}>Future Matches</a>
                                </li>
                                
                            </ul>
                        </div> */}

						<div class="dropdown">
                                <button class="btn btn-default dropdown-toggle w-100" style={{border: '1px solid #9c25a8',
								// paddingLeft:'100px',paddingRight:'100px'
								}} type="button" id="dropdownMenuMatches" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.spreadList}>
                                    {this.state.matchType}
                                    <span class="caret"></span>
                                </button>
                                {listOpen && <ul class="dropdown-menu w-100" aria-labelledby="dropdownMenuMatches" style={{display:'block'}}>
                                    <li onClick={() => this.setTab(0,'Past Matches')}><a>Past Matches </a></li>
                                    <li onClick={() => this.setTab(1,'Future Matches')}><a>Future Matches</a></li>
								</ul>}
                            {/* </div> */}
							</div>





					<div class="part" style={{ minHeight: 420, minWidth: 300, background: "#f1f1f1" }}>

						{isLoading && !matchList.length && !fixturesList && <div> <div class="col-xs-4" style={{ background: "#f1f1f1" }}>
						</div>
							<div class="col-xs-4">
								<img src={loader} alt="" style={{
									height: 60,
									marginTop: 120
								}} />
							</div>
						</div>
						}

						<div class="tab-content" id="myTabContent">
							<div class="tab-pane fade active p-3 in" id="one" aria-labelledby="one-tab">
								<div class="row mt-10" style={{ background: "#f1f1f1" }}>
									{!!matchList.length && tab===0 && <div class="lm" style={{ background: "#f1f1f1" }} >


										<div class=" matches-header" style={{ background: "#f1f1f1" }}>
											<div>
												<h3><b>Matches</b></h3>
												<div className="pb-1">
													<img src={hoemTeamLogo} alt="" />
													<span style={{
														paddingRight: "70px",
														paddingLeft: "7px"
													}}>{hometeamName}</span>
												</div>
												{/* <a href="" >See more</a> */}
											</div>
										</div>



										<div class="matches-body" style={{ background: "#f1f1f1" }}>

											{matchList.map((data, key) => (
												<div class="card" style={{
													padding: 0,
													margin: 0,
													paddingBottom: '12px'
												}}>
													<div class="top" style={{ padding: "10px" }} onClick={() => this.props.history.push(`/match/details/${data.match_id}`)}>

														<div class="left">
															<img src={data.homeTeam_logo}

															/><span style={{ paddingRight: "20px" }}>{data.homeTeam_name}</span>
														</div>
														{data.match_status==="POSTP" &&
														(<div class="mid" style={{ }}>
															<span class="score-left badge" style={{backgroundColor:'#fff'}}>_</span>
															<span style={{ margin: "0 5px" }}>|</span>
															<span class="score-right badge" style={{backgroundColor:'#fff'}}>_</span>

														</div>)}
														{data.match_status==="CANCL" &&
														(<div class="mid" style={{ }}>
															<span class="score-left badge" style={{backgroundColor:'#fff'}}>_</span>
															<span style={{ margin: "0 5px" }}>|</span>
															<span class="score-right badge" style={{backgroundColor:'#fff'}}>_</span>

														</div>)}
														{/* {data.match_status==="CANCL" &&
														(<div class="mid" style={{ }}>
															<span class="score-left badge" style={{backgroundColor:'#fff'}}>_</span>
															<span style={{ margin: "0 5px" }}>|</span>
															<span class="score-right badge" style={{backgroundColor:'#fff'}}>_</span>

														</div>)} */}
														{(data.homeTeam_id == data.winner_status) && 
														(<div class="mid" style={{  }}>
															<span class="score-left badge" style={{backgroundColor:'#7CD327'}}>{data.homeTeam_score}</span>
															<span style={{ margin: "0 5px" }}>-</span>
															<span class="score-right badge" style={{backgroundColor:'#FF7C92'}}>{data.awayTeam_score}</span>

														</div>)}
														{console.log(data.match_status)}
														{(data.awayTeam_id == data.winner_status)  &&
														(<div class="mid">
															<span class="score-left badge" style={{backgroundColor:'#FF7C92'}}>{data.homeTeam_score}</span>
															<span style={{ margin: "0 5px" }}>-</span>
															<span class="score-right badge" style={{backgroundColor:'#7CD327'}}>{data.awayTeam_score}</span>

														</div>)}
														

														{data.awayTeam_id != data.winner_status && data.homeTeam_id != data.winner_status && data.winner_status == 0 && (data.match_status==="AET" || data.match_status==="FT" || data.match_status==="NS") &&
														(<div class="mid" style={{ }}>
															<span class="score-left badge" style={{backgroundColor:'rgb(255, 200, 0)'}}>{data.homeTeam_score}</span>
															<span style={{ margin: "0 5px" }}>-</span>
															<span class="score-right badge" style={{backgroundColor:'rgb(255, 200, 0)'}}>{data.awayTeam_score}</span>

														</div>)}

														<div class="right"><img src={data.awayTeam_logo} alt="" />
															<span>{data.awayTeam_name}</span></div>


													</div>
													<div class="btm" style={{ padding: "10px" }}>
														<div class="row">
															<div class="col-xs-6">
																<div class="date" style={{position: 'absolute',left:' 20px',top: '-10px'}}>
																	<img src={calendar} alt="" />
																	<span><Moment style={{ fontSize: "12px" }} format="DD MMMM YYYY">{data.date_time}</Moment></span>
																</div>
															</div>
															<div class="col-xs-6">
 
																{(data.homeTeam_id == data.winner_status) && (data.winner_status === this.props.id) &&
																	(<div>
																		<div class="winner" style={{ padding: "3px", margin: "3px" }}>
																			<img src={surface1} alt="" /><img src={data.homeTeam_logo} alt="" />
																			<span style={{ paddingRight: '12px' }}>{data.homeTeam_name}</span></div></div>)}


																{(data.awayTeam_id === data.winner_status) && (data.winner_status === this.props.id) &&
																	(<div><div class="winner" style={{ padding: "3px", margin: "3px" }}>
																		<img src={surface1} alt="" /><img src={data.awayTeam_logo} alt="" />
																		<span style={{ paddingRight: '12px' }}>{data.awayTeam_name}</span></div></div>)}


																
																{data.awayTeam_id != data.winner_status && data.homeTeam_id != data.winner_status && data.winner_status == 0 && (data.match_status==="AET" || data.match_status==="FT" || data.match_status==="NS") && (<div>
																	<div class="winner" style={{ padding: "3px", margin: "3px", backgroundColor: "#ffc800" }}>
																		<img src={surface1}  alt="" /><span style={{ fontSize: '10px',marginRight: "15px"}}>DRAW MATCH</span></div></div>)
																}
																{data.awayTeam_id != data.winner_status && data.homeTeam_id != data.winner_status && data.winner_status == 0 && data.match_status==="POSTP" && (<div>
																	<div class="winner" style={{ padding: "3px", margin: "3px", backgroundColor: "rgb(108, 98, 224)" }}>
																		<span style={{ fontSize: '10px'}}>RESCHEDULE</span></div></div>)
																}
																{data.awayTeam_id != data.winner_status && data.homeTeam_id != data.winner_status && data.winner_status == 0 && data.match_status==="CANCL" && (<div>
																	<div class="winner" style={{ padding: "3px", margin: "3px", backgroundColor: "rgb(238, 240, 242)" }}>
																		<span style={{ fontSize: '10px',color:'#000'}}>CANCEL</span></div></div>)
																}
																{(data.homeTeam_id == data.winner_status) && (data.winner_status !== this.props.id) &&
																	(<div>
																		<div class="winner" style={{ padding: "3px", margin: "3px", backgroundColor: 'red' }}>
																			<img src={data.awayTeam_logo} alt="" />
																			<span style={{ paddingRight: '12px',paddingRight: '34px' }}>{data.awayTeam_name}</span></div></div>)}


																{(data.awayTeam_id === data.winner_status) && (data.winner_status !== this.props.id) &&
																	(<div><div class="winner" style={{ padding: "3px", margin: "3px", backgroundColor: 'red' }}>
																		<img src={data.homeTeam_logo} alt="" />
																		<span style={{ paddingRight: '12px',paddingRight: '34px' }}>{data.homeTeam_name}</span></div></div>)} 








															</div>
														</div>
													</div>
												</div>


											))}

										</div>
									</div>
									}
									{isEmpty(matchList) && !isLoading && tab===0 && <>
										<div style={{ color: '#343434', fontSize: 14, fontWeight: 700, textAlign: 'center',paddingTop:'50px' }}>
											<div>oops !</div>
											<div>No Match Found</div>
										</div>
									</>
									}




								</div>
								<div class="mt-10" style={{ background: "#f1f1f1" }}>
									{!!fixturesList && tab===1 && <div class="row lm" style={{ background: "#f1f1f1" }} >


										<div class=" matches-header" style={{ background: "#f1f1f1" }}>
											<div>
												<h3><b>Fixtures</b></h3>
												<div className="pb-1">
													<img src={hoemTeamLogo} alt="" />
													<span style={{
														paddingRight: "70px",
														paddingLeft: "7px"
													}}>{hometeamName}</span>
												</div>
												{/* <a href="" >See more</a> */}
											</div>
										</div>



										<div class="matches-body" style={{ background: "#f1f1f1" }}>

											{fixturesList.map((data, key) => (
												<div class="card" style={{
													padding: 0,
													margin: 0,
													paddingBottom: '12px'
												}}>
													<div class="top" style={{ padding: "10px" }} onClick={() => this.props.history.push(`/match/details/${data.match_id}`)}>

														<div class="left">
															<img src={data.homeTeam_logo}

															/><span style={{ paddingRight: "20px" }}>{data.homeTeam_name}</span>
														</div>


														<div class="mid" style={{ paddingRight: "28px" }}>
															<span style={{
																paddingLeft: "28px",
																paddingRight: "24px"
															}}>VS</span>


														</div>
														<div class="right"><img src={data.awayTeam_logo} alt="" />
															<span>{data.awayTeam_name}</span></div>


													</div>
													<div class="btm" style={{ padding: "10px" }}>
														<div class="row">
															<div class="col-xs-6">
																<div class="date">
																	<img src={calendar} alt="" />
																	<span><Moment style={{ fontSize: "12px" }} format="DD MMMM YYYY">{data.date_time}</Moment></span>
																</div>
															</div>
															<div class="col-xs-6">
																<div class="time">
																	<img src={time} alt="" />
																	<span><Moment style={{ fontSize: "12px" }} format="h:mm a">{data.date_time}</Moment></span>
																</div>
															</div>

														</div>
													</div>
												</div>

											))}

										</div>
									</div>
									}
									{isEmpty(fixturesList) && !isLoading && tab===1 && <>
										<div style={{ color: '#343434', fontSize: 14, fontWeight: 700, textAlign: 'center',paddingTop:'50px' }}>
											<div>oops !</div>
											<div>No Match Found</div>
										</div>
									</>
									}


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


const utcToLocal = dateTime => {
	const stillUtc = moment.utc(dateTime).toDate();
	return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}


//PREVIOUS CODE

// <div class="tab-pane fade active p-3 in">
// 					<div class="part" style={{minHeight:420}}>
// 						<div class="col-xs-9">
// 							<div class="pt-team">
// 								<img src="img/muntd.png" height="24px" alt="" />
// 							</div>
// 						</div>
// 						<div class="col-xs-3">
// 							<a class="stand btn btn-default chk2" onClick={() => this.props.history.goBack()}>
// 								<i class="fas fa-arrow-left"></i>&nbsp; Back
// 							</a>
// 						</div>
// 						{isLoading && !matchList.length && !fixturesList && <> <div class="col-xs-4">
// 						</div>
// 							<div class="col-xs-4">
// 								<img src={loader} alt="" style={{ 
// 									    height: 60,
// 										marginTop: 120
// 								}} />
// 							</div> </>
// 						}

// 						<div class="tab-content" id="myTabContent">
// 							<div class="tab-pane fade active p-3 in" id="one" aria-labelledby="one-tab">
// 								<div class="col-xs-12 mt-10">
// 									{!!matchList.length && <div class="lm">
// 										<div>
// 											<span style={{fontSize: 15,fontWeight: 700}}>Matches</span>
// 											<img src={hoemTeamLogo} style={{height: 25,padding: '0px 5px 5px 10px'}}/>
// 											<span>{hometeamName}</span>
// 										</div>
// 										<div class="liner"></div>
// 										<table class="table table-striped custab mb-10">
// 											<tbody>
// 												{matchList.map((data, key) => (
// 													<tr key={key} onClick={() => this.props.history.push(`/match/details/${data.match_id}`)}>
// 														<td>
// 															<div className="col-xs-1 pd-0">
// 																<img src={data.homeTeam_logo} style={{ height: 21,marginTop: 10 }} />
// 															</div>

// 															<div className="col-xs-3 pd-0">
// 																<p className="text-right"  style={{textAlign: 'center',margin: 10}}>{data.homeTeam_name}</p>
// 															</div>
// 															<div className="col-xs-4 plr5 text-center">
// 																<td width="45" className="text-date" ><Moment format="DD/MM/YY" style={{ marginLeft: 17 }}>{data.date_time}</Moment></td>

// 																{data.homeTeam_id == data.winner_status && <><div class="bdstat win">W</div><strong><span style={{ color: "green" }}>{data.homeTeam_score}</span> - <span style={{ color: "red" }}>{data.awayTeam_score}<div class="bdstat lose">L</div></span></strong></>}
// 																{data.awayTeam_id == data.winner_status && <strong><div class="bdstat lose">L</div><span style={{ color: "red" }}>{data.homeTeam_score}</span> - <span style={{ color: "green" }}>{data.awayTeam_score}</span><div class="bdstat win">W</div></strong>}
// 																{data.awayTeam_id != data.winner_status && data.homeTeam_id != data.winner_status && data.winner_status == 0 && <strong><div class="bdstat draw">D</div>{data.homeTeam_score}- {data.awayTeam_score}<div class="bdstat draw">D</div></strong>}
// 															</div>
// 															<div className="col-xs-3 pd-0">
// 																<p className="text-left" style={{textAlign: 'center',margin: 10}}>{data.awayTeam_name}</p>
// 															</div>

// 															<div className="col-xs-1 pd-0">
// 																<img src={data.awayTeam_logo} style={{ height: 21,marginTop: 10 }} />
// 															</div>
// 														</td>

// 													</tr>
// 												))}
// 											</tbody>
// 										</table>
// 									</div>
// 									}
// 									{!matchList.length && !isLoading && <>
// 										<div style={{ color: '#343434', fontSize: 14, fontWeight: 700, textAlign: 'center' }}>
// 											<div>oops !</div>
// 											<div>No Match Found</div>
// 										</div>
// 									</>
// 									}

// 									{!!fixturesList && <div class="lm">
// 										<div>
// 											<span style={{fontSize: 15,fontWeight: 700}}>Fixtures</span>
// 											<img src={hoemTeamLogo} style={{height: 25,padding: '0px 5px 5px 10px'}}/>
// 											<span>{hometeamName}</span>
// 										</div>
// 										<div class="liner"></div>
// 										<table class="table table-striped custab mb-10">
// 											<tbody>
// 												{fixturesList.map((data, key) => (
// 													<tr>

// 														<td>
// 															<div className="col-xs-1 pd-0">
// 																<img src={data.homeTeam_logo} style={{ height: 21,marginTop: 10 }} />
// 															</div>

// 															<div className="col-xs-3 pd-0">
// 																<p className="text-center" style={{textAlign: 'center',margin: 10}}>{data.homeTeam_name}</p>
// 															</div>
// 															<div class="col-xs-4  text-center">
// 																<p class="text-teal" style={{ fontSize: 14, fontWeight: 600 }}>
// 																	<strong><Moment format="DD/MM/YY" style={{ color: '#999', fontWeight: 600, fontSize: 12, letterSpacing: 0 }}>{utcToLocal(data.date_time)}</Moment>
// 																		<div><Moment format="HH:mm" style={{ color: '#999', fontWeight: 600, fontSize: 12, letterSpacing: 0 }}>{utcToLocal(data.date_time)}</Moment></div></strong>
// 																</p>
// 															</div>
// 															<div className="col-xs-3 pd-0">
// 																<p className="text-center" style={{textAlign: 'center',margin: 10}}>{data.awayTeam_name}</p>
// 															</div>

// 															<div className="col-xs-1 pd-0">
// 																<img src={data.awayTeam_logo} style={{ height: 21,marginTop: 10 }} />
// 															</div>

// 														</td>

// 													</tr>))}
// 											</tbody>
// 										</table>
// 									</div>}
// 								</div>
// 							</div>
// 						</div>
// 						<div class="clearfix"></div>
// 					</div>
// 				</div>