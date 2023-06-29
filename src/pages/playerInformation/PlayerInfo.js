import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment';
import { LeagueSimmer, PlayerSeasonSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import Cookies from 'js-cookie';

const PlayerInfo = (props) => {
    //console.log(props)
    const [playerAge, setPlayerAge] = useState(0);
    const [limit, setLimit] = useState(2);
    useEffect(() => {
        const { loading, playerInfo } = props;
        // console.log(loading)
        // console.log(playerInfo.birthdate)
        if (!loading) {
            yearDiff(playerInfo.birthdate);
        }
    }, [props.loading])

    const showAllMatches = () => {
        setLimit(props.playerMatches.length);
    }
    const yearDiff = (birthday) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        // console.log(today)
        // console.log(birthday)

        var now = today;
        var then = birthday;
        var diffms = moment(now, "dd/mm/yyy").diff(moment(then, "dd/mm/yyy"));

        const diffDays = Math.ceil(diffms / (1000 * 60 * 60 * 24));
        const diffYear = Math.floor(diffDays / 365);
        // console.log(diffms + " milliseconds");
        // console.log(diffDays + " days");
        // console.log(diffYear + " year");
        setPlayerAge(diffYear)

    }
    const { playerInfo, loading, playerMatches, playerMatchesLoading, playerClubHistory, loadingPlayerClubHistory } = props;
    const uniqueplayerClubHistory = [];

    playerClubHistory.map(x => uniqueplayerClubHistory.filter(a => a.season_name == x.season_name || a.from_team_name == x.from_team_name && ( a.from_team_name == '' || x.from_team_name=='')).length > 0 ? null : uniqueplayerClubHistory.push(x));
    //console.log(playerClubHistory);
    //console.log(uniqueplayerClubHistory);
    // let inHistory= playerClubHistory.filter(a=>a.type==="IN")
    // let outHistory= playerClubHistory.filter(a=>a.type==="OUT")
    // const newInArrayOfObj = inHistory.map(({
    //     date: in_date,
    //     type: in_type,
    //     ...rest
    //   }) => ({
    //     in_date,
    //     in_type,
    //     ...rest
    //   }));
      
    //   console.log(newInArrayOfObj);
    //   const newOutArrayOfObj = outHistory.map(({
    //     date: out_date,
    //     type: out_type,
    //     ...rest
    //   }) => ({
    //     out_date,
    //     out_type,
    //     ...rest
    //   }));
      
    //   console.log(newOutArrayOfObj);

    //   const a3 = newInArrayOfObj.map(t1 => ({...t1, ...newOutArrayOfObj.find(t2 => t2.season_id === t1.season_id)}))
    //   console.log(a3)
    return (
        <div className="tab-content row">
            {!loading ?
                <>
                    {playerInfo.length !== 0 ?
                        <div className="player-highlight block bg-grey">
                            <h5>Season {playerInfo.season}</h5>
                            <ul>
                                <li>
                                    <span class="notranslate">{playerInfo.appearences === '' ? 0 : playerInfo.appearences}</span>
                                    <span>Matches Played</span>
                                </li>
                                <li>
                                    <span class="notranslate">{playerInfo.minutes === '' ? 0 : playerInfo.minutes}</span>
                                    <span>Minutes Played</span>
                                </li>
                                <li>
                                    <span class="notranslate">{playerInfo.yellow_card === '' ? 0 : playerInfo.yellow_card}</span>
                                    <span>Yellow Cards</span>
                                </li>
                                <li>
                                    <span class="notranslate">{playerInfo.red_card === '' ? 0 : playerInfo.red_card}</span>
                                    <span>Red Cards</span>
                                </li>
                                <li>
                                    <span class="notranslate">{playerInfo.assist === '' ? 0 : playerInfo.assist}</span>
                                    <span>Assists</span>
                                </li>

                            </ul>
                        </div>
                        :
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                            <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                        </div>
                    }
                </>
                :
                <PlayerSeasonSimmer />
            }
            <div className="container-matches">
                {playerMatchesLoading ?
                    <LeagueSimmer />
                    :

                    <>
                        {playerMatches.length >= 1 ?
                            <>
                                {playerMatches.length > limit && <div className="tag bg-purple d-flex text-white">
                                    <span className="mr-auto">Matches</span>
                                    <span className="bg-whitepurple" onClick={showAllMatches}>More</span>

                                </div>}
                                {playerMatches && playerMatches.slice(0, limit).map((match, key) => {
                                    return <div className="matches" key={key}>

                                        <div className="d-flex j-center">
                                            <div className="club-left mx-1 text-center" style={{ textAlign: '-webkit-center' }}>
                                                <div className="logo" style={{ maxWidth: '65px',width:'65px' }} onClick={() => props.history.push(`/club-info/${match.home_team_id}`)}><img src={match.home_team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                                <h5 className="mb-0" style={{ fontSize: '9px' }}><span class="notranslate">{match.home_team_name}</span></h5>
                                            </div>
                                            <div className="mid mx-2 d-flex flex-column my-auto"
                                            style={{ width: '250px'}}>
                                                <div className="d-flex j-center h-max-c border radius-1 px-2 py-1" style={{ fontSize: "12pt" }}>
                                                    <span>--</span>
                                                    <span className="mx-2 border-right"></span>
                                                    <span>--</span>
                                                </div>
                                                <span className="my-1" style={{ fontSize: '14px' }}>{utcToLocal(match.time)}</span>
                                                {/* <!-- <span className="btn-pill bg-red">Finished</span> --> */}
                                            </div>
                                            <div className="club-right mx-1 text-center" style={{ textAlign: '-webkit-center' }}>
                                                <div className="logo" style={{ maxWidth: '65px',width:'65px' }} onClick={() => props.history.push(`/club-info/${match.away_team_id}`)}><img src={match.away_team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                                <h5 className="mb-0" style={{ fontSize: '9px' }}><span class="notranslate">{match.away_team_name}</span></h5>
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
            <div className="player-info">
                {!loading ?

                    <>
                        {playerInfo.length !== 0 ?
                            <>
                                <div className="name">
                                    <h4 className="my-0"><strong>{playerInfo.fullname}</strong></h4>
                                    <span>{playerInfo.common_name}</span>
                                </div>
                                <div className="tag">Personal Info</div>
                                <div className="personal">
                                    <table className="table">
                                        <tbody>
                                            <tr><td>Date of Birth</td><td>{playerInfo.birthdate}</td></tr>
                                            <tr><td>Citizenship</td><td><img src={playerInfo.country_flag} style={{width:'36px',padding:'5px'}}/>{playerInfo.nationality}</td></tr>
                                            <tr><td>Age</td><td>{playerAge}</td></tr>
                                            <tr><td>Weight</td><td>{playerInfo.weight}</td></tr>
                                            <tr><td>Height</td><td>{playerInfo.height}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                            :
                            <>
                                <div className="tag">Personal Info</div>
                                <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                    <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                                </div>
                            </>
                        }

                    </>
                    :
                    <>
                        <div className="tag">Personal Info</div>
                        <LeagueSimmer />
                    </>
                }
                {/* <div className="tag">Career Info</div>
                <div className="career">
                    <table className="table">
                        <tbody>
                            <tr><td>Current Team</td><td>Chelsea</td></tr>
                            <tr><td>Current Competition</td><td>EPL</td></tr>
                            <tr><td>Previous Team</td><td>Arsenal</td></tr>
                            <tr><td>Previous Competition</td><td>EPL</td></tr>
                        </tbody>
                    </table>
                </div> */}
                {/* <div className="tag">Club History</div> */}
                {loadingPlayerClubHistory ?
                    <PlayerSeasonSimmer />
                    :

                    <>
                        {uniqueplayerClubHistory.length >= 1 ?
                            <div className="club-hstr">
                                <ul>
                                    {uniqueplayerClubHistory && uniqueplayerClubHistory.filter(club => club.from_team_logo !== '' && club.from_team_name !== '').map((club, key) => {
                                        return <li key={key}>
                                            {/* <div className="cover-img"><img src={club.from_team_logo} alt="" /></div> */}
                                            {/* <h5 className="my-1"><strong>{club.from_team_name}</strong></h5> */}
                                            {/* <span>{100 Match}</span> */}
                                            {/* <span>{club.season_name.replace('/',' - ')}</span> */}
                                        </li>
                                    })}

                                </ul>
                            </div>
                            :
                            {/*<div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                                <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                                </div>*/}
                        }

                    </>

                }



                {/* <div className="tag">Competion History</div>
                <div className="competion-hstr">
                    <ul>
                        <li>
                            <div className="cover-img">
                                <img src={League1} alt="" />
                            </div>
                            <h3><strong>7</strong></h3>
                            <span>Bundesliga</span>
                        </li>
                        <li>
                            <div className="cover-img">
                                <img src={League2} alt="" />
                            </div>
                            <h3><strong>10</strong></h3>
                            <span>Bundesliga</span>
                        </li>
                        <li>
                            <div className="cover-img">
                                <img src={League3} alt="" />
                            </div>
                            <h3><strong>12</strong></h3>
                            <span>La Liga</span>
                        </li>
                        <li>
                            <div className="cover-img">
                                <img src={League4} alt="" />
                            </div>
                            <h3><strong>2</strong></h3>
                            <span>Copa Del</span>
                        </li>
                        <li>
                            <div className="cover-img">
                                <img src={League5} alt="" />
                            </div>
                            <h3><strong>8</strong></h3>
                            <span>Bundesliga</span>
                        </li>
                        <li>
                            <div className="cover-img">
                                <img src={League6} alt="" />
                            </div>
                            <h3><strong>7</strong></h3>
                            <span>Bundesliga</span>
                        </li>
                    </ul>
                </div>
             */}
            </div>

        </div>
    )
}
export default withRouter(PlayerInfo);

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}