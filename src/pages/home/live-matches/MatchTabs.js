import React, { Component, useState } from "react";
import classnames from "classnames";
import { Tabs, Tab, Row, Col } from "react-bootstrap";
import { size, merge, isEmpty, filter } from "lodash";

import Stats from "../../match-details/tabs/stats";
import axios from "../../../_config/axios";
import { isArray } from "lodash";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Timeline from "./timeline/Timeline";
import LineUps from "./LineUps";
import Comments from "../../match-details/tabs/comments";
import Players from "./players";
import Prediction from "../../match-details/tabs/predictions";
import News from "../../home/list-matches/News";
import HeadToHead from "../../score-prediction/HeadToHead";
import LastMatch from "../../score-prediction/LastMatch";

import timeline2 from "../../../assets/img/detail-match/icon-menu/timeline.png";
import player2 from "../../../assets/img/detail-match/icon-menu/players.png";
import lineups2 from "../../../assets/img/detail-match/icon-menu/lineups.png";
import stats2 from "../../../assets/img/detail-match/icon-menu/stats.png";
import head2head2 from "../../../assets/img/detail-match/icon-menu/head2head.png";
import prediction2 from "../../../assets/img/detail-match/icon-menu/prediction.png";
import livechat2 from "../../../assets/img/detail-match/icon-menu/live-chat.png";
import news2 from "../../../assets/img/detail-match/icon-menu/news.png";

import timeline from "../../../assets/img/detail-match/icon-menu/timeline2.png";
import player from "../../../assets/img/detail-match/icon-menu/players2.png";
import lineups from "../../../assets/img/detail-match/icon-menu/lineups2.png";
import stats from "../../../assets/img/detail-match/icon-menu/stats2.png";
import head2head from "../../../assets/img/detail-match/icon-menu/head2head2.png";
import prediction from "../../../assets/img/detail-match/icon-menu/prediction2.png";
import livechat11 from "../../../assets/img/detail-match/icon-menu/live-chat2.png";
import news from "../../../assets/img/detail-match/icon-menu/news2.png";
import "./live-matches.css";
import Cookies from 'js-cookie';

const MatchTabs = (props) => {
  //console.log(props.status)
  //const [tab, setTab] = useState('timeline');
  const [tab, setTab] = useState('headtohead');
  //const[status,setStatus] = useState('NS') ;
  const[tabs,setTabs] = useState('timeline');
  
  return (
    <div className="row match-detail-body">

      {props.status=='NS'?
      <>
      <div className="menu mb-0" >
        <ul className="nav nav-pills" >
        <li className={tab === "headtohead" ? "active" : ""}><a  variant={tab} onClick={() => setTab("headtohead")}>{tab === "headtohead" ? <img src={head2head} /> : <img src={head2head2} />}Head to Head</a></li>
          <li className={tab === "prediction" ? "active" : ""}><a onClick={() => setTab("prediction")}>{tab === "prediction" ? <img src={prediction} /> : <img src={prediction2} />}Prediction</a></li>
          <li className={tab === "timeline" ? "active" : ""}><a /*variant={tab}*/ onClick={() => setTab("timeline")}>{tab === "timeline" ? <img src={timeline} /> : <img src={timeline2} />}Timeline</a></li>
          <li className={tab === "players" ? "active" : ""}><a onClick={() => setTab("players")}>{tab === "players" ? <img src={player} /> : <img src={player2} />}Players</a></li>
          <li className={tab === "lineups" ? "active" : ""} ><a onClick={() => setTab("lineups")}>{tab === "lineups" ? <img src={lineups} /> : <img src={lineups2} />}Lineups</a></li>
          <li className={tab === "stats" ? "active" : ""}><a onClick={() => setTab("stats")}>{tab === "stats" ? <img src={stats} /> : <img src={stats2} />}Stats</a></li>
          <li className={tab === "comments" ? "active" : ""}><a onClick={() => setTab("comments")}>{tab === "comments" ? <img src={livechat11} /> : <img src={livechat2} />}Live Chat</a></li>
          <li className={tab === "news" ? "active" : ""}><a onClick={() => setTab("news")}>{tab === "news" ? <img src={news} /> : <img src={news2} />}News</a></li>
        </ul>
      </div>

      {tab === "timeline" && props.showtimeline && (
        <Timeline comment={props.comment}

          loadingCommentLineup={props.loadingCommentLineup}
        // timelines={match.comments}
        //  homeTeamId={match.homeTeam.id}
        //  awayTeamId={match.awayTeam.id}
        //  scrolled={this.state.scrolled}
        />
      )}
      {tab === "lineups" && (
        <LineUps lineup={props.lineup}
          // timelines={match.comments}
          homeTeamId={props.homeTeamId}
          awayTeamId={props.awayTeamId}
          homeTeamName={props.homeTeamName}
          awayTeamName={props.awayTeamName}
          homeTeamLogo={props.homeTeamLogo}
          awayTeamLogo={props.awayTeamLogo}
        //  scrolled={this.state.scrolled}
        />
      )}
      {tab === "players" && (
        <Players playersStats={props.playersStats}
          loadingPlayerStat={props.loadingPlayerStat}
        />
      )}
      {props.playersStats && tab === "stats" && (
        <Stats
          playersStats={props.playersStats}
          homeTeamLogo={props.homeTeamLogo}
          awayTeamLogo={props.awayTeamLogo}
          loadingPlayerStat={props.loadingPlayerStat}
        />
      )}
      {/*console.log(props.playersStats,'props.homeTeamId')*/}
      {props.homeTeamId != "" && tab === "headtohead" && (
        <div>
          <HeadToHead
            homeTeamId={props.homeTeamId}
            awayTeamId={props.awayTeamId}
          // scrolled={this.state.scrolled}
          />
          <LastMatch
            homeTeamId={props.homeTeamId}
            awayTeamId={props.awayTeamId}
          // scrolled={this.state.scrolled}
          />
        </div>
      )}
      {/* {console.log(props.prediction)} */}
      {!props.loadingPrediction && tab === "prediction" && (
        
        <Prediction
          homeTeamId={props.homeTeamId}
          awayTeamId={props.awayTeamId}
         prediction={props.prediction}
         loadingPrediction={props.loadingPrediction}
        //  scrolled={this.state.scrolled}
        />
      )}
      {tab === "comments" && <Comments
        id={props.matchId}
      />}
      {tab === "news" &&
        (
          <div>
            <News
              id={props.matchId}
              homeTeamName={props.homeTeamName}
              awayTeamName={props.awayTeamName}
              homeTeamId={props.homeTeamId}
              awayTeamId={props.awayTeamId}
              dateTime={props.dateTime}
            // matchDetails={match}
            // scrolled={this.state.scrolled}
            />
          </div>
        )}

      </>:
      <>
      {/* else portion */}
      <div className="menu mb-0" >
        <ul className="nav nav-pills" >
          <li className={tabs === "timeline" ? "active" : ""}><a variant={tabs} onClick={() => setTabs("timeline")}>{tabs === "timeline" ? <img src={timeline} /> : <img src={timeline2} />}Timeline</a></li>
          <li className={tabs === "players" ? "active" : ""}><a onClick={() => setTabs("players")}>{tabs === "players" ? <img src={player} /> : <img src={player2} />}Players</a></li>
          <li className={tabs === "lineups" ? "active" : ""} ><a onClick={() => setTabs("lineups")}>{tabs === "lineups" ? <img src={lineups} /> : <img src={lineups2} />}Lineups</a></li>
          <li className={tabs === "stats" ? "active" : ""}><a onClick={() => setTabs("stats")}>{tabs === "stats" ? <img src={stats} /> : <img src={stats2} />}Stats</a></li>
          <li className={tabs === "headtohead" ? "active" : ""}><a onClick={() => setTabs("headtohead")}>{tabs === "headtohead" ? <img src={head2head} /> : <img src={head2head2} />}Head to Head</a></li>
          <li className={tabs === "prediction" ? "active" : ""}><a onClick={() => setTabs("prediction")}>{tabs === "prediction" ? <img src={prediction} /> : <img src={prediction2} />}
          { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?

            <span class="notranslate">ခန့်မှန်းခြင်</span>
          :
             <span>Prediction</span>
          }
          </a></li>
          <li className={tabs === "comments" ? "active" : ""}><a onClick={() => setTabs("comments")}>{tabs === "comments" ? <img src={livechat11} /> : <img src={livechat2} />}Live Chat</a></li>
          <li className={tabs === "news" ? "active" : ""}><a onClick={() => setTabs("news")}>{tabs === "news" ? <img src={news} /> : <img src={news2} />}News</a></li>
        </ul>
      </div>

      {tabs === "timeline" && props.showtimeline && (
        <Timeline comment={props.comment}

          loadingCommentLineup={props.loadingCommentLineup}
        // timelines={match.comments}
        //  homeTeamId={match.homeTeam.id}
        //  awayTeamId={match.awayTeam.id}
        //  scrolled={this.state.scrolled}
        />
      )}
      {tabs === "lineups" && (
        <LineUps lineup={props.lineup}
          // timelines={match.comments}
          homeTeamId={props.homeTeamId}
          awayTeamId={props.awayTeamId}
          homeTeamName={props.homeTeamName}
          awayTeamName={props.awayTeamName}
          homeTeamLogo={props.homeTeamLogo}
          awayTeamLogo={props.awayTeamLogo}
        //  scrolled={this.state.scrolled}
        />
      )}
      {tabs === "players" && (
        <Players playersStats={props.playersStats}
          loadingPlayerStat={props.loadingPlayerStat}
        />
      )}
      {props.playersStats && tabs === "stats" && (
        <Stats
          playersStats={props.playersStats}
          homeTeamLogo={props.homeTeamLogo}
          awayTeamLogo={props.awayTeamLogo}
          loadingPlayerStat={props.loadingPlayerStat}
        />
      )}
      {/*console.log(props.playersStats,'props.homeTeamId')*/}
      {props.homeTeamId != "" && tabs === "headtohead" && (
        <div>
          <HeadToHead
            homeTeamId={props.homeTeamId}
            awayTeamId={props.awayTeamId}
          // scrolled={this.state.scrolled}
          />
          <LastMatch
            homeTeamId={props.homeTeamId}
            awayTeamId={props.awayTeamId}
          // scrolled={this.state.scrolled}
          />
        </div>
      )}
      {/* {console.log(props.prediction)} */}
      {!props.loadingPrediction && tabs === "prediction" && (
        
        <Prediction
          homeTeamId={props.homeTeamId}
          awayTeamId={props.awayTeamId}
         prediction={props.prediction}
         loadingPrediction={props.loadingPrediction}
        //  scrolled={this.state.scrolled}
        />
      )}
      {tabs === "comments" && <Comments
        id={props.matchId}
      />}
      {tabs === "news" &&
        (
          <div>
            <News
              id={props.matchId}
              homeTeamName={props.homeTeamName}
              awayTeamName={props.awayTeamName}
              homeTeamId={props.homeTeamId}
              awayTeamId={props.awayTeamId}
              dateTime={props.dateTime}
            // matchDetails={match}
            // scrolled={this.state.scrolled}
            />
          </div>
        )}

      </>
      }






      {/*<>
      <div className="menu mb-0" >
        <ul className="nav nav-pills" >
          <li className={tab === "timeline" ? "active" : ""}><a variant={tab} onClick={() => setTab("timeline")}>{tab === "timeline" ? <img src={timeline} /> : <img src={timeline2} />}Timeline</a></li>
          <li className={tab === "players" ? "active" : ""}><a onClick={() => setTab("players")}>{tab === "players" ? <img src={player} /> : <img src={player2} />}Players</a></li>
          <li className={tab === "lineups" ? "active" : ""} ><a onClick={() => setTab("lineups")}>{tab === "lineups" ? <img src={lineups} /> : <img src={lineups2} />}Lineups</a></li>
          <li className={tab === "stats" ? "active" : ""}><a onClick={() => setTab("stats")}>{tab === "stats" ? <img src={stats} /> : <img src={stats2} />}Stats</a></li>
          <li className={tab === "headtohead" ? "active" : ""}><a onClick={() => setTab("headtohead")}>{tab === "headtohead" ? <img src={head2head} /> : <img src={head2head2} />}Head to Head</a></li>
          <li className={tab === "prediction" ? "active" : ""}><a onClick={() => setTab("prediction")}>{tab === "prediction" ? <img src={prediction} /> : <img src={prediction2} />}Prediction</a></li>
          <li className={tab === "comments" ? "active" : ""}><a onClick={() => setTab("comments")}>{tab === "comments" ? <img src={livechat11} /> : <img src={livechat2} />}Live Chat</a></li>
          <li className={tab === "news" ? "active" : ""}><a onClick={() => setTab("news")}>{tab === "news" ? <img src={news} /> : <img src={news2} />}News</a></li>
        </ul>
      </div>
      </>*/}
      
    </div>
  )
}
export default MatchTabs;
// class MatchTabs extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       live: [],
//       value: '',
//       tab: 'timeline',
//       scrolled:false,
//       goalsLines:0

//     }
//   }
//   componentDidMount(){

//       window.addEventListener('scroll',()=>{
//         const isTop = window.scrollY<346;
//         console.log(window.scrollY)
//         if(isTop!==true){
//           this.setState({
//             scrolled:true
//           })
//         }
//         else{
//           this.setState({
//             scrolled:false
//           })
//         }
//     })
//   }

//   componentWillUnmount(){
//     window.removeEventListener('scroll',()=>{});
//   }

//   setTab(tab) {
//     this.setState({
//       tab: tab
//     });
//     this.setState({ id: this.props.id });
//   }

//   render() {
//     const { match, livechat } = this.props

//     return (
//       <div class="row match-detail-body">
//         <div class={this.state.scrolled ? "menu scrolled" : "menu"}>
//           <ul class="nav nav-pills" >
//             <li 
//             className={this.state.tab === "timeline" ? "active" : ""}>
//             <a variant={this.state.tab} 
//              onClick={() => this.setState({ tab: 'timeline' })}>
//             {this.state.tab === "timeline" ? <img src= {timeline} /> : <img src= {timeline2} /> }Timeline</a></li>
//             <li className={this.state.tab === "players" ? "active" : ""}><a onClick={() => this.setState({ tab: 'players' })}>{this.state.tab === "players" ? <img src= {player} /> : <img src= {player2} /> }Players</a></li>
//             <li className={this.state.tab === "lineups" ? "active" : ""} ><a onClick={() => this.setState({ tab: 'lineups' })}>{this.state.tab === "lineups" ? <img src= {lineups} /> : <img src= {lineups2} /> }Lineups</a></li>
//             <li className={this.state.tab === "stats" ? "active" : ""}><a   onClick={() => this.setState({ tab: 'stats' })}>{this.state.tab === "stats" ? <img src= {stats} /> : <img src= {stats2} /> }Stats</a></li>
//             <li className={this.state.tab === "headtohead" ? "active" : ""}><a onClick={() => this.setState({ tab: 'headtohead' })}>{this.state.tab === "headtohead" ? <img src= {head2head} /> : <img src= {head2head2} /> }Head to Head</a></li>
//             <li className={this.state.tab === "prediction" ? "active" : ""}><a onClick={() => this.setState({ tab: 'prediction' })}>{this.state.tab === "prediction" ? <img src= {prediction} /> : <img src= {prediction2} /> }Prediction</a></li>
//             <li className={this.state.tab === "comments" ? "active" : ""}><a onClick={() => this.setState({ tab: 'comments' })}>{this.state.tab === "comments" ? <img src= {livechat11} /> : <img src= {livechat2} /> }Live Chat</a></li>
//             <li className={this.state.tab === "news" ? "active" : ""}><a  onClick={() => this.setState({ tab: 'news' })}>{this.state.tab === "news" ? <img src= {news} /> : <img src= {news2} /> }News</a></li>
//           </ul>
//         </div>
//         {

//           this.state.tab === "timeline" && (
//           <Timeline
//             timelines={match.comments}
//             homeTeamId={match.homeTeam.id}
//             awayTeamId={match.awayTeam.id}
//             scrolled={this.state.scrolled}
//           />
//         )}
//         {
//           this.state.tab === "players" && (
//           <Players players={match.playersStats} scrolled={this.state.scrolled} />
//         )}
//         {this.state.tab === "lineups" && (
//           <LineUps
//             homeTeam={match.homeTeam}
//             awayTeam={match.awayTeam}
//             lineup={match.lineup}
//             scrolled={this.state.scrolled}
//           />
//         )}
//         {!!match &&
//           match.homeTeam.logo_path &&
//           match.awayTeam.logo_path && this.state.tab === "stats" && (
//             <Stats
//               stats={match.stats}
//               home_logo={match.homeTeam.logo_path}
//               away_logo={match.awayTeam.logo_path}
//               scrolled={this.state.scrolled}
//             />
//           )}
//         {!!match && !isEmpty(match) && match.predictions && this.state.tab === "headtohead" && (
//           <div>
//             <HeadToHead
//               homeTeam={match.homeTeam.id} awayTeam={match.awayTeam.id}
//               scrolled={this.state.scrolled}
//             />
//             <LastMatch
//               teamName={match.homeTeam.name} homeTeam={match.homeTeam.id} awayTeam={match.awayTeam.id}
//               scrolled={this.state.scrolled}
//             />

//           </div>
//         )}
//         {!!match && !isEmpty(match) && match.predictions && this.state.tab === "prediction" && (
//           <Prediction
//             homeTeam={match.homeTeam.id}
//             awayTeam={match.awayTeam.id}
//             prediction={match.predictions}
//             scrolled={this.state.scrolled}
//           />
//         )}
//         {!isEmpty(match) && this.state.tab === "comments" && <Comments
//           id={match.id}
//         />}
//         {!!match && !isEmpty(match) && this.state.tab === "news" &&
//           (
//             <div>
//               <News
//                 id={match.league_id}
//                 matchDetails={match}
//                 scrolled={this.state.scrolled}
//               />
//             </div>
//           )}
//       </div>

//     );
//   }
// }

// export default MatchTabs;

