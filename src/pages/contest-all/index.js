import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
// var Modal = require('react-bootstrap-modal')
import { post } from '../../api';
import MenuCategory from '../../components/menu-category';
import './contest-all.css';
import WinnerListModal from './WinnerListModal';
import { ContestAllSimmer } from '../../simmer-loader';

class ContestAll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			predictionList: [],
			show: false,
			predictionId: '',
			loading: false
		}
	}
	handleClose = () => {
		this.setState({ show: false });
	}

	handleShow = predictionId => {
		this.setState({
			predictionId,
			show: true
		});
	}
	componentDidMount() {
		this.setState({ loading: true });
		post('getpastprediction')
			.then(res => {
				if (res.data.success == 1) {
					this.setState({
						predictionList: res.data.prediction_list,
						loading: false
					});
				}
			})
			.catch(err => console.log(err));
	}
	render() {
		const { predictionList } = this.state;
		return (
			<>

				<MenuCategory />
				<Row className="mt-5">
					<div className="col-xs-12 lm ct">
						<h2 className="title2">SCORE HISTORY</h2>
						{/* <h2 className="title2">Score History</h2> */}
						{this.state.loading &&
							<>
								<ContestAllSimmer />
								<div className="hr"></div>
								<ContestAllSimmer />
								<div className="hr"></div>
								<ContestAllSimmer />
							</>}
						{predictionList && predictionList.map((data, key) => (
							<Fragment key={key}>
								<div className="hr"></div>
								<div className="mb-10">
									<div className="lm">
										<div className="col-xs-4 pd-0">
											<div className="thumb">
												<div className="cover-bg" style={{ backgroundImage: `url(${data.banner})` }}>
												</div>
											</div>
										</div>
										<div className="col-xs-4 scrL">
											<img src={data.logo1} />
											<span>{data.score1}</span>
											<h4 className="tl mt-10">{data.team1}</h4>
										</div>
										<div className="col-xs-4 scrR">
											<span>{data.score2}</span>
											<img src={data.logo2} />
											<h4 className="tl mt-10">{data.team2}</h4>
											<span className="wnlist modal-sm" onClick={() => this.handleShow(data.id)}>Winner List</span>
										</div>
									</div>
								</div>
								<div className="clearfix"></div>
							</Fragment>
						))}
					</div>
				</Row>
				{/* <Modal
					show={this.state.show}
					onHide={this.handleClose}
					aria-labelledby="ModalHeader"
				>
					<Modal.Header closeButton>
						<Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Some Content here</p>
					</Modal.Body>
					<Modal.Footer>
						
						<Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>

						<button className='btn btn-primary' onClick={this.handleClose}>
							Save
            </button>
					</Modal.Footer>
				</Modal> */}
				{/* showCloseIcon={false} */}
				<Modal open={this.state.show} onClose={this.handleClose}  center>
					0
				</Modal>
				{/* <WinnerListModal
					pid={this.state.predictionId}
					open={this.state.show}
					closeModal={this.handleClose}
				/> */}
			</>
		);
	}
};
export default withRouter(ContestAll);
