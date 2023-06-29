import React, { useEffect, useState, Fragment } from 'react';
import { isArray } from 'lodash';
import axios from '../../_config/axios';
import { ContestSimmer } from '../../simmer-loader';
import PredictionCard from './PredictionCard';


const CurrentPrediction = () => {
    const [{ predictions, isLoading },setPrediction ] = useState({ predictions: [], isLoading: false });
    const [currentTime,setCurrentTime ] = useState(null);
    const [winPoint,setwinPoint ] = useState(null);



    useEffect(() => {
        setPrediction(prevState => ({ ...prevState, isLoading: true }));
        axios.post('/getpredictioncurrent').then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.prediction_list && isArray(res.data.prediction_list)) {
                    const { prediction_list } = res.data;
                    const current_date =res.data.current_date;
                    const winpoint=res.data.win_point;
                    setCurrentTime({current_date});
                    setwinPoint({winpoint});


                   // const {current_date} =res.data.current_date;
                    //setPrediction(prevState => ({ ...prevState, predictions: prediction_list, isLoading: false }));
                    setPrediction(prevState => ({ ...prevState, predictions: prediction_list, isLoading: false }));
                }
            }
            setPrediction(prevState => ({ ...prevState, isLoading: false }));
        }).catch(err => {
            setPrediction(prevState => ({ ...prevState, isLoading: false }));
           // console.log({ err });
        })
    }, []);

    if (isLoading) 
        return(
            <Fragment>
                <ContestSimmer />
                <ContestSimmer />
            </Fragment>
        )
    return (
        <Fragment>
            {predictions.map((data, key) => <PredictionCard key={key} modalOpen={() => true} prediction={data}  date={currentTime} winPoint={winPoint}/>)}
        </Fragment>
    )
};

export default CurrentPrediction;