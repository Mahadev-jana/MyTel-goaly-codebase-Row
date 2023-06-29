import React from 'react';
import { Grid, Col, Row, Image } from 'react-bootstrap';
import { hasIn, size } from 'lodash';
import HomeTeamGoals from './HomeTeamGoals';
import noImage from '../../../assets/img/noimage.jpg'
import { Link } from 'react-router-dom';


const HomeTeam = React.memo(({ id, homeTeam, goals, isNotPlayedYet }) => {

    return (
        <Col xs={6} className="scrL">
            { homeTeam && !homeTeam.logo_path ?
                <Link to={`/team/${homeTeam.id}`}><img src={noImage} alt="" rounded style={{
                    width: '30%',
                    marginRight: '15px'
                }} /> </Link>
                :
                <Link to={`/team/${homeTeam.id}`}> {homeTeam && homeTeam.logo_path && <Image src={homeTeam.logo_path} alt="" rounded style={{
                    width: '60px',
                    height: '60px'
                }} />}</Link>}
            {isNotPlayedYet ? <span style={{ marginLeft: '15px' }}>-</span> : <span style={{ marginLeft: '15px' }}>{hasIn(homeTeam, 'score') && homeTeam.score}</span>}
            <br />
            <h4 class="tl" ><span class="notranslate">{hasIn(homeTeam, 'name') && homeTeam.name}</span></h4>
            {goals && size(goals) && <Link to={`match/details/${id}`}><HomeTeamGoals goals={goals.filter(goal => goal.team_id == homeTeam.id)} /></Link>}
        </Col>
    );
});

export default HomeTeam;