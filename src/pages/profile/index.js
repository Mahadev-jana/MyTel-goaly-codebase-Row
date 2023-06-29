import React, { Component, Fragment } from 'react';
import Swal from 'sweetalert2';
import Ionicon from 'react-ionicons';
import { authPost } from '../../api';
import { Link } from 'react-router-dom';
import { setUserDetails,getUserDetails } from '../../_helper/authentication';
import './profile.css';
import loader from '../../assets/loader/loaderspinner.gif';
import axios from '../../_config/axios';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {},
			myTeam: [],
			isLoading: false
		}
	}
	componentDidMount() {
		this.getProfileDetails();
		this.getFavTeam();
	}
	getProfileDetails = () => {
		const payload = new FormData();
		let userId=getUserDetails().id;
		// console.log(phoneNo,'phoneNo');
		payload.append('user_id',userId);
		axios.post('StageGoalyApi/getprofile',payload)
			.then(res => {
				if (res.data.success == 1) {
					setUserDetails(res.data.user_data);
					this.setState({ userData: res.data.user_data });
				}
			})
			.catch(
				err => console.log(err)
			);
	}

	getFavTeam = () => {
		this.setState({ isLoading: true });
		const payload = new FormData();
		const userdetails = JSON.parse(localStorage.getItem('userDetails'));
		payload.append('user_id', (userdetails.id));

		axios.post('api/clubTeam', payload).then(res => {
			if (res.data && res.data.success && res.data.success == 1) {
				this.setState({ myTeam: res.data.favteams });
				this.setState({ isLoading: false });
			}
			if (res.data.success == 0) {
				this.setState({ myTeam: res.data.team_list });
			}
		})
			.catch(err => {
				console.log(err);
				this.setState({ isLoading: false });
			});
	}


	deleteTeam = teamId => {
		const _this = this;

		Swal.fire({
			type: 'warning',
			title: 'Are you sure to remove?',
			allowOutsideClick: false,
			showCancelButton: true,
		}).then((result) => {
			if (result.value) {
				_this.setState({ isLoading: true });
				const payload = new FormData();
				payload.append('id', teamId);
				authPost('removefavteam', payload)
					.then(res => {
						_this.setState({ myTeam: [] });
						_this.getFavTeam();
					})
					.catch(err => {
						console.log(err)
						this.setState({ isLoading: false });
					});
			}
		});
	}

	render() {
		const { userData, myTeam, isLoading } = this.state;
		return (
			<Fragment>
				{/* <Helmet>
					<title>Goaly | Profile</title>
					<link rel="icon" type="image/png" href={icon} sizes="20x20" />
				</Helmet> */}

				<div className=" mt-10">
					<div className="part" style={{ position: 'relative' }}>
						<div className="series-title">Your Account</div>
						<Link to="/profile/edit"
							style={{
								position: 'absolute',
								right: 0,
								top: 0,
								width: 'fit-content',
								background: '#4D0053',
								color: '#fff',
								lineHeight: '30px',
								padding: '2px 10px',
								letterSpacing: '1px',
								fontSize: '15px',
								fontWeight: 600,
								borderRadius: '2px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
							<Ionicon icon="md-person" className="hydrated" fontSize="20px" color="#fff" style={{
								marginRight: '2px',
								marginTop: '-3px'
							}} />
						Edit</Link>
						<div className="col-xs-12 mt-15 pd-0">
							<div className="col-xs-12 mt-10" style={{ position: 'relative' }}>
								<div className="row">
									<div className="col-xs-6 ">
										<div className="avatar-upload">
											{/* <div className="avatar-edit">
											<input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
										</div> */}
											<div className="avatar-preview" style={{ width: '182px', height: '182px' }}>
												{userData.hasOwnProperty('image') && <div style={{ backgroundImage: `url(${userData.image})` }}></div>}
											</div>
										</div>
									</div>
									<div className="col-xs-6">
										{/*<div className="r-coin" style={{ top: 0, padding: '0px 0 5px' }}>
											<i className="fas fa-coins fasco"></i>&nbsp; {userData.hasOwnProperty('coins') && <span style={userData.coins.length < 5 ? { fontSize: '30px' } : { fontSize: '20px' }}>{userData.coins}</span>}
											<p>Your Points</p>
										</div>*/}
										<div className="chk-reward" style={{ top: '0px', padding: 0, marginTop: 10 }}>
											{/*<Link 
											to="/reward" 
											className="btn btn-default chk">
												<i className="fas fa-gift"></i>&nbsp; Check Reward
							   			    </Link>*/}
											<Link
											 to="/profile/contest/history" 
											 class="btn btn-default cts mt-5">
												<i class="fas fa-futbol"></i>&nbsp; Contest History
										</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="clearfix" ></div>
							<div className="col-xs-6">
								<div className="pt-input">
									<label htmlFor="pt-user">First Name</label>
									<div className="">
										<h4 className="mt-10 bg-f5">{userData.hasOwnProperty('first_name') && userData.first_name}</h4>
									</div>
								</div>
							</div>
							<div className="col-xs-6">
								<div className="pt-input">
									<label htmlFor="pt-user">Last Name</label>
									<div className="">
										<h4 className="mt-10 bg-f5">{userData.hasOwnProperty('last_name') && userData.last_name}</h4>
									</div>
								</div>
							</div>


							<div className="col-xs-12 mt-10">
								<div className="pt-input">
									<label htmlFor="pt-user">Email Address</label>
									<div className="">
										<h4 className="mt-10 bg-f5">{userData.hasOwnProperty('email') && userData.email}</h4>
									</div>
								</div>
							</div>

							<div className="col-xs-12 mt-10">
								<div className="pt-input">
									<label htmlFor="pt-user">Phone Number</label>
									<div className="">
										<h4 className="mt-10 bg-f5">{userData.hasOwnProperty('msisdn') && userData.msisdn}</h4>
									</div>
								</div>
							</div>


							<div className="col-xs-12 mt-10">
								<div className="pt-input">
									<label htmlFor="pt-user">Country Residence</label>
									<div className="">
										<h4 className="mt-10 bg-f5">{userData.hasOwnProperty('country_name') && userData.country_code}</h4>
									</div>
								</div>
							</div>
						</div>
						<div className="liner"></div>
						<div className="col-xs-12 pd-0">
							<div className="col-xs-12 mt-10" style={{ height: 300, overflow: 'auto' }}>
								<div className="pt-input">
									<div className="col-xs-12 pd-0">
										<label htmlFor="pt-user">Favorite Club</label>
									</div>
									<div>
										{myTeam && myTeam.map((data, key) => (
											<React.Fragment key={key}>
												<div className="col-xs-3">
													<img src={data.badge} style={{ height: '50px', width: '50px' }} />
												</div>
												< div className="col-xs-7" >
													< h4 className="mt-10 bg-f5"
														style={{
															whiteSpace: 'nowrap',
															overflow: 'hidden',
															textOverflow: 'ellipsis',
															maxWidth: '100%'
														}}
													>{data.name}</h4>
												</div>
												<div className="col-xs-2">
													<div style={{
														padding: '5px',
														borderRadius: '3px'
													}}
														className="mt-10 "
														onClick={() => this.deleteTeam(data.id)}
													><i className="fa fa-trash" style={{ fontSize: '20px', color: '#000' }}></i></div>
												</div>
											</React.Fragment>
										))}
										{!isLoading && myTeam && !myTeam.length && <React.Fragment>
											<div className='row'>
												<div className="col-xs-3">
												</div>
												< div className="col-xs-7" style={{
													textAlign: 'center', marginTop: '30%',
													fontWeight: 600, color: 'black', textAlign: 'center'
												}}>
													No Favourite club  Yet!
											</div>
												<div className="col-xs-2">
												</div>
											</div>
										</React.Fragment>
										}
										{isLoading && myTeam && !myTeam.length && <React.Fragment>
											<div className='row'>
												<div className="col-xs-3">
												</div>
												< div className="col-xs-7" style={{ textAlign: 'center', marginTop: '30%' }}>
													<img src={loader}
														style={{ height: '40px', width: '40px', top: 0, textAlign: 'center', margin: '0px 20px 0px 0px' }} />
												</div>
												<div className="col-xs-2">
												</div>
											</div>
										</React.Fragment>
										}
									</div>
								</div>
							</div>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
			</Fragment>
		);
	}
};

export default Profile;