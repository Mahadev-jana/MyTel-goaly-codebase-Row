import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ListMatchesTabs from './ListMatchesTabs';
import SwipeableTabs from 'react-swipeable-tabs';
import { withRouter } from 'react-router-dom';
import { post } from '../../../api';
import { isArray,isEmpty } from 'lodash';
import axios from '../../../_config/axios';

class ListMatches extends Component {

	constructor(props) {
		super(props);
		this.state = {
			competitions: [],
			activeItemIndex: 0,
			items: [],
			selectedId: null,
			selectedCompetitionName: null	
		}
	}

	componentDidMount() {
		this.getLeagues();
		this.setState({ activeItemIndex: 0 });
	}

	getStanding = (selectedId, selectedCompetitionName) => {
		this.setState({ selectedId, selectedCompetitionName });
	}

	getLeagues = () => {
		const userDetails=JSON.parse(localStorage.getItem('userDetails'))
		if(userDetails!==null){
			console.log(userDetails)
		const payload = new FormData();
		payload.append('user_id', userDetails.id);
		post('leagueOverviewLeagues', payload)
			.then(res => {
				//console.log(res.data);
				const { leagues } = res.data;
				let items = [];
				leagues.forEach((league, key) => {
					items.push(<a id={league.competition_id} onClick={() => this.getStanding(league.competition_id, league.competition_name)} className="nav-link"><div className="text-l">{league.competition_name}</div><div className="logo-l"><img src={league.logo} /></div></a>)
				})

				this.setState({
					items,
					selectedId: leagues[0].competition_id,
					selectedCompetitionName: leagues[0].competition_name
				});
				if (res.data.leagues && isArray(res.data.leagues)) {
					let league = [];
					league = res.data.leagues;
					league.map((data) => {
						const payload = new FormData();
						payload.append('comp_id', data.competition_id);
						axios.post('/stats', payload).then(res => {
							if (res.data && res.data.success && res.data.success == 1) {
								if (res.data.stats && isArray(res.data.stats)) {
									const saveStatus = {
										'comp_id': res.data.league_id,
										'satus': JSON.stringify(res.data.stats)
									}
									let leagueStatus = JSON.parse(localStorage.getItem('status'));
									if (leagueStatus) {
										leagueStatus.push(saveStatus);
										localStorage.setItem('status', JSON.stringify(leagueStatus));
									} else {
										let leagueStats = [];
										leagueStats.push(saveStatus);
										localStorage.setItem('status', JSON.stringify(leagueStats));
									}
								}
							}
						}).catch(err => {
							console.log({ err });
						});
					})
				}
			})
			.catch(err => console.log(err));

		}
		else{

			// const userDetails=JSON.parse(localStorage.getItem('userDetails'))
			// if(userDetails!==null){
			// 	console.log(userDetails)
			// const payload = new FormData();
			// payload.append('user_id', userDetails.id);
			post('leagueOverviewLeagues')
				.then(res => {
					console.log(res.data);
					const { leagues } = res.data;
					let items = [];
					leagues.forEach((league, key) => {
						items.push(<a id={league.competition_id} onClick={() => this.getStanding(league.competition_id, league.competition_name)} className="nav-link"><div className="text-l">{league.competition_name}</div><div className="logo-l"><img src={league.logo} /></div></a>)
					})
	
					this.setState({
						items,
						selectedId: leagues[0].competition_id,
						selectedCompetitionName: leagues[0].competition_name
					});
					if (res.data.leagues && isArray(res.data.leagues)) {
						let league = [];
						league = res.data.leagues;
						league.map((data) => {
							const payload = new FormData();
							payload.append('comp_id', data.competition_id);
							axios.post('/stats', payload).then(res => {
								if (res.data && res.data.success && res.data.success == 1) {
									if (res.data.stats && isArray(res.data.stats)) {
										const saveStatus = {
											'comp_id': res.data.league_id,
											'satus': JSON.stringify(res.data.stats)
										}
										let leagueStatus = JSON.parse(localStorage.getItem('status'));
										if (leagueStatus) {
											leagueStatus.push(saveStatus);
											localStorage.setItem('status', JSON.stringify(leagueStatus));
										} else {
											let leagueStats = [];
											leagueStats.push(saveStatus);
											localStorage.setItem('status', JSON.stringify(leagueStats));
										}
									}
								}
							}).catch(err => {
								console.log({ err });
							});
						})
					}
				})
				.catch(err => console.log(err));




		// 	const payload = new FormData();
		// payload.append('page', "home");
		// post('getleagues', payload)
		// 	.then(res => {
		// 		console.log(res.data);
		// 		const { leagues } = res.data;
		// 		let items = [];
		// 		leagues.forEach((league, key) => {
		// 			items.push(<a id={league.competition_id} onClick={() => this.getStanding(league.competition_id, league.competition_name)} className="nav-link"><div className="text-l">{league.competition_name}</div><div className="logo-l"><img src={league.logo} /></div></a>)
		// 		})

		// 		this.setState({
		// 			items,
		// 			selectedId: leagues[0].competition_id,
		// 			selectedCompetitionName: leagues[0].competition_name
		// 		});
		// 		if (res.data.leagues && isArray(res.data.leagues)) {
		// 			let league = [];
		// 			league = res.data.leagues;
		// 			league.map((data) => {
		// 				const payload = new FormData();
		// 				payload.append('comp_id', data.competition_id);
		// 				axios.post('/stats', payload).then(res => {
		// 					if (res.data && res.data.success && res.data.success == 1) {
		// 						if (res.data.stats && isArray(res.data.stats)) {
		// 							const saveStatus = {
		// 								'comp_id': res.data.league_id,
		// 								'satus': JSON.stringify(res.data.stats)
		// 							}
		// 							let leagueStatus = JSON.parse(localStorage.getItem('status'));
		// 							if (leagueStatus) {
		// 								leagueStatus.push(saveStatus);
		// 								localStorage.setItem('status', JSON.stringify(leagueStatus));
		// 							} else {
		// 								let leagueStats = [];
		// 								leagueStats.push(saveStatus);
		// 								localStorage.setItem('status', JSON.stringify(leagueStats));
		// 							}
		// 						}
		// 					}
		// 				}).catch(err => {
		// 					console.log({ err });
		// 				});
		// 			})
		// 		}
		// 	})
		// 	.catch(err => console.log(err));

			
		}
		
	}



	render() {
		const { items } = this.state;
		//console.log(items)
		return (
			<Row>
			
				<Col xs={12} className="mt-10 pd-0">
					<div class="wrapnya">
						<div class="tuhed">
							<div class="up" style={{ backgroundColor: "rgb(77, 0, 83)" }}><i class="fas fa-award"></i> &nbsp;&nbsp;League Overview</div>
							<div class="mid">
							{isEmpty(items) && <div>LOGIN FIRST TO SEE THIS SECTION</div>}
								<>
									<React.Fragment>
										<Row>
											<Col xs={12}>
												<div className="row">
													<div className="col-6">
														<div className="mt-10 plr15" style={{ backgroundColor: 'rgb(113, 0, 122)' }}>
															{Boolean(items.length) && <SwipeableTabs
																noFirstLeftPadding={false}
																noLastRightPadding={false}
																fitItems={false}
																alignCenter={false}
																borderWidthRatio={1}
																activeItemIndex={this.state.activeItemIndex}
																onItemClick={(item, index) => {
																	const selectedItem = item.element.props.id;
																	this.setState({ selectedId: selectedItem })
																	this.setState({ activeItemIndex: index })
																}}
																items={items}
																borderPosition="bottom"
																borderThickness={5}
																borderColor="#D9004B"
																activeStyle={{
																	color: '#D9004B'
																}}
																itemStyle={{
																	padding: 3,
																}}
															/>}
														</div>
													</div>
												</div>
											</Col>
										</Row>
									</React.Fragment>
								</>
								{this.state.selectedId && <ListMatchesTabs id={this.state.selectedId} />}

							</div>
						</div>
					</div>
				</Col>
			</Row>
		);
	}
};


export default ListMatches;