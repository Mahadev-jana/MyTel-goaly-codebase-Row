import React from 'react';
import './modal.css';
import FontAwesome from 'react-fontawesome';
import { withRouter } from 'react-router';
import { setUserDetails,getUserDetails } from '../../_helper/authentication';
import axios from '../../_config/axios';

const Modal = (props) => {
  const { closeModal } = props;
  const [msisdn,setmsisdn]= React.useState("");
  const [checkMsisdn,setCheckMsisdn]= React.useState(false);

  const closeicon = () => (
    <FontAwesome
    name="times"
    onClick={closeModal}
    style={{
      color: '#000000',
      padding: '10px',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: 0,
      position: 'absolute',
      top: '0.3rem',
      right: '0.5rem',
    }}
    />
  );

  // const dailysub = () =>{
  //   console.log("hi")
  //   console.log(msisdn)
  //   const payload = new FormData();
  //   payload.append('msisdn', msisdn);
  //   payload.append('username', getUserDetails().username);
  //   axios.post('Subscription/unsub_refcode', payload)
  //       .then(res => {
  //           if (res.status= '200'){

  //             localStorage.clear();
  //             window.location.reload("/");

  //           }
  //       })
  //       .catch(err => console.log(err));

  // }

  const dailysub = () =>{
    console.log("hi")
    console.log(msisdn)

      const payload = new FormData();
      payload.append('phone_no', msisdn);
      axios.post('StageGoalyApi/check_login_status', payload)
          .then(res => {
              console.log(res)
              if(res.data.status == '200'){
                  if (res.data.data.user_details.status== 'active'){
                          
                      setCheckMsisdn(true);
                  }else{

                    props.history.push({
                      pathname: `Package/${msisdn}`,
                      state: { msisdn: msisdn }
                    })
                    window.location.reload();
                  }
              }else{

                  props.history.push({
                      pathname: `Package/${msisdn}`,
                      state: { msisdn: msisdn }
                    })
                    window.location.reload();
              }
          })
          .catch(err => console.log(err));   
  }


  const handlechange =(e)=>{
      setmsisdn(e.target.value)
  }

  


  return (
    <div className="overlay">
      <div className="content" style={{top:192,marginLeft:74,minWidth:'-webkit-fill-available',height:176}}>
        { closeicon() }
        {/* {props.children} */}
        <div style={{marginTop:25}}>Enter Msisdn</div><br/>
        <input type='text' style={{textAlign:'center',borderRadius:81}} onChange={handlechange} placeholder='96XXXXXXX'></input>
        {checkMsisdn && <div style={{color:'green'}}>Phone number already subcscribe</div> }

        <button style={{marginTop:10,backgroundColor:'red'}} onClick={dailysub}>Submit</button>

      </div>
    </div>
  );
};


export default withRouter(Modal);