import React from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import { Row } from 'react-bootstrap';
import { hasIn } from 'lodash';
import HomeTeam from './HomeTeam';
import AwayTeam from './AwayTeam';
import { Link } from 'react-router-dom';


const MatchSummery = React.memo(({ id, date_time, venue, status, homeTeam, awayTeam, goals }) => {

    return (

        <React.Fragment>
            <h5 class="text-center" style={{ color: 'black', fontWeight: 'bold' }}>
                <Moment format="DD/MM/YYYY - HH:mm">{utcToLocal(date_time)}</Moment>
            </h5>
            {hasIn(venue, 'name') && <h5 class="text-center text-grey">Stadium:  {venue.name}</h5>}
            {status && <h5 class="text-center text-blue">{status != 'NS' && status}</h5>}
            <Row>
                <HomeTeam homeTeam={homeTeam} goals={goals} isNotPlayedYet={status == 'NS'} id={id} />
                <AwayTeam awayTeam={awayTeam} goals={goals} isNotPlayedYet={status == 'NS'} id={id} />
            </Row>
            <div className="text-center" >
                <Link to={`/match/details/${id}`} className="btn btn-who" >Details</Link>
            </div>
        </React.Fragment>
    );
});

export default MatchSummery;

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}