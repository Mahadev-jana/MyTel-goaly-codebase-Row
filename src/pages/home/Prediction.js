import React, { Fragment } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import { isArray, isEmpty } from 'lodash';
import axios from '../../_config/axios';
import PredictionCard from '../../components/current-prediction-card/CurrentPredictionCard';
import { Link } from 'react-router-dom';
import NewSubscriberModal from './NewSubscriberModal';
import Spinner from '../../components/loders/loder-spinner';
import {RewardDetailsSimmer} from '../../simmer-loader/index';

import '../../assets/css/how-to-play.css';
const params = {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    slidesPerView: 1,
    spaceBetween: 10,
};

const Prediction = (props) => {
    //console.log(props)
    const [predictions, setPredictions] = React.useState([]);
    const [currentDate, setCurrentDate] = React.useState([]);
    const [winPoint, setwinPoint] = React.useState([]);
    const [userDetails, setUserDetails] = React.useState([]);
    const [checkboxForPopup, setCheckboxForPopup] = React.useState('');
    const [isLoading,SetIsLoading] = React.useState(false)




    React.useEffect(() => {
        // SetIsLoading(true);
        // axios.post('api/getTopPrediction').then(res => {
        //     if (res.data && res.data.success && res.data.success == 1) {
        //         if (res.data.prediction_list && isArray(res.data.prediction_list)) {
        //             setPredictions(res.data.prediction_list);
        //             setCurrentDate(res.data.current_date);
        //             setwinPoint(res.data.win_point);
        //         }
        //         SetIsLoading(false);  
        //     }
        // }).catch(err => {
        //     console.log({ err });
        // })

        setUserDetails(JSON.parse(localStorage.getItem('userDetailsforPopup')))

    }, []);
// console.log(props.currentDate)
    return (

        <React.Fragment>
            {userDetails && userDetails.login_count >= 0 && userDetails.checkboxstatus == 0 &&
               <NewSubscriberModal />
            }
            {/*console.log(props.isLoading)*/}
        { props.isLoading && <RewardDetailsSimmer/> }
            {props.predictions.map((prediction, key) => (
             <PredictionCard key={key} {...prediction} winPoint={winPoint} currentDate={props.currentDate} isLoading={isLoading} />
            ))}
            
        </React.Fragment>
    )
}

export default Prediction; 

// {console.log(userDetails)}
//             {userDetails && userDetails.login_count >= 0 && userDetails.checkboxstatus == 0 &&
//                 <NewSubscriberModal />
//             }

//             <Row>
//                 <div style={{ padding: 0 }}>
//                     <Link to='/contest' style={{ float: 'right', marginTop: 6, paddingRight: 10 }}>See All</Link>
//                     <div className="title3" style={{ background: 'none', color: 'black', fontWeight: 700 }}>Prediction Game </div>
//                 </div>
//                 <Col xs={12} className="pd-0">
//                     {!isEmpty(predictions) && <Swiper {...params}>
//                         {predictions.map((prediction, key) => (
//                             <Grid key={key}>
//                                 <PredictionCard {...prediction} winPoint={winPoint} currentDate={currentDate} />
//                             </Grid>
//                         ))}
//                     </Swiper>}
//                 </Col>
//             </Row>