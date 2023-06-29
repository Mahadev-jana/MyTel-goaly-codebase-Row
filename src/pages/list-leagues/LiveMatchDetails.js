import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MatchSeriesSimmer } from '../../simmer-loader';
import { isArray } from 'lodash';
import { post } from '../../api';
import './style.css';
import MatchFilter from './MatchFilter';
import MatchSummery from './MatchSummery';

const LiveMatchDetails = (props) => {
    const [matches, setMatches] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [noresult, setnoresult] = React.useState(false);

    const [type, setType] = React.useState(null);

    React.useEffect(() => {
        setType('tomorrow');
        getMatches();
    }, [props.id]);

    const filter = filterType => {
        if (type === filterType) {
            setType(null);
            getMatches();
        } else {
            setType(filterType);
            getMatches(filterType);
        }
    }

    const getMatches = (filterType = null) => {
        setLoading(true);
        const payload = new FormData();
        if (props.id != 'ALL') {
            payload.append('comp_id', props.id);
        }
        if (filterType == null) {
            if (type !== null)
                payload.append('type', type);
        } else {
            payload.append('type', filterType);
        }

        post('matchByLeague', payload)
            .then(res => {
                if (res.data && res.data.success && res.data.success == 1) {
                    if (res.data.matches && isArray(res.data.matches)) {
                        setMatches(res.data.matches);
                        setnoresult(false);
                        setLoading(false);
                    }
                } else {
                    setMatches([]);
                    setLoading(false);
                    setnoresult(true);
                }
            })
            .catch(err => console.log(err));
    }

    const { title } = props;
    
    return (
        <div>
            <MatchFilter type={type} filter={filter} />
            {loading && <MatchSeriesSimmer />}
            {!loading && <div className="part" style={{ marginTop: '20px' }}>
                <div className="series-title">{title.length > 15 ? title.slice(0, 15) + '...' : title}</div>
                <Link to={`/standing/${props.id}`} className="stand btn btn-default chk2">
                    <i className="fas fa-table"></i>&nbsp; Standing
                    </Link>
                <div className="col-xs-12 mt-10">
                    <div className="lm">
                        <table className="table table-striped custab">
                            <thead>
                                <tr>
                                    <th><strong>Matches</strong></th>
                                    <th></th>
                                </tr>
                            </thead>
                            {noresult && <tbody>
                                <tr>
                                    <td colSpan="2"
                                        style={{
                                            fontSize: '18px',
                                            color: 'rgb(171, 171, 171)',
                                            letterSpacing: '1px',
                                            fontWeight: 600,
                                            padding: '50px 0',
                                            textAlign: 'center'
                                        }}>
                                        <div>Oops!</div>
                                        <div>Match not found!!</div>
                                    </td>
                                </tr>
                            </tbody>}
                            <tbody>
                                {matches.map((match, key) => (
                                    <React.Fragment key={key}>
                                        <MatchSummery {...match} />
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>}
        </div>
    );
};

export default withRouter(LiveMatchDetails);
