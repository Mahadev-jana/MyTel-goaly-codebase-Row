import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet";
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Swal from 'sweetalert2';
import SubmitLoader from '../../loader/submit-loader/SubmitLoader';
import { get, post } from '../../api';
import { isEmpty, isValidEmail, isValidMobileNo, isValidImage } from '../../_helper/formValidation';
import imgAccount from '../../assets/img/acc-default2.png';
import countryCode from '../../assets/json/country_phoneCode.json';
import icon from '../../assets/img/logo-goaly.png';
// https: //sweetalert2.github.io/
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryList: [],
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            gender: 'MALE',
            mobileNoCode: 'NONE',
            mobileNo: '',
            country: 'NONE',
            error: {},
            profileImg: {
                base64: null,
                image: null
            },
            loading: false,
            CountryPhoneCode: [],
            phone_code: "-",
        }
    }
    componentDidMount() {
        this.setState({ CountryPhoneCode: countryCode.countryCode });
        this.getCountryList();
    }
    hadleProfileImg = event => {
        const coverImg = event.target.files[0];
        if (isValidImage(coverImg)) {
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
    setCountryPhoneNumber(code) {
        console.log(code);
        //  this.setState({ phone_code: code });
    }
    handleOnChange = prop => event => {

        this.setState({ [prop]: event.target.value });
        if (prop == "country") {
            let country = this.state.CountryPhoneCode.find(el => el.name == `${event.target.value}`);
            this.setState({ phone_code: country.dial_code });
        }
    }
    handleonSubmit = event => {
        event.preventDefault();
        const { firstName, lastName, email, password, gender, mobileNoCode, mobileNo, country, profileImg, phone_code } = this.state;
        const error = {};
        // Validate First Name
        if (isEmpty(firstName)) {
            error.firstName = 'First name is required.';
        }

        // Validate Last name
        if (isEmpty(lastName)) {
            error.lastName = 'Last name is required.';
        }

        // Validate Email Address
        if (isEmpty(email)) {
            error.email = 'Email is required.';
        } else if (!isValidEmail(email)) {
            error.email = 'Email is invalid.';
        }

        // Validate Password
        if (isEmpty(password)) {
            error.password = 'Password is required.';
        } else if (password.length < 8) {
            error.password = 'At least 8 characters is required.';
        }

        // Mobile no Code
        // if (mobileNoCode === 'NONE') {
        //     error.mobileNoCode = 'Select a Code'
        // }

        // Validate Mobile No
        if (isEmpty(mobileNo)) {
            error.mobileNo = 'Mobile Number is required.';
        } else if (!isValidMobileNo(mobileNo)) {
            error.mobileNo = 'Mobile Number is invalid.'
        }

        // Validate Country
        if (country === '-') {
            error.country = 'Select a Country'
        }

        if (!Boolean(Object.keys(error).length)) {
            this.setState({ loading: true });
            const payload = new FormData();
            payload.append('first_name', firstName);
            payload.append('last_name', lastName);
            payload.append('email', email);
            payload.append('password', password);
            payload.append('gender', gender);
            payload.append('phone', mobileNo);
            payload.append('dial_code', phone_code);
            payload.append('country', country);
            payload.append('profile', profileImg.image);
            console.log(payload);
            const _self = this;
            post('usersignup', payload)
                .then(res => {
                    _self.setState({ loading: false });
                    if (res.data.success == 1) {
                        Swal.fire({
                            type: 'success',
                            title: res.data.message
                        }).then((result) => {
                            _self.props.history.push('/login');
                        })
                    } else {
                        Swal.fire({
                            type: 'error',
                            title: res.data.message
                        }).then((result) => {
                            // _self.props.history.push('/login');
                        })
                    }



                })
                .catch(err => console.log(err));
        }
        this.setState({ error });
    }
    getCountryList = () => {

        get('getcountry')
            .then(res => {
                // console.log(res);
                if (res.data.success == 1) {
                    this.setState({ countryList: res.data.country_list });
                }
            })
            .catch(err => console.log(err));
    }
    render() {
        const { countryList, error, loading, profileImg, phone_code, CountryPhoneCode } = this.state;
        return (
            <React.Fragment>
                {/* <Helmet>
                    <title> Goaly | Register </title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
                <Row>
                    <div className="mt-10 pd-0">
                        {/* <div className="main-cat">
                        <div style={{ background: '#4D0053', height: '100px' }}></div>
                    </div> */}
                        <div className="clearfix"></div>
                        <form onSubmit={this.handleonSubmit}>
                            <div className="part">
                                <div className="series-title">Create New Account</div>
                                <div className="col-xs-12 mt-10">
                                    <div className="pt-form">
                                        <div className="pt-input">
                                            <label htmlFor="pt-user">First Name</label>
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                onChange={this.handleOnChange('firstName')}
                                                className={classnames({ "input-error": error.hasOwnProperty('firstName') })}
                                            />
                                            {error.hasOwnProperty('firstName') && <p>{error.firstName}</p>}
                                        </div>
                                        <div className="pt-input">
                                            <label htmlFor="pt-user">Last Name</label>
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                onChange={this.handleOnChange('lastName')}
                                                className={classnames({ "input-error": error.hasOwnProperty('lastName') })}
                                            />
                                            {error.hasOwnProperty('lastName') && <p>{error.lastName}</p>}
                                        </div>
                                        <div className="pt-input">
                                            <label htmlFor="pt-user">Email Address</label>
                                            <input
                                                type="text"
                                                placeholder="Email Address"
                                                onChange={this.handleOnChange('email')}
                                                className={classnames({ "input-error": error.hasOwnProperty('email') })}
                                            />
                                            {error.hasOwnProperty('email') && <p>{error.email}</p>}
                                            {!error.hasOwnProperty('email') && <p className="">We will send you a confirmation email to this address</p>}
                                        </div>
                                        <div className="pt-input">
                                            <label htmlFor="pt-user">Password</label>
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                onChange={this.handleOnChange('password')}
                                                className={classnames({ "input-error": error.hasOwnProperty('password') })}
                                            />
                                            {error.hasOwnProperty('password') && <p>{error.password}</p>}
                                        </div>
                                        <div className="pt-input">
                                            <label htmlFor="pt-user">Profile Picture</label>
                                            <div className="avatar-upload">
                                                <div className="avatar-edit">
                                                    <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={this.hadleProfileImg} />
                                                    <label htmlFor="imageUpload"></label>
                                                </div>
                                                <div className="avatar-preview">
                                                    {profileImg.hasOwnProperty('base64') && !Boolean(profileImg.base64) && <div id="imagePreview" style={{ backgroundImage: `url(${imgAccount})` }}>
                                                    </div>}
                                                    {profileImg.hasOwnProperty('base64') && Boolean(profileImg.base64) && <div id="imagePreview" style={{ backgroundImage: `url(${profileImg.base64})` }}>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-input">
                                            <label htmlFor="pt-user">Gender</label>
                                            <div className="radio">
                                                <label style={{ fontSize: '1.5em' }}>
                                                    <input type="radio" name="o1" value="MALE"
                                                        checked={Boolean(this.state.gender === 'MALE')}
                                                        onChange={this.handleOnChange('gender')}
                                                    />
                                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>
                                                Male
                                    </label>
                                                <label style={{ fontSize: '1.5em' }}>
                                                    <input type="radio" name="o1" value="FEMALE"
                                                        checked={Boolean(this.state.gender === 'FEMALE')}
                                                        onChange={this.handleOnChange('gender')}
                                                    />
                                                    <span className="cr"><i className="cr-icon fa fa-circle"></i></span>
                                                Female
                                    </label>
                                            </div>
                                        </div>
                                        <div className="liner"></div>
                                        <div className="pt-input">
                                            <label htmlFor="pt-user">Mobile Number</label>
                                            <input
                                                type="text"
                                                placeholder="Mobile Number"
                                                onChange={this.handleOnChange('mobileNo')}
                                                className={classnames({ "input-error": error.hasOwnProperty('mobileNo') })}
                                            />
                                            {error.hasOwnProperty('mobileNo') && <p>{error.mobileNo}</p>}
                                        </div>
                                        <div className=" col-xs-6" >
                                            <label htmlFor="pt-user">Country Residence</label>
                                            <select style={{ padding: 0 }}
                                                id="region"
                                                onChange={this.handleOnChange('country')}
                                                className={classnames("pt-select", { "input-error": error.hasOwnProperty('mobileNo') })}
                                            >
                                                <option value="NONE">Select a country</option>
                                                {CountryPhoneCode && CountryPhoneCode.map(country => <option key={country.country_code} value={country.country_code}
                                                >{country.name}</option>)}
                                            </select>
                                            {error.hasOwnProperty('country') && <p style={{ color: '#D9004B' }}>please select.</p>}
                                        </div>

                                        <div className=" col-xs-6" style={{ textAlign: 'Center' }}>
                                            <label htmlFor="pt-user" >Country Code</label>
                                            <p style={{ textAlign: 'Center', padding: 0 }}>{phone_code}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12">
                                    <button
                                        type="submit"
                                        className="btn-reg"
                                        disabled={loading}
                                    >&nbsp; Submit</button>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </form>
                    </div>
                    {loading && <SubmitLoader title="Please Wait..." />}
                </Row>
            </React.Fragment>
        );
    }
};

export default withRouter(Register);