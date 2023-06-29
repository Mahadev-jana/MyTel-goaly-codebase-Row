import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { Modal, Button  } from 'react-bootstrap';
import './contest-all.css';

import logoGoaly from '../../assets/img/logo-goaly.png';


class Subscibe extends Component {
		constructor(props) {
			super(props);
			this.state = {
				subcriptionType: '',
				confirmationModal: false,
				successfulModal: false
			}
		}
		setSubcriptionType = subcriptionType => {
			this.props.handleClose();
			this.setState({
				subcriptionType,
				confirmationModal: true
			});
		}
		subcribe = () => {
			this.setState({
				confirmationModal: false,
				successfulModal: true
			})
		}
    render(){
				const { show } = this.props;
				const { confirmationModal, successfulModal } = this.state;
        return(
					<>
					 <Modal show={show} onHide={this.props.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title style={{textAlign: 'center'}}>
									<img src={logoGoaly} alt="" height="60"/>
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<h3 className="mt-0">To enjoy play the game, click yes</h3>
								<p>This is subcription service for Goaly users who would like to enjoy our interactive prediction games where you can join and collect points to win our exclusive rewards of football merchendise and a chance to Win grand prize to watch Big match overseas.</p>
							</Modal.Body>
							<Modal.Footer>
								<div className="row">
									<div className="col-xs-6 plfix" style={{paddingRight: '5px'}}>
										<button type="button" className="btn-reg" onClick={() => this.setSubcriptionType('daily')}>
											<strong>Yes Daily</strong>
										</button>
									</div>
									<div className="col-xs-6 prfix" style={{paddingLeft: '5px'}}>
										<button type="button" className="btn-sign" onClick={() => this.setSubcriptionType('weekly')}>
											<strong>Yes Weekly</strong>
										</button>
									</div>
								</div>
							</Modal.Footer>
						</Modal>

						<Modal show={confirmationModal} onHide={() => this.setState({confirmationModal: false})}>
							<Modal.Header closeButton>
								<Modal.Title style={{textAlign: 'center'}}>
									<img src={logoGoaly} alt="" height="60"/>
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<p>You are about to subscribe the daily/weekly subscription plan with Free unlimited play games competition, there will be an auto renewal charge of 10c/day or 50c/week</p>
								<p>Click on Yes to confirm or No to leave</p>
							</Modal.Body>
							<Modal.Footer>
								<div className="row">
									<div className="col-xs-6 plfix" style={{paddingRight: '5px'}}>
										<button type="button" className="btn-reg" onClick={() => this.setState({confirmationModal: false})}>
											<strong>No</strong>
										</button>
									</div>
									<div className="col-xs-6 prfix" style={{paddingLeft: '5px'}}>
										<button type="button" className="btn-sign" onClick={this.subcribe}>
											<strong>Yes</strong>
										</button>
									</div>
								</div>
							</Modal.Footer>
						</Modal>

						<Modal show={successfulModal} onHide={() => this.setState({successfulModal: false})}>
							<Modal.Header closeButton>
								<Modal.Title style={{textAlign: 'center'}}>
									<img src={logoGoaly} alt="" height="60"/>
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<h3 className="mt-0">Subscribe Successful</h3>
        				<p>Your subscription is success. Now you can access to all our games in the portal</p>
							</Modal.Body>
							<Modal.Footer>
								<div className="row">
									<div className="col-xs-12 prfix">
										<button type="button" className="btn-sign" onClick={() => this.setState({successfulModal: false})}>
											<strong>Ok</strong>
										</button>
									</div>
								</div>
							</Modal.Footer>
						</Modal>
					 </>
        );
    }
};
export default withRouter(Subscibe);
