import React, { Suspense } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import AuthRoute from '../components/AuthRoute';
import Template from '../template/Template';

const Home = React.lazy(() => import('./home'));
// const Contest = React.lazy(() => import('./contest/index'));
const Matches = React.lazy(() => import('./matches'));
const Reward = React.lazy(() => import('./reward'));
const FrequentlyAskedQuestions = React.lazy(() => import('./faq'));
const News = React.lazy(() => import('./news'));
// const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./register'));
const ScorePrediction = React.lazy(() => import('./score-prediction'));
const MatchDetails = React.lazy(() => import('./match-details'));
// const LiveMatches = React.lazy(() => import('./live-matches'));
const LeagueList = React.lazy(() => import('./list-leagues'));
const Profile = React.lazy(() => import('./profile'));
const ProfileEdit = React.lazy(() => import('./profile-edit'));
const Search = React.lazy(() => import('./search'));
const Latest = React.lazy(() => import('./latest'));
const LatestDetails = React.lazy(() => import('./latest-details'));
const RewardDetails = React.lazy(() => import('./reward-details'));
const RewardAll = React.lazy(() => import('./reward-all'));
const ContestAll = React.lazy(() => import('./contest-all'));
const PrivacyPolicy = React.lazy(() => import('./privacy-policy'));
const TermsOfService = React.lazy(() => import('./terms-of-service'));
const LeaderBoard = React.lazy(() => import('./leaderboard-details'));
const TipsDetails = React.lazy(() => import('./tips-details'));
const Standing = React.lazy(() => import('./standing'));
const Language = React.lazy(() => import('./language'));
const MyTeamDetails = React.lazy(() => import('./my-team-details'));
const TeamDetails = React.lazy(() => import('./team-details'));
const ContestHistory = React.lazy(() => import('./profile-contest-history'));
const VideoMore = React.lazy(() => import('./video-more/VideoMore'));
const Winner = React.lazy(() => import('./winners'));
const PlayerDetails = React.lazy(() => import('./playerDetails'));
const League = React.lazy(() => import('./league'));
const PlayerInformation = React.lazy(()=> import('./playerInformation'));
const ClubInformation = React.lazy(()=> import('./clubInformation'));
const NewLogin = React.lazy(()=>import('./newLogin'));
const NewRegistrationMsisdn = React.lazy(()=>import('./newRegistrationMsisdn'));
const NewForgetPassword = React.lazy(()=>import('./newForgetPassword'));
const LocalLatestDetails = React.lazy(() => import('./local-details/indexLocal'));
import PageRoutingLoader from '../loader/PageRoutingLoader';
const Msisdnsubscription = React.lazy(()=>import('./newLogin/Msisdnsubscription'));
const Deployment = React.lazy(()=> import('./deployment'))



const PageRoutes = ({match}) => (
    <Template>
        <Suspense fallback={<PageRoutingLoader />}>
            <Switch>
                <Route exact path={`${match.path}`} component={Home} />
                {/* <Route exact path={`${match.path}login`} component={Login} /> */}
                {/* <Route exact path={`${match.path}register`} component={Register} /> */}
                <Route path={`${match.path}logout`} render={()=>{
                    localStorage.clear();
                    return (<Redirect to='/' />);
                }} />
                {/* <Route exact path={`${match.path}contest`} component={Contest} /> */}
                <Route exact path={`${match.path}matches`} component={Matches} />
                <Route exact path={`${match.path}deployment`} component={Deployment} />

                <Route path={`${match.path}contest/:id`} component={ScorePrediction} />
                <Route path={`${match.path}scores`} component={ContestAll} />
                <Route path={`${match.path}:videotype/video-more`} component={VideoMore} />
                <Route exact path={`${match.path}reward`} component={Reward}/>
                <Route path={`${match.path}reward-all`} component={RewardAll}/>
                <Route path={`${match.path}reward/:id`} component={RewardDetails}/>
                <Route path={`${match.path}team/:id`} component={TeamDetails}/>
                <Route exact path={`${match.path}leaderboard`} component={LeaderBoard}/>
                {/* <Route path={`${match.path}leaderboard/:id`} component={LeaderBoardDetails}/> */}
                <Route path={`${match.path}faq`} component={FrequentlyAskedQuestions}/>
                <Route path={`${match.path}privacy`} component={PrivacyPolicy}/>
                <Route path={`${match.path}service`} component={TermsOfService}/>
                <AuthRoute exact path={`${match.path}profile`} component={Profile} />
                <AuthRoute exact path={`${match.path}profile/edit`} component={ProfileEdit} />
                <AuthRoute exact path={`${match.path}profile/contest/history`} component={ContestHistory} />
                <Route path={`${match.path}search`} component={Search} />
                <Route exact path={`${match.path}news`} component={Latest} />
                <Route path={`${match.path}latest/:id`} component={LatestDetails} />
                <Route path={`${match.path}tips/:id`} component={TipsDetails} />
                {/* <Route path={`${match.path}news`} component={News} /> */}
                {/* <Route exact path={`${match.path}matches`} component={LiveMatches} /> */}
                <Route exact path={`${match.path}league-list`} component={LeagueList} />
                <Route exact path={`${match.path}language`} component={Language} />
                <Route exact path={`${match.path}standing/:id`} component={Standing} />
                <Route path={`${match.path}match/details/:id`} component={MatchDetails} />
                <Route path={`${match.path}winner`} component={Winner} />
                <Route path={`${match.path}player-details/:team_id/:player_id`} component={PlayerDetails} />
                <Route path={`${match.path}league/:id`} component={League} />
                <Route path={`${match.path}player-info/:id`} component={PlayerInformation}/>
                <Route path={`${match.path}club-info/:id`} component={ClubInformation}/>
                <Route path={`${match.path}login`} component={NewLogin}/>
                <Route path={`${match.path}new-register-msisdn`} component={NewRegistrationMsisdn}/>
                <Route path={`${match.path}forget-password`} component={NewForgetPassword}/>
                <Route path={`${match.path}local/:id`} component={LocalLatestDetails} />
                <Route path={`${match.path}package/:id`} component={Msisdnsubscription}/>
                <Redirect to={`${match.path}`}/>
                </Switch>  
        </Suspense>
    </Template>
);


export default withRouter(PageRoutes);