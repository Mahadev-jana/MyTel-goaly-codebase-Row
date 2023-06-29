import React from 'react';
import classnames from 'classnames';
import { Row, Col } from 'react-bootstrap';

import RewardBanner from './RewardBanner';
import RewardsSlider from './tabs/RewardsSlider';
import MyRewardComponent from './my-reward-component';

const Reward = () => {
	const [tab, setTab] = React.useState(0);
	return (
		<Row className="mt-5">
			<Col xs={12} className="ct" >
				<div className="mb-10" >
					<div className="part ml15" >
						<div className="series-title">Reward</div>
					</div>
					<RewardBanner />
					<div className="">
						<div className="btn-pref btn-group btn-group-justified btn-group-lg">
							<div className="btn-group" role="group">
								<button className={
									classnames(
										"btn",
										"btn-default",
										{
											"bg-3": Boolean(tab === 0)
										}
									)
								} onClick={() => setTab(0)}>Reward</button>
							</div>
							<div className="btn-group">
								<button className={
									classnames(
										"btn",
										"btn-default",
										{
											"bg-3": Boolean(tab === 1)
										}
									)
								} onClick={() => setTab(1)}>My Reward</button>
							</div>
						</div>
						<div className="pd-5">
							{Boolean(tab === 0) && <RewardsSlider />}
							{Boolean(tab === 1) && <MyRewardComponent />}
						</div>
					</div>
				</div>
			</Col>
		</Row>
	);
}

export default Reward;


