import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import Match from './tabs/Match';
import News from './tabs/News';
import Players from './tabs/Players';
import Standings from './tabs/Standings';
import Layer from '../../assets/img/detail-club/Layer.svg';
import Chelsea from '../../assets/img/Chelsea.svg';
import '../../assets/css/detail-club.css';
import axios from '../../_config/axios';
import { navigate } from "@reach/router";
import Swal from 'sweetalert2';
import { authPost } from '../../api/index';
import Loader from 'react-loader-spinner';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
class TeamDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            logo: "",
            clubs: [],
            id: '',
            name: '',
            loading: false,
            venue: '',
            city: '',
            league: '',
            country: '',
            country_logo: '',
            league_logo: ''


        }
    }

    callbackFunction = (logo, name, venue, city, league, country, country_logo, league_logo) => {

        this.setState({ logo, name, venue, city, league, country, country_logo, league_logo })
    }
    componentDidMount() {
        this.followTeam();
        // this.searchTeamById(this.props.match.params.id);
        this.setState({
            loading: true
        })

    }
    // searchTeamById=(team_id)=>{

    //     const payload=new FormData();
    //     payload.append('id',team_id);
    //     axios({
    //         method:'post',
    //         url:'/newsForTeam',
    //         data:payload
    //     }).then(res=>{
    //         if(res.data && res.data.success && res.data.success == 1){

    //         }
    //     }).catch(err=>{
    //         console.log({err})
    //     })
    // }

    followTeam() {


        const userdetails = JSON.parse(localStorage.getItem('userDetails'));
        // console.log(userDetails)
        if (userdetails == null) {

        }
        else {
            const payload = new FormData();
            payload.append('user_id', userdetails.id);
            setTimeout(() => {
                axios({
                    method: 'post',
                    url: 'clubTeam',

                    headers: {
                        'JWT': localStorage.getItem('JWT'),
                    },
                    data: payload
                }).then(res => {

                    if (res.data && res.data.success && res.data.success == 1) {
                        // if (res.data.favteams && isArray(res.data.favteams)) {
                        this.setState({
                            clubs: res.data.favteams,
                            loading: false,


                        })
                    }
                    // }
                }).catch(err => {
                    console.log({ err })
                })

                // console.log(this.props.match.params.id)
                // console.log(this.state.clubs)
            }, 200)

        }
    }

    addTeam = () => {
        console.log('addTeam');
        console.log(this.state.name)
        let teamDetails = [];
        teamDetails = this.state.clubs;


        let team = {
            id: this.props.match.params.id,
            "name": this.state.name,
            "badge": this.state.logo,
            "status": 'not selected',
        }
        console.log(team)
        teamDetails.push(team);
        console.log(teamDetails)
        this.setState({
            clubs: teamDetails

        })
        console.log(this.state.clubs)
        const payload = new FormData();
        const userdetails = JSON.parse(localStorage.getItem('userDetails'));

        payload.append('user_id', userdetails.id);
        payload.append('clubs', JSON.stringify(this.state.clubs));
        axios({
            method: 'post',
            url: 'api/UserFavouriteTeam',

            headers: {
                'JWT': localStorage.getItem('JWT'),
            },
            data: payload
        }).then(res => {

            if (res.data.success == 1) {
                // if (res.data.favteams && isArray(res.data.favteams)) {
                // this.setState({
                //     clubs:res.data.favteams

                // })

            }

        }).catch(err => {
            console.log({ err })
        })

        // console.log(this.props.match.params.id)
        // console.log(this.state.clubs)
    }
    // }).catch(err => {
    //     // setIsLoaading(false);
    //     // closeModal();
    //     console.log({ err });
    // });
    removeTeam = teamId => () => {

        console.log(teamId)
        Swal.fire({
            type: 'warning',
            title: 'Want to unfollow??',
            allowOutsideClick: false,
            showCancelButton: true,
        })
            .then((result) => {

                if (result.value) {
                    this.setState({
                        loading: true
                    })
                    const payload = new FormData();
                    payload.append('id', teamId);
                    authPost('removefavteam', payload)
                        .then(res => {
                            // console.log(res)
                            if (res.status === 200) {
                                console.log(res)
                                this.getFavTeam();
                                this.setState({
                                    loading: false,
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            this.setState({
                                loading: false
                            })
                        });
                }
            });
    }
    loginPage = () => {
        Swal.fire({
            type: 'error',
            title: 'Login first to add your favorite clubs!!',
            confirmButtonText: 'Login',
        }).then(result => {
            if (result.value) {
                this.props.history.push('/login');
            }
        });
    }




    getFavTeam = () => {
        // console.log('remove')
        this.setState({
            loading: true
        })
        const payload = new FormData();
        const userdetails = JSON.parse(localStorage.getItem('userDetails'));
        payload.append('user_id', (userdetails.id));

        axios.post('api/clubTeam', payload).then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                // SetmyTeam(res.data.favteams);
                this.setState({
                    loading: false,
                    clubs: res.data.favteams,


                })
                this.setState({
                    loading: false
                })

            }
            // if (res.data.success == 0) {
            //     SetmyTeam(res.data.team_list);
            //     this.setState({
            //         loading:false
            //     })
            // }
        })
            .catch(err => console.log(err),
                this.setState({
                    loading: false
                })
            );
    }

    goBack = () => {
        this.props.history.replace("/")
    }

    setTab = tab => { this.setState({ tab }) }
    render() {
        console.log(this.state.country_logo, this.state.league_logo, this.state.logo)

        const { tab, clubs, loading } = this.state;
        const { params } = this.props.match;
        // console.log(params.id+'params')
        // console.log(this.state.clubs)

        let index = null;
        index = this.state.clubs.findIndex(club => ((club.id === params.id)))
        // console.log(index)
        // console.log(params.id)
        const userdetails = JSON.parse(localStorage.getItem('userDetails'));
        return (
            <React.Fragment>
                {/* <Helmet>
                    <title>Goaly | Team Details</title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
                <div>


                    {/* <p style={{color:'black'}}>{this.state.logo}</p> */}
                    <div class="row detail-club" style={{ paddingTop: " 6px" }}>
                        <div class="back-btn">
                            <a onClick={this.goBack} href=""><img src={Layer} alt="" /> Back to Home</a>
                        </div>
                        <div class="header">

                            <div class="card">

                                {/* {console.log(params.id)} */}
                                <img src={this.state.logo} alt="" />
                                {/* <a style={{color:'black'}}>{this.state.name}cvbxfvcn</a> */}
                                {(index === -1 && userdetails) && <a class="btn btn-default" onClick={this.addTeam} disabled={loading} >
                                    {loading && <i className='fa fa-refresh fa-spin'></i>}
                                    Follow</a>}
                                {userdetails == null && <a class="btn btn-default" onClick={this.loginPage} disabled={loading} >
                                    {/* {loading && <i className='fa fa-refresh fa-spin'></i>} */}
                                    Follow</a>}


                                {index !== -1 && <a class="btn btn-default" onClick={this.removeTeam(params.id)} >
                                    {loading && <i className='fa fa-refresh fa-spin'></i>}

                                    Unfollow</a>
                                }



                                <h4 class="text-center" style={{ marginBottom: '1px', fontWeight: 100, color: "gray" }}>Venue:  {this.state.venue}</h4>
                                {/* <h4 class="text-center" style={{ marginBottom: '1px', fontWeight: 100 }}>Venue</h4> */}
                                <h4 class="text-center" style={{ marginBottom: '1px', fontWeight: 100, color: "gray" }}>City:  {this.state.city}</h4>
                                {/* <h4 class="text-center" style={{ marginBottom: '1px', fontWeight: 100 }}>City</h4> */}
                                <h4 class="text-center" style={{ marginBottom: '1px', fontWeight: 100, color: "gray" }}>League: <img src={this.state.league_logo} alt="" style={{ width: '35px', paddingTop: '45px' }} /> {this.state.league}</h4>
                                {/* <h4 class="text-center" style={{ marginBottom: '1px', fontWeight: 100 }}>League</h4> */}
                                <h4 class="text-center" style={{ marginBottom: '1px', fontWeight: 100, color: "gray" }}>Country: <img src={this.state.country_logo} alt="" style={{ width: '35px', paddingTop: '45px' }} /> {this.state.country}</h4>
                                {/* <h4 class="text-center" style={{ marginBottom: '1px', fontWeight: 100 }}>Country</h4> */}
                            </div>

                            <div className="row tab-menu">
                                <ul className="nav nav-tabs">
                                    <li className={classnames("nav-item", { "active": Boolean(tab === 0) })} onClick={() => this.setTab(0)}>
                                        <a className="nav-link" style={{ fontSize: 14 }}>Matches</a>
                                    </li>
                                    <li className={classnames("nav-item", { "active": Boolean(tab === 1) })} onClick={() => this.setTab(1)}>
                                        <a className="nav-link" style={{ fontSize: 14 }}>News</a>
                                    </li>
                                    <li className={classnames("nav-item", { "active": Boolean(tab === 2) })} onClick={() => this.setTab(2)}>
                                        <a className="nav-link" style={{ fontSize: 14 }}>Standings</a>
                                    </li>
                                    <li className={classnames("nav-item", { "active": Boolean(tab === 3) })} onClick={() => this.setTab(3)}>
                                        <a className="nav-link" style={{ fontSize: 14 }}>Players</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {Boolean(tab === 0) && <Match id={params.id} parentCallback={this.callbackFunction} />}
                        {Boolean(tab === 1) && <News id={params.id} />}
                        {Boolean(tab === 2) && <Standings id={params.id} name={this.state.name} />}
                        {Boolean(tab === 3) && <Players id={params.id} />}

                    </div>
                </div>
            </React.Fragment>

        );
    }
};

export default withRouter(TeamDetails);