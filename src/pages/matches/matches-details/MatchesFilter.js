import React from "react";
import { withRouter } from "react-router-dom";
import axios from "../../../_config/axios";
import Swal from "sweetalert2";
import { isArray, isEmpty } from "lodash";
import YesterdayMyTeamMatches from "./YesterdayMyTeamMatches";
import TodayMyTeamMatches from "./TodayMyTeamMatches";
import TomorrowMyTeamMatches from "./TomorrowMyTeamMatches";

import YesterdayAllTeamMatches from "./YesterdayAllTeamMatches";
import TodayAllTeamMatches from "./TodayAllTeamMatches";
import TomorrowAllTeamMatches from "./TomorrowAllTeamMatches";
import {
  isAuthenticate,
  getUserDetails,
} from "../../../_helper/authentication";

import "./matchesFilter.css";
class MatchesFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamTab: "",
      timeTab: "yesterday",
      userId: null,
      openList: false,
      myTeamLeagues: [],
      leagueName: "All Leagues",
      selectedLeagueId: "0",
      allTeamLeagues: [],
      logo:""
    };
  }
  componentDidMount() {
    //this.teamMatches();
    // console.log(isAuthenticate())
    if (isAuthenticate()) {
      this.setState({teamTab:'myTeam'})
      const payload = new FormData();
      payload.append("type", this.state.timeTab);
      payload.append("user_id", getUserDetails().id);
      axios
        .post("StageGoalyApi/myTeamMatches_leaguelist", payload)
        .then((res) => {
          //console.log(res)
          if (res.data) {
            if (
              res.data.code == 200 &&
              res.data.success == 1 &&
              res.data.error == 0
            ) {
              // console.log('data');
              this.setState({ myTeamLeagues: res.data.matches });
            }
            if (
              res.data.code == 400 &&
              res.data.success == 0 &&
              res.data.error == 1
            ) {
              // console.log('error')
              this.setState({ myTeamLeagues: [] });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Swal.fire({
      //     title: "You need to login to predict",
      //     type: "info",
      //     showCancelButton: true,
      //     confirmButtonText: "OKAY",
      //     cancelButtonText: "CANCEL",
      //   }).then((result) => {
      //     if (result.value) {
      //       this.props.history.push("/login");
      //     }
      //   });
      this.setState({teamTab:'allTeam'})
    }

    const payload = new FormData();
    payload.append("type", this.state.timeTab);
    axios
      .post("StageGoalyApi/allTeamLeagues", payload)
      .then((res) => {
        if (res.data) {
          if (
            res.data.code == 200 &&
            res.data.success == 1 &&
            res.data.error == 0
          ) {
            // console.log('data');
            this.setState({ allTeamLeagues: res.data.matches });
          }
          if (
            res.data.code == 400 &&
            res.data.success == 0 &&
            res.data.error == 1
          ) {
            // console.log('error')
            this.setState({ allTeamLeagues: [] });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
   
  teamMatches = () => {
    const { teamTab } = this.state;
    if (teamTab === "myTeam") {
      if (isAuthenticate && getUserDetails()) {
        this.setState({ userId: getUserDetails().id }, () => {
          this.getLeagueList();
        });
        // console.log("Authenticate");
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
  };
  getLeagueList = () => {



    this.setState({logo:""})
    const { teamTab, timeTab } = this.state;
    if (isAuthenticate && getUserDetails()) {
      if (teamTab === "myTeam" && timeTab === "today") {
        this.setState(
          {
            myTeamLeagues: [],
            leagueName: "All League",
            selectedLeagueId: "0",
          },
          () => {
            const payload = new FormData();
            payload.append("type", timeTab);
            payload.append("user_id", getUserDetails().id);
            axios
              .post("StageGoalyApi/myTeamMatches_leaguelist", payload)
              .then((res) => {
                if (res.data) {
                  if (
                    res.data.code == 200 &&
                    res.data.success == 1 &&
                    res.data.error == 0
                  ) {
                    // console.log('data');
                    this.setState({ myTeamLeagues: res.data.matches });
                  }
                  if (
                    res.data.code == 400 &&
                    res.data.success == 0 &&
                    res.data.error == 1
                  ) {
                    // console.log('error')
                    this.setState({ myTeamLeagues: [] });
                  }
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        );
      }



      if (teamTab === "myTeam" && timeTab === "tomorrow") {
        this.setState(
          {
            myTeamLeagues: [],
            leagueName: "All League",
            selectedLeagueId: "0",
          },
          () => {
            const payload = new FormData();
            payload.append("type", timeTab);
            payload.append("user_id", getUserDetails().id);
            axios
              .post("StageGoalyApi/myTeamMatches_leaguelist", payload)
              .then((res) => {
                console.log(res)
                if (res.data) {
                  if (
                    res.data.code == 200 &&
                    res.data.success == 1 &&
                    res.data.error == 0
                  ) {
                    // console.log('data');
                    this.setState({ myTeamLeagues: res.data.matches });
                  }
                  if (
                    res.data.code == 400 &&
                    res.data.success == 0 &&
                    res.data.error == 1
                  ) {
                    // console.log('error')
                    this.setState({ myTeamLeagues: [] });
                  }
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        );
      }



      if (teamTab === "myTeam" && timeTab === "yesterday") {
        this.setState(
          {
            myTeamLeagues: [],
            leagueName: "All League",
            selectedLeagueId: "0",
          },
          () => {
            const payload = new FormData();
            payload.append("type", timeTab);
            payload.append("user_id", getUserDetails().id);
            axios
              .post("StageGoalyApi/myTeamMatches_leaguelist", payload)
              .then((res) => {
                console.log(res)
                if (res.data) {
                  if (
                    res.data.code == 200 &&
                    res.data.success == 1 &&
                    res.data.error == 0
                  ) {
                    // console.log('data');
                    this.setState({ myTeamLeagues: res.data.matches });
                  }
                  if (
                    res.data.code == 400 &&
                    res.data.success == 0 &&
                    res.data.error == 1
                  ) {
                    // console.log('error')
                    this.setState({ myTeamLeagues: [] });
                  }
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        );
      }
    }



    if (teamTab === "allTeam" && timeTab === "today") {
      this.setState(
        { allTeamLeagues: [], leagueName: "All League", selectedLeagueId: "0" },
        () => {
          const payload = new FormData();
          payload.append("type", timeTab);
          axios
            .post("StageGoalyApi/allTeamLeagues", payload)
            .then((res) => {
              //console.log(res)
              if (res.data) {
                if (
                  res.data.code == 200 &&
                  res.data.success == 1 &&
                  res.data.error == 0
                ) {
                  // console.log('data');
                  this.setState({ allTeamLeagues: res.data.matches });
                }
                if (
                  res.data.code == 400 &&
                  res.data.success == 0 &&
                  res.data.error == 1
                ) {
                  // console.log('error')
                  this.setState({ allTeamLeagues: [] });
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    }



    if (teamTab === "allTeam" && timeTab === "tomorrow") {
      this.setState(
        { allTeamLeagues: [], leagueName: "All League", selectedLeagueId: "0" },
        () => {
          const payload = new FormData();
          payload.append("type", timeTab);
          axios
            .post("StageGoalyApi/allTeamLeagues", payload)
            .then((res) => {
              if (res.data) {
                if (
                  res.data.code == 200 &&
                  res.data.success == 1 &&
                  res.data.error == 0
                ) {
                  // console.log('data');
                  this.setState({ allTeamLeagues: res.data.matches });
                }
                if (
                  res.data.code == 400 &&
                  res.data.success == 0 &&
                  res.data.error == 1
                ) {
                  // console.log('error')
                  this.setState({ allTeamLeagues: [] });
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    }




    if (teamTab === "allTeam" && timeTab === "yesterday") {
      this.setState(
        { allTeamLeagues: [], leagueName: "All League", selectedLeagueId: "0" },
        () => {
          const payload = new FormData();
          payload.append("type", timeTab);
          axios
            .post("StageGoalyApi/allTeamLeagues", payload)
            .then((res) => {
              if (res.data) {
                if (
                  res.data.code == 200 &&
                  res.data.success == 1 &&
                  res.data.error == 0
                ) {
                  // console.log('data');
                  this.setState({ allTeamLeagues: res.data.matches });
                }
                if (
                  res.data.code == 400 &&
                  res.data.success == 0 &&
                  res.data.error == 1
                ) {
                  // console.log('error')
                  this.setState({ allTeamLeagues: [] });
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    }
  };




  spreadList = () => {
    this.setState((prevState) => ({
      openList: !prevState.openList,
    }));
  };



  getFilterByLeague = (leagueId, LeagueName,varimg) => {
     //console.log(leagueId,'leagueId',LeagueName,'LeagueName',varimg)
    this.setState({ selectedLeagueId: leagueId, leagueName: LeagueName ,logo:varimg});
    //console.log(this.state.logo)
  };



  getFilterByAllLeague = () => {
    this.setState({ selectedLeagueId: 0, leagueName: "All Leagues",logo:"" });
  };



  render() {
    const {
      teamTab,
      timeTab,
      userId,
      openList,
      myTeamLeagues,
      selectedLeagueId,
      leagueName,
      allTeamLeagues,
      logo
    } = this.state;
    //console.log(logo)
    // console.log(teamTab, "teamTab");
    // console.log(timeTab, "timeTab");
    // console.log(userId, "user_id");
    // console.log(leagueName, "leagueName");
    // console.log(selectedLeagueId, "selectedLeagueId");
    return (
      <React.Fragment>
        <>
        <div className="block row">
          <div className="d-flex" style={{ marginTop: "-2.75em" }}>
            <a
              className={
                teamTab === "myTeam"
                  ? "btn btn-lg border btn-purple text-white w-50 mr-1"
                  : "btn btn-lg border btn-white w-50 mr-1"
              }
              onClick={async () => {
                await this.setState({ teamTab: "myTeam" }), this.teamMatches();
                this.setState({ openList: false });
              }}
            >
              My Team
            </a>
            <a
              className={
                teamTab === "allTeam"
                  ? "btn btn-lg border btn-purple text-white w-50 mr-1"
                  : "btn btn-lg border btn-white w-50 mr-1"
              }
              onClick={async () => {
                await this.setState({ teamTab: "allTeam" }),
                  this.getLeagueList();
                this.setState({ openList: false });
              }}
            >
              All Team
            </a>
          </div>
          <ul className="filter-days" style={{ textAlign: "center" }}>
            <li
              className={
                timeTab === "yesterday"
                  ? "btn border radius-1 filter-days-active"
                  : "btn border radius-1"
              }
              onClick={async () => {
                await this.setState({ timeTab: "yesterday" }),
                  this.getLeagueList();
              }}
            >
              Yesterday
            </li>
            <li
              className={
                timeTab === "today"
                  ? "btn border radius-1 filter-days-active"
                  : "btn border radius-1"
              }
              onClick={async () => {
                await this.setState({ timeTab: "today" }), this.getLeagueList();
              }}
            >
              Today
            </li>
            <li
              className={
                timeTab === "tomorrow"
                  ? "btn border radius-1 filter-days-active"
                  : "btn border radius-1"
              }
              style={{ marginRight: 0 }}
              onClick={async () => {
                await this.setState({ timeTab: "tomorrow" }),
                  this.getLeagueList();
              }}
            >
              Tommorow
            </li>
          </ul>
        </div>
        </>



        <>
        {teamTab === "myTeam" &&
          isAuthenticate() &&
          myTeamLeagues.length !== 0 && (
            <div
              className="dropdown filter-league"
              style={{ padding: " 8px 0px 14px 0" }}
            >
              <button
                className="btn btn-default dropdown-toggle w-100 d-flex ais-center"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                style={{ background: "#fff" }}
                aria-expanded="false"
                onClick={() => this.spreadList()}
              >
                {selectedLeagueId === 0 && leagueName=== "All Leagues" ? (
                  <span className="mr-auto">All League</span>
                ) : 
                  
                  <span className="mr-auto"><img src={logo} style={{height:'29px'}}/>&nbsp;&nbsp;{leagueName}</span>
                }

                <span className="caret"></span>
              </button>

              {openList && (
                <ul
                  className="dropdown-menu w-100"
                  aria-labelledby="dropdownMenu2"
                  style={{ display: "block", margin: "-12px 0" }}
                >
                  <li
                    onClick={() => {
                      this.getFilterByAllLeague();
                      this.spreadList();
                    }}
                  >
                    <a>All Leagues</a>
                  </li>
                  {myTeamLeagues.map((league, key) => (
                    <li
                      key={key}
                      onClick={() => {
                        this.getFilterByLeague(
                          league.league_id,
                          league.competition_name,
                          league.image
                        ),
                          this.spreadList();
                          
                      }}
                    >
                      <img src={"https://cms-or.om.goaly.mobi/"+league.image} style={{ display:'inline',height:'60px',width:'51px'}}/>
                      <a style={{display:'inline'}}>{league.competition_name}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          </>



          <>
        {teamTab === "allTeam" && allTeamLeagues.length !== 0 && (
          <div
            className="dropdown filter-league"
            style={{ padding: " 8px 0px 14px 0" }}
          >
            <button
              className="btn btn-default dropdown-toggle w-100 d-flex ais-center"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              style={{ background: "#fff" }}
              aria-expanded="false"
              onClick={() => this.spreadList()}
            >
              {selectedLeagueId === 0 ? (
                <span className="mr-auto">All League</span>
              ) : (
                <span className="mr-auto"><img src={logo} style={{height:'29px'}}/>&nbsp;&nbsp;{leagueName}</span>
              )}

              <span className="caret"></span>
            </button>

            {openList && (
              <ul
                className="dropdown-menu w-100"
                aria-labelledby="dropdownMenu2"
                style={{ display: "block", margin: "-12px 0" }}
              >
                <li
                  onClick={() => {
                    this.getFilterByAllLeague();
                    this.spreadList();
                  }}
                >
                  <a>All Leagues</a>
                </li>
                {allTeamLeagues.map((league, key) => (
                  <li
                    key={key}
                    onClick={() => {
                      this.getFilterByLeague(
                        league.league_id,
                        league.competition_name,
                        league.image
                      ),
                        this.spreadList();
                    }}
                  >
                   <img src={"https://cms-or.om.goaly.mobi/"+league.image} style={{ display:'inline',height:'60px',width:'51px'}}/>
                    <a style={{display:'inline'}}>{league.competition_name}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        </>





        {teamTab === "myTeam" && timeTab === "yesterday" && (
          <YesterdayMyTeamMatches
            teamTab={teamTab}
            timeTab={timeTab}
            userId={userId}
             selectedLeagueId={selectedLeagueId}
          />
        )}
        {teamTab === "myTeam" && timeTab === "today" && (
          <TodayMyTeamMatches
            teamTab={teamTab}
            timeTab={timeTab}
            userId={userId}
            selectedLeagueId={selectedLeagueId}
          />
        )}
        {teamTab === "myTeam" && timeTab === "tomorrow" && (
          <TomorrowMyTeamMatches
            teamTab={teamTab}
            timeTab={timeTab}
            userId={userId}
            selectedLeagueId={selectedLeagueId}
          />
        )}

        {teamTab === "allTeam" && timeTab === "yesterday" && (
          <YesterdayAllTeamMatches
            teamTab={teamTab}
            timeTab={timeTab}
            selectedLeagueId={selectedLeagueId}
          />
        )}
        {teamTab === "allTeam" && timeTab === "today" && (
          <TodayAllTeamMatches
            teamTab={teamTab}
            timeTab={timeTab}
            selectedLeagueId={selectedLeagueId}
          />
        )}
        {teamTab === "allTeam" && timeTab === "tomorrow" && (
          <TomorrowAllTeamMatches
            teamTab={teamTab}
            timeTab={timeTab}
            selectedLeagueId={selectedLeagueId}
          />
        )}
      </React.Fragment>
    );


  }
}
export default withRouter(MatchesFilter);

// import React from 'react';
// import { withRouter } from 'react-router-dom';
// import axios from '../../../_config/axios';
// import Swal from 'sweetalert2';
// import { isArray, isEmpty } from 'lodash';
// import MatchFilteredResult from './MatchFilteredResult';
// import { isAuthenticate, getUserDetails } from '../../../_helper/authentication';

// import './matchesFilter.css';
// class MatchesFilter extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             teamTab: 'allTeam',
//             timeTab: 'yesterday',
//             noData: false,
//             isLoading: false,
//             matches: []
//         }

//     }
//     componentDidMount() {
//         this.teamMatches();
//     }

//     teamMatches = () => {
//         const { teamTab } = this.state;
//         if (teamTab === 'myTeam') {
//             console.log('myyyyyy')
//             if (isAuthenticate && getUserDetails()) {
//                 const user_id = getUserDetails().id;
//                 console.log('Authenticate')
//                 this.myteamMatches(user_id);
//             }
//             else {
//                 console.log('not Authenticate')
//                 Swal.fire({
//                     title: 'You need to login to predict',
//                     type: 'info',
//                     showCancelButton: true,
//                     confirmButtonText: 'OKAY',
//                     cancelButtonText: 'CANCEL'
//                 }).then((result) => {
//                     if (result.value) {
//                         this.props.history.push('/login')
//                     }
//                 })
//             }

//         }
//         if (teamTab === 'allTeam') {
//             this.allteamMatches();

//         }

//     }
//     myteamMatches = (user_id) => {
//         const { timeTab } = this.state;
//         this.setState({ isLoading: true })
//         console.log('myteamMatches')
//         const payload = new FormData();
//         payload.append('type', timeTab);
//         payload.append('user_id', user_id);
//         axios.post('StageGoalyApi/myTeamMatches', payload).then(res => {

//             // console.log(res.data.matches);
//             if (res && res.data.success) {
//                 console.log(res.data.matches.length)
//                 if (isArray(res.data.matches) && res.data.matches.length > 0) {
//                     console.log('available');
//                     this.setState({ matches: res.data.matches })
//                     this.setState({ noData: false })
//                     this.setState({ isLoading: false })
//                 }
//                 if (isEmpty(res.data.matches)) {
//                     console.log('no matches');
//                     this.setState({ noData: true })
//                     this.setState({ isLoading: false })
//                 }

//             }
//             else if (res && res.data.success === 0) {
//                 console.log(res.data.matches.length)

//                 console.log('no matches');
//                 this.setState({ noData: true })
//                 this.setState({ isLoading: false })

//             }
//             this.setState({ isLoading: false })

//         }).catch(err => {
//             console.log(err)
//         });

//     }

//     allteamMatches = () => {
//         const { timeTab } = this.state;
//         console.log('allteamMatches')
//         this.setState({ isLoading: true })
//         const payload = new FormData();
//         payload.append('type', timeTab);
//         payload.append('user_id', 1);
//         axios.post('StageGoalyApi/allTeamMatches', payload).then(res => {
//             if (res && res.data.success) {
//                 if (isArray(res.data.matches) && res.data.matches.length > 0) {
//                     console.log('available');
//                     this.setState({ matches: res.data.matches })
//                     this.setState({ noData: false })
//                     this.setState({ isLoading: false })
//                 }
//                 if (isEmpty(res.data.matches)) {
//                     console.log('no matches');
//                     this.setState({ noData: true })
//                     this.setState({ isLoading: false })
//                 }
//             }
//             else if (res && res.data.success === 0) {
//                 console.log(res.data.matches.length)

//                 console.log('no matches');
//                 this.setState({ noData: true })
//                 this.setState({ isLoading: false })

//             }
//             this.setState({ isLoading: false })

//         }).catch(err => {
//             console.log(err);
//             this.setState({ noData: false })
//         });
//     }

//     render() {
//         const { teamTab, timeTab, matches } = this.state;
//         console.log(matches)
//         return (
//             <React.Fragment>

//                 <div className="block row">
//                     <div className="d-flex" style={{ marginTop: '-2.75em' }}>
//                         <a className={teamTab === 'myTeam' ? "btn btn-lg border btn-purple text-white w-50 mr-1" : "btn btn-lg border btn-white w-50 ml-1"}
//                             onClick={async () => { await this.setState({ teamTab: 'myTeam' }), this.teamMatches() }}>My Team</a>
//                         <a className={teamTab === 'allTeam' ? "btn btn-lg border btn-purple text-white w-50 mr-1" : "btn btn-lg border btn-white w-50 ml-1"}
//                             onClick={async () => { await this.setState({ teamTab: 'allTeam' }), this.teamMatches() }}>All Team</a>
//                     </div>
//                     <ul className="filter-days">
//                         <li className={timeTab === 'yesterday' ? "btn border radius-1 filter-days-active" : "btn border radius-1"}
//                             onClick={async () => { await this.setState({ timeTab: 'yesterday' }), this.teamMatches() }}>Yesterday</li>
//                         <li className={timeTab === 'today' ? "btn border radius-1 filter-days-active" : "btn border radius-1"}
//                             onClick={async () => { await this.setState({ timeTab: 'today' }), this.teamMatches() }}>Today</li>
//                         <li className={timeTab === 'tomorrow' ? "btn border radius-1 filter-days-active" : "btn border radius-1"}
//                             onClick={async () => { await this.setState({ timeTab: 'tomorrow' }), this.teamMatches() }}>Tommorow</li>

//                     </ul>
//                 </div>

//                 <MatchFilteredResult noData={this.state.noData} isLoading={this.state.isLoading} matches={matches} />
//             </React.Fragment>
//         )
//     }
// }
// export default withRouter(MatchesFilter);
