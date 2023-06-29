import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { LeagueSimmer,FollowSimmer } from '../../simmer-loader/index';
import {isAuthenticate, getUserDetails} from '../../_helper/authentication';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import axios from '../../_config/axios';
import ClubInfo from './ClubInfo';
import ClubMatch from './ClubMatch';
import ClubPlayer from './ClubPlayer';
import ClubStandings from './ClubStandings';
import League from '../../assetsStaging/img/ic-epl.png';
import Country from '../../assetsStaging/img/flag-england.png';

import './index.css';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

const ClubInformation = (props) => {
    //console.log(props)
    const [tab, setTab] = useState('info');

    const [clubDetail, setClubDetails] = useState([]);
    const [nextGame, setNextGame] = useState([]);
    const [prevGame, setPrevGame] = useState([]);
    const [loading, setLoading] = useState(true);

    const [season, setSeason] = useState([]);
    const [loadingSeason, setLoadingseason] = useState(true);

    const [matches, setMatches] = useState([]);
    const [loadingMatch, setLoadingMatch] = useState(true);

    const [goalkeepers, setGoalkeepers] = useState([]);
    const [defenders, setDefenders] = useState([]);
    const [attackers, setAttackers] = useState([]);
    const [midfilders, setMidfilders] = useState([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);

    const [standings, setStandings] = useState([]);
    const [loadingStandings, setLoadingStandings] = useState(true);

    const [trophy, setTrophy] = useState([]);
    const [loadingTrophy, setLoadingTrophy] = useState(true);

    const [topGoal, setTopGoal] = useState([]);
    const [topYellowcard, setTopYellowcard] = useState([]);
    const [topRedcard, setTopRedcard] = useState([]);
    const [topAssists, setTopAssists] = useState([]);
    const [loadingTopPlayers, setLoadingTopPlayers] = useState(false);

    const [compId, setCompId] = useState('')
    const [teamId,setTeamId]=useState(props.match.params.id);
    // const [teamId,setTeamId]=useState(props.location.state.teamId);

    //follow-unfollow
    const [clubs,setClubs] = useState([]);
    const [loadingClubs,setLoadingClubs] = useState(false);
    const [buttonText,setButtonText]=useState(null)

    useEffect(() => {
        // console.log(props.match.params.id,'props.match.params.id');
        setTeamId(props.match.params.id)
        if(isAuthenticate()){
            clubsLeaguesFavteamsDetails();
        }
        
        
        // clubSeasonDetails();
        clubDetailsBasic();
        clubNextPrevGame();
        playersMatch();
        // clubPlayersDetails();
        clubStandingDetails();
        clubTrophyDetails();
        clubTopPlayersDetails();
    }, [])
    const clubIdChange = async(id) =>{
        // alert(id)
        if(isAuthenticate()){
        clubsLeaguesFavteamsDetailsOwn();
        clubDetailsBasicOwn(id);
        clubNextPrevGameOwn(id);
        playersMatchOwn(id);
        // clubPlayersDetailsOwn(id);
        clubStandingDetailsOwn(id);
        clubTrophyDetailsOwn(id);
        clubTopPlayersDetailsOwn(id);
        }
        else{
            clubDetailsBasicOwn(id);
            clubNextPrevGameOwn(id);
            playersMatchOwn(id);
            // clubPlayersDetailsOwn(id);
            clubStandingDetailsOwn(id);
            clubTrophyDetailsOwn(id);
            clubTopPlayersDetailsOwn(id);
        }
        
    }

    const clubsLeaguesFavteamsDetails=()=>{
        setLoadingClubs(true);
        let userId=getUserDetails().id;
        const payload = new FormData();
        payload.append('user_id',userId);
        axios.post('/api/clubTeam',payload)
            .then(res=>{
                if (res.data && res.data.success && res.data.success == 1) {
                    // SetmyTeam(res.data.favteams);
                    setClubs(res.data.favteams)
                    setLoadingClubs(false);
                    // if(!loadingClubs){
                        let clubIsfollowed=res.data.favteams.some(club=>club.id==teamId)
                        // console.log(clubIsfollowed)
                        setButtonText(clubIsfollowed)
                    // }
            }

        })
        .catch(err=>{
            console.log(err);

        })
    }

    const addFavTeam = () => {
        // alert('addfavteam')
        // console.log(clubs);
        let teamDetails=[];
        teamDetails=clubs;
        // console.log(teamDetails);
        let team = {
            id: teamId,
            "name": clubDetail.team_city,
            "badge": clubDetail.team_logo,
            "status": 'not selected',
        }
        // console.log(team);
        teamDetails.push(team);
        // console.log(teamDetails);

        let userId=getUserDetails().id;
        const payload = new FormData();
        payload.append('user_id',userId);
        payload.append('clubs',JSON.stringify(teamDetails));
        axios.post('/api/UserFavouriteTeam',payload)
            .then(res=>{
                // console.log(res.data)
                if (res.data && res.data.success && res.data.success == 1) {
                    // SetmyTeam(res.data.favteams);
                    // setClubs(res.data.favteams)
                    // setLoadingClubs(false)
                    setButtonText(true)
            }

        })
        .catch(err=>{
            console.log(err);

        })
    }

    const deleteFavTeam = () => {
        let userId=getUserDetails().id;
        const payload = new FormData();
        payload.append('id',teamId);
        payload.append('user_id',userId);
        axios.post('/StageGoalyApi/removefavteam',payload)
            .then(res=>{
                // console.log(res.data)
                if (res.data && res.data.success && res.data.success == 1) {
                    // SetmyTeam(res.data.favteams);
                    // setClubs(res.data.favteams)
                    // setLoadingClubs(false)
                    setButtonText(false)
            }

        })
        .catch(err=>{
            console.log(err);

        })
    }

    const loginToFollow = () =>{
        Swal.fire({
            type: 'error',
            title: 'Login first to add your favorite clubs!!',
            confirmButtonText: 'Login',
            showCancelButton: true,
        }).then(result => {
            if (result.value) {
                props.history.push('/login');
            }
            else{

            }
        });
    }

    const clubDetailsBasic = () => {
        // const teamId = props.location.state.teamId;
        const payload = new FormData();
        payload.append('club_id', teamId);
        axios.post('/StageGoalyApi/clubDetails', payload)
            .then(res => {
                if (res.data && res.data.success && res.data.error === 0) {
                    // console.log(res.data.team_details,'clubDetails api');
                    // alert('jnbsvjgnj')
                    setClubDetails(res.data.team_details)
                    setCompId(res.data.team_details.comp_id)
                    setLoading(false)
                    // alert(res.data.team_details.season_id)
                    if (res.data.team_details.season_id.length>0) {
                        // alert('jnbsvjgnj')
                        clubSeasonDetails(res.data.team_details.season_id);
                        clubPlayersDetails(res.data.team_details.season_id);
                    }


                }
                if (res.data && res.data.success === 0 && res.data.error === 1) {
                    // setPlayerClubHistory(res.data.transfer_data)
                    // setLoadingPlayerClubHistory(false)
                }
                if (res.data && res.data.success === 0 && res.data.error === 1 && res.data.code === 400) {
                    setClubDetails(res.data)
                    setLoading(false)
                    // console.log(res)
                    if (res.data.season_id !== '') {
                        clubSeasonDetails(res.data.team_details.season_id);
                    }

                }

            })
            .catch(err => {
                console.log(err);
            })
    }

    const clubNextPrevGame = () => {
        // const teamId = props.location.state.teamId;
        const payload = new FormData();
        payload.append('club_id', teamId);
        axios.post('/StageGoalyApi/clubLastAndPreMatch', payload)
            .then(res => {
                //console.log(res)
                if (res.data && res.data.success && res.data.error === 0) {
                    // console.log(res.data.team_details,'clubDetails api');
                    // filter duplicate array
                    var filteruniquebyMatchID = res.data.past_matches.filter(
                        (v, i, a) => a.findIndex(t => t.match_id === v.match_id) === i
                    );
                    // console.log(res.data.past_matches)
                    // console.log(filteruniquebyMatchID)
                    setNextGame(res.data.future_matches)
                    setPrevGame(filteruniquebyMatchID)
                    setLoading(false)
                     //console.log(res.data.season_id)
                    if (res.data.season_id !== '') {
                        clubSeasonDetails(res.data.team_details.season_id);
                    }


                }
                if (res.data && res.data.success === 0 && res.data.error === 1) {
                    // setPlayerClubHistory(res.data.transfer_data)
                    // setLoadingPlayerClubHistory(false)
                }
                if (res.data && res.data.success === 0 && res.data.error === 1 && res.data.code === 400) {
                    setNextGame(res.data.future_matches)
                    setPrevGame(res.data.past_matches)
                    // console.log(res)
                    if (res.data.season_id !== '') {
                        clubSeasonDetails(res.data.team_details.season_id);
                    }

                }

            })
            .catch(err => {
                console.log(err);
            })
    }

    const clubSeasonDetails = (seasonId) => {
        // alert(seasonId,'bjfjndj')
        // const teamId = props.location.state.teamId;
        const payload = new FormData();
        payload.append('club_id', teamId);
        payload.append('season_id', seasonId);
        axios.post('/StageGoalyApi/clubSeasonInfo', payload)
            .then(res => {
                // console.log(res.data);
                if (res.data && res.data.success && res.data.error === 0 && res.data.code === 200) {
                    // console.log(res.data);
                    setSeason(res.data.season_info)

                    setLoadingseason(false)

                }
                if (res.data && res.data.success === 0 && res.data.error === 1 && res.data.code === 400) {
                    // console.log(res.data);
                    setSeason(res.data.season_info)

                    setLoadingseason(false)

                }


            })
            .catch(err => {
                console.log(err);
            })
    }

    const playersMatch = () => {
        const teamId = props.match.params.id;
        const payload = new FormData();
        payload.append('club_id', teamId);
        axios.post('/StageGoalyApi/clubMatches', payload)
            .then(res => {
                if (res.data.error === 0 && res.data.success === 1) {
                    // alert('')
                    // console.log(res.data.matches,'clubMatches api')
                    setMatches(res.data.matches);
                    setLoadingMatch(false);
                }
                if (res.data.error === 1 && res.data.success === 0) {
                    // console.log(res.data)
                    setMatches(res.data.matches);
                    setLoadingMatch(false);
                }


            })
            .catch(err => {
                console.log(err)
            })



    }
    const playersMatchFromMatchPage = (id) => {
        const teamId = id;
        const payload = new FormData();
        payload.append('club_id', teamId);
        axios.post('/StageGoalyApi/clubMatches', payload)
            .then(res => {
                if (res.data.error === 0 && res.data.success === 1) {
                    // alert('')
                    console.log(res.data.matches,'clubMatches api')
                    setMatches(res.data.matches);
                    setLoadingMatch(false);
                }
                if (res.data.error === 1 && res.data.success === 0) {
                    // console.log(res.data)
                    setMatches(res.data.matches);
                    setLoadingMatch(false);
                }


            })
            .catch(err => {
                console.log(err)
            })



    }

    const clubPlayersDetails = (seasonId) => {
        const teamId = props.match.params.id;
        const payload = new FormData();
        payload.append('club_id', teamId);
        payload.append('season_id', seasonId);
        axios.post('/StageGoalyApi/clubPlayers', payload)
            .then(res => {
                //console.log(res.data);
                if (res.data && res.data.success && res.data.error === 0 && res.data.code === 200) {
                    //console.log(res.data.Attackers);
                    // console.log(res.data.Defender);
                     //console.log(res.data.Goal_keeper);
                     //console.log(res.data.Midfielders);
                    setGoalkeepers(res.data.Goal_keeper);
                    setDefenders(res.data.Defender);
                    setAttackers(res.data.Attackers);
                    setMidfilders(res.data.Midfielders);
                    setLoadingPlayers(false)

                }


            })
            .catch(err => {
                console.log(err);
            })
    }
    
    const clubStandingDetails = (seasonId) => {
        const teamId = props.match.params.id;
        const payload = new FormData();
        payload.append('club_id', teamId);
        axios.post('/StageGoalyApi/clubStanding', payload)
            .then(res => {
                 //console.log(res);
                //if (res.data && res.data.success && res.data.status) {
                if (res.data && res.data.success) {    
                    
                    //console.log(res.data.standing[0].data);
                    setStandings(res.data.standing[0].data);
                    setLoadingStandings(false)

                }
                if (res.data && res.data.success === 0) {
                    setStandings([]);
                    setLoadingStandings(false)
                }


            })
            .catch(err => {
                console.log(err);
            })
    }

    const clubTrophyDetails = () => {
        const teamId = props.match.params.id;
        const payload = new FormData();
        payload.append('club_id', teamId);
        axios.post('/StageGoalyApi/clubTrophies', payload)
            .then(res => {
                // console.log(res.data);
                if (res.data && res.data.success && res.data.error === 0) {
                    // console.log(res.data.trophies);
                    setTrophy(res.data.trophies);
                    setLoadingTrophy(false)

                }
                if (res.data && res.data.success === 0) {
                    setTrophy([]);
                    setLoadingTrophy(false)
                }


            })
            .catch(err => {
                console.log(err);
            })
    }

    const clubTopPlayersDetails = (seasonId) => {
        setLoadingTopPlayers(true)
        const teamId = props.match.params.id;
        const payload = new FormData();
        payload.append('club_id', teamId);
        axios.post('/StageGoalyApi/clubTopPlayers', payload)
            .then(res => {
                // console.log(res.data);
                if (res.data && res.data.success && res.data.error === 0) {
                    // console.log(res.data.goals);
                    // console.log(res.data.yellowcards);
                    // console.log(res.data.redcards);
                    // console.log(res.data.assists);
                    setTopGoal(res.data.goals);
                    setTopYellowcard(res.data.yellowcards);
                    setTopRedcard(res.data.redcards);
                    setTopAssists(res.data.assists);
                    setLoadingTopPlayers(false)

                }
                else{
                    setTopGoal([]);
                    setTopYellowcard([]);
                    setTopRedcard([]);
                    setTopAssists([]);
                    setLoadingTopPlayers(false)
                }


            })
            .catch(err => {
                console.log(err);
            })
    }



    //from club details page to club details page
    const clubDetailsBasicOwn = (id) => {
        setLoading(true)
        // const teamId = props.location.state.teamId;
        const payload = new FormData();
        payload.append('club_id', id);
        axios.post('/StageGoalyApi/clubDetails', payload)
            .then(res => {
                if (res.data && res.data.success && res.data.error === 0) {
                    // console.log(res.data.team_details,'clubDetails api');
                    setClubDetails(res.data.team_details)
                    setCompId(res.data.team_details.comp_id)
                    setLoading(false)
                    // console.log(res.data.season_id)
                    if (res.data.season_id !== '') {
                        clubSeasonDetails(res.data.team_details.season_id);
                        clubPlayersDetailsOwn(id,res.data.team_details.season_id)
                    }


                }
                if (res.data && res.data.success === 0 && res.data.error === 1) {
                    // setPlayerClubHistory(res.data.transfer_data)
                    // setLoadingPlayerClubHistory(false)
                }
                if (res.data && res.data.success === 0 && res.data.error === 1 && res.data.code === 400) {
                    setClubDetails(res.data)
                    setLoading(false)
                    // console.log(res)
                    if (res.data.season_id !== '') {
                        clubSeasonDetails(res.data.team_details.season_id);
                    }

                }

            })
            .catch(err => {
                console.log(err);
            })
    }
    const clubNextPrevGameOwn = (id) => {
        setLoading(true)
        // const teamId = props.location.state.teamId;
        const payload = new FormData();
        payload.append('club_id', id);
        axios.post('/StageGoalyApi/clubLastAndPreMatch', payload)
            .then(res => {
                if (res.data && res.data.success && res.data.error === 0) {
                    // console.log(res.data.team_details,'clubDetails api');
                    var filteruniquebyMatchID = res.data.past_matches.filter(
                        (v, i, a) => a.findIndex(t => t.match_id === v.match_id) === i
                    );
                    setNextGame(res.data.future_matches)
                    setPrevGame(filteruniquebyMatchID)
                    setLoading(false)
                    // console.log(res.data.season_id)
                    if (res.data.season_id !== '') {
                        clubSeasonDetails(res.data.team_details.season_id);
                    }


                }
                if (res.data && res.data.success === 0 && res.data.error === 1) {
                    // setPlayerClubHistory(res.data.transfer_data)
                    // setLoadingPlayerClubHistory(false)
                }
                if (res.data && res.data.success === 0 && res.data.error === 1 && res.data.code === 400) {
                    setNextGame(res.data.future_matches)
                    setPrevGame(res.data.past_matches)
                    // console.log(res)
                    if (res.data.season_id !== '') {
                        clubSeasonDetails(res.data.team_details.season_id);
                    }

                }

            })
            .catch(err => {
                console.log(err);
            })
    }
    const playersMatchOwn = (id) => {
        setLoadingMatch(true);
        // const teamId = props.match.params.id;
        const payload = new FormData();
        payload.append('club_id', id);
        axios.post('/StageGoalyApi/clubMatches', payload)
            .then(res => {
                if (res.data.error === 0 && res.data.success === 1) {
                    // alert('')
                    // console.log(res.data.matches,'clubMatches api')
                    setMatches(res.data.matches);
                    setLoadingMatch(false);
                }
                if (res.data.error === 1 && res.data.success === 0) {
                    // console.log(res.data)
                    setMatches(res.data.matches);
                    setLoadingMatch(false);
                }


            })
            .catch(err => {
                console.log(err)
            })



    }
    const clubPlayersDetailsOwn = (clubId,seasonId) => {
        setLoadingPlayers(true)
        // const teamId = props.match.params.id;
        const payload = new FormData();
        payload.append('club_id', clubId);
        payload.append('season_id', seasonId);
        axios.post('/StageGoalyApi/clubPlayers', payload)
            .then(res => {
                // console.log(res.data);
                if (res.data && res.data.success && res.data.error === 0 && res.data.code === 200) {
                    // console.log(res.data.Attackers);
                    // console.log(res.data.Defender);
                    // console.log(res.data.Goal_keeper);
                    // console.log(res.data.Midfielders);
                    setGoalkeepers(res.data.Goal_keeper);
                    setDefenders(res.data.Defender);
                    setAttackers(res.data.Attackers);
                    setMidfilders(res.data.Midfielders);
                    setLoadingPlayers(false)

                }


            })
            .catch(err => {
                console.log(err);
            })
    }
    const clubStandingDetailsOwn = (id) => {
        setLoadingStandings(true)
        // const teamId = props.match.params.id;
        const payload = new FormData();
        payload.append('club_id', id);
        axios.post('/StageGoalyApi/clubStanding', payload)
            .then(res => {
                // console.log(res.data);
                if (res.data && res.data.success && res.data.status === 0) {
                    // console.log(res.data.standing[0].data);
                    setStandings(res.data.standing[0].data);
                    setLoadingStandings(false)

                }
                if (res.data && res.data.success === 0) {
                    setStandings([]);
                    setLoadingStandings(false)
                }


            })
            .catch(err => {
                console.log(err);
            })
    }


    const clubTrophyDetailsOwn = (id) => {
        setLoadingTrophy(true)
        // const teamId = props.match.params.id;
        const payload = new FormData();
        payload.append('club_id', id);
        axios.post('/StageGoalyApi/clubTrophies', payload)
            .then(res => {
                // console.log(res.data);
                if (res.data && res.data.success && res.data.error === 0) {
                    // console.log(res.data.trophies);
                    setTrophy(res.data.trophies);
                    setLoadingTrophy(false)

                }
                if (res.data && res.data.success === 0) {
                    setTrophy([]);
                    setLoadingTrophy(false)
                }


            })
            .catch(err => {
                console.log(err);
            })
    }

    const clubTopPlayersDetailsOwn = (id) => {
        setLoadingTopPlayers(true)
        // const teamId = props.match.params.id;
        const payload = new FormData();
        payload.append('club_id', id);
        axios.post('/StageGoalyApi/clubTopPlayers', payload)
            .then(res => {
                // console.log(res.data);
                if (res.data && res.data.success && res.data.error === 0) {
                    // console.log(res.data.goals);
                    // console.log(res.data.yellowcards);
                    // console.log(res.data.redcards);
                    // console.log(res.data.assists);
                    setTopGoal(res.data.goals);
                    setTopYellowcard(res.data.yellowcards);
                    setTopRedcard(res.data.redcards);
                    setTopAssists(res.data.assists);
                    setLoadingTopPlayers(false)

                }
                else{
                    setTopGoal([]);
                    setTopYellowcard([]);
                    setTopRedcard([]);
                    setTopAssists([]);
                    setLoadingTopPlayers(false)
                }


            })
            .catch(err => {
                console.log(err);
            })
    }

    const clubsLeaguesFavteamsDetailsOwn=()=>{
        // alert('vhvahj')
        setLoadingClubs(true);
        let userId=getUserDetails().id;
        const payload = new FormData();
        payload.append('user_id',userId);
        axios.post('/api/clubTeam',payload)
            .then(res=>{
                if (res.data && res.data.success && res.data.success == 1) {
                    // SetmyTeam(res.data.favteams);
                    setClubs(res.data.favteams)
                    setLoadingClubs(false);
                    // if(!loadingClubs){
                        let clubIsfollowed=res.data.favteams.some(club=>club.id==id)
                        // console.log(clubIsfollowed)
                        setButtonText(clubIsfollowed)
                    // }
            }

        })
        .catch(err=>{
            console.log(err);

        })
    }

    // console.log(props.location.state.teamId)
    // console.log(clubDetail)
    // console.log(teamId)
    // console.log(clubs)
    // console.log(props.location.state.compId)
    
    

    return (
        <React.Fragment>
            <div className="club-cover row">
                {loading ?
                    <LeagueSimmer />
                    :
                    <div className="club-cover-mask">
                        <div className="inner-club-cover">
                            <div className="club-logo"><img className="img-fluid" src={clubDetail.team_logo} alt="" /></div>
                            <div className="line bg-purple text-white">
                                <div className="box">
                                    <h5>Venue :</h5>
                                    <span>{clubDetail.team_venuename}</span>
                                </div>
                                <div className="box">
                                    <h5>City :</h5>
                                    <span>{clubDetail.team_city}</span>
                                </div>
                            </div>
                            <div className="line bg-white">
                                <div className="box">
                                    <h5>League :</h5>
                                    <span><span class="notranslate">{clubDetail.team_league}</span> <img src={clubDetail.league_logo} alt="" /></span>
                                </div>
                                <div className="box">
                                    <h5>Country :</h5>
                                    <span><span class="notranslate">{clubDetail.team_country}</span> <img src={clubDetail.country_logo} alt="" /></span>
                                </div>
                            </div>
                            {loadingClubs && <div style={{padding:'20px'}}> <FollowSimmer /> </div>}
                            {!loadingClubs && buttonText && isAuthenticate() && <button className="btn btn-lg" onClick={deleteFavTeam}>Unfollow</button>}
                            {!loadingClubs && !buttonText && isAuthenticate() && <button className="btn btn-lg" onClick={addFavTeam}>Follow</button>}
                        
                            {!isAuthenticate() && <button className="btn btn-lg" onClick={loginToFollow}>Follow</button>}
                        </div>
                    </div>

                }

            </div>
            <ul className="club-menu bg-purple">
                <li className={tab === 'info' ? 'active' : ''} onClick={() => setTab('info')}><a>
                { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?
                   <span class="notranslate">အချက်အလက်</span>
                   :
                  <span>Info</span>
                }
                </a></li>
                <li className={tab === 'match' ? 'active' : ''} onClick={() => setTab('match')}><a>
                { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?
                   <span class="notranslate">ပွဲစဉ်များ</span>
                   :
                  <span>Match</span>
                }

                </a></li>
                <li className={tab === 'player' ? 'active' : ''} onClick={() => setTab('player')}><a>
                { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?
                   <span class="notranslate">ကစားသမား</span>
                   :
                  <span>Player</span>
                }
                </a></li>
                <li className={tab === 'standings' ? 'active' : ''} onClick={() => setTab('standings')}><a>Standings</a></li>
            </ul>
            {tab === 'info' && <ClubInfo
                compId={compId}
                clubIdChange={clubIdChange}
                seasonName={clubDetail.season_name}
                season={season} loadingSeason={loadingSeason}
                nextGame={nextGame} prevGame={prevGame} loading={loading}
                trophy={trophy} loadingTrophy={loadingTrophy}
                topGoal={topGoal} topYellowcard={topYellowcard} topRedcard={topRedcard} topAssists={topAssists} loadingTopPlayers={loadingTopPlayers}
                />}
            {tab === 'match' && <ClubMatch
                clubIdChange={clubIdChange}
                clubDetail={clubDetail}
                matches={matches} loadingMatch={loadingMatch}
            />}
            {tab === 'player' && <ClubPlayer
                goalkeepers={goalkeepers}
                defenders={defenders}
                attackers={attackers}
                midfilders={midfilders}
                loadingPlayers={loadingPlayers}
                // compId={props.location.state.compId}
            />}
            {tab === 'standings' && <ClubStandings
                standings={standings}
                loadingStandings={loadingStandings}
            />}
        </React.Fragment>
    )
}
export default withRouter(ClubInformation);