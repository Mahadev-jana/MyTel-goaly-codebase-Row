import React, { Component } from "react";
import account from "../../assets/img/account-1@2x.png";
import cup from "../../assets/img/cup.svg";
import coins from "../../assets/img/coins.svg";
import manchester from '../../assets/img/Manchester united.svg';
import chelsea from '../../assets/img/Chelsea.svg';
import Moment from 'react-moment';
import History from './history';

// const All = React.memo(({ scoreList }) => {
class All extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limitTo: 3,
      seeAll: 'See All',
      startIndex: 0,
      mergedArray: [],
      all: [],
      user: [],
      secondPartOfFirstArray: [],
      size: 3,
      secondPart: [],
      firstPart: [],
      fullArray: [],
      fullArray2: []
    }
  }
  componentDidMount() {
    const { scoreList, id } = this.props;
    const { all, user, secondPart, firstPart, fullArray2 } = this.state;
    console.log(scoreList)
    scoreList.map((element, index) => {

      let sub = {
        "user_id": element.user_id,
        "name": element.name,
        "image": element.image,
        "coins": element.coins,
        "wins": element.wins,
        "rank": element.rank,
        "history": element.history
      }
      this.state.all.push(sub);
    })
    scoreList.map(element => {

      if (element.user_id.search(id) != -1) {
        // {console.log(element.user_id)}
        let sub = {
          "user_id": element.user_id,
          "name": element.name,
          "image": element.image,
          "coins": element.coins,
          "wins": element.wins,
          "rank": element.rank,
          "history": element.history
        }

        user.push(sub);
      }
    })

    this.setState({
      firstPart: all.slice(0, 3),
      secondPart: all.slice(3, all.length),


    })

  }


  onSeeAll = param => () => {

    this.setState({

      limitTo: this.state.limitTo + param,

      seeAll: 'Thats All'
    })
  }
  showAll = param => () => {

    this.setState({

      size: this.state.size + param,

    })
  }

  render() {

    const { scoreList, id } = this.props;
    const { limitTo, startIndex, secondPartOfFirstArray, all, user, size, secondPart, firstPart } = this.state;
    this.state.fullArray = [...this.state.firstPart, ...user, ...this.state.secondPart]
    this.state.fullArray2 = [...this.state.firstPart, ...this.state.secondPart]

    const isUserExistInFirstPart = firstPart.some(part => part.user_id === id);
    console.log({ isUserExistInFirstPart, firstPart, id });
    console.log(id)
    // console.log(this.state.firstPart.user_id)
    console.log(all)
    console.log(user)
    // console.log(array)
    console.log(secondPart)
    console.log(firstPart)
    console.log(this.state.fullArray)
    console.log(this.state.fullArray2)
    // console.log(this.props.scoreList)

    return (

      <div class="cover-board" style={{ paddingTop: '24px' }}>
        {isUserExistInFirstPart ?
          <>
            {!!this.state.fullArray &&
              this.state.fullArray.slice(0, size).map((score, key) => {

                return <>
                  {/* {console.log(score.user_id)} */}
                  <div class="board shadow">
                    <div class="player">
                      <div class="cover-img">
                        <img style={{ borderRadius: '50%' }} src={score.image} alt="" />
                        <div>{score.rank}</div>
                      </div>
                      <span class="name my-2">{score.name}</span>
                      <div class="achievement">
                        <div class="win">
                          <img src={cup} alt="" />
                          <span>{score.wins} Won</span>
                        </div>
                        <span class="text-secondary">|</span>
                        <div class="point">
                          <img src={coins} alt="" />
                          <span>{score.coins} Points</span>
                        </div>
                      </div>
                    </div>
                    {!!score.history && <div class="history">
                      <h4>History Point</h4>
                      <div class="cover-record">
                      </div>
                    </div>}
                    {/* {score.history.length<=3 */}
                    {!!score.history && score.history.slice(startIndex, limitTo).map((details, index) => {
                      {/* console.log(details.length) */ }
                      {/* {/* <History details={this.details}/> */ } 
                      return <>
                      <History/>
                        {/* <div class="record">
                          <div class="match">
                            <div class="left-team">
                              <img
                                src={details.homeTeamLogo}
                                width="20%"
                                alt=""
                              />{" "}
                              {details.homeTeamName}
                            </div>
                            <span class="score">{details.homeTeamScore}-{details.awayTeamScore}</span>
                            <div class="right-team">
                              <img src={details.awayTeamLogo}
                                width="20%" alt="" />{" "}
                              {details.awayTeamName}
                            </div>
                          </div>
                          <div class="match-point">
                            <span class="date"><Moment format="ddd, DD/MM/YY">{details.created_at}</Moment></span>
                            <span class="point">{details.coin_won} Points</span>
                          </div>
                        </div>
                      */}
                     </>
                    })}
                  </div>
                  <div class="see-all">
                    <a onClick={this.onSeeAll((score.history.length - 1))}>See All</a>
                  </div>
                </>
              })}
            <button onClick={this.showAll(this.state.fullArray.length - 1)} style={{background: 'darkmagenta'}}>See All Leaders</button>
          </>





          : <>
            {!!this.state.fullArray &&
              this.state.fullArray.slice(0, size).map((score, key) => {

                return <>
                  <div class="board shadow">
                    <div class="player">
                      <div class="cover-img">
                        <img style={{ borderRadius: '50%' }} src={score.image} alt="" />
                        <div>{score.rank}</div>
                      </div>
                      <span class="name my-2">{score.name}</span>
                      <div class="achievement">
                        <div class="win">
                          <img src={cup} alt="" />
                          <span>{score.wins} Won</span>
                        </div>
                        <span class="text-secondary">|</span>
                        <div class="point">
                          <img src={coins} alt="" />
                          <span>{score.coins} Points</span>
                        </div>
                      </div>
                    </div>
                    {!!score.history && <div class="history">
                      <h4>History Point</h4>
                      <div class="cover-record">
                      </div>
                    </div>}
                    {/* {score.history.length<=3 */}
                    {!!score.history && 
                      <History historyScore={score.history}/>
                    }
                    
                    {/* {!!score.history && score.history.slice(startIndex, limitTo).map((details, index) => {
                      return <>
                        <div class="record">
                          <div class="match">
                            <div class="left-team">
                              <img
                                src={details.homeTeamLogo}
                                width="20%"
                                alt=""
                              />{" "}
                              {details.homeTeamName}
                            </div>
                            <span class="score">{details.homeTeamScore}-{details.awayTeamScore}</span>
                            <div class="right-team">
                              <img src={details.awayTeamLogo}
                                width="20%" alt="" />{" "}
                              {details.awayTeamName}
                            </div>
                          </div>
                          <div class="match-point">
                            <span class="date"><Moment format="ddd, DD/MM/YY">{details.created_at}</Moment></span>
                            <span class="point">{details.coin_won} Points</span>
                          </div>
                        </div>
                      </>
                    })} */}
                  </div>
                  {/* <div class="see-all">
                    <a onClick={this.onSeeAll((score.history.length - 1))}>See All</a>
                  </div> */}
                </>
              })}
            <button onClick={this.showAll(this.state.fullArray.length - 1)} style={{background: 'darkmagenta'}}>See All Leaders</button>
          </>
        }



      </div>
    );
  }
}
// });

export default All;

// return <>
// <div class="record">
//   <div class="matches">
//     <div class="left-team">
//       <img
//         src={details.homeTeamLogo}
//         width="20%"
//         alt=""
//       />{" "}
//       {details.homeTeamName}
//     </div>
//     <span class="score">{details.homeTeamScore}-{details.awayTeamScore}</span>
//     <div class="right-team">
//       <img src={details.awayTeamLogo}
//         width="20%" alt="" />{" "}
//       {details.awayTeamName}
//     </div>
//   </div>
//   <div class="matches-point">
//     <span class="date"><Moment format="ddd, DD/MM/YY">{details.created_at}</Moment></span>
//     <span class="point">{details.coin_won} Points</span>
//   </div>
// </div>
// </>