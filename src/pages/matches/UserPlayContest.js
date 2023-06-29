import React, { Fragment, useState, useEffect } from 'react';
import { isArray, isEmpty } from 'lodash';
import axios from '../../_config/axios';
import loadingGif from '../../assets/img/loading.gif';
import logoGoaly from '../../assets/img/logo-goaly.png';
import Modal from 'react-responsive-modal';
import profile_image from '../../../src/assets/img/acc-default.png';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import Cookies from 'js-cookie';
import './UserPlayContest.css';



const UserPlayContest = ({ predictionId, closeModal }) => {
    const [{ players, status, isLoading }, setContent] = useState({ players: [], status: '', isLoading: false });
    const [{ open, user_id, pred_id }, setModal] = useState({ open: false, id: null });
    const [playerWinDetails, setPlayerWinDetails] = useState();
    const [playerName, setPlayerName] = useState();
    const [playerImage, setPlayerImage] = useState();
    const [timeStamp, settimeStamp] = useState();
    const [newVal, setval]=useState([]);



    useEffect(() => {
        setContent(prevContent => ({ ...prevContent, isLoading: true }));
        const payload = new FormData();
        payload.append('id', predictionId);
        axios.post('StageGoalyApi/getcontestant', payload).then(res => {
            if (res.data && res.data.players && isArray(res.data.players)) {
                const { players, status } = res.data;
                let val = res.data.msisdn;
                val.toString();
                //setval(val)
                // console.log(typeof(val));
                
                var newVal = "";
                for(var i=0;i<val.length;i++){
                    if(i<5){
                        newVal += val[i]
                    } else {
                        newVal += 'X'
                    }
                }

                setval(newVal)
                
                setContent(prevContent => ({ ...prevContent, status, players, isLoading: false }));
            }
            setContent(prevContent => ({ ...prevContent, isLoading: false }));
        }).catch(err => {
            console.log({ err })
            setContent(prevContent => ({ ...prevContent, isLoading: false }));
        })
    }, []);


    const getWineDetails = ((open, user_id, pred_id) => {
        setContent({ isLoading: true });
        setModal({ open: true });
        const payload = new FormData();
        const id = localStorage.getItem
        payload.append('user_id', user_id);
        payload.append('pred_id', pred_id);
        axios.post('/StageGoalyApi/getUserQusAnsPopup', payload).then(res => {
            console.log(res.data);
            setPlayerWinDetails(res.data.Question_And_Answer);
            setPlayerName(res.data.user_name);
            setPlayerImage(res.data.user_image);
            settimeStamp(res.data.created_at);
            setContent(prevContent => ({ ...prevContent, status, players, isLoading: false }));

        }).catch(err => {
            console.log({ err })
        })

    })



    if (isLoading)
        return <PlayersLoader />;
    return (
        <Fragment>
            <Modal open={open} onClose={() => setModal({ open: false })} center
                styles={{
                    modal: {
                        borderRadius: '5px'
                    }

                }}
                showCloseIcon={false}
                focusTrapped={false}
            >
                <div className="standing" style={{ minWidth: '300px' }}>
                    <div style={{ width: '100%' }}>
                        <span><img src={playerImage} style={{ height: 22, width: 'auto', float: 'left', marginTop: 20, marginLeft: 4, marginRight: 9 }} /></span>
                        <span style={{ float: 'left' }}><h2>{playerName},</h2></span>
                        <span style={{ float: 'left' }}><h2><Moment format="ddd HH:mm,DD/MM">{utcToLocal(timeStamp)}</Moment></h2></span>
                        {/* <span onClose={() => setModal({ open: false })}   style={{ float: 'right',marginTop:18,color:'#337ab7',fontFamily: "Roboto,Noto,Helvetica,Arial,sans-serif",fontSize: 14 }}>See All</span> */}
                        <span
                            onClick={() => setModal({ open: false })}
                            style={{
                                float: 'right',
                                fontSize: '14px',
                                marginRight: '0px',
                                marginTop: 15,
                                color: "#337ab7"
                            }}>See All</span>
                    </div>
                    <table className="table table-striped table-responsive">
                        <tbody>
                            <tr className="clr-aqua">
                                <th>No.</th>
                                <th>Question</th>
                                <th>Answer</th>
                            </tr>
                            {!playerWinDetails && !isLoading && <NoPlayerFound />}
                            {!!playerWinDetails && playerWinDetails.map((player, key) => {
                                if (key < 6) {
                                    return (
                                        <tr key={key} className="wpos" onClick={() => getWineDetails(true, player.user_id, player.pred_id)} >
                                            <td>{key + 1}</td>
                                            <td>{player.question}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                {player.homelogo != "" && <img src={player.homelogo} style={{ height: 15, width: 'auto' }} />}
                                                {key == 0 && <span > {player.home_score}-{player.away_score}</span>}
                                                {player.awaylogo != "" && <img src={player.awaylogo} style={{ height: 15, width: 'auto' }} />}
                                                {key > 0 && <div style={{ display: "inline-block" }}> ({player.home_score == 0 ? player.away_score : player.home_score})</div>}
                                            </td>
                                        </tr>
                                    )
                                }

                            })}
                        </tbody>
                    </table>
                </div>
            </Modal>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={logoGoaly} alt="" height="60" />
            </div>
            <div className="standing" style={{ minWidth: '300px' }}>
                <h2>User Play This Contest</h2>
                <table className="table table-striped table-responsive">
                    <tbody>
                        <tr className="clr-aqua">
                            { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                                <th class="notranslate" style={{width:'18%'}}>စဉ်</th> 
                                : <th style={{width:'18%'}}>No</th> 
                            }

                            { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                                <th class="notranslate">ကစားသမားများ</th> 
                                : <th style={{width:'40%'}}>Player</th> 
                            }

                            { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                                <th class="notranslate">ခန့်မှန်းရလဒ်များ</th> 
                                : <th>{status}</th> 
                            }
                            
                            
                            
                        </tr>
                        {players.length == 0 && <NoPlayerFound />}
                        {!!players && players.filter(player=>player.name!=null || player.phone_no!=null).map((player, key) => (
                            <tr key={key} className="wpos" onClick={() => getWineDetails(true, player.user_id, player.pred_id)} >
                                <td className="notranslate">{key + 1}</td>
                                { (player.name==null || !player.name.trim().length) ?
                                     <td >{newVal}</td>
                                    :
                                     <td >{newVal}</td>
                                }
                                <td className="notranslate">{player.pts ? <strong> {player.pts}</strong> : <strong>{player.coin_won}</strong>}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>
            <div className="popbut">
                <button type="button" className="btn-reg" onClick={closeModal}>
                    <strong>Close</strong>
                </button>
            </div>
        </Fragment>
    );
};

export default UserPlayContest;

const PlayersLoader = () => (

    <div style={{
        display: 'flex',
        lineHeight: '100px',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <img src={loadingGif} alt="" style={{
            height: '100px',
            objectFit: 'none',
            objectPosition: 'center'
        }} />
    </div>

);

const NoPlayerFound = () => (
    <tr>
        <td colSpan="3">
            <div style={{
                display: 'flex',
                lineHeight: '100px',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <span style={{
                    color: 'red',
                    fontSize: '14px',
                    fontWeight: 100,
                    letterSpacing: '1px'
                }}> No player found!</span>
            </div>
        </td>
    </tr>
);



const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}
