import React from 'react';
import { Link } from 'react-router-dom';
import matchBanner from '../../assets/img/match-banner.png';
import imgMissingLogo from '../../assets/img/missing_photo.png';

const SlideItem = ({ awayTeam, awayTeamBadge, homeTeam, homeTeamBadge, matchId, matchStarted }) => {
    return (
        <Link to={`match/details/${matchId}`} className="link display-block">
            <div className="thumb">
                <span style={{
                    position: 'absolute',
                    background: 'rgba(77, 0, 83, 0.7)',
                    color: 'rgb(255, 255, 255)',
                    fontSize: '11px',
                    padding: '1px 3px'
                }}>{matchStarted}</span>
                <div className="cover-bg" style={{ background: `url(${matchBanner}) center`, backgroundSize: 'cover' }}>
                    <div style={{
                        height: '60px',
                        width: '60px',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        margin: 'auto'
                    }}>
                        <img src={homeTeamBadge ? homeTeamBadge : imgMissingLogo} height="100%" width="100%" />
                    </div>
                    <div style={{
                        height: '60px',
                        width: '60px',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        margin: 'auto'
                    }}>
                        <img src={awayTeamBadge ? awayTeamBadge : imgMissingLogo} height="100%" width="100%" />
                    </div>
                </div>
                <div className="thumb-meta">
                    <p>{homeTeam} VS {awayTeam}</p>
                </div>
            </div>
        </Link>
    );
};

export default SlideItem;