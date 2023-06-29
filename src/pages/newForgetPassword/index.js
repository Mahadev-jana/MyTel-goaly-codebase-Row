import React, { useState } from 'react';
import axios from '../../_config/axios';
import Swal from 'sweetalert2';
import Loader from "react-loader-spinner";
import GoalyWhiteLogo from '../../assetsStaging/img/goaly_logo_white.png';
import { withRouter } from 'react-router-dom';
const ForgetPassword = (props) => {
    const [phoneNo, setPhoneNo] = useState('');
    const [phoneNoEmpty, setPhoneNoEmpty] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [showOtpContailner, setShowOtpContainer] = useState(false);
    const [otpGenerated, setOtpGenerated] = useState('');
    const [otpNo, setOtpNo] = useState('');
    const [otpNoEmpty, setOtpNoEmpty] = useState(false);
    const [showChangePasswordContainer, setShowChangePasswordContainer] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsEmpty, setPasswordsEmpty] = useState(false);

    const [loadingOtpSend,setLoadingOtpSend] = useState(false);
    const [loadingChangePass,setLoadingChangePass] = useState(false);

    const handleOnChange = prop => event => {
        if (prop == 'phone') {
            setPhoneNo(event.target.value)
            setPhoneNoEmpty(false);
        }
        if (prop == 'otp') {
            setOtpNo(event.target.value)
            // setOtpNoEmpty(false)
        }
        if (prop == 'password') {
            setPassword(event.target.value)
            setPasswordsEmpty(false)
        }
        if (prop == 'confirm-password') {
            setConfirmPassword(event.target.value)
            setPasswordsEmpty(false)
        }
    }
    const checkPhone = () => {
        if (phoneNo.length === 0) {
            setPhoneNoEmpty(true);
            setErrorText('Enter phone number before submit')
        }
        else {
            setLoadingOtpSend(true);
            const payload = new FormData();
            payload.append('phone_no', phoneNo);
            // payload.append('password', password);
            axios.post('StageGoalyApi/otpGenerateForPassword', payload)
                .then(res => {
                    // setLoading(false);
                    // console.log(res.data);
                    if (res.data.success == 1 && res.data.error == 0) {

                        // alert('success')
                        setOtpGenerated(res.data.data.pass_otp)
                        setShowOtpContainer(true);
                        setLoadingOtpSend(false);
                    }
                    if (res.data.success == 0 && res.data.error == 1) {
                        setLoadingOtpSend(false);
                        // alert('Account not exixts');
                        Swal.fire({
                            title: 'Phone number does not exist',
                            text: "Try again!!!",
                            type: 'error',
                            // showCancelButton: true,
                            confirmButtonColor: 'red',
                            // cancelButtonColor: '#d33',
                            confirmButtonText: 'Okay',
                            // cancelButtonText: 'try again'
                        }).then((result) => {
                            if (result.value) {
                                setPhoneNo('');
                                // setPassword('');

                            }
                        })
                    }
                    // if (res.data.success == 1 && res.data.error == 0 && res.data.status==200) {
                    //     setUserDetails(res.data.data.user_details);
                    //     setJWT(res.data.data.JWT);
                    //     props.history.push('/')
                    // }
                })
        }

    }

    const checkOtp = () => {
        if (otpNo.length === 0) {
            setOtpNoEmpty(true)
            setErrorText('Enter OTP before submit')
        }
        else if (otpNo != otpGenerated) {
            Swal.fire({
                title: 'Invalid OTP!!!',
                text: "Try again!!!",
                type: 'error',
                // showCancelButton: true,
                confirmButtonColor: 'red',
                // cancelButtonColor: '#d33',
                confirmButtonText: 'Okay',
                // cancelButtonText: 'try again'
            }).then((result) => {
                if (result.value) {
                    setOtpNo('');
                    // setPassword('');

                }
            })

        }
        else if (otpNo == otpGenerated) {
            // alert('otp matched');
            setShowChangePasswordContainer(true)
        }
    }
    

    const checkAndChangePassword = () => {
        if (password.length === 0 || confirmPassword.length === 0) {
            setPasswordsEmpty(true)
            setErrorText('All fields must not be empty')
        }
        else if (password !== confirmPassword) {
            Swal.fire({
                title: 'Does not matched Password and Confirm Password!',
                text: "Try again!!!",
                type: 'error',
                // showCancelButton: true,
                confirmButtonColor: 'red',
                // cancelButtonColor: '#d33',
                confirmButtonText: 'Okay',
                // cancelButtonText: 'try again'
            }).then((result) => {
                if (result.value) {
                    setPassword('');
                    setConfirmPassword('');

                }
            })

            // setPasswordsEmpty(true)
            // setErrorText('All fields must not be empty')
        }
        else if (password === confirmPassword) {
            setLoadingChangePass(true);
            const payload = new FormData();
            payload.append('phone_no', phoneNo);
            payload.append('password', password);
            axios.post('StageGoalyApi/ForgotPassword', payload)
                .then(res => {
                    // setLoading(false);
                    // console.log(res.data);
                    if (res.data.success == 1 && res.data.error == 0) {
                        // alert('Sucess fully password changed');
                        setLoadingChangePass(false);
                        Swal.fire({
                            title: 'You have sucessfully changed the password',
                            text: "Login to get all access",
                            type: 'success',
                            // showCancelButton: true,
                            confirmButtonColor: 'green',
                            // cancelButtonColor: '#d33',
                            confirmButtonText: 'Okay',
                            // cancelButtonText: 'try again'
                        }).then((result) => {
                            if (result.value) {
                                // setPassword('');
                                // setConfirmPassword('');
                                props.history.push('/login')

                            }
                        })
                        
                    }
                    if (res.data.success == 0 && res.data.error == 1) {
                        alert('password not changed');
                        setLoadingChangePass(false);
                    }
                })

        }
    
    }

    console.log(phoneNo)
    console.log(otpNo)
    console.log(otpGenerated, 'otpGenerated')
    console.log(password, 'password')
    console.log(confirmPassword, 'confirmPassword')
    return (
        <div className="login-wrapper row">
            <div className="container">
                <div className="login-logo text-center" style={{ marginTop: "40px", marginBottom: "30px" }}>
                    <img src={GoalyWhiteLogo} alt="Logo" />
                </div>
                {!showChangePasswordContainer && !showOtpContailner && <div className="login-card">
                    <div style={{ marginBottom: '24px' }}>
                        <h3 className="mt-0" style={{ fontWeight: 'bold' }}>Forget Password</h3>
                        <p className="mb-0" style={{ opacity: '0.8' }}>Please Enter the phone number you use for Goaly</p>
                    </div>

                    <input type="number" className="form-control mb-2 login-box-shadow"
                        placeholder="Enter Phone Number"
                        value={phoneNo}
                        onChange={handleOnChange('phone')} />
                    {phoneNoEmpty && <div style={{ color: 'red' }}>{errorText}</div>}
                    <button className="btn btn-block bg-green btn-success login-box-shadow mb-2"
                        style={{ fontWeight: 'bold' }} onClick={checkPhone}>Send</button>

                        {loadingOtpSend && <Loader
                            type="Puff"
                            color="#ac4cb7"
                            height={50}
                            width={50}
                            style={{textAlignLast:'center'}}
                        />}

                    <p className="text-center mb-0">Already you know the password? <a onClick={() => props.history.push('/login')}>Sign in</a></p>

                </div>
                }
                {!showChangePasswordContainer && showOtpContailner && <div className="login-card">
                    <div style={{ marginBottom: '24px' }}>
                        <h3 className="mt-0" style={{ fontWeight: 'bold' }}>OTP Verification</h3>
                        <p className="mb-0" style={{ opacity: '0.8' }}>Please Enter the OTP sent to your number</p>
                    </div>

                    <input type="number" className="form-control mb-2 login-box-shadow"
                        placeholder="Enter OTP"
                        value={otpNo}
                        onChange={handleOnChange('otp')} />
                    {otpNoEmpty && <div style={{ color: 'red' }}>{errorText}</div>}
                    <button className="btn btn-block bg-green btn-success login-box-shadow mb-2"
                        style={{ fontWeight: 'bold' }} onClick={checkOtp}>Send</button>
                    {/* <p className="text-center mb-0">Already you know the password? <a onClick={()=>props.history.push('/login')}>Sign in</a></p> */}

                </div>
                }
                {showChangePasswordContainer && <div className="login-card">
                    <div style={{ marginBottom: '24px' }}>
                        <h3 className="mt-0" style={{ fontWeight: 'bold' }}>Create New Password</h3>
                        <p className="mb-0" style={{ opacity: '0.8' }}>Please Enter the OTP sent to your number</p>
                    </div>

                    <input type="text" className="form-control mb-2 login-box-shadow"
                        type="password"
                        placeholder="Enter New Password"
                        value={password}
                        onChange={handleOnChange('password')} />
                    {/* {otpNoEmpty && <div style={{color:'red'}}>{errorText}</div>} */}
                    <input type="text" className="form-control mb-2 login-box-shadow"
                        type="password"
                        placeholder="Enter New Password Confirmation"
                        value={confirmPassword}
                        onChange={handleOnChange('confirm-password')} />
                    {passwordsEmpty && <div style={{ color: 'red' }}>{errorText}</div>}
                    <button className="btn btn-block bg-blue btn-primary login-box-shadow mb-2"
                        style={{ fontWeight: 'bold' }} 
                        onClick={checkAndChangePassword}
                        >Send</button>
                        {loadingChangePass && <Loader
                            type="Puff"
                            color="#ac4cb7"
                            height={50}
                            width={50}
                            style={{textAlignLast:'center'}}
                        />}
                    {/* <p className="text-center mb-0">Already you know the password? <a onClick={()=>props.history.push('/login')}>Sign in</a></p> */}

                </div>
                }
            </div>
        </div>
    )
}
export default withRouter(ForgetPassword);