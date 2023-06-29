import React from 'react';

const Goal = React.memo(({ minute, result, player_name, team_id, homeTeamId, awayTeamId }) => {
    if (team_id == homeTeamId)
        return (
            <div class="match-row">
                <div class="tm">{minute}'</div>
                <div class="pn_home oneline-text">{player_name}</div>
                <div class="sc">{result}</div>
                <div class="pn_away oneline-text">&nbsp;</div>
            </div>
        )
    if (team_id == awayTeamId)
        return (
            <div class="match-row">
                <div class="tm">{minute}'</div>
                <div class="pn_home oneline-text">&nbsp;</div>
                <div class="sc">{result}</div>
                <div class="pn_away oneline-text">{player_name}</div>
            </div>
        )
});

export default Goal;