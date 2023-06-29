import React from 'react';
import { Col, Image } from 'react-bootstrap';
import AwayTeamGoals from './AwayTeamGoals';
import { isObject, has, hasIn, size } from 'lodash';
import noImage from '../../../assets/img/noimage.jpg'
import {Link} from  'react-router-dom';

const AwayTeam = React.memo(({id, awayTeam, goals, isNotPlayedYet }) => {
    return (
        <Col xs={6} className="scrR">
            {isNotPlayedYet ?  <Link to={`match/details/${id}`}><span style={{marginRight:'15px'}}>-</span></Link> : <Link to={`match/details/${id}`}><span style={{marginRight:'15px'}}>{hasIn(awayTeam, 'score') && awayTeam.score}</span></Link>}
           {awayTeam && !awayTeam.logo_path ?
            <Link to={`/team/${awayTeam.id}`}> <img src={noImage} alt="" rounded style={{
                width: '60px',
                height: '60px'
            }} /></Link>
              :
              <Link to={`/team/${awayTeam.id}`}>  {awayTeam && awayTeam.logo_path &&<Image src={awayTeam.logo_path} alt="" rounded style={{
                width: '60px',
                height: '60px'
            }} />} </Link>}
            <br />
            <h4 className="tl" >{hasIn(awayTeam, 'name') && awayTeam.name}</h4>
            {goals && size(goals) &&<AwayTeamGoals goals={goals.filter(goal => goal.team_id == awayTeam.id)}/>}
        </Col>
    );
});

export default AwayTeam;