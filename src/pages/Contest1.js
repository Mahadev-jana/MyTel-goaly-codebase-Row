import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import MenuCategory from '../components/menu-category';

const Contest = React.memo(() => {
    return (
        <Fragment>
            <MenuCategory />
            <Row>
                <Col xs={12} className="lm ct">
                    <h2 className="title-2 mb-15" >Score Prediction<Link to="/contest-all" className="pull-right text-small">Score History</Link></h2>
                </Col>
            </Row>
        </Fragment>
    )
});

export default Contest;