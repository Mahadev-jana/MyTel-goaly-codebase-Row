import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Modal from 'react-responsive-modal';
import MenuCategory from '../../components/menu-category';
import TabModal from './TabModal';
import UserPlayContestBlack from './UserPlayContestBlack';

import CurrentPrediction from './CurrentPrediction';
import PreviousPrediction from './PreviousPrediction';
import icon from '../../assets/img/logo-goaly.png';
import '../../assets/css/contest.css';
import MatchesFilter from './matches-details/MatchesFilter';
class Contest extends Component {
    render() {
        return (
            <Fragment>
                {/* <Helmet>
                    <title> Goaly | Contest </title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
                <MenuCategory />
                <MatchesFilter/>
                {/* <Row style={{ overflow: 'hidden' }}>
                    <div class="score-predic" style={{paddingTop:'65px'}}>
                        <h3 class="my-1">Score Prediction<Link to="/scores"></Link></h3>
                        <TabModal />

                    </div>
                    <div className="row">
                        <div class="header m-2" >
                            <h3 class="m-0" style={{ padding: '14px' }}>Current Prediction</h3>
                            <CurrentPrediction />
                        </div>
                        <div class="header m-2">
                            <h3 class="m-0" style={{ padding: '14px' }}>Previous Prediction</h3>
                            <PreviousPrediction />
                        </div>
                    </div>


                </Row> */}

            </Fragment>
        );
    }
};

export default withRouter(Contest);

