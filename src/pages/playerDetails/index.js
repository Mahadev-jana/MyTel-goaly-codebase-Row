import React, {useState, Fragment } from 'react';
import '../../assets/css/apperance.css';
import {isArray} from 'lodash'
import PlayerDetailsInfo from './components/PlayerDetailsInfo';
import PlayerDetailsStats from './components/PlayerDetailsStats';
import axios from '../../_config/axios';
import loader from '../../assets/loader/loaderspinner.gif';
const PlayerDetails = (props) => {
    const [loading,setLoading]=useState(true);
    const [team_id]=useState(props.match.params.team_id)
    const [player_id]=useState(props.match.params.player_id)
    const [players,setPlayers]=useState([]);

    React.useEffect(()=>{
        // console.log(team_id)
        setLoading(true);
        const payload = new FormData();
        payload.append('id',team_id)
        axios.post('getteamplayers',payload)
        .then(res=>{
            if(res.data && res.data.success && res.data.success==1){
                if(res.data.players && isArray(res.data.players) ){
                setPlayers(res.data.players)
                setLoading(false)
                }
            }
            console.log(res)
        }).catch(error=>{
            console.log({error})
        })
    },[])
    const goBack = () => {
        // props.history.push('/')
        props.history.push(`/team/${team_id}`)
    }

    return (
        
        <Fragment>
        {/* {console.log(loading)} */}
        {loading && <> <div className="col-xs-4">
			</div>
				<div className="col-xs-4" style={{ minHeight: 200, textAlign: 'center', marginTop: 100 }}>
					<img src={loader} alt="" style={{ height: 60 }} />
				</div> </>
			}
            <div className="apperance row">
                {!loading && players.length && <PlayerDetailsInfo goBack={goBack} players={players} player_id={player_id}/>}
                {!loading && players.length && <PlayerDetailsStats players={players} player_id={player_id} />}
            </div>
        </Fragment>
    )
}
export default PlayerDetails;