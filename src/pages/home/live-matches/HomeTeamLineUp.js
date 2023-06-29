import React from 'react';

const HomeTeamLineUp = React.memo(({ G, D, M, A }) => {
    return (
        <div class="home" data-type="home-players">
            <div class="players-row" data-type="player-row" style={{ height: 88 }}>
                <ul class="item" data-type="player-row-content">
                    {G.map((player, key) => (
                        <li key={key} data-type="player-item">
                            <div class="player" data-type="player-data">
                                <span class="number" data-type="player-number">{player.number}</span>
                                <span class="evt evt2" data-type="player-bubble">
                                    <div class="yellow-card"></div>
                                </span>
                            </div>
                            <div class="name" data-type="player-name"><span class="notranslate">{player.player_name}</span></div>
                        </li>
                    ))}
                </ul>
            </div>
            <div class="players-row" data-type="player-row" style={{ height: 88 }}>
                <ul class="item" data-type="player-row-content">
                    {D.map((player, key) => (
                        <li key={key} data-type="player-item">
                            <div class="player" data-type="player-data">
                                <span class="number" data-type="player-number">{player.number}</span>
                                <span class="evt evt4" data-type="player-bubble">
                                    <i class="fas fa-arrow-down text-red"></i>
                                </span>
                            </div>
                            <div class="name" data-type="player-name"><span class="notranslate">{player.player_name}</span></div>
                        </li>
                    ))}
                </ul>
            </div>
            <div class="players-row" data-type="player-row" style={{ height: 88 }}>
                <ul class="item" data-type="player-row-content">
                    {M.map((player, key) => (
                        <li key={key} data-type="player-item">
                            <div class="player" data-type="player-data">
                                <span class="number" data-type="player-number">{player.number}</span>
                                <span class="evt evt4" data-type="player-bubble">
                                    <i class="fas fa-arrow-down text-red"></i>
                                </span>
                            </div>
                            <div class="name" data-type="player-name"><span class="notranslate">{player.player_name}</span></div>
                        </li>
                    ))}
                </ul>
            </div>
            <div class="players-row" data-type="player-row" style={{ height: 88 }}>
                <ul class="item" data-type="player-row-content">
                    {A.map((player, key) => (
                        <li key={key} data-type="player-item">
                            <div class="player" data-type="player-data">
                                <span class="number" data-type="player-number">{player.number}</span>
                            </div>
                            <div class="name" data-type="player-name"><span class="notranslate">{player.player_name}</span></div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
});

export default HomeTeamLineUp;