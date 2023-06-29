import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link, withRouter } from 'react-router-dom';
import Loader from "react-loader-spinner";
import axios from '../../_config/axios';
import { setUserDetails,setJWT } from '../../_helper/authentication';
import GoalyWhiteLogo from '../../assetsStaging/img/goaly_logo_white.png';
import './index.css';

const Login = (props) => {

    const [phoneNo,setPhoneNo] = useState('');
    const [password,setPassword] = useState('');
    const [errPh,setErrPh]= useState(false);
    const [errPass,setErrPass]= useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleChangePhone = prop => event =>{
        if(prop=='phone'){
            setPhoneNo(event.target.value);
            setErrPh(false);
        }
    }

    const handleChangePassword = prop => event =>{
        if(prop=='password'){
            setPassword(event.target.value);
            setErrPass(false);
        }
    }
    
    const loginWithPhonePassword = (e) =>{
        if(phoneNo==''){
            setErrPh(true);
        }
        if(password==''){
            setErrPass(true);
        }
        else{
        setLoading(true);
        const payload = new FormData();
        payload.append('phone_no', phoneNo);
        payload.append('password', password);
        axios.post('StageGoalyApi/login', payload)
            .then(res => {
                setLoading(false);
                // console.log(res.data);
                if (res.data.success == 0 && res.data.error == 1 && res.data.status==400) {
                    // setErrPhPass(true)
                    Swal.fire({
                        title: res.data.message,
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
                            setPassword('');

                        }
                    })
                }
                if (res.data.success == 1 && res.data.error == 0 && res.data.status==200) {
                    setUserDetails(res.data.data.user_details);
                    setJWT(res.data.data.JWT);
                    props.history.push('/')
                }
            })
        }
        
    }
    // console.log(phoneNo)
    // console.log(password)
    // console.log(user_details)
    return (
        <div className="login-wrapper row">
            <div className="container">
                <div className="login-logo text-center" style={{ marginTop: '40px', marginBottom: '30px' }}>
                    <img src={GoalyWhiteLogo} alt="Logo" />
                </div>
                <div className="login-card">
                    <div style={{ marginBottom: '24px' }}>
                        <h3 className="mt-0" style={{ fontWeight: 'bold' }}>Login</h3>
                        <p className="mb-0" style={{ opacity: 0.8 }}>Sign in to continue</p>
                    </div>
                    {/* <form> */}
                        <input type="number" className="form-control mb-2 login-box-shadow"
                        value={phoneNo}
                         placeholder="Phone Number" onChange={handleChangePhone('phone')} />
                         {errPh && <div style={{color:'red'}}>Phone number is required</div> }
                        <input type="password" className="form-control mb-2 login-box-shadow"
                        value={password}
                         placeholder="Password" onChange={handleChangePassword('password')} />
                         {errPass && <div style={{color:'red'}}>Password is required</div> }
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
                         onClick={loginWithPhonePassword}>Login</button>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
}
export default withRouter(Login);