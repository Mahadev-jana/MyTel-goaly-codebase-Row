import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { post } from '../../api';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import ContentLoader from '../../loader/content-loader';

class PrivacyPolicy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			privacy: null,
			loading: false
		}
	}
	componentDidMount() {
		this.setState({ loading: true });
		post('api/getprivacypolicy')
			.then(res => {
				console.log(res);
				if (res.data.success == 1) {
					this.setState({
						privacy: res.data.privacy_policy.content,
						loading: false
					});
				}
			})
			.catch(err => console.log(err));
	}
	render() {
		const { privacy } = this.state;
		return (
			<React.Fragment>
				{/* <Helmet>
					<title>Goaly | Privacy Policy</title>
					<link rel="icon" type="image/png" href={icon} sizes="20x20" />
				</Helmet> */}
				<Row>
					<Col xs={12} className="ct mt-5">
						<div className="mb-10">
							<div className="part ml15">
								<div className="series-title">Privacy Policy</div>
							</div>
							<div className="pd-5">
								{this.state.loading && <ContentLoader />}
								{privacy && <div style={{ padding: 15 }} dangerouslySetInnerHTML={{ __html: privacy }} />}
							</div>
						</div>
					</Col>
				</Row>
			</React.Fragment>
		);
	}

};
export default withRouter(PrivacyPolicy);