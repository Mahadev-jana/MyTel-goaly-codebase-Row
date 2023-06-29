import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import * as moment from "moment";
import noDataImg from "../../../assetsStaging/img/no_data_found.png";
import { RewardDetailsSimmer } from "../../../simmer-loader/index";
import axios from "../../../_config/axios";
import { isArray, isEmpty } from "lodash";
const TodayAllTeamMatches = (props) => {
  const [matches, setMatches] = React.useState([]);
  const [isLoading, setisLoading] = React.useState(true);
  const [noData, setNoData] = React.useState(false);

  // useEffect(() => {
  //   myTeamFiteredMatches();
  // }, []);

  useEffect(() => {
    setisLoading(true);
    console.log(props)
    if(props.selectedLeagueId!=0){
      matchesdropdown();
    }
    else{
      myTeamFiteredMatches();
    }
    //myTeamFiteredMatches();
  }, [props.selectedLeagueId]);


  const myTeamFiteredMatches = () => {
    const { teamTab, timeTab } = props;
    // console.log(props)
    // console.log(teamTab)
    // console.log(timeTab)
    const payload = new FormData();
    payload.append("type", timeTab);
    // payload.append('user_id',userId);
    axios
      .post("StageGoalyApi/allTeamMatches", payload)
      .then((res) => {
        if (res.data) {
          if (
            res.data.code == 200 &&
            res.data.success == 1 &&
            res.data.error == 0
          ) {
            if (isArray(res.data.matches) && res.data.matches.length > 0) {
              setMatches(res.data.matches);
              setisLoading(false);
              // console.log(res.data)
            }
            if (isEmpty(res.data.matches)) {
              setNoData(true);
              setisLoading(false);
              // console.log(res.data)
            }
          }
          if (
            res.data.code == 400 &&
            res.data.success == 0 &&
            res.data.error == 1
          ) {
            if (isEmpty(res.data.matches)) {
              setNoData(true);
              setisLoading(false);
              // console.log(res.data)
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const matchesdropdown =  () =>{
    let today = new Date();
    let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
     const payload = new FormData();
     payload.append("date",date);
     payload.append("type",props.timeTab);
     payload.append("league_id",props.selectedLeagueId);
     axios.post('StageGoalyApi/MatchesListByLeague',payload).then(res=>{
       console.log(res)
       if(isEmpty(res.data.matches) && res.data.matches.length == 0 ){
         setMatches(res.data.matches)
        setNoData(true);
        setisLoading(false);
       }
       if (isArray(res.data.matches) && res.data.matches.length > 0) {
        setMatches(res.data.matches);
        setisLoading(false);
      }
     }).catch(err=>{
       console.log('error')
     })
   };
   

  // console.log(props)
  return (
    <React.Fragment>
      {props.selectedLeagueId != 0 ? (
        <div>
          {matches &&
            matches
              .filter((a) => a.league_id === props.selectedLeagueId)
              .map((match, key) => (
                <div key={key}>
                  <div className="matches row">
                    <div className="d-flex j-center">
                      <div
                        className="club-left mx-1 text-center"
                        style={{ width: "80px" }}
                      >
                        <div
                          className="logo"
                          style={{ height: "80px", width: "80px" }}
                          onClick={() =>
                            props.history.push(
                              `/club-info/${match.homeTeam_id}`
                            )
                          }
                        >
                          <img
                            style={{ height: "65px", width: "65px" }}
                            src={match.homeTeam_image}
                            alt=""
                          />
                        </div>
                        <h5 className="mb-0"><span class="notranslate">{match.homeTeam_name}</span></h5>
                      </div>
                      <div className="mid mx-2 d-flex flex-column my-auto">
                        {match.status === "FT" && (
                          <div
                            className="d-flex j-center h-max-c border radius-1 px-2 py-1"
                            style={{ fontSize: "16pt" }}
                          >
                            <span class="notranslate">
                              {match.localteam_score == ""
                                ? 0
                                : match.localteam_score}
                            </span>
                            <span className="mx-2 border-right"></span>
                            <span class="notranslate">
                              {match.visitorteam_score == ""
                                ? 0
                                : match.visitorteam_score}
                            </span>
                          </div>
                        )}
                        <span className="my-1">
                          {utcToLocal(match.date_time)}
                        </span>
                        {match.status === "FT" && (
                          <span className="btn-pill bg-red">Finished</span>
                        )}
                        {match.status === "NS" && (
                          <span
                            className="btn-pill bg-green"
                            onClick={() =>
                              props.history.push(
                                `match/details/${match.fixture_id}`
                              )
                            }
                          >
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <div
                        className="club-right mx-1 text-center"
                        style={{ width: "80px" }}
                      >
                        <div
                          className="logo"
                          style={{ height: "80px", width: "80px" }}
                          onClick={() =>
                            props.history.push(`/club-info/${atch.awayTeam_id}`)
                          }
                        >
                          <img
                            style={{ height: "65px", width: "65px" }}
                            src={match.awayTeam_image}
                            alt=""
                          />
                        </div>
                        <h5 className="mb-0"><span class="notranslate">{match.awayTeam_name}</span></h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      ) : (
        <div>
          {matches &&
            matches.map((match, key) => (
              <div key={key}>
                <div className="matches row">
                  <div className="d-flex j-center">
                    <div
                      className="club-left mx-1 text-center"
                      style={{ width: "80px" }}
                    >
                      <div
                        className="logo"
                        style={{ height: "80px", width: "80px" }}
                        onClick={() =>
                          props.history.push(`/club-info/${match.homeTeam_id}`)
                        }
                      >
                        <img
                          style={{ height: "65px", width: "65px" }}
                          src={match.homeTeam_image}
                          alt=""
                        />
                      </div>
                      <h5 className="mb-0"><span class="notranslate">{match.homeTeam_name}</span></h5>
                    </div>
                    <div className="mid mx-2 d-flex flex-column my-auto">
                      {match.status === "FT" && (
                        <div
                          className="d-flex j-center h-max-c border radius-1 px-2 py-1"
                          style={{ fontSize: "16pt" }}
                        >
                          <span class="notranslate">
                            {match.localteam_score == ""
                              ? 0
                              : match.localteam_score}
                          </span>
                          <span className="mx-2 border-right"></span>
                          <span class="notranslate">
                            {match.visitorteam_score == ""
                              ? 0
                              : match.visitorteam_score}
                          </span>
                        </div>
                      )}
                      <span className="my-1">
                        {utcToLocal(match.date_time)}
                      </span>
                      {match.status === "FT" && (
                        <span className="btn-pill bg-red">Finished</span>
                      )}
                      {match.status === "NS" && (
                        <span
                          className="btn-pill bg-green"
                          onClick={() =>
                            props.history.push(
                              `match/details/${match.fixture_id}`
                            )
                          }
                        >
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <div
                      className="club-right mx-1 text-center"
                      style={{ width: "80px" }}
                    >
                      <div
                        className="logo"
                        style={{ height: "80px", width: "80px" }}
                        onClick={() =>
                          props.history.push(`/club-info/${atch.awayTeam_id}`)
                        }
                      >
                        <img
                          style={{ height: "65px", width: "65px" }}
                          src={match.awayTeam_image}
                          alt=""
                        />
                      </div>
                      <h5 className="mb-0"><span class="notranslate">{match.awayTeam_name}</span></h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      {isLoading && <RewardDetailsSimmer />}
      {!isLoading && noData && (
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "280px",
          }}
        >
          <img
            style={{ height: "200px" }}
            src={noDataImg}
            className="animated bounce infinite"
            alt="Transparent MDB Logo"
            id="animated-img1"
          />
        </div>
      )}
    </React.Fragment>
  );
};
export default withRouter(TodayAllTeamMatches);

const utcToLocal = (dateTime) => {
  const stillUtc = moment.utc(dateTime).toDate();
  return moment(stillUtc).local().format("YYYY-MM-DD HH:mm:ss");
};
