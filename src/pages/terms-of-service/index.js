import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { post } from '../../api';
import ContentLoader from '../../loader/content-loader';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';


class TermsOfService extends Component {
	constructor(props) {
		super(props);
		this.state = {
			terms: null,
			loading: false
		}
	}
	componentDidMount() {
		this.setState({ loading: true });
		post('api/getterms')
			.then(res => {
				if (res.data.success == 1) {
					this.setState({
						terms: res.data.terms.content,
						loading: false
					});
				}
			})
			.catch(err => console.log(err));
	}
	render() {
		const { terms } = this.state;
		return (
			<React.Fragment>
				{/* <Helmet>
					<title>Goaly | Terms Of Service</title>
					<link rel="icon" type="image/png" href={icon} sizes="20x20" />
				</Helmet> */}
			<Row className="mt-5">
				<Col xs={12} className="ct">
					<div className="mb-10">
						<div className="part ml15">
							<div className="series-title">Terms Of Service</div>
						</div>
						<div className="pd-5">
							{this.state.loading && <ContentLoader />}
							{terms && <div style={{padding:15}} dangerouslySetInnerHTML={{ __html: terms }} />}
						</div>
					</div>
				</Col>
			</Row>
			</React.Fragment>
		);
	}

};
export default withRouter(TermsOfService);