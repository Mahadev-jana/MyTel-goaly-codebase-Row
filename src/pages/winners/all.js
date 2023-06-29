import React from "react";
import account from "../../assets/img/account-1@2x.png";
import cup from "../../assets/img/cup.svg";
import coins from "../../assets/img/coins.svg";
import manchester from '../../assets/img/Manchester united.svg';
import chelsea from '../../assets/img/Chelsea.svg';
import Moment from 'react-moment';
import noImage from '../../assets/img/noimage.jpg';
import prize_two from '../../assets/img/prize/Image 2@2x.png';
import prize_four from '../../assets/img/prize/Image 4@2x.png';
import prize_three from '../../assets/img/prize/Image 3@2x.png';
import prize_five from '../../assets/img/prize/Image 5@2x.png';
import person_logo from '../../assets/img/person.svg';

import clock from "../../assets/img/clock.svg";
import '../../assets/css/winners.css';

const All = React.memo(({ scoreList ,allPrize}) => {
    //console.log(allPrize);

    return (

        <div class="cover-winner">
        {scoreList.length===0? <div style={{}}>
        {!!allPrize && allPrize.map((data, key) => {
        return<div>
        <div class="winner">
                        <div class="cover-image">
                            <div>
                                <img 
                                // style={{
                                //     borderRadius:'50%'
                                // }}
                                src={data.prize_image} alt="" />
                            </div>
                        </div>
                        <div class="details">
                            <div class="details-container">
                                <h3 class="title" style={{ 'border': 'none' }}>{data.prize_name}</h3>
                                
                                <div class="detail-column">
                                    <div class="icon"><img src={clock} alt="" class="mr-2" /></div>
                                    <span style={{
                                        fontSize:'14px'
                                    }}>{data.start_date } - {data.end_date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
            })
        }
        </div>:
            <div>{!!scoreList && scoreList.map((details, key) => {
                return <>
                    <div class="winner">
                        <div class="cover-image">
                            <div>
                                <img src={details.prize_image} alt="" />
                            </div>
                        </div>
                        <div class="details">
                            <div class="details-container">
                                <h3 class="title" style={{ 'border': 'none' }}>{details.prize_name}</h3>
                                <div class="detail-column">
                                    <div class="icon">
                                    {
                                        // !details.prize_image &&
                                        // <img src={person_logo} alt="" class="mr-2" />
                                    }
                                        {
                                            // details.prize_image &&
                                            <img
                                            // style={{
                                            //     borderRadius:'50%'
                                            // }} 
                                            src={person_logo} alt="" class="mr-2" />
                                        }
                                    </div>
                                    <span>{details.name}</span>
                                </div>
                                <div class="detail-column">
                                    <div class="icon"><img src={coins} alt="" class="mr-2" /></div>
                                    <span>{details.points} Points</span>
                                </div>
                                <div class="detail-column">
                                    <div class="icon"><img src={clock} alt="" class="mr-2" /></div>
                                    <span
                                    style={{
                                        fontSize:'14px'
                                    }}
                                    >{details.start_date} - {details.end_date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            })
            }
            {!!allPrize && allPrize.slice(scoreList.length, 4).map((data, key) => {
        return<div>
        <div class="winner">
                        <div class="cover-image">
                            <div>
                                <img 
                                // style={{
                                //     borderRadius:'50%'
                                // }}
                                src={data.prize_image} alt="" />
                            </div>
                        </div>
                        <div class="details">
                            <div class="details-container">
                                <h3 class="title" style={{ 'border': 'none' }}>{data.prize_name}</h3>
                                
                                <div class="detail-column">
                                    <div class="icon"><img src={clock} alt="" class="mr-2" /></div>
                                    <span style={{
                                        fontSize:'14px'
                                    }}>{data.start_date } - {data.end_date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
            })
        }
            </div>}
        </div>
    );
});

export default All;
