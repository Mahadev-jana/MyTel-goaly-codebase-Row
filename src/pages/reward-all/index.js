import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { post } from '../../api';
import { RewardSimmer } from '../../simmer-loader';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';

class RewardAll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rewards: [],
			topRewards: []
		}
	}
	componentDidMount() {
		this.getRewards();
		this.getTopRewards();
	}
	getRewards = () => {
		post('api/getrewardslist')
			.then(res => {
				// console.log(res);
				this.setState({ rewards: res.data.reward_details });
			})
			.catch(err => console.log(err))
	}
	getTopRewards = () => {
		post('api/gettoprewardslist')
			.then(res => {
				// console.log(res);
				this.setState({ topRewards: res.data.top_rewards });
			})
			.catch(err => console.log(err));
	}
	render() {
		const { rewards, topRewards } = this.state;
		return (
			<React.Fragment>
				{/* <Helmet>
					<title>Goaly | Reward All</title>
					<link rel="icon" type="image/png" href={icon} sizes="20x20" />
				</Helmet> */}
				<div className="" style={{ marginTop: '15px' }}>
					<div className="col-xs-12 ct">
						<div className="mb-10">
							<div className="part ml15">
								<div className="series-title" style={{ textTransform: 'uppercase' }}>
									<Link to="/reward" className="text-white">back</Link>
								</div>
							</div>
							<div className="">
								<div className="pd-5">
									<div className="tab-content">
										<div className="tab-pane fade in active" id="tab1">
											<div className="columns">
												<div className="column col-12 col-xs-12 pd-0">
													<div className="columns">
														<div className="col-xs-7 pd-0">
															<p><strong> Redeem your reward</strong></p>
														</div>
													</div>
													{rewards && !Boolean(rewards.length) && <RewardSimmer />}
													{rewards && Boolean(rewards.length) && <OwlCarousel
														className="owl-theme"
														items={3}
														margin={5}
														lazyLoad={true}
														lazyContent={true}
														dots={false}
													>
														{rewards.map((value, key) => (
															<div className="item" key={key} >
																<Link to={`/reward/${value.id}`}><img src={value.reward_image} width="80px" height="150px" /></Link>
																<p className="title" width="50px" style={{
																	whiteSpace: 'nowrap',
																	overflow: 'hidden',
																	textOverflow: 'ellipsis',
																	maxWidth: '100%'
																}}>{value.title}</p>
																<p className="price" width="50px">{value.coin} Points</p>
															</div>
														))}
													</OwlCarousel>}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="pd-5">
									<div className="tab-content">
										<div className="tab-pane fade in active" id="tab1">
											<div className="columns">
												<div className="column col-12 col-xs-12 pd-0">
													<div className="columns">
														<div className="col-xs-7 pd-0">
															<p><strong>Top Reward</strong></p>
														</div>
														<div className="col-xs-5 pd-0">
														</div>
													</div>
													{topRewards && !Boolean(topRewards.length) && <RewardSimmer />}
													{topRewards && Boolean(topRewards.length) && <OwlCarousel
														className="owl-theme"
														items={3}
														margin={5}
														lazyLoad={true}
														lazyContent={true}
														dots={false}
													>
														{topRewards.map((value, key) => (
															<div className="item" key={key} >
																<Link to={`/reward/${value.id}`}><img src={value.reward_image} width="80px" height="150px" /></Link>
																<p className="title" width="50px" style={{
																	whiteSpace: 'nowrap',
																	overflow: 'hidden',
																	textOverflow: 'ellipsis',
																	maxWidth: '100%'
																}}>{value.title}</p>
																<p className="price" width="50px">{value.coin} Points</p>
															</div>
														))}
													</OwlCarousel>}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
};
export default withRouter(RewardAll);
