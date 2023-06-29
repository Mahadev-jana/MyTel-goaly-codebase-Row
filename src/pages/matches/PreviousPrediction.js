import React, { useEffect, useState, Fragment } from 'react';
import { isArray } from 'lodash';
import axios from '../../_config/axios';
import { ContestSimmer } from '../../simmer-loader';
import PredictionCard from './PredictionCardGreen';

const PreviousPrediction = () => {
    const [{ predictions, isLoading }, setPrediction] = useState({ predictions: [], isLoading: false });

    useEffect(() => {
        setPrediction(prevState => ({ ...prevState, isLoading: true }));
        axios.post('/getpredictionended').then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.prediction_list && isArray(res.data.prediction_list)) {
                    const { prediction_list } = res.data;
                    setPrediction(prevState => ({ ...prevState, predictions: prediction_list, isLoading: false }));
                }
            }
            setPrediction(prevState => ({ ...prevState, isLoading: false }));
        }).catch(err => {
            setPrediction(prevState => ({ ...prevState, isLoading: false }));
            //console.log({ err });
        })
    }, []);

    if (isLoading)
        return (
            <Fragment>
                <ContestSimmer />
                <ContestSimmer />
            </Fragment>
        )
    return (
        <Fragment>
            {predictions.map((data, key) => <PredictionCard key={key} modalOpen={() => true} prediction={data} />)}
        </Fragment>
    )
};

export default PreviousPrediction;