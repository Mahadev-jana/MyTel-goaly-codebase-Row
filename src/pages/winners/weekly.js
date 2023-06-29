import React from 'react';
import { Grid, Col, Row, Image } from 'react-bootstrap';
import { hasIn, size } from 'lodash';
// import HomeTeamGoals from './HomeTeamGoals';
// import noImage from '../../../assets/img/noimage.jpg'
import { Link } from 'react-router-dom';
import noImage from '../../assets/img/noimage.jpg';
import prize_two from '../../assets/img/prize/Image 2@2x.png';
import prize_four from '../../assets/img/prize/Image 4@2x.png';
import prize_three from '../../assets/img/prize/Image 3@2x.png';
import prize_five from '../../assets/img/prize/Image 5@2x.png';
import person_logo from '../../assets/img/person.svg';
import coins from "../../assets/img/coins.svg";
import clock from "../../assets/img/clock.svg";
import '../../assets/css/winners.css';
import Moment from 'react-moment';

const Weekly = React.memo(({ scoreList,weeklyPrize }) => {

    //console.log(weeklyPrize);

    return (

        <div class="cover-winner">
        {scoreList.length===0? <div>
            {!!weeklyPrize && weeklyPrize.map((data, key) => {
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
                                <h3 class="title" style={{ 'border': 'none' }}>{data.rank}. Prize - {data.prize_name}</h3>
                                
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
        <div>
            {!!scoreList && scoreList.map((details, key) => {
                return (
                    <div class="winner">
                        <div class="cover-image">
                            <div>
                                <img 
                                // style={{
                                //     borderRadius:'50%'
                                // }}
                                src={details.prize_image} alt="" />
                            </div>
                        </div>
                        <div class="details">
                            <div class="details-container">
                                <h3 class="title" style={{ 'border': 'none' }}>{details.rank}. {details.prize_name}</h3>
                                <div class="detail-column">
                                    <div class="icon">
                                    {
                                        // !details.prize_image &&
                                        // <img src={person_logo} alt="" class="mr-2" />
                                    }
                                        {
                                            // details.prize_image &&

                                            <img src={person_logo} alt="" class="mr-2" />
                                        }
                                    </div>
                                    <span>{details.name==" " ? details.phone_no : details.name}</span>
                                </div>
                                <div class="detail-column">
                                    <div class="icon"><img src={coins} alt="" class="mr-2" /></div>
                                    <span>{details.points} Points</span>
                                </div>
                                <div class="detail-column">
                                    <div class="icon"><img src={clock} alt="" class="mr-2" /></div>
                                    <span style={{
                                        fontSize:'14px'
                                    }}
                                    >{details.start_date} - {details.end_date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            }
            {!!weeklyPrize && weeklyPrize.slice(scoreList.length, weeklyPrize.length).map((data, key) => {
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
                                <h3 class="title" style={{ 'border': 'none' }}>{data.rank}. Prize - {data.prize_name}</h3>
                                
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


export default Weekly;