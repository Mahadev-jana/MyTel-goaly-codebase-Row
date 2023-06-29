import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import Countdown from 'react-countdown';
import Loader from "react-loader-spinner";
import classnames from 'classnames';
import { get, post } from '../../api';
import axios from '../../_config/axios';
import CountryCode from '../../assets/json/country_phoneCode.json';
import GoalyWhiteLogo from '../../assetsStaging/img/goaly_logo_white.png';

import './index.css';
const NewRegistrationMsisdn = (props) => {
    const [continueButton, setContinueButton] = useState(false);
    const [checked, setChecked] = useState(false);
    const [countrylist, setCountrylist] = useState(false);
    const [countryPhoneCode, setCountryPhoneCode] = useState([]);
    const [phone_code, setPhone_code] = useState('-');
    const [phoneNo, setPhoneNo] = useState('');
    const [resOtpMsg, setresOtpMsg] = useState('');
    const [error, setError] = useState(false);
    const [checkError, setCheckError] = useState(false);
    const [alreadyExists, setAlreadyExists] = useState(false)
    const [otp, setOtp] = useState('');
    const [verifyError, setVerifyError] = useState(false);
    const [verifyLenError, setVerifyLenError] = useState(false);
    const [generatedPhoneNo, setGeneratedPhoneNo] = useState('');
    // const [alreadyAccountExist, setAlreadyAccountExist] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setCountryPhoneCode(CountryCode.countryCode)

    })


    const getOTP = () => {
        setLoading(true)
        const payload = new FormData();
        payload.append('phone_no', phoneNo);
        axios.post('StageGoalyApi/otpgenerate', payload)
            .then(res => {
                // console.log(res.data.otp_verify);
                if (res.data.success == 1 && res.data.error == 0) {
                    setLoading(false)
                    if (res.data.otp_verify === 'NO') {
                        setGeneratedPhoneNo(res.data.data.phone_no)
                        setresOtpMsg(res.data.msg);
                        setContinueButton(true);
                    }
                    if (res.data.otp_verify === 'YES') {
                        Swal.fire({
                            title: 'Already account exists with this mobile number',
                            // text: "Try again!!!",
                            type: 'success',
                            // showCancelButton: true,
                            confirmButtonColor: 'green',
                            // cancelButtonColor: '#d33',
                            confirmButtonText: 'Okay',
                            // cancelButtonText: 'try again'
                        }).then((result) => {
                            if (result.value) {
                                props.history.push('/login')
                            }
                        })
                    }



                }
                if (res.data.success == 0 && res.data.error == 1) {
                    setLoading(false)
                    setresOtpMsg(res.data.msg);
                    setAlreadyExists(true)
                }
            })

            .catch(err => console.log(err));
    }

    const otpVerify = (e) => {
        
        if (otp == '') {
            setVerifyError(true)
        }
        if (otp.length < 4 || otp.length > 4) {
            setVerifyLenError(true)
        }
        else {
            setLoading(true)
            const payload = new FormData();
            payload.append('phone_no', generatedPhoneNo);
            payload.append('otp', otp);
            axios.post('StageGoalyApi/OTPCheck', payload)
                .then(res => {
                    // console.log(res);
                    if (res.data.success == 1 && res.data.error == 0) {
                        setLoading(false)
                        Swal.fire({
                            title: 'Your account has been created',
                            // text: "Try again!!!",
                            type: 'success',
                            // showCancelButton: true,
                            confirmButtonColor: 'green',
                            // cancelButtonColor: '#d33',
                            confirmButtonText: 'Okay',
                            // cancelButtonText: 'try again'
                        }).then((result) => {
                            if (result.value) {
                                props.history.push('/login')
                            }
                        })
                    }


                    if (res.data.success == 0 && res.data.error == 1) {
                        setLoading(false)
                        Swal.fire({
                            title: 'OTP not matched',
                            text: "Try again!!!",
                            type: 'warning',
                            // showCancelButton: true,
                            confirmButtonColor: '#ac4cb7',
                            // cancelButtonColor: '#d33',
                            confirmButtonText: 'Okay',
                            // cancelButtonText: 'try again'
                        }).then((result) => {
                            if (result.value) {
                                e.preventDefault();
                                setOtp('');

                            }
                        })
                    }
                })

                .catch(err => console.log(err));
        }

    }
    const nextPage = () => {
        console.log(checked)
        if (phoneNo === '') {
            setError(true);
        }
        else if (!checked) {
            setCheckError(true);
        }
        else {
            getOTP();
        }




    }

    const prevPage = () => {
        setContinueButton(false);
        setPhoneNo('');
        setChecked(!checked);
    }

    const handleCheckbox = () => {
        setChecked(!checked);
        setCheckError(false);

    }
    
    const handleOnChange = prop => event => {
        if (prop == 'phone') {
            setPhoneNo(event.target.value)
            setError(false);
            setAlreadyExists(false);
        }
    }
    const handleOtpOnChange = prop => event => {
        setVerifyError(false)
        setVerifyLenError(false)
        if (prop == 'otp') {
            setOtp(event.target.value)

        }
    }

    // console.log(checked)
    // console.log(countryPhoneCode)
    // console.log(resOtpMsg)
    // console.log(phoneNo)
    // console.log(continueButton)
    // console.log(otp.length)
    return (
        <div className="login-wrapper row">
            <div className="container">
                <div className="login-logo text-center" style={{ marginTop: '40px', marginBottom: '30px' }}>
                    <img src={GoalyWhiteLogo} alt="Logo" />
                </div>
                {!continueButton &&
                    <div className="login-card">
                        <div style={{ marginBottom: '24px' }}>
                            <h3 className="mt-0" style={{ fontWeight: 'bold' }}>Sign Up</h3>
                            <p className="mb-0" style={{ opacity: '0.8' }}>Create a new account</p>
                        </div>
                        {/* <form> */}
                        {/* <div className=" col-xs-6 pb-10" > */}
                        {/* <label htmlFor="pt-user">Country</label>
                                <select style={{ padding: 0 }}
                                    id="region"
                                    onChange={handleOnChangeCountry('country')}
                                    
                                    className="pt-select"
                                >
                                    <option value="NONE">Select a country</option>
                                    {countryPhoneCode && countryPhoneCode.map(country => <option key={country.country_code} value={country.country_code}
                                    >{country.name}</option>)}
                                </select> */}
                        {/* {error.hasOwnProperty('country') && <p style={{ color: '#D9004B' }}>please select.</p>} */}
                        {/* </div>
                            <div className=" col-xs-6" style={{ textAlign: 'Center' }}>
                                <label htmlFor="pt-user" >Country Code</label>
                                <p style={{ textAlign: 'Center', padding: 0 }}>{phone_code}</p> */}
                        {/* </div> */}
                        <input type="number" className="form-control mb-2 login-box-shadow"
                            placeholder="Enter Phone Number"
                            onChange={handleOnChange('phone')}
                        />
                        {error && <div style={{ color: 'red' }}>This field can not be empty</div>}
                        {alreadyExists && <div style={{ color: 'red' }}>This Number is already exists</div>}
                        <div className="checkbox" style={{ marginBottom: '2rem' }}>
                            <label><input type="checkbox" id="accept" value=""
                                style={{ display: 'block' }}
                                checked={checked}
                                onChange={handleCheckbox}

                            /><Link to='/service'>I agree to the terms and conditions</Link></label>
                            {checkError && <div style={{ color: 'red' }}>You have to allow all terms and condition</div>}
                        </div>
                        {loading && <Loader
                            type="Puff"
                            color="#ac4cb7"
                            height={50}
                            width={50}
                            style={{textAlignLast:'center'}}
                            // timeout={3000} //3 secs
                        />}
                        <button className="btn btn-block bg-green btn-success login-box-shadow mb-2"
                            style={{ fontWeight: 'bold' }}
                            onClick={nextPage}>Continue</button>
                        <p className="text-center mb-0">Already have an account? <Link to='/login'>Sign in</Link></p>
                        {/* </form> */}
                    </div>

                }
                {continueButton &&
                    <div className="login-card">
                        <div style={{ marginBottom: '24px' }}>
                            <h3 className="mt-0" style={{ fontWeight: 'bold' }}>Sign Up</h3>
                            <p className="mb-0" style={{ opacity: 0.8 }}>Create a new account</p>
                        </div>
                        <p className="mb-2">
                            We have sent a PIN to your number. Paste the number to the input field below
            </p>
                        <div>
                            {/* <CountDownForOTP/> */}
                        </div>

                        <input type="text" className="form-control mb-2 login-box-shadow"
                            placeholder="Enter PIN Code" value={otp}
                            onChange={handleOtpOnChange('otp')}
                        />
                        {verifyError && <div style={{ color: 'red' }}>This field can not be empty</div>}
                        {verifyLenError && <div style={{ color: 'red' }}>otp must be length of 4</div>}
                        {loading && <Loader
                            type="Puff"
                            color="#ac4cb7"
                            height={50}
                            width={50}
                            style={{textAlignLast:'center'}}
                        />}
                        <button className="btn btn-block bg-green text-white login-box-shadow mb-2"
                            style={{ fontWeight: 'bold' }}
                            onClick={otpVerify}>Send</button>
                        <button className="btn btn-block bg-white text-white login-box-shadow mb-2"
                            style={{ fontWeight: 'bold', color: '#7CD327', border: '1px solid #7CD327' }}
                            onClick={prevPage}
                        >Cancel</button>
                        <p className="text-center mb-0" onClick={() => window.location.reload()}>Didn't get PIN? <a>Retry</a></p>

                    </div>
                }
            </div>
        </div>

    )
}
export default withRouter(NewRegistrationMsisdn);

const Completionist = () => window.location.reload();

const renderer = ({ seconds, completed }) => {
    if (completed) {
        const otpPut = false;
        // Render a completed state
        return <Completionist />;
    } else {
        // Render a countdown
        return <h3 className="my-1" style={{ fontSize: '15px', color: 'green' }}><strong>{seconds}s</strong></h3>;
    }
};

export const CountDownForOTP = () => {

    var ms = 60000;
    return (
        <Countdown
            date={Date.now() + ms}
            renderer={renderer}
        />
    )
}