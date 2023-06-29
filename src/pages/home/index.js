import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { isAuthenticate, getUserDetails } from '../../_helper/authentication';
import SetFavTeam from '../../components/set-fav-team/SetFavTeam';
import LatestNews from '../../components/latest-news';
import MyTeam from '../../components/my-team';
import OtherMatches from '../../components/other-matches/OtherMatches';
import ContestSlider from '../../components/ContestSlider';
import BigMatches from '../../components/big-matches/BigMatches';
// import LiveMatches from '../../components/live-matches/LiveMatches';
import LatestMatchSlider from '../../components/latest-match-slider';
import VideoHighlights from '../../components/highlights/VideoHighlights';
import MenuCategory from '../../components/menu-category';
import { post, authPost } from '../../api';
import RewardsSlider from '../reward/tabs/RewardsSlider';
import imgTeamAdd from '../../assets/img/tm-add.png';
import AddFavoriteClub from './add-favorite-clubs/AddFavoriteClubs';
import ListMatches from './list-matches/ListMatches';
import ListPrediction from './ListPrediction';
import LiveMatches from './live-matches/LiveMatches';
import GoalyTV from './GoalyTV';
import Football from './Football';
import Transfer from './Transfer';
import Leagues from './Leagues';
import TopMatches from './TopMatches';
import LocalNewsDashboard from './live-matches/LocalNewsDashboard';
import icon from '../../assets/img/logo-goaly.png';
import MatchTime from './match-time/matchTime';
import Cookies from 'js-cookie';
import './modal.css';
import  Modall  from './Modal';

import howtoplay1 from '../../assetsStaging/img/img_1.png';
import howtoplay2 from '../../assetsStaging/img/img_2.png';
import howtoplay3 from '../../assetsStaging/img/img_3.png';

import Slider from './slider';
import phone from '../../assets/img/slider/1.png';
import band from '../../assets/img/slider/3.png';
import playstation from '../../assets/img/slider/2.png';

import popupimage from '../../assets/img/slider/banner.png';

// const sliderData = [
//   {
//     id: 1,
//     url: howtoplay1,
//     desc: 'Join on Going Competition by Clicking on "LETS PLAY" Button'

//   },
//   {
//     id: 2,
//     url: howtoplay2,
//     desc: 'Input all your prediction according the question that provided and submit the answer!'
//   },
//   {
//     id: 3,
//     url: howtoplay3,
//     desc: 'Top 3 player in the leaderboard for the competition will be able to win the prize'
//   }

// ]


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerDetails: [],
            news: [],
            setFavTeam: false,
            myTeams: [],
            isLogin: false,
            statusmodel:true,
            sliderData: [],
            slideLoading: false,
            submodal:false
        }

        //document.cookie = `googtrans=/en/my`;
        //document.cookie = 'googtrans=/en/my; path=/; domain=.goaly.mobi; expires=' + new Date(0).toUTCString();
        //window.location.href = '/home';
    }
    

    openSetFavTeam = () => {
        this.setState({ setFavTeam: true });
    }
    closeSetFavTeam = () => {
        this.setState({ setFavTeam: false });
    }

    closeModal = () => {
        this.setState({ statusmodel: false });
    }

    componentDidMount() {
        var uuid = '';
        var f= window.location.search.substring(1);
        console.log('============='+f); 
        for (var i=0;i<f.length;i++){
            
            if(f[i]== '='){
                uuid = "";
                continue;
            }
            else{ 
                 uuid = uuid +f[i];
            }
        }
        console.log('---------------------'+uuid);

        if(uuid !=''){

            const payload = new FormData();
            payload.append('uuid', uuid);
            post('/Subscription/log_file', payload)
                .then(res => {

                    this.props.history.push("/");
                    
                })
                .catch(err => console.log(err));



        }

        if( typeof Cookies.get('googtrans') == "undefined"){

           document.cookie = "googtrans=/en/my"; 
           document.cookie = 'googtrans=/en/my; path=/; domain=.goaly.mobi; expires=' + new Date(0).toUTCString();

        }

        this.setState({
          slideLoading: true
        });
        setTimeout(() => {
          this.setState({ sliderData, slideLoading: false });
        });
        this.setState({ loading: true });

        


        //document.cookie = "googtrans=/en/my"; 
        //document.cookie = 'googtrans=/en/my; path=/; domain=.goaly.mobi; expires=' + new Date(0).toUTCString();

        const user = JSON.parse(localStorage.getItem('userDetails'));
        if (user) {
            this.setState({ isLogin: true });
            if(user.played_prediction == 0)
            this.setState({ statusmodel: true });
        }
        post('api/getgoalybannerlist')
            .then(res => {
                if (res.data.success)
                    this.setState({ bannerDetails: res.data.banner_details })
            })
            .catch(err => console.log(err));
        
        if (isAuthenticate()){

            const payload = new FormData();
            payload.append('phone_no', getUserDetails().msisdn);
            post('StageGoalyApi/check_login_status', payload)
                .then(res => {
                    //console.log(res.data.data.user_details)
                    if (res.data.data.user_details.status== 'inactive'){
                            localStorage.clear();
                            window.location.reload("/");
                        }
                })
                .catch(err => console.log(err));    

        }

        if (isAuthenticate())
            // this.getMyTeams();
            this.getLatestNews();
    }
    getMyTeams = (page = 0) => {
        const payload = new FormData();
        payload.append('page', page);
        authPost('api/getfavteam', payload)
            .then(res => {
                const team = res.data.team_list;
                this.setState(prevState => ({ myTeams: [...prevState.myTeams, ...team], page }));
            })
            .catch(err => console.log(err));
    }
    getLatestNews = () => {
        const payload = new FormData();
        payload.append('limit', 4);
        post('api/getlatestnews', payload)
            .then(res => {
                if (res.data.success)
                    this.setState({ news: res.data.news });
            })
            .catch(err => console.log(err));
    }

    playContest = ()=> {

        if(getUserDetails() && getUserDetails().msisdn !=''){
            
        }else{

            this.setState({ submodal: true });
        }

    }


    render() {
        const {isLogin,submodal,statusmodel,sliderData, slideLoading} = this.state;
        
        window.scrollTo(0, 0)
        return (
            <Fragment>
                
                {/* {

                    statusmodel && (
                         <div className="overlay">
                              <div className="content1">

                               <div class="modal-dialog modal-lg" role="document">
                                    <div class="modal-content1">
                                        <button type="button" class="close" onClick={this.closeModal} ><span aria-hidden="true">&times;</span></button>

                                        <img src={popupimage} alt="Banner" class="img-responsive full-img" />
                                        <div class="container-fluid subSection">
                                            <a href="#" class="btn btn-block subButton" onClick={this.playContest}>Subscribe</a>
                                        </div>
                                        <div class="container-fluid">
                                            <div class="how-to-play-title">
                                                <span>How to Play</span>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>

                                <div id="slider" class="carousel slide" data-ride="carousel" style={{ height: '90px',marginBottom :'35px' }}>
                                    {!slideLoading && <Slider sliderData={this.state.sliderData} />}
                                </div>
                               
                                
                              </div>
                            </div>                             
                    )
                } */}

                {/* {submodal && (
                    <Modall closeModal={() => this.setState({ submodal: false })}><p>hello worls</p></Modall>
                             )
                    } */}

                <MenuCategory />
                <AddFavoriteClub />
                <MatchTime />

                {/* {!isLogin && <TopMatches />}
                {!!isLogin && <LiveMatches />}
               <div style={{paddingTop:7}}> <RewardsSlider /></div>
                <ListMatches />
                <GoalyTV />
                <Football />
                <Transfer />
                <Leagues /> */}
            </Fragment>
        );
    }
}

export default Home;