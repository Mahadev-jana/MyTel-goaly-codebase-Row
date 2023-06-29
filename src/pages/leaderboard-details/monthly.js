import React, { Component } from 'react';
import History from './history';
import cup from "../../assets/img/cup.svg";
import coins from "../../assets/img/coins.svg";
class Monthly extends Component {
  constructor(props) {
    super(props);
   
  }
  
  render() {
    const { scoreList } = this.props;
    return (

      <div class="cover-board" style={{ paddingTop: '24px' }}>
        {!!scoreList &&
          scoreList.map((score, key) => {

            return <div key={key}>
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
                
                {!!score.history && 
                  <History historyScore={score.history}/>
                }
                
              </div>
              
            </div>
          })}

      </div>
    );
  }
}

export default Monthly;