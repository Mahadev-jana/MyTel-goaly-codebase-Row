import React from 'react';

const HomeTeamGoals = React.memo(({ goals }) => {
    return (
        <p class="text-right text-small text-grey mr-10">
            {goals.map((goal, key) => (
                <React.Fragment key={key}>{`${goal.player_name} (${goal.minute})`}<br /></React.Fragment>
            ))}
		</p>
    )
});

export default HomeTeamGoals;