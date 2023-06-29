import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { isArray } from 'lodash';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import axios from '../../_config/axios';

const ListPrediction = () => {
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        axios.post('/getListPrediction').then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.prediction_list && isArray(res.data.prediction_list)) {
                    setPredictions(res.data.prediction_list);
                }
            }
        }).catch(err => {
            console.log({ err });
        })
    }, []);

    return (
        <Row>
            <Col xs={12} className="pd-0 mt-10">
                <div class="new-ct">
                    <div class="lf">List Prediction</div>
                    <div class="rg">
                        <Link to="/contest">See All</Link>
                    </div>
                    {predictions.map((prediction, key) => <PredictionItem key={key} {...prediction} />)}
                </div>
            </Col>
        </Row>
    )
}

export default ListPrediction;

const PredictionItem = ({ awayteam, awayteamlogo, hometeam, hometeamlogo, league, match_start, venue }) => {
    return (
        <Fragment>
            <Link to="/contest">
            <div class="liner2"></div>
            <div class="sc-collect">
                <div class="col-xs-7 pd-0 ingrid">
                    <span class="inline fs-12"><img src={hometeamlogo} width="14px" alt="" /> &nbsp;{hometeam}</span>
                    <span class="inline fs-12"><img src={awayteamlogo} width="14px" alt="" /> &nbsp;{awayteam}</span>
                    <span class="fs-12">{league}</span>
                </div>
                <div class="col-xs-5 pd-0 text-right">
                    <div class="pd-5">
                        <div class="matchdate"><Moment format="dddd, DD/MM/YYYY">{match_start}</Moment></div>
                        <div class="stadium mt-10">{venue}&nbsp;<img src="img/thumb/ico-stadium-black.png" class="" alt="" /></div>
                    </div>
                </div>
            </div>
            </Link>
        </Fragment>
    )
}