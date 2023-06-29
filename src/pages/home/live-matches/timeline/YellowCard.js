import React from 'react';

const YellowCard = React.memo(({ minute, player_name, team_id, homeTeamId, awayTeamId }) => {
    if (team_id == homeTeamId)
        return (
            <div class="match-row">
                <div class="tm">{minute}'</div>
                <div class="pn_home oneline-text">{player_name}</div>
                <div class="sc"> <span class="card-yellow"></span> </div>
                <div class="pn_away oneline-text">&nbsp;</div>
            </div>)
    if (team_id == awayTeamId)
        return (
            <div class="match-row">
                <div class="tm">{minute}'</div>
                <div class="pn_home oneline-text">&nbsp;</div>
                <div class="sc"> <span class="card-yellow"></span> </div>
                <div class="pn_away oneline-text">{player_name}</div>
            </div>)
});

export default YellowCard;