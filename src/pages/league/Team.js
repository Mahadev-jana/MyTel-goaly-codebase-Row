import React from 'react';
import { withRouter } from 'react-router-dom';
import { TeamsSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
// import LiverPool from '../../assetsStaging/img/ic-lvpl.png';
// import Albion from '../../assetsStaging/img/ic-albion.png';
// import Manchester from '../../assetsStaging/img/ic-mancity.png';
// import ManUnited from '../../assetsStaging/img/ic-manutd.png';
// import chelsea from '../../assetsStaging/img/ic-chelsea.png';
const Team = (props) => {
    const { teams, loadingTeams } = props;
    //console.log(props)
    // console.log(teams)
    return (
        <>
            {loadingTeams ?
                <>
                    <TeamsSimmer />
                </>

                :
                <>
                    {teams && teams.length > 0 ?
                        <div className="tab-content">

                            <div className="league-team">
                                {teams && teams.map((team, key) => {
                                    return <div key={key} className="team" onClick={() => props.history.push({
                                        pathname: `/club-info/${team.id}`
                                    })}
                                    // {() => props.history.push(`/club-info/${team.id}`)} key={key}
                                    >
                                        <div className="cover-img">
                                            <img src={team.badge} alt="" />
                                        </div>
                                    </div>
                                })

                                }

                            </div>

                        </div>
                        :
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                            <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                        </div>

                    }
                </>

            }
        </>
    )
}
export default withRouter(Team);