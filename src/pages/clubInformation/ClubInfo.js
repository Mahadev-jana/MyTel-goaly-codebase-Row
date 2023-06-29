import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as moment from 'moment';
import { LeagueSimmer, PlayerSeasonSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import defaultImg from '../../assetsStaging/img/default-player.png';
import Trophy from '../../assetsStaging/img/Group169.png';
import Cookies from 'js-cookie';

const ClubInfo = (props) => {
    const [limitNext, setLimitNext] = useState(1);
    const [limitPrev, setLimitPrev] = useState(1);
    const [moreNextButton, setMoreNextButton] = useState(true);
    const [morePrevButton, setMorePrevButton] = useState(true);

    const showAllNextGame = () => {
        setLimitNext(nextGame.length);
        setMoreNextButton(false);
    }
    const showAllPrevtGame = () => {
        setLimitPrev(prevGame.length);
        setMorePrevButton(false);
    }
     //console.log(props)
    const { nextGame, prevGame, loading, season, loadingSeason, trophy, loadingTrophy, topGoal, topYellowcard, topRedcard, topAssists, loadingTopPlayers,seasonName,compId } = props;
    return (
        <div className="tab-content row">
            {loadingSeason ?
                <PlayerSeasonSimmer />
                :
                <>

                    <div className="club-highlight block bg-grey">
                        <h5>Season {seasonName}</h5>
                        {Object.keys(season).length !== 0 ?
                            <ul>
                                <li>
                                    <span class="notranslate">{season.Matched_played === '' ? 0 : season.Matched_played}</span>
                                    <span>Matches Played</span>
                                </li>
                                <li>
                                    <span class="notranslate">{season.Goals === '' ? 0 : season.Goals}</span>
                                    { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                                      <strong><span class="notranslate">ဂိုး </span></strong>
                                    :
                                       <span>Goals</span>
                                    }
                                </li>
                                <li>
                                    <span class="notranslate">{season.Yellow_Cards === '' ? 0 : season.Yellow_Cards}</span>
                                    <span>Yellow Card</span>
                                </li>
                                <li>
                                    <span class="notranslate">{season.Red_Cards === '' ? 0 : season.Red_Cards}</span>
                                    { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                                      <strong><span class="notranslate">အနီကဒ် </span></strong>
                                    :
                                       <span>Red Card kk</span>
                                    }
                                </li>
                                <li>
                                    <span class="notranslate">{season.Assists === '' ? 0 : season.Assists}</span>
                                    <span>Assists</span>
                                </li>

                                {/* <li>
                                    <span>{season.Others === '' ? 0 : season.Others}</span>
                                    <span>Others</span>
                                </li> */}
                            </ul>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                                <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }
                    </div>


                </>
            }
            <div className="club-top-player">
                <div className="tag bg-dark d-flex text-white">
                    <span className="mr-auto">Top Player</span>
                    <span>{seasonName}</span>
                </div>
                {loadingTopPlayers ?
                    <PlayerSeasonSimmer />
                    :
                    
                    <>
                    {(!loadingTopPlayers&& topGoal.length>0 && topAssists.length>0 && topRedcard.length>0 && topYellowcard.length>0 )
                        ?
                        <div className="p-2 bg-white">
                        <ul>
                            {topGoal && topGoal.sort((a, b) => b.goals - a.goals).slice(0, 1).map((goal, key) => {
                                return <li key={key}>
                                   {/* { console.log(compId)} */}
                                    <Link to={{
                                        pathname: `/player-info/${goal.player_id}`,
                                        state: { playerId: goal.player_id,
                                            compId: compId
                                        }
                                    }}>
                                        <div className="cover-img"><img src={goal.player_image == '' ? defaultImg : goal.player_image} alt="" /></div>
                                        {/* <h5 className="my-1" style={{ fontSize: '10px' }}>{goal.player_name.slice(0, 10)}</h5> */}
                                        <h5 className="my-1" style={{ fontSize: '12px' }}><span class="notranslate">{goal.player_name.split(" ")[0]}</span></h5>
                                        <h5 className="my-1" style={{ fontSize: '12px' }}><span class="notranslate">{goal.player_name.split(' ')[1]}</span></h5>
                                        { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                                          <span class="notranslate"><strong>ဂိုး </strong></span>
                                        :
                                           <span><strong>Goals</strong></span>
                                        }

                                        <span className="btn-pill">
                                            Score <br /> {goal.goals}
                                        </span>
                                    </Link>
                                </li>
                            })}
                            {topYellowcard && topYellowcard.sort((a, b) => b.yellowcards - a.yellowcards).slice(0, 1).map((yellowcard, key) => {
                                return <li key={key}>
                                    <Link to={{
                                        pathname: `/player-info/${yellowcard.player_id}`,
                                        state: { playerId: yellowcard.player_id,
                                            compId: compId }
                                    }}>
                                    <div className="cover-img"><img src={yellowcard.player_image == '' ? defaultImg : yellowcard.player_image} alt="" /></div>
                                    {/* <h5 className="my-1" style={{ fontSize: '10px' }}>{yellowcard.player_name.slice(0, 10)}</h5> */}
                                    <h5 className="my-1" style={{ fontSize: '12px' }}><span class="notranslate">{yellowcard.player_name.split(" ")[0]}</span></h5>
                                    <h5 className="my-1" style={{ fontSize: '12px' }}><span class="notranslate">{yellowcard.player_name.split(' ')[1]}</span></h5>
                                    <span><strong>Yellowcards</strong></span>
                                    <span className="btn-pill">
                                        Score <br /> {yellowcard.yellowcards}
                                    </span>
                                    </Link>
                                </li>
                            })}
                            {topRedcard && topRedcard.sort((a, b) => b.redcards - a.redcards).slice(0, 1).map((redcard, key) => {
                                return <li key={key}>
                                    <Link to={{
                                        pathname: `/player-info/${redcard.player_id}`,
                                        state: { playerId: redcard.player_id,
                                            compId: compId }
                                    }}>
                                    <div className="cover-img"><img src={redcard.player_image == '' ? defaultImg : redcard.player_image} alt="" /></div>
                                    {/* <h5 className="my-1" style={{ fontSize: '10px' }}>{redcard.player_name.slice(0, 10)}</h5> */}
                                    <h5 className="my-1" style={{ fontSize: '12px' }}><span class="notranslate">{redcard.player_name.split(" ")[0]}</span></h5>
                                    <h5 className="my-1" style={{ fontSize: '12px' }}><span class="notranslate">{redcard.player_name.split(' ')[1]}</span></h5>
                                    
                                    { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                                      <strong><span class="notranslate">အနီကဒ်</span></strong>
                                    :
                                       <span><strong>Redcards</strong></span>
                                    }

                                    
                                    <span className="btn-pill">
                                        Score <br /> {redcard.redcards}
                                    </span>
                                    </Link>
                                </li>
                            })}
                            {topAssists && topAssists.sort((a, b) => b.assists - a.assists).slice(0, 1).map((assist, key) => {
                                return <li key={key}>
                                    <Link to={{
                                        pathname: `/player-info/${assist.player_id}`,
                                        state: { playerId: assist.player_id,
                                            compId: compId }
                                    }}>
                                    <div className="cover-img"><img src={assist.player_image == '' ? defaultImg : assist.player_image} alt="" /></div>
                                    {/* <h5 className="my-1" style={{ fontSize: '10px' }}>{assist.player_name.slice(0, 10)}</h5> */}
                                    <h5 className="my-1" style={{ fontSize: '12px' }}><span class="notranslate">{assist.player_name.split(" ")[0]}</span></h5>
                                    <h5 className="my-1" style={{ fontSize: '12px' }}><span class="notranslate">{assist.player_name.split(' ')[1]}</span></h5>
                                    <span><strong>Assists</strong></span>
                                    <span className="btn-pill">
                                        Score <br /> {assist.assists}
                                    </span>
                                    </Link>
                                </li>
                            })}

                        </ul>
                    </div>

                        :
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                        <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                    </div>
                    }
                    </>
                }
            </div>
            <div className="tag bg-purple d-flex text-white">
                <span className="mr-auto">Next Game</span>
                {moreNextButton && !loading && limitNext <= nextGame.length &&
                    <span className="bg-whitepurple" onClick={showAllNextGame}>More</span>
                }

            </div>
            <div className="container-matches">
                {loading ?
                    <>
                        <PlayerSeasonSimmer />
                    </>
                    :

                    <>
                        {nextGame.length >= 1 ?
                            <>
                                {nextGame && nextGame.slice(0, limitNext).map((game, key) => {
                                    return <div className="matches" key={key}>
                                        <div className="d-flex j-center">
                                            <div className="club-left mx-1 text-center">
                                                <div className="logo" style={{maxWidth: '75px'}}
                                                 onClick={() => props.clubIdChange(game.homeTeam_id)}><img src={game.homeTeam_logo} alt="" style={{
                                                width: '60px',
                                                maxWidth: '60px',
                                                height: '60px',
                                                maxHeight: '60px'
                                            }} /></div>
                                                <h5 className="mb-0"><span class="notranslate">{game.homeTeam_name}</span></h5>
                                            </div>
                                            <div className="mid mx-2 d-flex flex-column my-auto">
                                                <div className="d-flex j-center h-max-c border radius-1 px-2 py-1" style={{ fontSize: "16pt" }}>
                                                    <span>--</span>
                                                    <span className="mx-2 border-right"></span>
                                                    <span>--</span>
                                                </div>
                                                <span className="my-1">{utcToLocal(game.date_time)}</span>
                                                <span className="btn-pill bg-green" onClick={() => props.history.push({
                                                    pathname: `/match/details/${game.match_id}`,
                                                    state: { id:game.match_id }
                                                })}>Coming Soon</span>
                                            </div>
                                            <div className="club-right mx-1 text-center">
                                                <div className="logo" style={{maxWidth: '75px'}}
                                                onClick={() => props.clubIdChange(game.awayTeam_id)}><img src={game.awayTeam_logo} alt=""  style={{
                                                width: '60px',
                                                maxWidth: '60px',
                                                height: '60px',
                                                maxHeight: '60px'
                                            }}/></div>
                                                <h5 className="mb-0"><span class="notranslate">{game.awayTeam_name}</span></h5>
                                            </div>
                                        </div>
                                    </div>

                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                                <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </>
                }

            </div>
            <div className="tag bg-purple d-flex text-white">
                <span className="mr-auto">Previous Game</span>
                {morePrevButton && !loading && limitPrev <= prevGame.length &&
                    <span className="bg-whitepurple" onClick={showAllPrevtGame}>More</span>
                }

            </div>
            <div className="container-matches">
                {loading ?
                    <>
                        <PlayerSeasonSimmer />
                    </>
                    :

                    <>
                        {prevGame.length >= 1 ?
                            <>
                                {prevGame && prevGame.slice(0, limitPrev).map((game, key) => {
                                    return <div className="matches" key={key}>
                                        <div className="d-flex j-center">
                                            <div className="club-left mx-1 text-center">
                                                <div className="logo" onClick={() => props.clubIdChange(game.homeTeam_id)}><img src={game.homeTeam_logo} alt="" /></div>
                                                <h5 className="mb-0"><span class="notranslate">{game.homeTeam_name}</span></h5>
                                            </div>
                                            <div className="mid mx-2 d-flex flex-column my-auto">
                                                <div className="d-flex j-center h-max-c border radius-1 px-2 py-1" style={{ fontSize: "16pt" }}>
                                                    <span class="notranslate">{game.homeTeam_score}</span>
                                                    <span className="mx-2 border-right"></span>
                                                    <span class="notranslate">{game.awayTeam_score}</span>
                                                </div>
                                                <span className="my-1">{utcToLocal(game.date_time)}</span>
                                                <span className="btn-pill bg-red" onClick={() => props.history.push({
                                                    pathname: `/match/details/${game.match_id}`,
                                                    state: { id:game.match_id }
                                                })}>Finished</span>
                                            </div>
                                            <div className="club-right mx-1 text-center">
                                                <div className="logo" onClick={() => props.clubIdChange(game.awayTeam_id)}><img src={game.awayTeam_logo} alt="" /></div>
                                                <h5 className="mb-0"><span class="notranslate">{game.awayTeam_name}</span></h5>
                                            </div>
                                        </div>
                                    </div>

                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                                <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </>
                }

            </div>
            <div className="tag bg-green d-flex text-white">
                <span className="mx-auto">Trophy</span>
            </div>
            {/* {console.log(loadingTrophy)} */}
            {loadingTrophy ?
                <LeagueSimmer />
                :
                <>
                    {trophy.length >= 1 ?
                        <div className="competion-hstr">
                            <ul>
                                {trophy && trophy.map((data, key) => {
                                    return <li key={key}>
                                        <div className="cover-img">
                                            <img src={data.league_logo === '' ? Trophy : data.league_logo} alt="" />
                                        </div>
                                        <h3><strong>{data.win_times}</strong></h3>
                                        <span><span class="notranslate">{data.league_name}</span></span>
                                    </li>
                                })}

                            </ul>
                        </div>
                        :
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                            <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                        </div>
                    }

                </>
            }

        </div>

    )
}
export default withRouter(ClubInfo);

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}
