import React, { Fragment,useState } from 'react';
import {isArray} from 'lodash';
import Layer from '../../../assets/img/detail-club/Layer.svg';

const PlayerDetailsInfo = (props) => {
    const [playerInfo,setPlayerInfo]=useState([]);
    React.useEffect(()=>{
        const playerIndex=isArray(props.players) && props.players.find(player=>(player.player_id==props.player_id))
        // console.log(playerIndex)
        setPlayerInfo(playerIndex)

    },[])
    return (
        
        <Fragment>
        {/* {console.log(playerInfo)} */}
        
            <div className="back-btn">
                <a href="" onClick={props.goBack}><img src={Layer} className="mr-1" alt="" /> Back</a>
            </div>
            
            <div className="header d-flex">
                <div className="d-flex ais-center j-center w-25">
                    <img src={playerInfo.image_path} width="75%" alt="" />
                </div>
                <div className="d-flex ais-center w-50">
                    <ul style={{ 'paddingLeft': '10px', 'margin': 0, 'listStyle': 'none', 'color': 'white', 'fontSize': '15px' }}>
                        <li><b>{playerInfo.fullname}</b></li>
                        {/* <li>Defender</li> */}
                        <li>Height: {playerInfo.height}</li>
                        <li>Weight: {playerInfo.weight}</li>
                    </ul>
                </div>
                <div className="d-flex ais-center j-center w-25">
                    <img src={playerInfo.team_logo} width="65%" alt="" />
                </div>
            </div>
        </Fragment>
    )
}
export default PlayerDetailsInfo;