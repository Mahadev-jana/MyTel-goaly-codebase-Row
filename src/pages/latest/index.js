import React from 'react';
import classnames from 'classnames';
import { Helmet } from "react-helmet";
import axios from '../../_config/axios';
import icon from '../../assets/img/logo-goaly.png';
import MenuCategory from '../../components/menu-category';
import PopularNews from './PopularNews';
import TransferNews from './TransferNews';
import LatestNews from './LatestNews';
//import LocalNews from './LocalNews';
import Videos from './videos';
import './index.css';
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import {
    isAuthenticate,
    getUserDetails,
  } from '../../_helper/authentication';

class Latest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            vadeos:[],
            teamTab:"allTeam",
            userId:null
        }
    }

    componentDidMount(){
        // if(isAuthenticate()){
        //     this.setState({teamTab:'myTeam'})
        // }
        // else{
        //     this.setState({teamTab:'allTeam'})
        // }
        //const payload=new FormData();
        //axios.post('/StageGoalyApi/highLightsVideo')
        //.then(res=>{
           // if(res.data.code === 200 && res.data.error === 0 && res.data.success === 1){
                // console.log(res);
                //this.setState({vadeos:res.data.videos})
            //}else{
              //  this.setState({vadeos:[]})
            //}
           
        //})
    }

    teamMatches = () => {
        const { teamTab } = this.state;
        if (teamTab === "myTeam") {
          if (isAuthenticate && getUserDetails()) {
            this.setState({ userId: getUserDetails().id }, () => {
             // this.getLeagueList();
            });
            // console.log("Authenticate");
            console.log(this.state.userId)
          } else {
            // console.log("not Authenticate");
            
            Swal.fire({
              title: "You need to login to play",
              type: "info",
              showCancelButton: true,
              confirmButtonText: "OKAY",
              cancelButtonText: "CANCEL",
            }).then((result) => {
              if (result.value) {
                this.props.history.push("/login");
              }
            });
          
          }
        }
      }

    changeTab = tab => {
        this.setState({ tab });
    }
    render() {
        const { tab,vadeos,teamTab } = this.state;
        // console.log(vadeos);
        return (
            <React.Fragment>
                {/* <Helmet>
                    <title>Goaly | News</title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
                <MenuCategory />
                <div className="block row">

                <div className="d-flex" style={{ marginTop: '-2.75em' }}>
                        {/*<a className={teamTab === 'myTeam' ? "btn btn-lg border btn-purple text-white w-50 mr-1" : "btn btn-lg border btn-white w-50 mr-1"}
                           onClick={async () => { await this.setState({ teamTab: 'myTeam' }), this.teamMatches() }}>My Team</a>*/}
                        {/* <a className={teamTab === 'allTeam' ? "btn btn-lg border btn-purple text-white w-100 mr-1" : "btn btn-lg border btn-white w-100 mr-1"}
                            onClick={async () => { await this.setState({ teamTab: 'allTeam' }), this.teamMatches() }}>All Team</a> */}
                    </div>

                    {/*<div className="d-flex" style={{ marginTop: "-2.75em" }}>
                         <a href="#" className="btn btn-lg border btn-white w-50 mr-1">My Team</a> 
                        <a href="#" className="btn btn-lg border btn-purple text-white w-100 ml-1">All Team</a>
            </div>*/}
                    <ul className="filter-days">
                        <li className={classnames("btn border radius-1", { "filter-days-active": Boolean(tab == 0) })}
                            onClick={() => this.changeTab(0)}>
                            { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?
                               <span class="notranslate">နာမည်ကြီး</span>
                               :
                              <span>Hottest</span>
                            }

                            
                        </li>
                        <li className={classnames("btn border radius-1", { "filter-days-active": Boolean(tab == 1) })}
                            onClick={() => this.changeTab(1)}>Latest</li>
                        <li className={classnames("btn border radius-1", { "filter-days-active": Boolean(tab == 2) })}
                            onClick={() => this.changeTab(2)}>Transfer</li>
                        {/* <li className={classnames("btn border radius-1", { "filter-days-active": Boolean(tab == 3) })}
                            onClick={() => this.changeTab(3)}>Local</li> */}
                        <li className={classnames("btn border radius-1", { "filter-days-active": Boolean(tab == 4) })}
                        onClick={()=>this.changeTab(4)}>Video</li>
                    </ul>
                </div>
                {/* <div className="clearfix"></div>
                <div className="col-xs-12 mb-10 mt-5" style={{paddingTop:'65px'}}>
                    <div className="col-xs-4 pd-0">
                        <a onClick={() => this.changeTab(0)}>
                            <div className={classnames("sub-news", { "active": Boolean(tab == 0) })}>
                                Hottest
                            </div>
                        </a>
                    </div>
                    <div className="col-xs-4 pd-0">
                        <a onClick={() => this.changeTab(1)}>
                            <div className={classnames("sub-news", { "active": Boolean(tab == 1) })}>
                                Latest
                            </div>
                        </a>
                    </div>
                    <div className="col-xs-4 pd-0">
                        <a onClick={() => this.changeTab(2)}>
                            <div className={classnames("sub-news", { "active": Boolean(tab == 2) })}>
                                Transfer
                            </div>
                        </a>
                    </div>
                    <div className="col-xs-4 pd-0" style={{width:'auto'}}>
                        <a onClick={() => this.changeTab(3)}>
                            <div className={classnames("sub-news", {"active":Boolean(tab==3)})}>
                                Local
                            </div>
                        </a>
                    </div>
                </div> */}
                {teamTab==='allTeam' && (Boolean(tab == 0) && <PopularNews teamTab={this.state.teamTab} tab={this.state.tab} userId={this.state.userId}/>)}
                {teamTab==='myTeam' && (Boolean(tab == 0) && <PopularNews teamTab={this.state.teamTab} tab={this.state.tab} userId={this.state.userId}/>)}
                {teamTab==='allTeam' && (Boolean(tab == 1) && <LatestNews teamTab={this.state.teamTab} tab={this.state.tab} userId={this.state.userId}/>)}
                {teamTab==='myTeam' && (Boolean(tab == 1) && <LatestNews teamTab={this.state.teamTab} tab={this.state.tab} userId={this.state.userId}/>)}
                {teamTab==='allTeam' && (Boolean(tab==2) && <TransferNews teamTab={this.state.teamTab} tab={this.state.tab} userId={this.state.userId}/>)}
                {teamTab==='myTeam' && (Boolean(tab==2) && <TransferNews teamTab={this.state.teamTab} tab={this.state.tab} userId={this.state.userId}/>)}
                {teamTab==='allTeam' && (Boolean(tab==3) && <LocalNews teamTab={this.state.teamTab} tab={this.state.tab} userId={this.state.userId}/>)}
                {teamTab==='myTeam' && (Boolean(tab==3) && <LocalNews teamTab={this.state.teamTab} tab={this.state.tab} userId={this.state.userId}/>)}
                {teamTab==='allTeam' && (Boolean(tab==4) && <Videos /*videos={vadeos}*/ teamTab={this.state.teamTab} tab={this.state.tab} userId={this.state.userId}/>)}
                {teamTab==='myTeam' && (Boolean(tab==4) && <Videos /*videos={vadeos}*/ teamTab={this.state.teamTab} tab={this.state.tab} userId={this.state.userId}/> )}
                
                {/*before code*/}
                {/*Boolean(tab == 0) && <PopularNews />*/}
                {/*Boolean(tab == 1) && <LatestNews />*/}
                {/*Boolean(tab == 2) && <TransferNews />*/}
                {/*Boolean(tab == 3) && <LocalNews />*/}
                {/*Boolean(tab == 4) && <Videos videos={vadeos}/>*/}
            </React.Fragment>
        );
    }
};

export default Latest;