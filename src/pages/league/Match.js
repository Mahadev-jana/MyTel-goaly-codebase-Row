import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../_config/axios';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import { PlayersSimmer, MatchesSimmer, MatchesHeadingSimmer } from '../../simmer-loader/index';
import * as moment from 'moment';


const Match = (props) => {
    const [openList, setOpenList] = useState(false);
    const [roundList, setRoundList] = useState([]);
    const [selectedList, setSelectedList] = useState('');

    const [match, setMatch] = useState([]);
    const [loadingMatch, setLoadingMatch] = useState(true);
    const [noDataFound, setNoDataFound] = useState(false);


    useEffect(() => {
        dropDownList();


    }, [])

    const leagueMatch = (id) => {
        // console.log(id, 'iddddddd')
        const payload = new FormData();
        payload.append('comp_id', props.compId)
        payload.append('round_id', id)
        axios.post('/StageGoalyApi/leagueMatches', payload)
            .then(res => {
                //console.log(res.data.matches)
                // setMatch(res.data.matches)
                if (res.data && res.data.success && res.data.error === 0) {
                    setNoDataFound(false);
                    setMatch(res.data.matches);
                    setLoadingMatch(false);
                }
                if (res.data && res.data.success === 0 && res.data.error === 1) {
                    setMatch(res.data.matches);
                    setNoDataFound(true);
                    setLoadingMatch(false);
                }

            })
            .catch(err => {
                console.log(err)
            })
    }

    const calculateDiff = (match_start,current_date)=>{
        // console.log(match_start,current_date)
        var ms = moment(match_start, "YYYY/MM/DD HH:mm:ss").diff(moment(current_date, "YYYY/MM/DD HH:mm:ss"));
        return dhm(ms)
    }
    const dhm=(ms)=>{
        const days = Math.floor(ms / (24*60*60*1000));
        const daysms=ms % (24*60*60*1000);
        const hours = Math.floor((daysms)/(60*60*1000));
        const hoursms=ms % (60*60*1000);
        const minutes = Math.floor((hoursms)/(60*1000));
        const minutesms=ms % (60*1000);
        const sec = Math.floor((minutesms)/(1000));
        
        // return days+":"+hours+":"+minutes+":"+sec;
        return days+"d:"+hours+"h:"+minutes+"m";
    }
    const { standings, loading, compId } = props;

    const dropDownList = () => {
        const payload = new FormData();
        payload.append('comp_id', compId);
        axios.post('/StageGoalyApi/leagueRoundsDropdown', payload)
            .then(res => {
                //console.log(res)
                if (res.data.error === 0 && res.data.success === 1) {

                    setRoundList(res.data.round_list);
                    if(typeof(res.data.current_round.round_name) !='undefined' && res.data.current_round.round_name !== null){
                    setSelectedList(res.data.current_round.round_name)
                    leagueMatch(res.data.current_round.round_id);
                    }else{                         +
                    setSelectedList(res.data.round_list[res.data.round_list.length-1].round_name)
                    leagueMatch(res.data.round_list[res.data.round_list.length-1].round_id);
                    }
                   
                }
                //leagueMatch(res.data.round_list[res.data.round_list.length-1].round_id);
                if(res.data.error === 1 && res.data.success === 0){
                    setNoDataFound(true);
                    setLoadingMatch(false);
                }

            })



    }
    const filterByRound = (id, name) => {
        // console.log(id)
        setSelectedList(name);
        leagueMatch(id);
    }
    const spreadList = () => {
        setOpenList(openList => !openList)
    }


    // console.log(match)
    // console.log(noDataFound)
    return (
        <div className="tab-content">

            <div className="block bg-grey">
                <div className="dropdown">
                    <button className="btn btn-lg btn-white w-100 d-flex ais-center"
                        type="button" data-toggle="dropdown"
                        onClick={spreadList}
                    >
                        <span className="text-grey">Game Week {selectedList}</span>
                        <span className="caret ml-auto"></span>
                    </button>
                    {openList &&
                        <ul className="dropdown-menu w-100" style={{ display: 'contents' }} >
                            {roundList && roundList.map((list, key) => {
                                return <li style={{ background: '#fff' }} key={key} onClick={() => { filterByRound(list.round_id, list.round_name), spreadList() }}><a >Game Week {list.round_name}</a></li>
                            })}
                        </ul>
                    }
                </div>
            </div>
            {loadingMatch ?
                <>
                    <PlayersSimmer />
                    <PlayersSimmer />
                    <PlayersSimmer />
                </>
                :
                <>
                    {match && match.length > 0 &&
                        <>
                            {match && match.map((data, key) => {
                                return <>
                                    {/* <div className="tag" style={{ padding: ".75em 1em" }} key={key}><u><b>{data.time}</b></u></div> */}

                                    <div className="container-matches" key={key}>
                                        <div className="matches">
                                            <div className="d-flex j-center">
                                                <div className="club-left mx-1 text-center" style={{ textAlign: '-webkit-center', width: 'min-content' }}>
                                                    <div className="logo" style={{ maxWidth: "65px" }} onClick={() => props.history.push(`/club-info/${data.home_team_id}`)}><img src={data.home_team_logo} alt="" style={{ maxWidth: "50px" }} /></div>
                                                    <h5 className="mb-0" style={{ width: '60px', fontSize: 'revert' }}><span class="notranslate">{data.home_team_name}</span></h5>
                                                </div>
                                                <div className="mid mx-2 d-flex flex-column my-auto" style={{width: '130px'}}>
                                                    
                                                    {/*<div className="border radius-1 px-2 py-1">{data.vanue_name.slice(0, 20)data.home_team_score} | {data.away_team_score}</div>*/}
                                                    <div className="d-flex j-center h-max-c border radius-1 px-2 py-1" style={{ fontSize: "16pt" }}>
                                                    {data.status==='NS' ? (
                                                        <span>_</span>
                                                      ) : (
                                                        <span class="notranslate">{data.home_team_score}</span>
                                                    )}

                                                    <span className="mx-2 border-right"></span>

                                                    {data.status==='NS' ? (
                                                        <span>_</span>
                                                      ) : (
                                                        <span class="notranslate">{data.away_team_score}</span>
                                                    )}

                                                    
                                                </div>
                                                <span className="my-1">{utcToLocal(data.time)}</span>
                                                {data.status==='NS' ? (
                                                    <span className="btn-pill bg-red" onClick={() => props.history.push(`/match/details/${data.id}`)}>Not Started</span>
                                                  ) : (
                                                    <span className="btn-pill bg-red" onClick={() => props.history.push(`/match/details/${data.id}`)}>Finished</span>
                                                )}
                                                
                                                    {data.status==='NS' &&
                                                        <h3 className="my-1">{calculateDiff(data.time,data.current_date)}</h3>

                                                    }
                                                    
                                                </div>
                                                <div className="club-right mx-1 text-center" style={{ textAlign: '-webkit-center', width: 'min-content' }}>
                                                    <div className="logo" style={{ maxWidth: "65px" }} onClick={() => props.history.push(`/club-info/${data.away_team_id}`)}><img src={data.away_team_logo} alt="" style={{ maxWidth: "50px" }} /></div>
                                                    <h5 className="mb-0" style={{ width: '60px', fontSize: 'revert' }} ><span class="notranslate">{data.away_team_name}</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            })}
                        </>
                    }
                    {noDataFound &&
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                            <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                        </div>
                    }
                </>
            }



        </div>
    )
}
export default withRouter(Match);

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}
