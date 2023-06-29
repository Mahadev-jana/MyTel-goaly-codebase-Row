import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import 'swiper/dist/css/swiper.min.css';
import MenuCategory from '../../components/menu-category';
import { post } from '../../api';
import { ItemSliderSimmer } from '../../simmer-loader';
import Summary from './summary';
class MatchDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchDetails: {}
        }
    }
    componentDidMount() {
        this.getPredictionList()
    }
    getPredictionList = () => {
        const payload = new FormData();
        payload.append('id', this.props.match.params.id);
        post('matchlist', payload)
        .then(res => {
            //console.log(res.data.matches.match[0]);
            const matchDetails = res.data.matches.match[0];
            this.setState({ matchDetails});
        })
        .catch(err=>console.log(err));
    }
    render() {
        const { matchDetails } = this.state;
        return(
            <div className="page-content mt-10">
                <MenuCategory />
                <div className="col-xs-12 lm ct" style={{marginBottom: '-9px'}}>
                    <div>
                        <div className="series">
                            <div className="series-title">{matchDetails.hasOwnProperty('competition') && matchDetails.competition.name}</div>
                            {matchDetails.hasOwnProperty('type') && matchDetails.type === 'current' &&
                            <span className="blink" 
                                style={{
                                    float: 'right',
                                    marginTop: '9px',
                                    letterSpacing: '1px'
                                }}> Live!</span>}
                        </div>
                        <div className="match-details">
                            <div>{matchDetails.hasOwnProperty('started') && matchDetails.started}</div>
                            {matchDetails && matchDetails.venue.name && <div>Stadium: {matchDetails.hasOwnProperty('venue') && matchDetails.venue.name}</div>}
                            {matchDetails && matchDetails.referee &&  <div>Referee: {matchDetails.hasOwnProperty('referee') && matchDetails.referee}</div>}
                            {matchDetails && matchDetails.referee &&  <div>Referee: {matchDetails.hasOwnProperty('referee') && matchDetails.referee}</div>}

                            {/* <h3>FT</h3> */}
                        </div>
                        <div className="row score-details">
                            <div className="col-xs-4" style={{textAlign: 'left'}}>
                                {matchDetails.hasOwnProperty('awayTeam') && <img className="badge-image" src={matchDetails.awayTeam.badge} />}
                            </div>
                            <div className="col-xs-4">
                                <div style={{
                                    height: '80px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '40px',
                                    fontWeight: 'bold'
                                }}>{matchDetails.hasOwnProperty('awayTeam') && matchDetails.awayTeam.score} - {matchDetails.hasOwnProperty('homeTeam') && matchDetails.homeTeam.score}</div>
                            </div>
                            <div className="col-xs-4" style={{textAlign: 'right'}}>
                                {matchDetails.hasOwnProperty('homeTeam') && <img className="badge-image" src={matchDetails.homeTeam.badge} />}
                            </div>
                        </div>
                        <div className="clearfix">&nbsp;</div>
                    </div>
                    
                </div>
                <Summary matchId={this.props.match.params.id}/>
            </div>
        );
    }
};

export default withRouter(MatchDetails);

const ScorePredictionSlider = (props) => {
    const params = {
        slidesPerView: 2,
        spaceBetween: 10,
    };  
    const { data } = props;
    if(data.length)
        return( 
            <Swiper {...params}>
                {data && data.map((value, key)=>(
                    <div key={key}>
                        <Slide match={value}/>
                    </div>
                ))}
            </Swiper>        
        );
    return(<ItemSliderSimmer />);
};

const Slide = ({match}) => (
    <Link to={`score-preiction/${match.id}`} className="link display-block">
        <div className="thumb">
            <div className="cover-bg" style={{background: `url(${match.warbanner}) center`, backgroundSize: 'cover'}}>
            </div>
            <div className="thumb-meta">
                <p>{match.team1} VS {match.team2}</p>
            </div>
        </div>
    </Link>
);
