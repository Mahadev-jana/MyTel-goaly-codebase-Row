import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../_config/axios';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import { PlayersSimmer, PlayerMatchesSimmer, MatchesHeadingSimmer } from '../../simmer-loader/index';
import League1 from '../../assetsStaging/img/league/Image22@3x.png';
import * as moment from 'moment';
//import '../clubInformation/index.css';
// import League2 from '../../assetsStaging/img/league/Image23@3x.png';
// import League3 from '../../assetsStaging/img/league/Image24@3x.png';
// import League4 from '../../assetsStaging/img/league/Image25@3x.png';
// import League5 from '../../assetsStaging/img/league/Image26@3x.png';
// import League6 from '../../assetsStaging/img/league/Image27@3x.png';

// import Chelsea from '../../assetsStaging/img/ic-chelsea.png';
// import Liverpool from '../../assetsStaging/img/ic-lvpl.png';
// import Albion from '../../assetsStaging/img/ic-albion.png';
// import Manchestercity from '../../assetsStaging/img/ic-mancity.png';
// import Manchesterunited from '../../assetsStaging/img/ic-manutd.png';

const PlayerMatch = (props) => {
    console.log(props)
    const [openList, setOpenList] = useState(false);
    const [roundList, setRoundList] = useState([]);
    const [selectedList, setSelectedList] = useState('');
    const [match, setMatch] = useState([]);
    const [loadingMatch, setLoadingMatch] = useState(true);
    // const [noDataFound, setNoDataFound] = useState(false);

    useEffect(() => {
        playersMatch();
       // dropDownList();
    }, [])

    //const dropDownList = () => {
     //   const { compId } = props;
       // const payload = new FormData();
       // payload.append('comp_id', compId);
       // axios.post('/StageGoalyApi/leagueRoundsDropdown', payload)
       //     .then(res => {
         //       if (res.data.error === 0 && res.data.success === 1) {
                //    console.log(res.data)
                  //  setRoundList(res.data.round_list);
                   // setSelectedList(res.data.round_list[0].round_name)
               // }
                //playersMatch(res.data.round_list[0].round_id);

            //})
           // .catch(err => {
             //   console.log(err)
           // })



   // }

    const playersMatch = () => {
        const { compId, playerId } = props;
        const payload = new FormData();
        payload.append('player_id', playerId);
       // payload.append('round_id', roundId);
        axios.post('/StageGoalyApi/playersMatches', payload)
            .then(res => {
                console.log(res)
                if (res.data.error === 0 && res.data.success === 1) {
                    console.log(res.data)
                    setMatch(res.data.matches[0]);
                    setLoadingMatch(false);
                }
                if (res.data.error === 1 && res.data.success === 0) {
                    //console.log(res.data)
                    setMatch(res.data.matches);
                    setLoadingMatch(false);
                }


            })
            .catch(err => {
                console.log(err)
            })



    }

    const filterByRound = (id, name) => {
        // console.log(id)
        setSelectedList(name);
        playersMatch(id);
    }
    const spreadList = () => {
        setOpenList(openList => !openList)
    }

    const { compId } = props;
    //console.log(props);
    return (
        <Fragment>

            <div className="tab-content row">
            <div className="tag"><u><b>{match.slice(0,1).map((data,key)=><div key={key}>{data.league_name}</div>)}</b></u></div>
             {/* 
                <div className="block bg-grey">
                    <div className="dropdown">
                        <button className="btn btn-lg btn-white w-100 d-flex ais-center"
                            type="button" data-toggle="dropdown"
                            onClick={spreadList}
                        >
                            <span className="text-grey">Game Round {selectedList}</span>
                            <span className="caret ml-auto"></span>
                        </button>
                        {openList &&
                            <ul className="dropdown-menu w-100" style={{ display: 'contents' }} >
                                {console.log(roundList)}
                                {roundList && roundList.map((list, key) => {
                                    return <li style={{ background: '#fff' }} key={key} onClick={() => { filterByRound(list.round_id, list.round_name), spreadList() }}><a >Game Week {list.round_name}</a></li>
                                })}
                            </ul>
                        }
                    </div>
                </div>
                    */}
                {loadingMatch ?

                    <PlayerMatchesSimmer />

                    :
                    <>
                       {console.log(match)}
                      

                       
                       
                        {match.length >= 1 ?
                        // {/*Previous design*/}
                            //<div className="player-match table-responsive bg-white">
                               // <table className="table">
                                    //<thead>
                                       // <tr className="bg-dark text-white text-center" style={{ borderTop: 'none', fontSize: 'initial' }}>
                                            //<td>No</td>
                                           // <td>League</td>
                                            //<td>Date</td>
                                           // <td>Competion</td>
                                           // <td>Duration</td>
                                       // </tr>
                                    //</thead>
                                   // <tbody className="text-center">
                                       // {match && match.map((data, key) => {
                                           // return <tr key={key}>
                                               // <td><strong>{key + 1}</strong></td>
                                               // <td className="c-league"><div className="cover-img"><img src={data.league_logo} alt="" /></div></td>
                                                //<td>{data.time.slice(5, 10)}<br />{data.time.slice(0, 4)}</td>
                                                //<td style={{ whiteSpace: 'nowrap' }}>
                                                   // <div className="c-competion" style={{ justifyContent: 'end' }}>
                                                       // <div className="clubl" style={{ width: '160px', textAlign: 'center' }} onClick={() => props.history.push(`/club-info/${data.home_team_id}`)}>
                                                          //  <img src={data.home_team_logo} alt="" />
                                                           // {/* <td>{data.time.slice(5,10)}<br />{data.time.slice(0,4)}</td> */}
                                                           // <span>{data.home_team_name}</span>
                                                       // </div>
                                                        //<div className="score">{data.home_team_score} - {data.away_team_score}</div>
                                                        //<div className="clubr" style={{ width: '160px', textAlign: 'center' }} onClick={() => props.history.push(`/club-info/${data.away_team_id}`)}>
                                                           // <img src={data.away_team_logo} alt="" />
                                                           // <span>{data.away_team_name}</span>
                                                        //</div>
                                                    //</div>
                                                //</td>
                                               // <td>{data.minute}</td>
                                           // </tr>

                                        //})}

                                    //</tbody>

                                //</table>
                            //</div>

                           // {/*previous design ended*/}
                           <>
                           {console.log(match)}
                       {match && match.map((data, key) => {
                                return <div className="container-matches" key={key}>
                                    <div className="matches">
                                        <div className="d-flex j-center">
                                            <div className="club-left mx-1 text-center" style={{ textAlign: '-webkit-center', width: 'min-content' }}>
                                                <div className="logo" style={{ maxWidth: "65px" }} onClick={() => props.history.push(`/club-info/${data.home_team_id}`)}><img src={data.home_team_logo} alt="" style={{ maxWidth: "50px" }} /></div>
                                                <h5 className="mb-0" style={{fontSize: '11px'}}><span class="notranslate">{data.home_team_name}</span></h5>
                                            </div>
                                            <div className="mid mx-2 d-flex flex-column my-auto">
                                                <div className="d-flex j-center h-max-c border radius-1 px-2 py-1" style={{ fontSize: "16pt" }}>
                                                    <span>{data.home_team_score}</span>
                                                    <span className="mx-2 border-right"></span>
                                                    <span>{data.away_team_score}</span>
                                                </div>
                                                <span className="my-1">{utcToLocal(data.time)/*.split(' ')[0]*/}</span>
                                                <span className="btn-pill bg-red" onClick={() => props.history.push(`/match/details/${data.id}`)}>Finished</span>
                                            </div>
                                            <div className="club-right mx-1 text-center" style={{ textAlign: '-webkit-center', width: 'min-content' }}>
                                                <div className="logo" style={{ maxWidth: "65px" }} onClick={() => props.history.push(`/club-info/${data.away_team_id}`)}><img src={data.away_team_logo} alt="" style={{ maxWidth: "50px" }} /></div>
                                                <h5 className="mb-0"  style={{fontSize: '11px'}}><span class="notranslate">{data.away_team_name}</span></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            })}
                        </>

                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }
                    </>
                }

            </div>
        </Fragment>
    )
}
export default withRouter(PlayerMatch);

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}


