import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as moment from 'moment';
import { PlayersSimmer, MatchesSimmer, MatchesHeadingSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import Cookies from 'js-cookie';
// import Face1 from '../../assetsStaging/img/face.png';
// import Face2 from '../../assetsStaging/img/face2.png';
// import Face3 from '../../assetsStaging/img/face3.png';
// import Albion from '../../assetsStaging/img/ic-albion.png';
// import Chelsea from '../../assetsStaging/img/ic-chelsea.png';
// import Manchester from '../../assetsStaging/img/ic-mancity.png';

const LeagueInfo = (props) => {
    //console.log(props)
    const [lastMatchLimit, setLastMatchLimit] = useState(2);
    const [nextMatchLimit, setNextMatchLimit] = useState(2);


    const [matches, setMatches] = useState([]);
    const [loadingMatches, setLoadingMatches] = useState(true);

    

    const seeAllLastMatches = (arrayLength) => {
        // console.log(arrayLength);
        setLastMatchLimit(arrayLength);
    }

    const seeAllNextMatches = (arrayLength) => {
        // console.log(arrayLength);
        setNextMatchLimit(arrayLength);
    }

    const { turnament,compId, topPlayers, loadingplayers, lastGame, nextGame, loadinginfoMatches, season, seasonName, seasonLoading } = props;
    // console.log(topPlayers)
    // console.log(lastGame)
    // console.log(nextGame)
    // console.log(loadinginfoMatches)
    
    return (
        <div className="tab-content">
            {seasonLoading ?
                <PlayersSimmer />


                :
                
                <div className="league-highlight block bg-grey">
                   {!turnament && <h5>Season {seasonName}</h5>}
                    {/* {console.log(seasonName)} */}
                    {Object.keys(season).length >=1 ?
                        <ul>
                        <li>
                            <span class="notranslate">{season.Matched_played}</span>
                            <span>Matches Played</span>
                        </li>
                        <li>
                            <span class="notranslate">{season.Goals}</span>
                             { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                              <strong><span class="notranslate">ဂိုး </span></strong>
                            :
                               <span>Goals</span>
                            }
                            
                        </li>
                        <li>
                            <span class="notranslate">{season.Yellow_Cards}</span>
                            <span>Yellow Card</span>
                        </li>
                        <li>
                            <span class="notranslate">{season.red_cards === "" ? 0 : season.redcards}</span>
                            { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

                              <strong><span class="notranslate">အနီကဒ် </span></strong>
                            :
                               <span>Red Card</span>
                            }
                            
                        </li>
                        <li>
                            <span class="notranslate">{season.assists === "" ? 0 : season.assists}</span>
                            <span>Assists</span>
                        </li>
                    </ul>
                    :
                    <>
                    {!turnament ?
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90px' }}>
                        <img style={{ height: '80px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
            </div>
            :
            null
                    }
                    </>
                    
                }
                    
                    
                </div>

            }
            {loadingplayers ?
                <PlayersSimmer />
                :
                <div className="league-top-player">
                    <div className="tag bg-dark d-flex text-white">
                        <span className="mr-auto">Top Player</span>
                        <span>Season {seasonName}</span>
                    </div>
                   {topPlayers.length>=1 ? 
                   <div className="p-2 bg-white">
                        <ul>
                            {topPlayers && topPlayers.map((player, key) => {
                                return <li key={key}>
                                    {(player.data.image_path=="" && player.data.name=="") ?
                                            null
                                            :
                                            <Link to={{
                                                pathname: `/player-info/${player.data.player_id}`,
                                                state: { playerId: player.data.player_id, compId: compId }
                                            }}>
                                                
                                                <div className="cover-img"><img src={player.data.image_path} alt="" style={{height:'100%',width:'100%'}}/></div>
                                                <h5 className="my-1" style={{ fontSize: '12px' }}><span class="notranslate">{player.data.name.split(" ")[0]}</span></h5>
                                                <h5 className="my-1" style={{ fontSize: '12px' }}><span class="notranslate">{player.data.name.split(' ')[1]}</span></h5>
                                                {player.title!=='Yellow cards' && <span><strong>{player.title}</strong></span>}
                                                {player.title==='Yellow cards' && <span><strong>Ylw cards</strong></span>}
                                                <span className="btn-pill">
                                                    Score <br /> {player.data.scores}
                                                </span>
                                            </Link>
                                        }
                                    
                                    
                                </li>
                            })}

                        </ul>
                    </div>
                    :
                    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px' }}>
                                <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
            }
                </div>


            }
            {loadinginfoMatches ?
                <>
                    <MatchesHeadingSimmer />
                    <MatchesSimmer />
                    <MatchesSimmer />
                </>

                :

                <>
                    {lastGame.length > 0 ?
                        <>
                            <div className="tag bg-purple d-flex text-white">
                                <span className="mr-auto">Last Game</span>
                                {lastMatchLimit === lastGame.length ?
                                    null
                                    :
                                    <span className="bg-whitepurple" onClick={() => seeAllLastMatches(lastGame.length)}>More</span>
                                }

                            </div>
                            {/* {console.log(lastGame)} */}
                            {lastGame && lastGame.slice(0, lastMatchLimit).map((game, key) => {
                                return <div className="container-matches" key={key}>
                                    <div className="matches">
                                        <div className="d-flex j-center">
                                            <div className="club-left mx-1 text-center" style={{ textAlign: '-webkit-center', width: 'min-content' }}>
                                                <div className="logo" style={{ maxWidth: "65px" }} onClick={() => props.history.push(`/club-info/${game.homeTeam_id}`)}><img src={game.home_logo} alt="" style={{ maxWidth: "50px" }} /></div>
                                                <h5 className="mb-0" style={{fontSize: '11px'}}><span class="notranslate">{game.homeTeam_name}</span></h5>
                                            </div>
                                            <div className="mid mx-2 d-flex flex-column my-auto">
                                                <div className="d-flex j-center h-max-c border radius-1 px-2 py-1" style={{ fontSize: "16pt" }}>
                                                    <span class="notranslate">{game.homeTeam_score}</span>
                                                    <span className="mx-2 border-right"></span>
                                                    <span class="notranslate">{game.awayTeam_score}</span>
                                                </div>
                                                <span className="my-1">{utcToLocal(game.date_time).split(' ')[0]}</span>
                                                <span className="btn-pill bg-red" onClick={() => props.history.push(`/match/details/${game.match_id}`)}>Finished</span>
                                            </div>
                                            <div className="club-right mx-1 text-center" style={{ textAlign: '-webkit-center', width: 'min-content' }}>
                                                <div className="logo" style={{ maxWidth: "65px" }} onClick={() => props.history.push(`/club-info/${game.awayTeam_id}`)}><img src={game.away_logo} alt="" style={{ maxWidth: "50px" }} /></div>
                                                <h5 className="mb-0"  style={{fontSize: '11px'}}><span class="notranslate">{game.awayTeam_name}</span></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            })}
                        </>
                        :

                        <>
                            <div className="tag bg-purple d-flex text-white">
                                <span className="mr-auto">Last Game</span>
                            </div>
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        </>


                    }

                </>
            }


            {loadinginfoMatches ?
                <>
                    <MatchesHeadingSimmer />
                    <MatchesSimmer />
                    <MatchesSimmer />
                </>

                :
                <>
                    {nextGame.length > 0 ?
                        <>
                            <div className="tag bg-purple d-flex text-white">
                                <span className="mr-auto">Next Game</span>
                                {nextMatchLimit === nextGame.length ?
                                    null
                                    :
                                    <span className="bg-whitepurple" onClick={() => seeAllNextMatches(nextGame.length)}>More</span>
                                }

                            </div>
                            {console.log(nextGame)}
                            {nextGame && nextGame.slice(0, nextMatchLimit).map((game, key) => {
                                return <div className="container-matches" key={key}>
                                    <div className="matches">
                                        <div className="d-flex j-center">
                                            <div className="club-left mx-1 text-center" style={{ textAlign: '-webkit-center', width: 'min-content' }}>
                                                <div className="logo" style={{ maxWidth: "65px" }} onClick={() => props.history.push(`/club-info/${game.homeTeam_id}`)}><img src={game.home_logo} alt="" style={{ maxWidth: "50px" }} /></div>
                                                <h5 className="mb-0" style={{ width: '60px',fontSize: '11px' }}>{game.homeTeam_name}</h5>
                                            </div>
                                            <div className="mid mx-2 d-flex flex-column my-auto">
                                                <div className="d-flex j-center h-max-c border radius-1 px-2 py-1" style={{ fontSize: "16pt" }}>
                                                    <span>--</span>
                                                    <span className="mx-2 border-right"></span>
                                                    <span>--</span>
                                                </div>
                                                <span className="my-1">{utcToLocal(game.date_time)}</span>
                                                {/* <Link to={`match/details/${game.match_id}`}></Link> */}
                                                <span className="btn-pill bg-green" onClick={() => props.history.push({
                                                    pathname: `/match/details/${game.match_id}`,
                                                    state: { id:game.match_id }
                                                })}>
                                                    
                                                    
                                                    Coming Soon
                                                    
                                                    </span>
                                                    {/* </Link> */}
                                            </div>
                                            <div className="club-right mx-1 text-center" style={{ textAlign: '-webkit-center', width: 'min-content' }}>
                                                <div className="logo" style={{ maxWidth: "65px" }} onClick={() => props.history.push(`/club-info/${game.awayTeam_id}`)}><img src={game.away_logo} alt="" style={{ maxWidth: "50px" }} /></div>
                                                <h5 className="mb-0" style={{ width: '60px',fontSize: '11px' }}>{game.awayTeam_name}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            })}
                        </>
                        :
                        <>
                            <div className="tag bg-purple d-flex text-white">
                                <span className="mr-auto">Next Game</span>
                            </div>
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        </>
                    }

                </>
            }






        </div>
    )
}
export default withRouter(LeagueInfo);

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}