import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import Swal from 'sweetalert2';
import SubmitLoader from '../../loader/submit-loader/SubmitLoader';
import { authPost, get } from '../../api';
import axios from '../../_config/axios';
import { Link } from 'react-router-dom';
import { isEmpty, isValidEmail, isValidMobileNo, isValidImage } from '../../_helper/formValidation';
import { setUserDetails,getUserDetails } from '../../_helper/authentication';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import imgCoin from '../../assets/img/coin.png';
import imgGift from '../../assets/img/gift.png';
import iconProfileEdit from '../../assets/img/profile-edit.png';
import './profile.css';
import countryCodeList from '../../assets/json/country_phoneCode.json';

class ProfileEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {},
			error: {},
			firstName: '',
			lastName: '',
			phone_no: '',
			email:'',
			msisdn:'',
			countryCode: 'NONE',
			country: 'NONE',
			dial_code: '',
			countryList: [],
			profileImg: {
				base64: null,
				image: null,
			},
			loading: false
		}
	}

	componentDidMount() {
		this.setState({ countryList: countryCodeList.countryCode });


		//	this.getCountryList();
		this.getProfileDetails();
	}
	handleOnChange = prop => event => {
		this.setState({ [prop]: event.target.value });
		if (prop == "country") {
			let country = this.state.countryList.find(el => el.name == `${event.target.value}`);
			// console.log(country);
			this.setState({ dial_code: country.dial_code });
		}
	}

	hadleProfileImg = event => {
		const coverImg = event.target.files[0];
		if (!!coverImg && isValidImage(coverImg)) {
			// Valid Image
			const reader = new FileReader();
			const _self = this;
			reader.onload = function () {
				const profileImg = {};
				profileImg.image = coverImg;
				profileImg.base64 = reader.result;
				_self.setState({ profileImg });
			};
			reader.onerror = function (error) {
				console.log('Error: ', error);
			};
			reader.readAsDataURL(coverImg);
		} else {
			// Invalid Image
			alert('Not a valid Image File');

		}
	}

	getProfileDetails = () => {
		const payload = new FormData();
		let userId=getUserDetails().id;
		// console.log(phoneNo,'phoneNo');
		payload.append('user_id',userId);
		axios.post('StageGoalyApi/getprofile',payload)
			.then(res => {
				window.scrollTo(0, 0);
				if (res.data.success == 1) {
					setUserDetails(res.data.user_data);
					this.setState({
						userData: res.data.user_data,
						firstName: res.data.user_data.first_name,
						phone_no: res.data.user_data.phone_no,
						lastName: res.data.user_data.last_name,
						countryCode: res.data.user_data.country_code,
						country: res.data.user_data.country_code,
						dial_code: res.data.user_data.dial_code,
						email: res.data.user_data.email,
						msisdn: res.data.user_data.msisdn,
					});
				}
			})
			.catch(err => console.log(err));
	}

	getCountryList = () => {
		get('getcountry')
			.then(res => {
				if (res.data.success == 1) {
					this.setState({ countryList: res.data.country_list });
				}
			})
			.catch(err => console.log(err));
	}

	updateProfile = event => {
		event.preventDefault();
		let phoneNo=getUserDetails().phone_no;
		const _this = this;
		this.setState({ loading: true });
		const { firstName, lastName, countryCode, profileImg, phone_no, country, email, dial_code } = this.state;
		const payload = new FormData();
		payload.append('id', getUserDetails().id);
		payload.append('first_name', firstName);
		payload.append('last_name', lastName);
		payload.append('email', email);
		payload.append('phone_no',phoneNo);
		// payload.append('dial_code', dial_code);
		payload.append('country', country);
		if (Boolean(profileImg.image))
			payload.append('profile', profileImg.image);
		axios.post('StageGoalyApi/setprofile', payload)
			.then(res => {
				if(res.data.success==1 && res.data.status==200 && res.data.error==0){
				// _this.getProiffileDetails();
				_this.setState({ loading: false });
				Swal.fire({
					type: 'success',
					title: 'Your profile is successfully updated'
				});
				_this.props.history.push('/profile')
				}
				else if(res.data.success==0 && res.data.status==400 && res.data.error==1){
					
					_this.setState({ loading: false });
					Swal.fire({
						type: 'error',
						title: 'This email already exist!!'
					});
					this.setState({
						email:this.state.userData.email
					}) 
					}
				else{
					Swal.fire({
						type: 'error',
						title: 'Your profile is not updated'
					});
					_this.setState({ loading: false });
				}
				
				
				
			})
			.catch(err => {
				console.log(err);
				_this.getProfileDetails();
				_this.setState({ loading: false });
			});
	}

	render() {
		const { firstName,
			lastName,
			countryCode,
			userData,
			countryList,
			error,
			loading,
			profileImg,
			phone_no,
			email,
			msisdn,
			CountryPhoneCode, dial_code } = this.state;
		return (
			<Fragment>
				{/* <Helmet>
					<title>Goaly | Profile Edit</title>
					<link rel="icon" type="image/png" href={icon} sizes="20x20" />
				</Helmet> */}
				<>
					<div className=" mt-10">
						<div className="part" style={{ position: 'relative' }}>
							<div className="series-title">Edit My Account</div>
							<div className="col-xs-12 mt-15 pd-0">
								<form onSubmit={this.updateProfile}>
									<div className="col-xs-12 mt-10" style={{ position: 'relative' }}>
										<div className="row">
											<div className="col-xs-12" style={{ paddingBottom: '20px' }}>
												<div className="avatar-upload">
													<div className="avatar-preview" style={{ width: '182px', height: '182px' }}>
														<div style={{
															position: 'absolute',
															width: 'fit-content',
															height: 'fit-content',
															display: 'block',
															right: '0px',
															bottom: '15px',
															fontSize: '15px',
															color: '#fff',
															background: 'rgba(0, 0, 0, 0.8)',
															padding: '5px 8px',
															borderRadius: '8px'
														}}
															onClick={() => document.getElementById('imageUpload').click()}
														><i className="fa fa-camera"></i></div>
														{userData.hasOwnProperty('image') && !Boolean(profileImg.base64) && <div style={{ backgroundImage: `url(${userData.image})` }}></div>}
														{userData.hasOwnProperty('image') && Boolean(profileImg.base64) && <div style={{ backgroundImage: `url(${profileImg.base64})` }}></div>}
													</div>
													<input style={{ display: 'none' }} onChange={this.hadleProfileImg} className="file-upload" type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
												</div>
											</div>
										</div>
									</div>
									<div className="clearfix" ></div>
									<div className="col-xs-6">
										<div className="pt-input">
											<label htmlFor="pt-user">First Name</label>
											<div className="">
												<input type="text" onChange={this.handleOnChange('firstName')} value={firstName} />
											</div>
										</div>
									</div>
									<div className="col-xs-6">
										<div className="pt-input">
											<label htmlFor="pt-user">Last Name</label>
											<div className="">
												<input type="text" onChange={this.handleOnChange('lastName')} value={lastName} />
											</div>
										</div>
									</div>
									<div className="col-xs-12 mt-10">
										<div className="pt-input">
											<label htmlFor="pt-user">Email Address</label>
											<div className="">
												<input type="text" onChange={this.handleOnChange('email')} value={email} />
											</div>
										</div>
									</div>

									<div className="col-xs-12 mt-10">
										<div className="pt-input">
											<label htmlFor="pt-user">Phone Number </label>
											<div className="">
											<h4 className="mt-10 bg-f5">{userData.hasOwnProperty('msisdn') && userData.msisdn}</h4>
												
											</div>
										</div>
									</div>


									<div className=" col-xs-6" >
										<label htmlFor="pt-user">Country Residence</label>
										<select style={{ padding: '10px' }}
											id="region"
											onChange={this.handleOnChange('country')}
											className={classnames("pt-select", { "input-error": error.hasOwnProperty('mobileNo') })}
										>
											<option value={countryCode}>{countryCode}</option>
											{countryList && countryList.map((country,key) => <option key={key} value={country.country_code}
											>{country.name}</option>)}
										</select>
										{error.hasOwnProperty('country') && <p style={{ color: '#D9004B' }}>please select.</p>}
									</div>

									{/* <div className=" col-xs-6" style={{ textAlign: 'Center' }}>
										<label htmlFor="pt-user" >Country Code</label>
										<p style={{ textAlign: 'Center', padding: 0 }}>{dial_code}</p>
									</div> */}


									<div className="col-xs-12 mt-10">
										<button type="submit" className="btn-sign">Update</button>
									</div>
								</form>
							</div>
							<div className="clearfix"></div>
						</div>
					</div>
					{loading && <SubmitLoader title="Please Wait..." />}
				</>
			</Fragment>
		);
	}
};

export default ProfileEdit;