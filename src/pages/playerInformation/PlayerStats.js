import React, { Fragment } from 'react';
import '../../assetsStaging/css/circle.css';
import { LeagueSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import GoalKeeper from './GoalKeeper';
import Attacker from './Attacker';
import Middlefielder from './Middlefielder';
import Defender from './Defender';
import Cookies from 'js-cookie';

const PlayerStats = (props) => {
    //console.log(props)
    const { playerInfo, loading } = props;
    return (
        <Fragment>
            {loading ?
                <LeagueSimmer />
                :

                <>
                    {Object.keys(playerInfo).length === 0 ?
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                            <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                        </div>
                        :
                        <>
                            {playerInfo && playerInfo.position_id === 1 &&
                                <GoalKeeper playerInfo={playerInfo} />
                            }
                            {playerInfo && playerInfo.position_id === 2 &&
                                <Defender playerInfo={playerInfo} />
                            }
                            {playerInfo && playerInfo.position_id === 3 &&
                                <Middlefielder playerInfo={playerInfo} />
                            }
                            {playerInfo && playerInfo.position_id === 4 &&
                                <Attacker playerInfo={playerInfo} />
                            }
                        </>
                    }

                </>
            }



        </Fragment>

    )
}
export default PlayerStats;