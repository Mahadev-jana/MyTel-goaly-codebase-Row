import React from 'react';
import { PlayersSimmer, MatchesSimmer, MatchesHeadingSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import Face1 from '../../assetsStaging/img/face.png';
import Face2 from '../../assetsStaging/img/face2.png';
import Face3 from '../../assetsStaging/img/face3.png';
import { withRouter } from 'react-router-dom';

const Stats = (props) => {
     console.log(props);
    const { statsGoal, statsAssists, statsyellowcard, statsRedcard, loadingStats,statsduel,statsshorttotal ,statsshortontotal,statspasstotal,statscrosstotal,statsassist,statsinterceptions,statstackles,statsblocks} = props;
    return (
        <div className="tab-content">

            <div className="tag bg-dark d-flex text-white">
                {/* <span style={{ width: "8%" }}>No.</span> */}
                <span>Players-Goals</span>
                {/* <span className="ml-auto bg-grey" style={{ marginTop: 0 }}>More</span> */}
            </div>
            <div className="league-player-rank block">
                {loadingStats ?
                    <MatchesSimmer />
                    :
                    <ul>
                        {statsGoal.length >= 1 ?
                            <>
                            {console.log(statsGoal)}
                                {statsGoal && statsGoal.filter(player => player.image_path !== '' && player.name !== '').map((goal, key) => {
                                    return <li key={key}>
                                        <span>{key + 1}</span>
                                        <div className="desc">
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={()=> props.history.push({pathname: `/player-info/${goal.player_id}`,state: { playerId: goal.player_id}})}><img className="img-fluid" src={goal.image_path} alt="" style={{ maxWidth: '50px' }} /></div>
                                            <div style={{ width: '110px' }}>
                                                <h5 className="m-0"><b style={{ fontSize: '10px' }}>{goal.name}</b></h5>
                                                <span style={{ fontSize: '10px' }}>{goal.team_name}</span>
                                                {/*<span style={{ fontSize: '10px' }}>{goal.duel_own}</span>*/}
                                            </div>
                                            <div className="cover-img" style={{ maxWidth: '50px' }}onClick={() => props.history.push({
                                        pathname: `/club-info/${goal.team_id}`
                                    })}><img className="img-fluid" src={goal.team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                        </div>
                                 <span class="notranslate">{goal.scores}</span>
                                        
                                    </li>
                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }



                    </ul>

                }
            </div>
            <div className="tag bg-dark d-flex text-white">
                {/* <span style={{ width: "8%" }}>No.</span> */}
                <span>Players-Assists</span>
                {/* <span className="ml-auto bg-grey" style={{ marginTop: 0 }}>More</span> */}
            </div>
            <div className="league-player-rank block">
                {loadingStats ?
                    <MatchesSimmer />
                    :

                    <ul>
                        {statsAssists.length >= 1 ?
                            <>
                                {statsAssists && statsAssists.filter(player => player.image_path !== '' && player.name !== '').map((goal, key) => {
                                    return <li key={key}>
                                        <span>{key + 1}</span>
                                        <div className="desc">
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={()=> props.history.push({pathname: `/player-info/${goal.player_id}`,state: { playerId: goal.player_id}})}><img className="img-fluid" src={goal.image_path} alt="" style={{ maxWidth: '50px' }} /></div>
                                            <div style={{ width: '110px' }}>
                                                <h5 className="m-0"><b style={{ fontSize: '10px' }}>{goal.name}</b></h5>
                                                <span style={{ fontSize: '10px' }}>{goal.team_name}</span>
                                            </div>
                                            <div className="cover-img" style={{ maxWidth: '50px' }}onClick={() => props.history.push({
                                        pathname: `/club-info/${goal.team_id}`
                                    })}><img className="img-fluid" src={goal.team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                        </div>
                                        <span class="notranslate">{goal.scores}</span>
                                    </li>
                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }


                    </ul>

                }
            </div>
            <div className="tag bg-dark d-flex text-white">
                {/* <span style={{ width: "8%" }}>No.</span> */}
                <span>Players-Yellow Cards</span>
                {/* <span className="ml-auto bg-grey" style={{ marginTop: 0 }}>More</span> */}
            </div>
            <div className="league-player-rank block">
                {loadingStats ?
                    <MatchesSimmer />
                    :
                    <ul>
                        {statsyellowcard.length >= 1 ?
                            <>
                                {statsyellowcard && statsyellowcard.filter(player => player.image_path !== '' && player.name !== '').map((goal, key) => {
                                    return <li key={key}>
                                        <span>{key + 1}</span>
                                        <div className="desc">
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={()=> props.history.push({pathname: `/player-info/${goal.player_id}`,state: { playerId: goal.player_id}})}><img className="img-fluid" src={goal.image_path} alt="" style={{ maxWidth: '50px' }} /></div>
                                            <div style={{ width: '110px' }}>
                                                <h5 className="m-0"><b style={{ fontSize: '10px' }}>{goal.name}</b></h5>
                                                <span style={{ fontSize: '10px' }}>{goal.team_name}</span>
                                            </div>
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={() => props.history.push({
                                        pathname: `/club-info/${goal.team_id}`
                                    })}><img className="img-fluid" src={goal.team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                        </div>
                                        <span class="notranslate">{goal.scores}</span>
                                    </li>
                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </ul>

                }


            </div>
            <div className="tag bg-dark d-flex text-white">
                {/* <span style={{ width: "8%" }}>No.</span> */}
                <span>Players-Red Cards</span>
                {/* <span className="ml-auto bg-grey" style={{ marginTop: 0 }}>More</span> */}
            </div>
            <div className="league-player-rank block">
                {loadingStats ?
                    <MatchesSimmer />
                    :
                    <ul>
                        {statsRedcard.length >= 1 ?
                            <>
                                {statsRedcard && statsRedcard.filter(player => player.image_path !== '' && player.name !== '').map((goal, key) => {
                                    return <li key={key}>
                                        <span>{key + 1}</span>
                                        <div className="desc">
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={()=> props.history.push({pathname: `/player-info/${goal.player_id}`,state: { playerId: goal.player_id}})}><img className="img-fluid" src={goal.image_path} alt="" style={{ maxWidth: '50px' }} /></div>
                                            <div style={{ width: '110px' }}>
                                                <h5 className="m-0"><b style={{ fontSize: '10px' }}>{goal.name}</b></h5>
                                                <span style={{ fontSize: '10px' }}>{goal.team_name}</span>
                                            </div>
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={() => props.history.push({
                                        pathname: `/club-info/${goal.team_id}`
                                    })}><img className="img-fluid" src={goal.team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                        </div>
                                        <span class="notranslate">{goal.scores}</span>
                                    </li>
                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </ul>
                }


            </div>
            {/* <div className="tag bg-dark d-flex text-white">
              <span>Players-Duels Own</span>
            </div>

            <div className="league-player-rank block">
                {loadingStats ?
                    <MatchesSimmer />
                    :
                    <ul>
                        {statsduel.length >= 1 ?
                            <>
                                {statsduel && statsduel.filter(player => player.image_path !== '' && player.name !== '').map((goal, key) => {
                                    return <li key={key}>
                                        <span>{key + 1}</span>
                                        <div className="desc">
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={()=> props.history.push({pathname: `/player-info/${goal.player_id}`,state: { playerId: goal.player_id}})}><img className="img-fluid" src={goal.image_path} alt="" style={{ maxWidth: '50px' }} /></div>
                                            <div style={{ width: '110px' }}>
                                                <h5 className="m-0"><b style={{ fontSize: '10px' }}>{goal.name}</b></h5>
                                                <span style={{ fontSize: '10px' }}>{goal.team_name}</span>
                                            </div>
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={() => props.history.push({
                                        pathname: `/club-info/${goal.team_id}`
                                    })}><img className="img-fluid" src={goal.team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                        </div>
                                        <span class="notranslate">{goal.dual_score}</span>
                                    </li>
                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </ul>
                }


            </div>
            <div className="tag bg-dark d-flex text-white">
              <span>Players-Total Shoots</span>
            </div>

            <div className="league-player-rank block">
                {loadingStats ?
                    <MatchesSimmer />
                    :
                    <ul>
                        {statsshorttotal.length >= 1 ?
                            <>
                                {statsshorttotal && statsshorttotal.filter(player => player.image_path !== '' && player.name !== '').map((goal, key) => {
                                    return <li key={key}>
                                        <span>{key + 1}</span>
                                        <div className="desc">
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={()=> props.history.push({pathname: `/player-info/${goal.player_id}`,state: { playerId: goal.player_id}})}><img className="img-fluid" src={goal.image_path} alt="" style={{ maxWidth: '50px' }} /></div>
                                            <div style={{ width: '110px' }}>
                                                <h5 className="m-0"><b style={{ fontSize: '10px' }}>{goal.name}</b></h5>
                                                <span style={{ fontSize: '10px' }}>{goal.team_name}</span>
                                            </div>
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={() => props.history.push({
                                        pathname: `/club-info/${goal.team_id}`
                                    })}><img className="img-fluid" src={goal.team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                        </div>
                                        <span class="notranslate">{goal.short_total}</span>
                                    </li>
                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </ul>
                }


            </div>

            <div className="tag bg-dark d-flex text-white">
              <span>Players- Short On Total</span>
            </div>
            <div className="league-player-rank block">
                {loadingStats ?
                    <MatchesSimmer />
                    :
                    <ul>
                        {statsshortontotal.length >= 1 ?
                            <>
                                {statsshortontotal && statsshortontotal.filter(player => player.image_path !== '' && player.name !== '').map((goal, key) => {
                                    return <li key={key}>
                                        <span>{key + 1}</span>
                                        <div className="desc">
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={()=> props.history.push({pathname: `/player-info/${goal.player_id}`,state: { playerId: goal.player_id}})}><img className="img-fluid" src={goal.image_path} alt="" style={{ maxWidth: '50px' }} /></div>
                                            <div style={{ width: '110px' }}>
                                                <h5 className="m-0"><b style={{ fontSize: '10px' }}>{goal.name}</b></h5>
                                                <span style={{ fontSize: '10px' }}>{goal.team_name}</span>
                                            </div>
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={() => props.history.push({
                                        pathname: `/club-info/${goal.team_id}`
                                    })}><img className="img-fluid" src={goal.team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                        </div>
                                        <span class="notranslate">{goal.short_on_target}</span>
                                    </li>
                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </ul>
                }


            </div>

            <div className="tag bg-dark d-flex text-white">
              <span>Players- Pass Total</span>
            </div>
            <div className="league-player-rank block">
                {loadingStats ?
                    <MatchesSimmer />
                    :
                    <ul>
                        {statsshortontotal.length >= 1 ?
                            <>
                                {statspasstotal && statspasstotal.filter(player => player.image_path !== '' && player.name !== '').map((goal, key) => {
                                    return <li key={key}>
                                        <span>{key + 1}</span>
                                        <div className="desc">
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={()=> props.history.push({pathname: `/player-info/${goal.player_id}`,state: { playerId: goal.player_id}})}><img className="img-fluid" src={goal.image_path} alt="" style={{ maxWidth: '50px' }} /></div>
                                            <div style={{ width: '110px' }}>
                                                <h5 className="m-0"><b style={{ fontSize: '10px' }}>{goal.name}</b></h5>
                                                <span style={{ fontSize: '10px' }}>{goal.team_name}</span>
                                            </div>
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={() => props.history.push({
                                        pathname: `/club-info/${goal.team_id}`
                                    })}><img className="img-fluid" src={goal.team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                        </div>
                                        <span class="notranslate">{goal.pass_total}</span>
                                    </li>
                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </ul>
                }


            </div>

            <div className="tag bg-dark d-flex text-white">
              <span>Players- Cross Total</span>
            </div>
            <div className="league-player-rank block">
                {loadingStats ?
                    <MatchesSimmer />
                    :
                    <ul>
                        {statscrosstotal.length >= 1 ?
                            <>
                                {statscrosstotal && statscrosstotal.filter(player => player.image_path !== '' && player.name !== '').map((goal, key) => {
                                    return <li key={key}>
                                        <span>{key + 1}</span>
                                        <div className="desc">
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={()=> props.history.push({pathname: `/player-info/${goal.player_id}`,state: { playerId: goal.player_id}})}><img className="img-fluid" src={goal.image_path} alt="" style={{ maxWidth: '50px' }} /></div>
                                            <div style={{ width: '110px' }}>
                                                <h5 className="m-0"><b style={{ fontSize: '10px' }}>{goal.name}</b></h5>
                                                <span style={{ fontSize: '10px' }}>{goal.team_name}</span>
                                            </div>
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={() => props.history.push({
                                        pathname: `/club-info/${goal.team_id}`
                                    })}><img className="img-fluid" src={goal.team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                        </div>
                                        <span class="notranslate">{goal.cross_total}</span>
                                    </li>
                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </ul>
                }


            </div>

            <div className="tag bg-dark d-flex text-white">
              <span>Players- Assist</span>
            </div>
            <div className="league-player-rank block">
                {loadingStats ?
                    <MatchesSimmer />
                    :
                    <ul>
                        {statsassist.length >= 1 ?
                            <>
                                {statsassist && statsassist.filter(player => player.image_path !== '' && player.name !== '').map((goal, key) => {
                                    return <li key={key}>
                                        <span>{key + 1}</span>
                                        <div className="desc">
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={()=> props.history.push({pathname: `/player-info/${goal.player_id}`,state: { playerId: goal.player_id}})}><img className="img-fluid" src={goal.image_path} alt="" style={{ maxWidth: '50px' }} /></div>
                                            <div style={{ width: '110px' }}>
                                                <h5 className="m-0"><b style={{ fontSize: '10px' }}>{goal.name}</b></h5>
                                                <span style={{ fontSize: '10px' }}>{goal.team_name}</span>
                                            </div>
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={() => props.history.push({
                                        pathname: `/club-info/${goal.team_id}`
                                    })}><img className="img-fluid" src={goal.team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                        </div>
                                        <span class="notranslate">{goal.assist}</span>
                                    </li>
                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </ul>
                }


            </div>
            <div className="tag bg-dark d-flex text-white">
              <span>Players- Interceptions</span>
            </div>
            <div className="league-player-rank block">
                {loadingStats ?
                    <MatchesSimmer />
                    :
                    <ul>
                        {statsinterceptions.length >= 1 ?
                            <>
                                {statsinterceptions && statsinterceptions.filter(player => player.image_path !== '' && player.name !== '').map((goal, key) => {
                                    return <li key={key}>
                                        <span>{key + 1}</span>
                                        <div className="desc">
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={()=> props.history.push({pathname: `/player-info/${goal.player_id}`,state: { playerId: goal.player_id}})}><img className="img-fluid" src={goal.image_path} alt="" style={{ maxWidth: '50px' }} /></div>
                                            <div style={{ width: '110px' }}>
                                                <h5 className="m-0"><b style={{ fontSize: '10px' }}>{goal.name}</b></h5>
                                                <span style={{ fontSize: '10px' }}>{goal.team_name}</span>
                                            </div>
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={() => props.history.push({
                                        pathname: `/club-info/${goal.team_id}`
                                    })}><img className="img-fluid" src={goal.team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                        </div>
                                        <span class="notranslate">{goal.interception}</span>
                                    </li>
                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </ul>
                }


            </div>
            <div className="tag bg-dark d-flex text-white">
              <span>Players- Tackles</span>
            </div>
            <div className="league-player-rank block">
                {loadingStats ?
                    <MatchesSimmer />
                    :
                    <ul>
                        {statstackles.length >= 1 ?
                            <>
                                {statstackles && statstackles.filter(player => player.image_path !== '' && player.name !== '').map((goal, key) => {
                                    return <li key={key}>
                                        <span>{key + 1}</span>
                                        <div className="desc">
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={()=> props.history.push({pathname: `/player-info/${goal.player_id}`,state: { playerId: goal.player_id}})}><img className="img-fluid" src={goal.image_path} alt="" style={{ maxWidth: '50px' }} /></div>
                                            <div style={{ width: '110px' }}>
                                                <h5 className="m-0"><b style={{ fontSize: '10px' }}>{goal.name}</b></h5>
                                                <span style={{ fontSize: '10px' }}>{goal.team_name}</span>
                                            </div>
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={() => props.history.push({
                                        pathname: `/club-info/${goal.team_id}`
                                    })}><img className="img-fluid" src={goal.team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                        </div>
                                        <span class="notranslate">{goal.tackles}</span>
                                    </li>
                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </ul>
                }


            </div>
            <div className="tag bg-dark d-flex text-white">
              <span>Players- Blocks</span>
            </div>
            <div className="league-player-rank block">
                {loadingStats ?
                    <MatchesSimmer />
                    :
                    <ul>
                        {statsblocks.length >= 1 ?
                            <>
                                {statsblocks && statsblocks.filter(player => player.image_path !== '' && player.name !== '').map((goal, key) => {
                                    return <li key={key}>
                                        <span>{key + 1}</span>
                                        <div className="desc">
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={()=> props.history.push({pathname: `/player-info/${goal.player_id}`,state: { playerId: goal.player_id}})}><img className="img-fluid" src={goal.image_path} alt="" style={{ maxWidth: '50px' }} /></div>
                                            <div style={{ width: '110px' }}>
                                                <h5 className="m-0"><b style={{ fontSize: '10px' }}>{goal.name}</b></h5>
                                                <span style={{ fontSize: '10px' }}>{goal.team_name}</span>
                                            </div>
                                            <div className="cover-img" style={{ maxWidth: '50px' }} onClick={() => props.history.push({
                                        pathname: `/club-info/${goal.team_id}`
                                    })}><img className="img-fluid" src={goal.team_logo} alt="" style={{ maxWidth: '50px' }} /></div>
                                        </div>
                                        <span class="notranslate">{goal.blocks}</span>
                                    </li>
                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </ul>
                }


            </div> */}


        </div>
    )
}
export default withRouter(Stats);