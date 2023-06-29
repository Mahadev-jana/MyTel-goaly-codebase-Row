import React from 'react';
import {Link} from 'react-router-dom';
import { LeaguesSimmer } from '../../../simmer-loader/index';
import './leagueList.css';

const LeagueList = (props) => {
    //console.log(props.leagues)
    //console.log(props.isLoading)
    const { isLoading } = props
    var fakeArray = new Array(1, 2, 3, 4, 5);
    return (
        <React.Fragment>

            <div className="block row">
                <div className="d-flex" style={{ marginTop: '-2.75em' }}>
                    <span className="btn-lg border btn-white w-100 text-center"><strong>League Selection</strong></span>
                </div>
                {/*console.log(isLoading)*/}
                {isLoading && <div>
                    {fakeArray.map(key => (

                        <LeaguesSimmer key={key} />

                    ))}
                </div>
                }
                {!isLoading &&
                    <div className="container-league">
                        {props.leagues.map((league, key) => (
                            <Link
                            to={{
                                pathname: `/league/${league.sportsmonks_id}`,
                                state: { leagueId: league.sportsmonks_id,compId:league.competition_id }
                              }}
                            //  to={`/league/${league.sportsmonks_id}`} params={{ leagueId: league.sportsmonks_id }} 
                             className="league" key={key} >
                                <div className="league-logo border-right" style={{width:'26%'}}><img src={league.logo} alt="" style={{maxWidth:'none'}}/></div>
                                <div className="league-title" className="notranslate" style={{color: '#4d0053'}}>{league.competition_name}</div>
                                <span className="league-arrow"></span>
                            </Link>
                        ))}

                    </div>
                }
            </div>
        </React.Fragment>
    )
}
export default LeagueList;