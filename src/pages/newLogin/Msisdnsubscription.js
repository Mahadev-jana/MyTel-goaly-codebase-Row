import React,{useState} from 'react';
import { withRouter } from 'react-router';
import './util.css';
import './circle.css';
// import '/bootstrap.min.css';
// import './MssidnSubscription.css';



const Msisdnsubscription = (props)=>{
    //console.log(props)
    let id=2;
    console.log(props.location.state.msisdn)

    const [value,setvalue]=useState('');

    const handleChange=(e)=>{
        setvalue( e.target.value);
        console.log(e.target.value);
     }

     const subscribe=()=>{
       if(value=='daily'){
        window.location.href="http://149.129.252.221:8028/app/api/mytel/wap.php?type=reg&service=goalydaily&msisdn="+props.location.state.msisdn
       }else{
        window.location.href="http://149.129.252.221:8028/app/api/mytel/wap.php?type=reg&service=goalyweekly&msisdn="+props.location.state.msisdn
       }
     }




    const dailysub = () =>{
        //console.log("Dailysub")
        //window.location.href="http://103.77.79.133:11002/goalday/?msisdn="+props.location.state.msisdn
        window.location.href="http://149.129.252.221:8028/app/api/mytel/wap.php?type=reg&service=goalydaily&msisdn="+props.location.state.msisdn

    }


    const weeklysub = () =>{
        //console.log("Weeklysub")
        //window.location.href="http://103.77.79.133:11002/goalweek/?msisdn="+props.location.state.msisdn
        window.location.href="http://149.129.252.221:8028/app/api/mytel/wap.php?type=reg&service=goalyweekly&msisdn="+props.location.state.msisdn
    }

    const fullsub = ()=>{
        //console.log("Fullsub")
        window.location.href="http://103.77.79.133:11002/goalannual/?msisdn="+props.location.state.msisdn
    }
    return(
        
        // <div style={{height:316}}>
        //     <div>
        //     <h1 style={{textAlign:'center'}}>Please Select your package</h1><br/>
        //     <div>
        //     <button style={{width:'100%',backgroundColor:'green'}} onClick={dailysub}>Daily</button><br/><br/>
        //     <button style={{width:'100%',backgroundColor:'green'}} onClick={weeklysub}>Weekly</button><br/><br/>
        //     </div>
        //     </div>
        // </div>

        <div className="bwrapper"
      
        >
            <div className="container-fluid">
            <div className="text-center">
                <h4 className="mt-2 mb-2"><strong>Choose Subscribe</strong></h4>
            </div>
            <div className="alert text-center" style={{backgroundColor: "#E5E5E5"}}>Subscribe to compete with others and get the prize</div>
            <div className="mb-2">
                <label className="btn radio-subscribe btn-default d-block text-left" >
                    <input className="" type="radio" name="options" id="option1" value="daily" onChange={handleChange}/> Daily Subscription
                    <span className="float-right"><strong>109ks</strong>/day</span>
                </label>
            </div>

            <div className="mb-2">
                <label className="btn radio-subscribe btn-default d-block text-left"  >
                    <input className="" type="radio" name="options" id="option2" value="weekly" onChange={handleChange}/> Weekly Subscription
                    <span className="float-right"><strong>649ks</strong>/Week</span>
                </label>
            </div>
            <button type="button" className="btn bg-green p-2 w-100 my-2 text-white shadow" style={{fontSize: "12pt"}}
              onClick={subscribe}
            ><strong>Subscribe</strong></button>


            </div>
            </div>
        
           

            

       




        
    )
}
export default withRouter(Msisdnsubscription);
