import React,{useState} from 'react';
import {isArray} from 'lodash';

const PlayerDetailsStats = (props) => {
    const [playerInfo,setPlayerInfo]=useState([]);
    React.useEffect(()=>{
        const playerIndex=isArray(props.players) && props.players.find(player=>(player.player_id==props.player_id))
        // console.log(playerIndex)
        setPlayerInfo(playerIndex)

    },[])
    console.log(playerInfo.assist)
    let obj={
        "Assist":playerInfo.assist,
        "Blocks":playerInfo.blocks,
        "Cleansheet":playerInfo.cleansheet,
        "Cross Total":playerInfo.cross_total,
        "Crosses Accurate":playerInfo.crosses_accurate,
        "Dribbles Attempts":playerInfo.dribbles_attempts,
        "Dribbles Past":playerInfo.dribbles_past,
        "Dribbles Success":playerInfo.dribbles_success,
        "Duel Own":playerInfo.duel_own,
        "Duel Total":playerInfo.duel_total,
        "Foul Commited":playerInfo.foul_commited,
        "Foul Drawn":playerInfo.foul_drawn,
        "Goals":playerInfo.goals,
        "Goals Concade":playerInfo.goals_concade,
        "Goals Dispossessed":playerInfo.goals_dispossessed,
        "Goals Insidebox Save":playerInfo.goals_insidebox_save,
        "Goals Saves":playerInfo.goals_saves,
        "Hit Post":playerInfo.hit_post,
        "Interception":playerInfo.interception,
        "Own Goal":playerInfo.own_goal,
        "Pass Accurate":playerInfo.pass_accurate,
        "Pass Key Passes":playerInfo.pass_key_passes,
        "Pass Total":playerInfo.pass_total,
        "Penalty Commited":playerInfo.penalty_commited,
        "Penalty Missed":playerInfo.penalty_missed,
        "Penalty Own":playerInfo.penalty_own,
        "Penalty Saved":playerInfo.penalty_saved,
        "Penalty Scores":playerInfo.penalty_scores,
        "Red Card":playerInfo.red_card,
        "Short Off Target":playerInfo.short_off_target,
        "Short On Target":playerInfo.short_on_target,
        "Short Total":playerInfo.short_total,
        "Tackles":playerInfo.tackles,
        "Yellow Card":playerInfo.yellow_card,
        "Yellow Red":playerInfo.yellow_red
    }
    var sortableByValue = [];
for (var sortedObj in obj) {
    sortableByValue.push([sortedObj, obj[sortedObj]]);
}
sortableByValue.sort(function(a, b) {
    return b[1] - a[1];
});
// var objSorted = {}
// sortable.forEach(function(item){
//     objSorted[item[0]]=item[1]
// })
    console.log(obj)
    console.log(sortableByValue)
    // console.log(objSorted)
    return (
    
        <div className="body">
        {/* {console.log(playerInfo)} */}
            <div className="px-1 pb-2" style={{ 'marginTop': '-25px' }}>
                <div className="p-2" style={{ 'background': '#d04979', 'color': 'white', 'borderRadius': '5px' }}>Apperance: <b>{playerInfo.appearences}</b></div>
                <div className="p-2 mt-2 detail-apperance">
                <ul>
                    {sortableByValue.map(data=>{
                        return(
                        <li>
                        <div className="d-flex">
                                <span className="mr-auto">{data.slice(0,1)}</span>
                                {/* <span>{playerInfo.goals=='' ? '0' : playerInfo.goals}</span> */}
                                <span>{data.slice(1,2)==""?'0':data.slice(1,2)}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${data.slice(1,2)/100*100}%` }}></div>
                            </div>
                        </li>)
                    })}
                    
                    {/* <ul>
                        
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Goals</span>
                                <span>{playerInfo.goals=='' ? '0' : playerInfo.goals}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.goals/100*100}%` }}></div>
                            </div>
                        </li> */}
                        {/* <li>
                            <div className="d-flex">
                                <span className="mr-auto">Goals Save</span>
                                <span>{playerInfo.goals_saves=='' ? '0' : playerInfo.goals_saves}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.goals_saves/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Goal Insidebox Save</span>
                                <span>{playerInfo.goals_insidebox_save=='' ? '0' : playerInfo.goals_insidebox_save}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.goals_insidebox_save/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Goals Dispossessed</span>
                                <span>{playerInfo.goals_dispossessed==0 ? '0' : playerInfo.goals_dispossessed}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.goals_dispossessed/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Goals Concade</span>
                                <span>{playerInfo.goals_concade=='' ? '0' : playerInfo.goals_concade}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.goals_concade/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Own Goal</span>
                                <span>{playerInfo.own_goal=='' ? '0' : playerInfo.own_goal}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.own_goal/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Assist</span>
                                <span>{playerInfo.assist=='' ? '0' : playerInfo.assist}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.assist/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Cleansheet</span>
                                <span>{playerInfo.cleansheet=='' ? '0' : playerInfo.cleansheet}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.cleansheet/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Interception</span>
                                <span>{playerInfo.interception=='' ? '0' : playerInfo.interception}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.interception/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Yellow Card</span>
                                <span>{playerInfo.yellow_card=='' ? '0' : playerInfo.yellow_card}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.yellow_card/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Yellow Red</span>
                                <span>{playerInfo.yellow_red=='' ? '0' : playerInfo.yellow_red}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.yellow_red/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Red Card</span>
                                <span>{playerInfo.red_card=='' ? '0' : playerInfo.red_card}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.red_card/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Tackles</span>
                                <span>{playerInfo.tackles=='' ? '0' : playerInfo.tackles}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.tackles/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Blocks</span>
                                <span>{playerInfo.blocks=='' ? '0' : playerInfo.blocks}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.blocks/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Hit Post</span>
                                <span>{playerInfo.hit_post=='' ? '0' : playerInfo.hit_post}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.hit_post/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Foul Commited</span>
                                <span>{playerInfo.foul_commited=='' ? '0' : playerInfo.foul_commited}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.foul_commited/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Foul Drawn</span>
                                <span>{playerInfo.foul_drawn=='' ? '0' : playerInfo.foul_drawn}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.foul_drawn/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Cross Total</span>
                                <span>{playerInfo.cross_total=='' ? '0' : playerInfo.cross_total}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.cross_total/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Crosses Accurate</span>
                                <span>{playerInfo.crosses_accurate=='' ? '0' : playerInfo.crosses_accurate}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.crosses_accurate/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Dribbles Attempts</span>
                                <span>{playerInfo.dribbles_attempts=='' ? '0' : playerInfo.dribbles_attempts}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.dribbles_attempts/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Dribbles Success</span>
                                <span>{playerInfo.dribbles_success=='' ? '0' : playerInfo.dribbles_success}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.dribbles_success/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Dribbles Past</span>
                                <span>{playerInfo.dribbles_past=='' ? '0' : playerInfo.dribbles_past}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.dribbles_past/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Duel Total</span>
                                <span>{playerInfo.duel_total=='' ? '0' : playerInfo.duel_total}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.duel_total/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Duel Won</span>
                                <span>{playerInfo.duel_own=='' ? '0' : playerInfo.duel_own}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.duel_own/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Pass Total</span>
                                <span>{playerInfo.pass_total=='' ? '0' : playerInfo.pass_total}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.pass_total/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Pass Accurate</span>
                                <span>{playerInfo.pass_accurate=='' ? '0' : playerInfo.pass_accurate}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.pass_accurate/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Pass Key Passes</span>
                                <span>{playerInfo.pass_key_passes=='' ? '0' : playerInfo.pass_key_passes}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.pass_key_passes/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Penalty Own</span>
                                <span>{playerInfo.penalty_own=='' ? '0' : playerInfo.penalty_own}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.penalty_own/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Penalty Scores</span>
                                <span>{playerInfo.penalty_scores=='' ? '0' : playerInfo.penalty_scores}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.penalty_scores/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Penalty Missed</span>
                                <span>{playerInfo.penalty_missed=='' ? '0' : playerInfo.penalty_missed}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.penalty_missed/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Penalty Missed</span>
                                <span>{playerInfo.foul_commited=='' ? '0' : playerInfo.foul_commited}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.foul_commited/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Penalty Saved</span>
                                <span>{playerInfo.penalty_saved=='' ? '0' : playerInfo.penalty_saved}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.penalty_saved/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Short Total</span>
                                <span>{playerInfo.short_total=='' ? '0' : playerInfo.short_total}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.short_total/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Short On Target</span>
                                <span>{playerInfo.short_on_target=='' ? '0' : playerInfo.short_on_target}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.short_on_target/100*100}%` }}></div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex">
                                <span className="mr-auto">Short Off Target</span>
                                <span>{playerInfo.short_off_target=='' ? '0' : playerInfo.short_off_target}</span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-purple" role="progressbar" aria-valuenow="40" 
                                aria-valuemin="0" aria-valuemax="100" style={{ 'width': `${playerInfo.short_off_target/100*100}%` }}></div>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </div>
        
        
        </div>

    )
}
export default PlayerDetailsStats;