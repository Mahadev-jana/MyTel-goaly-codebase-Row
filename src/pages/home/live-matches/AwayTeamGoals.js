import React from 'react';

const AwayTeamGoals = React.memo(({ goals }) => {
    return (
        <p class="text-small text-grey ml-10">
            {goals.map((goal, key) => (
                <React.Fragment key={key}>{`${goal.player_name} (${goal.minute})`}<br /></React.Fragment>
            ))}
		</p>
    )
});

export default AwayTeamGoals;