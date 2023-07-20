import React, { useState, useEffect } from 'react';
// import { isArray, isEmpty } from 'lodash';
// import LeaguLogo from '../../assetsStaging/img/ic-epl.png';
import { LeagueSimmer } from '../../simmer-loader/index';
import './index.css';
import axios from '../../_config/axios';
import LeagueInfo from './LeagueInfo';
import Match from './Match';
import Standings from './Standings';
import Stats from './Stats';
import News from './News';
import Team from './Team';
import Cookies from 'js-cookie';



const League = (props) => {
    const [tab, setTab] = useState('info');

    const [season, setSeason] = useState([]);
    const [seasonLoading, setSeasonLoading] = useState(true);

    const [loading, setLoading] = useState(true);
    const [mainInfo, setMainInfo] = useState({});
    const [standings, setStandings] = useState([]);
    const [noData, setNoData] = useState(false);
    const [loadingInfo, setLoadingInfo] = useState(true);

    const [topPlayers, setTopPlayers] = useState([]);
    const [loadingplayers, setLoadingPlayers] = useState(true);
    const [lastGame, setLastGame] = useState([]);
    const [nextGame, setNextGame] = useState([]);
    const [loadinginfoMatches, setLoadingInfoMatches] = useState(true);

    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);

    const [teams, setTeams] = useState([]);
    const [loadingTeams, setLoadingTemas] = useState(true);

    const [statsGoal, setStatsGoal] = useState([]);
    const [statsAssists, setStatsAssists] = useState([]);
    const [statsRedcard, setStatsRedcard] = useState([]);
    const [statsyellowcard, setStatsyellowcard] = useState([]);
    const [duelscore,setduelscore] = useState([]);


    

    const[shorttotal,setshorttotal] = useState([]);
    const[shortontotal,setshortontotal]=useState([]);
    const[passtotal,setpasstotal]= useState([]);
    const[crosstotal,setcrosstotal]=useState([]);
    const[assist,setassist]=useState([]);
    const[interceptions,setinterceptions]=useState([]);
    const[tackles,settackles]=useState([]);
    const[blocks,setblocks]=useState([]);
    
    const [loadingStats, setLoadingStats] = useState(true);
    const [turnament, setturnament] = useState(false);



    useEffect(() => {
        leagueMainInfo();
        leagueStandings();
        topPlayersDetails();
        lastAndNextGameDetails();
        leagueNewsdetails();
        teamsDetails();
        statsDetails();

    }, []);

    const seasonInfo = (seasonId, compId) => {
        const payload = new FormData();
        payload.append('comp_id', compId);
        payload.append('season_id', seasonId);
        payload.append('league_id', props.location.state.leagueId);
        axios.post('/StageGoalyApi/leagueSeasonInfo', payload)
            .then(res => {
                // console.log(res.data.season_info.Matched_played)
                if(res.data.success===1 && res.data.error===0 && res.data.code===200){
                    setSeason(res.data.season_info)
                    setSeasonLoading(false)
                }
                if(res.data.success===0 && res.data.error===1 && res.data.code===200){
                    setSeason([])
                    setSeasonLoading(false)
                }
                if(res.data.success===0 && res.data.error===1 && res.data.code===400){
                    setturnament(true)
                    setSeasonLoading(false)
                }
                
            })
            .catch(err => {
                console.log(err)
            })
    }

    const leagueMainInfo = () => {
        const payload = new FormData();
        payload.append('league_id', props.location.state.leagueId);
        axios.post('/StageGoalyApi/leagueDetail', payload)
            .then((res) => {
                if (res.data && res.data.success == 1 && res.data.error == 0) {
                    setMainInfo(res.data.standing);
                    setLoading(false)
                    seasonInfo(res.data.standing.id, props.location.state.compId)
                }
                else {
                    setNoData(true)
                }
            }).catch(err => {
                console.log(err);
            })
    }
    const leagueStandings = () => {
        const payload = new FormData();
        payload.append('comp_id', props.location.state.compId);
        payload.append('league_id', props.location.state.leagueId);
        axios.post('/StageGoalyApi/leagueStanding', payload)
            .then(res => {
                if (res.data && res.data.success) {
                    // console.log(res.data)
                    setStandings(res.data.standing)
                    setLoadingInfo(false)
                }

            })
            .catch(err => {
                console.log(err)
            })
    }
    const topPlayersDetails = () => {
        const payload = new FormData();
        payload.append('comp_id', props.location.state.compId);
        payload.append('league_id', props.location.state.leagueId);
        axios.post('/StageGoalyApi/leagueTopPlayers', payload)
            .then(res => {
                if (res.data && res.data.code === 200 && res.data.success && res.data.error === 0) {
                    // console.log(res.data.stats)
                    setTopPlayers(res.data.stats)
                    setLoadingPlayers(false)
                }
                if (res.data && res.data.code === 400 && res.data.success === 0 && res.data.error === 1) {
                    // console.log(res.data.stats)
                    setTopPlayers(res.data.stats)
                    setLoadingPlayers(false)
                }


            })
            .catch(err => {
                console.log(err)
            })
    }
    const lastAndNextGameDetails = () => {
        const payload = new FormData();
        payload.append('comp_id', props.location.state.compId);
        payload.append('league_id', props.location.state.leagueId);
        axios.post('/StageGoalyApi/leagueLastAndNextMatches', payload)
            .then(res => {
                if (res.data && res.data.code === 200 && res.data.success && res.data.error === 0) {
                    var filteruniquebyMatchID = res.data.last_game.filter(
                        (v, i, a) => a.findIndex(t => t.match_id === v.match_id) === i
                    );
                    // console.log(res.data.last_game)
                    // console.log(res.data.next_game)
                    setLastGame(filteruniquebyMatchID)
                    setNextGame(res.data.next_game)
                    setLoadingInfoMatches(false)
                }
                if (res.data && res.data.code === 400 && res.data.success === 0 && res.data.error === 1) {
                    // console.log(res.data.last_game)
                    // console.log(res.data.next_game)
                    setLastGame(res.data.last_game)
                    setNextGame(res.data.next_game)
                    setLoadingInfoMatches(false)
                }


            })
            .catch(err => {
                console.log(err)
            })
    }
    const leagueNewsdetails = () => {
        // console.log()
        const payload = new FormData();
        payload.append('comp_id', props.location.state.compId);
        payload.append('league_id', props.location.state.leagueId);
        axios.post('/StageGoalyApi/leagueNews', payload)
            .then(res => {
                if (res.data && res.data.success && res.data.error === 0) {
                    // console.log(res.data.news);
                    setNews(res.data.news);
                    setLoadingNews(true);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const teamsDetails = () => {
        const payload = new FormData();
        payload.append('comp_id', props.location.state.compId);
        payload.append('league_id', props.location.state.leagueId);
        axios.post('/StageGoalyApi/leagueTeam', payload)
            .then(res => {
                if (res.data && res.data.success && res.data.error === 0) {
                    // console.log(res.data.teams)
                    setTeams(res.data.teams);
                    setLoadingTemas(false);
                }
                if(res.data && res.data.success===0 && res.data.error === 1){
                    // console.log(res.data.teams)
                    setTeams(res.data.teams);
                    setLoadingTemas(false); 
                }

            })
            .catch(err => {
                console.log(err)
            })
    }
    const statsDetails = () => {
        const payload = new FormData();
        payload.append('comp_id', props.location.state.compId);
        payload.append('league_id', props.location.state.leagueId);
        axios.post('/StageGoalyApi/leagueStats', payload)
            .then(res => {
                 console.log(res)
                if (res.data && res.data.code === 200 && res.data.success && res.data.error === 0) {
                    let goalsArray = res.data.stats.filter(stat => {
                        if (stat.title === 'Goals') {
                            return true;
                        }
                        return false;
                    });
                    let assistsArray = res.data.stats.filter(stat => {
                        if (stat.title === 'Assists') {
                            return true;
                        }
                        return false;
                    });
                    let yellowcardArray = res.data.stats.filter(stat => {
                        if (stat.title === 'Yellow cards') {
                            return true;
                        }
                        return false;
                    });
                    let redcardArray = res.data.stats.filter(stat => {
                        if (stat.title === 'Red cards') {
                            return true;
                        }
                        return false;
                    });
                    let duelscore = res.data.stats.filter(stat=>{
                        if(stat.title==="Dual Own"){
                            return true;
                        }
                        return false;
                    });
                    let shorttotal= res.data.stats.filter(stat=>{
                        if(stat.title==="Short Total"){
                            return true;
                        }
                        return false;
                    });
                    let shortontotal=res.data.stats.filter(stat=>{
                           if(stat.title==="Short On Total"){
                               return true;
                           }
                           return false;
                    })
                    let passtotal=res.data.stats.filter(stat=>{
                        if(stat.title==="Pass Total")
                        {
                            return true;
                        }
                        return false;
                    });
                    let crosstotal=res.data.stats.filter(stat=>{
                        if(stat.title==="cross Total"){
                            return true;
                        }
                        return false;
                    });
                    let assist= res.data.stats.filter(stat=>{
                        if(stat.title==="Assist"){
                          return true;
                        }
                        return false;
                    })
                    let interceptions=res.data.stats.filter(stat=>{
                        if(stat.title==="Interceptions"){
                            return true;
                        }
                        return false;
                    })
                    let tackles = res.data.stats.filter(stat=>{
                        if(stat.title==="Tackles"){
                            return true;
                        }
                        return false;
                    })
                    let blocks = res.data.stats.filter(stat=>{
                        if(stat.title==="Blocks"){
                            return true;
                        }
                        return false;
                    }) 
                     //console.log(goalsArray);
                     //console.log(assistsArray);
                     //console.log(yellowcardArray);
                     //console.log(redcardArray);
                     //console.log(duelscore)
                     //console.log(passtotal)
                   
                    setStatsGoal(goalsArray[0].data);
                    setStatsAssists(assistsArray[0].data);
                    setStatsyellowcard(yellowcardArray[0].data);
                    setStatsRedcard(redcardArray[0].data);
                    setduelscore(duelscore[0].data);
                    setshorttotal(shorttotal[0].data)
                    setshortontotal(shortontotal[0].data)
                    setpasstotal(passtotal[0].data)
                   setcrosstotal(crosstotal[0].data)
                   setassist(assist[0].data)
                   setinterceptions(interceptions[0].data)
                   settackles(tackles[0].data)
                   setblocks(blocks[0].data)
                    setLoadingStats(false);
                }
                if (res.data && res.data.code === 400 && res.data.success===0 && res.data.error === 1) {
                    setStatsGoal([]);
                    setStatsAssists([]);
                    setStatsyellowcard([]);
                    setStatsRedcard([]);
                    setLoadingStats(false);
                }

            })
            .catch(err => {
                console.log("error")
            })
    }

    // console.log(season)
    const leaguesMainInfo = <div className="inner-league-cover">
        <div className="logo">
            <img src={'https://cms-mytel.goaly.mobi/'+mainInfo.image} alt="" />

        </div>
        <h4 className="name">{mainInfo.competition_name}</h4>
        <span>Season {mainInfo.name}</span>
        {/* <span>Round {mainInfo.current_round_id}</span> */}
    </div>
    return (
        <React.Fragment>

            <div className={loading ? "" : "league-cover row"}>
                {loading ?
                    <LeagueSimmer />
                    :
                    <>{leaguesMainInfo}</>
                }

                <ul className="league-menu bg-purple row">
                    <li className={tab === 'info' ? "active" : ""} onClick={() => setTab('info')}><a >
                    { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?
                   <span class="notranslate">အချက်အလက်</span>
                   :
                  <span>Info</span>
                }
                    
                    </a></li>
                    <li className={tab === 'match' ? "active" : ""} onClick={() => setTab('match')}><a>
                    { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?
                       <span class="notranslate">ပွဲစဉ်များ</span>
                       :
                      <span>Match</span>
                    }
                    </a></li>
                    <li className={tab === 'standings' ? "active" : ""} onClick={() => setTab('standings')}><a>Standings</a></li>
                    <li className={tab === 'rank' ? "active" : ""} onClick={() => setTab('rank')}><a>Stat</a></li>
                    <li className={tab === 'news' ? "active" : ""} onClick={() => setTab('news')}><a>News</a></li>
                    <li className={tab === 'team' ? "active" : ""} onClick={() => setTab('team')}><a>Team</a></li>
                </ul>
                {season && tab === "info" && <LeagueInfo
                    compId={props.location.state.compId}
                    season={season} turnament={turnament}
                    seasonName={mainInfo.name} seasonLoading={seasonLoading}
                    topPlayers={topPlayers} loadingplayers={loadingplayers}
                    lastGame={lastGame} nextGame={nextGame} loadinginfoMatches={loadinginfoMatches}
                />}
                {tab === "match" && <Match compId={props.location.state.compId} />}
                {tab === "standings" && <Standings standings={standings} loading={loadingInfo} compId={props.location.state.compId} />}
                {tab === "rank" && <Stats
                    statsGoal={statsGoal}
                    statsAssists={statsAssists}
                    statsyellowcard={statsyellowcard}
                    statsRedcard={statsRedcard}
                    statsduel={duelscore}
                    statsshorttotal={shorttotal}
                    statsshortontotal={shortontotal}
                    statspasstotal={passtotal}
                    statscrosstotal={crosstotal}
                    statsassist={assist}
                    statsinterceptions={interceptions}
                    statstackles={tackles}
                    statsblocks={blocks}
                    loadingStats={loadingStats}

                />}
                {tab === "news" && <News news={news} loadingNews={loadingNews} />}
                {tab === "team" && <Team teams={teams} loadingTeams={loadingTeams} compId={props.location.state.compId} />}

            </div>




        </React.Fragment>


    )
}
export default League;