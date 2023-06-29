import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import Modal from 'react-responsive-modal';
import { isNull } from 'lodash';
import { getUserDetails } from '../../_helper/authentication';
import UserPlayContest from '../../pages/matches/UserPlayContest';
import Swal from 'sweetalert2';
import Spinner from '../../components/loders/loder-spinner';
import './currentPrediction.css';
import * as moment from 'moment';
import Countdown from 'react-countdown';
import stadiumImg from '../../assetsStaging/img/stadium.png';

import Cookies from 'js-cookie';
import  Modall  from './Modal';

//const [lang, setLang] = Cookies.get('googtrans');
//const lastSegment = (Cookies.get('googtrans') !='') ? Cookies.get('googtrans').split("/").pop() : '';
const lastSegment = 'my';
const CurrentPredictionCard = React.memo(({ venue_image, isLoading, awayteam, awayteamid, awayteamlogo, hometeam, hometeamid, hometeamlogo, id,
 match_id, league_logo, match_start, players, pred_end, pred_start, venue, history, currentDate, score_home, score_away,prediction_type, status, winPoint }) => {
    function awayDetails() {

        // history.push(`team/${awayteamid}`);


    }
    function homeDetails() {

        // history.push(`team/${hometeamid}`);


    }
    const [statusmodel, setStatusmodel] = React.useState(false);
    //const [{ open}, setStatus] = useState({ open: false});

    const redirectSubType = () => {

        //const [status, setStatus] = React.useState(false);
        if(getUserDetails() && getUserDetails().msisdn !=''){
            
        }else{

            setStatusmodel(true)
        }
    }

    function playContest() {
        console.log(getUserDetails())
        if (getUserDetails() == null) {
            console.log('user not logged in');
            Swal.fire({
                title: 'Please Subscribe to Create Account',
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'OKAY',
                cancelButtonText: 'CANCEL',
                footer: '<a href="/login" id="alreadyaccount">Already have account? LOGIN</a>'
            }).then((result) => {
                if (result.value) {
                    //history.push('/login')
                    redirectSubType()

                   

                }
            })

        }
        else {
            history.push(`contest/${id}`)
        }

    }

    const [{ open, predictionId }, setModal] = useState({ open: false, predictionId: null });
    //console.log(currentDate)
    var now = utcToLocal(currentDate);
    var then = utcToLocal(match_start);
    var ms = moment(then, "YYYY/MM/DD HH:mm:ss").diff(moment(now, "YYYY/MM/DD HH:mm:ss"));
    // function dayHourMinuteFormat(ms){
    //     const days = Math.floor(ms / (24*60*60*1000));
    //     const daysms=ms % (24*60*60*1000);
    //     const hours = Math.floor((daysms)/(60*60*1000));
    //     const hoursms=ms % (60*60*1000);
    //     const minutes = Math.floor((hoursms)/(60*1000));
    //     const minutesms=ms % (60*1000);
    //     const sec = Math.floor((minutesms)/(1000));
    //     return days+"d:"+hours+"h:"+minutes+"m";
    // }

    // const timeLeftToStartGame = dayHourMinuteFormat(ms);
    // console.log(timeLeftToStartGame)
    // console.log(ms)
    // console.log(days,"ddddddddd")
    // console.log(timeLeftToStart)
    // console.log(now)
    // console.log(then)
    // Random component
    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {


        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return <p class="text-center text-white mb-1">
                Closed at: <br />
                <strong>
                {days}{ Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                                <span class="notranslate">ရက်</span> 
                                : <span>D</span> 
                            }
                :{hours}{ Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                                <span class="notranslate">နာရီ</span> 
                                : <span>H</span> 
                            }
                :{minutes}{ Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                                <span class="notranslate">မိနစ်</span> 
                                : <span>M</span> 
                            }
                :{seconds}{ Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                                <span class="notranslate">စက္ကန့်</span> 
                                : <span>S</span> 
                            }
                </strong>
            </p>

        }
    };
    var dynamicBackground = {
        backgroundImage: 'url(' + venue_image + ')'
    }
    var staticBackground = {
        backgroundImage: 'url(' + stadiumImg + ')'
    }
    return (
        <React.Fragment>
            <Modal open={open} onClose={() => setModal({ open: false, tab: '' })} center
                styles={{
                    modal: {
                        borderRadius: '5px',
                        overflowX:'auto',
                        height:'563px',
                    }
                }}
                showCloseIcon={false}
                focusTrapped={false}
                onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
            >
           
                {!isNull(id) && <UserPlayContest predictionId={predictionId} closeModal={() => setModal({ open: false, predictionId: null })} />}
            </Modal>

            

            {
            statusmodel && (
            <Modall closeModal={() => setStatusmodel(false)}><p>hello worls</p></Modall>
                     )
            }

            {!isLoading && <div className="contest row" style={(venue_image == "" || venue_image == null) ? staticBackground : dynamicBackground}>
                <div className='blurContainer'>
                    <div className="d-flex j-center">
                        <div className="club-left mx-1 text-center" onClick={homeDetails} style={{ width: '80px' }}>
                            <div className="logo" onClick={() => history.push(`/club-info/${hometeamid}`)}><img style={{ height: '65px', width: '65px' }} src={hometeamlogo} alt="" /></div>
                            <h5 className="mb-0"><span class="notranslate">{hometeam}</span></h5>
                        </div>
                        {(currentDate <= match_start) &&
                            <div className="mid mx-2 d-flex ais-center">
                                
                                <div className="h-max-c">
                                    <div className="p_type p-1">{prediction_type}</div>
                                    <div className="date p-1"><Moment format="ddd, DD/MM/YY">{match_start}</Moment></div>
                                    <div className="place p-1">{venue}</div>
                                </div>
                            </div>
                        }
                        {(currentDate > match_start) &&
                            <div className="mid mx-2 d-flex flex-column my-auto">
                            <div className="p_type">{prediction_type}</div>
                                <div className="d-flex j-center h-max-c border radius-1 px-2 py-1" style={{ fontSize: "16pt" }}>
                                    
                                    <span class="notranslate">{score_home}</span>
                                    <span class="mx-2 border-right"></span>
                                    <span class="notranslate">{score_away}</span>
                                </div>
                                <span class="my-1"><Moment format="ddd, DD/MM/YY">{utcToLocal(match_start)}</Moment></span>
                            </div>
                        }
                        <div className="club-right mx-1 text-center" onClick={awayDetails} style={{ width: '80px' }}>

                            <div className="logo" onClick={() => history.push(`/club-info/${awayteamid}`)}><img style={{ height: '65px', width: '65px' }} src={awayteamlogo} alt="" /></div>
                            <h5 className="mb-0"><span class="notranslate">{awayteam}</span></h5>
                        </div>
                       
                       
                      
                       
                    </div>
                   {/*Abhay code*/}
                    {(currentDate > match_start ) && <div className="d-flex" style={{marginTop:"2rem"}}>
                           <div className="w-100 p-1 border text-white" style={{borderRadius:"10px",backgroundColor:'rgb(255, 255, 255, 0.15)'}}>
                            { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                                <span class="notranslate">၎င်း ပြိုင်ပွဲသည်  တွင်ပြီးဆုံးမည်</span> 
                                : <span>This match has ended on:</span> 
                            }
                            <br/>
                            <strong class="notranslate"><Moment format="ddd, DD/MM/YY">{utcToLocal(pred_end)}</Moment></strong>
                           </div>
                       </div>
                    }
                    {/*Abhay code close*/}

                    {/*Abhay code*/}
                    {(currentDate <= match_start) && <div className="d-flex border" style={{marginTop:'2rem',borderColor:'white',borderRadius:'10px',backgroundColor:'rgb(255, 255, 255, 0.15)'}}>
                        <div className="w-50 p-1 bg-transparent text-white border-right">
                        { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?
                          <span class="notranslate">သင်ရရှိသော အမှတ်များ</span>
                        :
                           <span>Points You Got</span>
                        }

                        :<br/>
                        <strong>100 Points</strong>
                        </div>
                        <div className="w-50 p-1 bg-transparent text-white ">
                            {/*Closed at:} <br/>*/}
                            <strong>{/*0d:7h:58m:3s*/} <Countdown
                                date={Date.now() + ms}
                                renderer={renderer}
                            /></strong>
                        </div>
                    </div>
                    }
                    {/*Abhay code close*/}

                    {/*(currentDate <= match_start) &&
                        <>
                             
                            <p className="text-center text-white mt-2" style={{ display: 'content' }}><strong>100 Points</strong></p>
                            <hr className="mt-1 mb-1" />
                        </>
                    */}

                    {/*(currentDate <= match_start) &&
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            
                            <Countdown
                                date={Date.now() + ms}
                                renderer={renderer}
                            />



                        </div>

                    */}

                    {(currentDate >= pred_start) && (currentDate <= pred_end) &&
                        <>
                            <button type="button" className="btn bg-green p-2 w-100 my-2 text-white"
                                style={{ fontSize: '12pt',backgroundColor:'#7cd327' }} onClick={playContest}>
                                
                            { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                              <strong><span class="notranslate">ကစားလိုက်ကြစို့</span></strong>
                            :
                               <strong>LET'S PLAY</strong>
                            }

                                
                            </button>
                            <div className="d-flex">
                                <div className="w-50 p-1 bg-whitesmoke border-right" style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}>

                                { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                                <span class="notranslate">စတင်</span> : <span>Start</span> }
                                

                                : <br /> <strong><Moment format="ddd, DD/MM/YY">{utcToLocal(pred_start)}</Moment></strong></div>
                                <div className="w-50 p-1 bg-whitesmoke" style={{ borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }}>
                                { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                                    <span class="notranslate">ပြီးဆုံး</span>  
                                    : <span>End</span> 
                                }
                                : <br /> <strong><Moment format="ddd, DD/MM/YY">{utcToLocal(pred_end)}</Moment></strong></div>
                            </div>
                            <button type="button" className="btn btn-lg btn-purple mt-2" onClick={() => setModal({ open: true, predictionId: id })} style={{padding:'5px'}}>See Who Play</button>
                        </>
                    }
                    {(currentDate < pred_start) && (currentDate < pred_end) &&
                        <button type="button" className="btn bg-green p-2 w-100 my-2 text-white" style={{ fontSize: '12pt' }}><strong>COMING UP</strong></button>
                    }
                    {(currentDate > pred_start) && (currentDate > pred_end) &&
                    <>
                        {/*<h1>Hello</h1>*/}
                        <button type="button" className="btn bg-green p-2 w-100 my-2 text-white" style={{ fontSize: '12pt',backgroundColor:'#cfcfcf' }} onClick={()=>history.push(`match/details/${match_id}`)}>
                        
                        { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                          <strong><span class="notranslate">ယှဥ်ပြိုင်ပွဲ ရမှတ် </span></strong>
                        :
                           <strong>MATCH RESULT</strong>
                        }

                         

                        </button>
                        <button type="button" className="btn btn-lg btn-purple" onClick={() => setModal({ open: true, predictionId: id })} style={{padding:'5px'}}>Play Result</button>
                        </>
                    }

                    {/* <div className="w-100 p-2 text-white" style={{ border: ' 1px solid whitesmoke', borderRadius: "0 0 10px 10px" }}>
                    Total point can win: <b>100</b>
                </div> */}
                    
                </div>
            </div>
            }
        </React.Fragment>

    )
});

export default withRouter(CurrentPredictionCard);

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}

const styles = {

    title: {
        background: stadiumImg
    }
}