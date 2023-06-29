import React, { Component } from 'react';
import Moment from 'react-moment';
class history extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seeAll: false,
            startIndex: 0,
            limitTo: 3
        }
    }


    onSeeAll = param => () => {

        this.setState({

          limitTo: this.state.limitTo + param,

        })
      }
    render() {
        const { historyScore } = this.props;
        const { startIndex, limitTo } = this.state;
        console.log(this.props.historyScore)
        return (
            <div>
                {!!historyScore && historyScore.slice(startIndex, limitTo).map((details, index) => {

                    return (
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
                    )

                })}
                {historyScore.length>limitTo &&
                    <div class="see-all">
                    <a onClick={this.onSeeAll((historyScore.length - 1))}>See All</a>
                  </div>
                }
                
            </div>

        )
    }
}
export default history;
