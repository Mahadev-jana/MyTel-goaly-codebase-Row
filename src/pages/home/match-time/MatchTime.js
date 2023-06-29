
import React from 'react';
import { isArray, isEmpty } from 'lodash';
import axios from '../../../_config/axios';
import Prediction from '../Prediction';
import noDataImg from '../../../assetsStaging/img/no_data_found.png';
import NewSubscriberModal from './NewSubscriberModal';
import './matchTime.css';
import Cookies from 'js-cookie';
import Slider from './slider';
import phone from '../../../assets/img/slider/1.png';
import band from '../../../assets/img/slider/3.png';
import playstation from '../../../assets/img/slider/2.png'

let lang ='';
// const sliderData = [
//   {
//     id: 1,
//     url: phone,
//     desc: 'slide1'

//   },
//   {
//     id: 2,
//     url: playstation,
//     desc: 'slide1'
//   },
//   {
//     id: 3,
//     url: band,
//     desc: 'slide1'
//   }

// ]

class MatchTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leagues: "",
            sectedLeague: 'All League',
            leagueId: 0,
            predictions: [],
            sliderData: [],
            slideLoading: false,
            currentDate: '',
            winPoint: [],
            isLoading: false,
            noData: false,
            period: 'weekly',
            openList: false,
            lang: Cookies.get('googtrans'),
            userDetails:[]
        }

    }
    componentDidMount() {

        this.setState({
          slideLoading: true
        });
        setTimeout(() => {
          this.setState({ sliderData, slideLoading: false });
        });
        this.setState({ loading: true });

        this.setState({userDetails:JSON.parse(localStorage.getItem('userDetailsforPopup'))})
        const payload = new FormData();
        payload.append('page', 'live');
        axios.post('api/getleagues', payload).then(res => {
            //console.log(res.data.leagues)
            this.setState({ leagues: res.data.leagues })

        }).catch(err => {
            console.log({ err })
        });
        this.getWeeklyPrediction();
    }
    spreadList = () => {
        //console.log('open listttttt')
        this.setState(prevState => ({
            openList: !prevState.openList
        }))
    }
    getWeeklyPrediction = async () => {
        this.setState({isLoading:true})
        await this.setState({ period: 'weekly', leagueId: 0 })
        //console.log(this.state.period, this.state.leagueId)
        //console.log('week')
        const payLoad = new FormData();
        payLoad.append('type', this.state.period);
        payLoad.append('league_id', this.state.leagueId);
        axios.post('StageGoalyApi/prediction', payLoad).then(res => {
            if (res && res.data.success === 1) {

                if (res.data.prediction_list && isArray(res.data.prediction_list)) {
                    this.setState({
                        predictions: res.data.prediction_list,
                        currentDate: res.data.current_date,
                        winPoint: res.data.win_point,
                        noData: false
                    })

                }
                else {
                    this.setState({
                        predictions: [],
                        currentDate: '',
                        winPoint: [],
                        noData: true
                    })

                }
                // console.log(res.data.prediction_list)
            }
            this.setState({isLoading:false})
        }).catch(err => console.log(err))
    }
    getMonthlyPrediction = async () => {
        this.setState({isLoading:true})
        await this.setState({ period: 'monthly', leagueId: 0 })
        //console.log('month')
        //console.log(this.state.period, this.state.leagueId)
        const payLoad = new FormData();
        payLoad.append('type', this.state.period);
        payLoad.append('league_id', this.state.leagueId);
        axios.post('StageGoalyApi/prediction', payLoad).then(res => {
            if (res && res.data.success === 1) {

                if (res.data.prediction_list && isArray(res.data.prediction_list)) {
                    this.setState({
                        predictions: res.data.prediction_list,
                        currentDate: res.data.current_date,
                        winPoint: res.data.win_point,
                        noData: false
                    })

                }
                else {
                    this.setState({
                        predictions: [],
                        currentDate: '',
                        winPoint: [],
                        noData: true
                    })

                }
                // console.log(res.data.prediction_list)
            }
            this.setState({isLoading:false})
        }).catch(err => console.log(err))
    }
    getQuarterlyPrediction = async () => {
        this.setState({isLoading:true})
        await this.setState({ period: 'quarterly', leagueId: 0 })
        //console.log('quarter')
        //console.log(this.state.period, this.state.leagueId)
        const payLoad = new FormData();
        payLoad.append('type', this.state.period);
        payLoad.append('league_id', this.state.leagueId);
        axios.post('StageGoalyApi/prediction', payLoad).then(res => {
            if (res && res.data.success === 1) {

                if (res.data.prediction_list && isArray(res.data.prediction_list)) {
                    this.setState({
                        predictions: res.data.prediction_list,
                        currentDate: res.data.current_date,
                        winPoint: res.data.win_point,
                        noData: false
                    })

                }
                else {
                    this.setState({
                        predictions: [],
                        currentDate: '',
                        winPoint: [],
                        noData: true
                    })

                }
                // console.log(res.data.prediction_list)
            }
            this.setState({isLoading:false})
        }).catch(err => console.log(err))
    }
    getFilterByLeague = async (id, name) => {
        this.setState({isLoading:true})
        await this.setState({ sectedLeague: name, leagueId: id });
        //console.log(this.state.sectedLeague, this.state.leagueId, this.state.period);
        const payLoad = new FormData();
        payLoad.append('type', this.state.period);
        payLoad.append('league_id', this.state.leagueId);
        axios.post('StageGoalyApi/prediction', payLoad).then(res => {
            if (res && res.data.success === 1) {

                if (res.data.prediction_list && isArray(res.data.prediction_list)) {
                    this.setState({
                        predictions: res.data.prediction_list,
                        currentDate: res.data.current_date,
                        winPoint: res.data.win_point,
                        noData: false
                    })

                }
                else {
                    this.setState({
                        predictions: [],
                        currentDate: '',
                        winPoint: [],
                        noData: true
                    })

                }
                // console.log(res.data.prediction_list)
            }
            this.setState({isLoading:false})
        }).catch(err => console.log(err))
    }
    getFilterByAllLeague = async () => {
        this.setState({isLoading:true})
        await this.setState({ leagueId: 0 });
        console.log(this.state.leagueId, this.state.period);
        const payLoad = new FormData();
        payLoad.append('type', this.state.period);
        payLoad.append('league_id', this.state.leagueId);
        axios.post('StageGoalyApi/prediction', payLoad).then(res => {
            if (res && res.data.success === 1) {

                if (res.data.prediction_list && isArray(res.data.prediction_list)) {
                    this.setState({
                        predictions: res.data.prediction_list,
                        currentDate: res.data.current_date,
                        winPoint: res.data.win_point,
                        noData: false
                    })

                }
                else {
                    this.setState({
                        predictions: [],
                        currentDate: '',
                        winPoint: [],
                        noData: true
                    })

                }
                // console.log(res.data.prediction_list)
            }
            this.setState({isLoading:false})
        }).catch(err => console.log(err))

    }
    render() {
        const {userDetails, openList, period, sectedLeague, leagues, leagueId, predictions, currentDate, winPoint, isLoading, noData , lang,sliderData, slideLoading } = this.state;
        //const lastSegment = (lang !=''} ? lang.split("/").pop() : '';
          
        // const { leagues } = this.props
        // console.log(currentDate)
        return (
            <React.Fragment>
                {userDetails && userDetails.login_count>=0 && userDetails.checkboxstatus==0 &&
                <NewSubscriberModal/>
                }
                {/*<div style={{overflowX:"auto"}}>
                <ul className="filter-dayss">
                    <li onClick={() => { this.getWeeklyPrediction() }}
                        className={period === 'weekly' ? "btn border radius-1 filter-dayss-active" : 'btn border radius-1'}>Yesterday</li>
                    <li onClick={() => { this.getMonthlyPrediction() }}
                        className={period === 'monthly' ? "btn border radius-1 filter-dayss-active" : 'btn border radius-1'}>Today</li>
                    <li onClick={() => { this.getQuarterlyPrediction() }}
                        className={period === 'quarterly' ? "btn border radius-1 filter-dayss-active" : 'btn border radius-1'} style={{marginRight:0}}>Tomorrow</li>
                </ul>
                </div>*/}
                {/* <div id="slider" class="carousel slide" data-ride="carousel" style={{ height: '90px',marginBottom :'77px' }}>
            {!slideLoading && <Slider sliderData={this.state.sliderData} />}
          </div> */}
                <div className="dropdown filter-league" style={{ padding: ' 8px 0px 14px 0' }}>
                    <button className="btn btn-default dropdown-toggle w-100 d-flex ais-center"
                        type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                        style={{ background: '#fff' }}
                        aria-expanded="false" onClick={this.spreadList}
                    >
                        {leagueId===0 ? 
                        <span className="mr-auto">
                        { lang && lang.length > 0 && lang.split("/").pop() =='my' ?
                           <span class="notranslate">လိဂ်အားလုံး</span>
                           :
                          <span>All League</span>
                        }
                        
                        </span>
                        :
                        <span className="mr-auto">{sectedLeague}</span>
                        }
                        
                        <span className="caret"></span>
                    </button>

                    {openList && leagues &&
                        <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenu2" style={{ display: 'block', margin: '-12px 0' }}>
                            <li onClick={() => {this.getFilterByAllLeague(); this.spreadList()}}><a>All Leagues</a></li>
                            {leagues.map((league, key) => (
                                <li key={key} onClick={() => { this.getFilterByLeague(league.sportsmonks_id, league.competition_name), this.spreadList() }}><a>{league.competition_name}</a></li>
                            ))}
                        </ul>


                    }

                </div>
                {!isLoading && noData &&
                <div className="container" style={{display: 'flex',justifyContent: 'center',alignItems: 'center',height:'280px'}}>
                           <img style={{height:'200px'}} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1"/>
            </div>
                   
                }
                <Prediction predictions={predictions} currentDate={currentDate} winPoint={winPoint} isLoading={isLoading} />
            </React.Fragment>
        )

    }

}
export default MatchTime;