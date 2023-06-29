import React, { useEffect, useState } from 'react';
import { LeagueSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import axios from '../../_config/axios';
import Face from '../../assetsStaging/img/face.png';
import team from '../../assetsStaging/img/ic-chelsea.png';
import PlayerInfo from './PlayerInfo';
import PlayerMatch from './PlayerMatch';
import PlayerStats from './PlayerStats';
import PlayerNews from './PlayerNews';
import Cookies from 'js-cookie';

import './index.css';
import PlayerDetails from '../playerDetails';


const PlayerInformation = (props) => {
    const [playerInfo, setPlayerInfo] = useState([])
    const [loading, setLoading] = useState(true);
    const [noDataFound, setnoDataFound] = useState(false);

    const [news, setNews] = useState([])
    const [newsLoading, setNewsLoading] = useState(true);

    const [playerMatches, setPlayerMatches] = useState([])
    const [playerMatchesLoading, setPlayerMatchesLoading] = useState(true);

    const [playerClubHistory,setPlayerClubHistory] = useState([]);
    const [loadingPlayerClubHistory,setLoadingPlayerClubHistory] = useState(true);

    useEffect(() => {
        playerDetails();
        PlayerNewsDetails();
        playerClubHistoryDetails();
    }, [])

    const playerDetails = () => {
        const playerId = props.location.state.playerId;
        const payload = new FormData();
        payload.append('player_id', playerId);
        axios.post('/StageGoalyApi/getPlayersinfo', payload)
            .then(res => {
                if (res.data && res.data.success && res.data.error === 0) {
                    // console.log(res.data.players[0]);
                    setPlayerInfo(res.data.players[0]);
                    setLoading(false);
                    //console.log(res.data.players[0].league_id,res.data.players[0].team_id,res.data.players[0].season_id)
                    playerMatchesDetails(res.data.players[0].league_id,res.data.players[0].team_id,res.data.players[0].season_id);
                }
                if (res.data && res.data.success === 0 && res.data.error === 1) {
                    setnoDataFound(true)
                    setLoading(false);
                }

            })
            .catch(err => {
                console.log(err);
            })
    }

    const playerClubHistoryDetails = () => {
        const playerId = props.location.state.playerId;
        const payload = new FormData();
        payload.append('player_id', playerId);
        axios.post('/StageGoalyApi/playerClubHistory', payload)
            .then(res => {
                if (res.data && res.data.success && res.data.error === 0) {
                   // console.log(res.data);
                    setPlayerClubHistory(res.data.transfer_data)
                    setLoadingPlayerClubHistory(false)
                   
                }
                if (res.data && res.data.success === 0 && res.data.error === 1) {
                    setPlayerClubHistory(res.data.transfer_data)
                    setLoadingPlayerClubHistory(false)
                }

            })
            .catch(err => {
                console.log(err);
            })
    }

    const playerMatchesDetails = (leagueId,teamId,seasonId) =>{
        const playerId = props.location.state.playerId;
        const payload=new FormData();
        payload.append('league_id',leagueId);
        payload.append('team_id',teamId);
        payload.append('season_id',seasonId);

        axios.post('/StageGoalyApi/playerInfoPageMatches', payload)
            .then(res =>{
                
                if(res.data && res.data.matches && res.data.success && res.data.error===0){
                console.log(res.data);
                    setPlayerMatches(res.data.matches)
                    setPlayerMatchesLoading(false)
                }
                if(res.data && res.data.matches && res.data.success===0 && res.data.error===1){
                    // console.log(res.data);
                    setPlayerMatches(res.data.matches)
                    setPlayerMatchesLoading(false)
                }
                
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const PlayerNewsDetails = () =>{
        const playerId = props.location.state.playerId;
        const payload = new FormData();
        payload.append('player_id',playerId);
        axios.post('/StageGoalyApi/playerNews', payload)
            .then(res =>{
                if(res.data && res.data.news && res.data.success){
                    // console.log(res.data);
                    setNews(res.data.news)
                    setNewsLoading(false)
                }
                
            })
            .catch(err=>{
                console.log(err);
            })
    }
    


    const [tab, setTab] = useState('info');

    const {compId,playerId}=props.location.state;
    // console.log(props.location.state);
    // console.log(playerInfo);
    // console.log(compId);
    // console.log(playerMatches);
    return (
        <React.Fragment>
            <div className="block bg-whitepurple row">
                {loading ?
                    <LeagueSimmer />
                    :
                    <>
                        {noDataFound ?
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                            :
                            <div className="player-cover">
                                <div className="pict">
                                    <img className="a" src={playerInfo.image_path} alt="" />
                                    <img className="b" src={playerInfo.team_logo} alt="" />
                                </div>
                                <h5 className="name"><span class="notranslate">{playerInfo.fullname}</span></h5>
                                <div className="pos">
                                    <span>{playerInfo.player_number}</span>
                                    {playerInfo.position_name === 'Midfielders' && <span>MD</span>}
                                    {playerInfo.position_name === 'Goal keeper' && <span>GK</span>}
                                    {playerInfo.position_name === 'Defender' && <span>DF</span>}
                                    {playerInfo.position_name === 'Attackers' && <span>FW</span>}
                                </div>
                            </div>

                        }
                    </>

                }
            </div>
            <ul className="player-menu bg-purple" style={{ marginRight: '-15px', marginLeft: '-15px' }}>
                <li className={tab === 'info' ? "active" : ''} onClick={() => setTab('info')}><a>Info</a></li>
                <li className={tab === 'match' ? "active" : ''} onClick={() => setTab('match')}><a>
                { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?
                   <span class="notranslate">ပွဲစဉ်များ</span>
                   :
                  <span>Match</span>
                }
                </a></li>
                <li className={tab === 'stats' ? "active" : ''} onClick={() => setTab('stats')}><a>Stats</a></li>
                <li className={tab === 'news' ? "active" : ''} onClick={() => setTab('news')}><a>News</a></li>
            </ul>
            {tab === 'info' && <PlayerInfo 
            playerInfo={playerInfo} loading={loading}
            playerMatches={playerMatches} playerMatchesLoading={playerMatchesLoading}
            playerClubHistory={playerClubHistory} loadingPlayerClubHistory={loadingPlayerClubHistory}
            />}
            {tab === 'match' && <PlayerMatch compId={compId} playerId={playerId}/>}
            {tab === 'stats' && <PlayerStats playerInfo={playerInfo} loading={loading} />}
            {tab === 'news' && <PlayerNews news={news} newsLoading={newsLoading}/>}
        </React.Fragment>
    )
}
export default PlayerInformation;