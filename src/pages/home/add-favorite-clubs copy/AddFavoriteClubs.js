import React from 'react';
import Swal from 'sweetalert2';
import { Grid, Row, Col } from 'react-bootstrap';
import imgAddYourFavoriteClub from '../../../assets/img/add-your-favorite-club.png';
import FavoriteClubModal from './FavoriteClubModal';
import { isAuthenticate } from '../../../_helper/authentication';

const AddFavoriteClub = () => {
    const isLoggedIn = isAuthenticate();
    if (isLoggedIn)
        return <AddFavoriteClubWithLogin />
    return <AddFavoriteClubWithOutLogin />
};

export default AddFavoriteClub;

const AddFavoriteClubWithLogin = React.memo(() => {
    const [show, setShow] = React.useState(false);
    return (
        <React.Fragment>
            {show && <FavoriteClubModal closeModal={() => setShow(false)} />}
            <Row>
                <Col xs={12} className="lm ct mb-10" style={{ padding: '10px 5px' }}>
                    <div className="col-xs-12 pl-5 pr-5  text-center">
                        <a className="wd100" onClick={() => setShow(true)}>
                            <img src={imgAddYourFavoriteClub} alt="" className="img-responsive" />
                        </a>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
});

const AddFavoriteClubWithOutLogin = React.memo(() => {
    const onClick = () => {
        Swal.fire({
            type: 'error',
            title: 'Login first to add your favorite clubs!!'
        });
    }
    
    return (
        <Row>
            <Col xs={12} className="lm ct mb-10" style={{ padding: '10px 5px' }}>
                <div className="col-xs-12 pl-5 pr-5  text-center">
                    <a className="wd100" onClick={onClick}>
                        <img src={imgAddYourFavoriteClub} alt="" className="img-responsive" />
                    </a>
                </div>
            </Col>
        </Row>
    )
});