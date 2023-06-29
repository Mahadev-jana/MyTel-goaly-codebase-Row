import React from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
// import 'rc-collapse/assets/index.css';
import { isArray } from 'lodash';
import Collapse, { Panel } from 'rc-collapse';
import { ContestAllSimmer } from '../../../simmer-loader/index';
import Skeleton from 'react-loading-skeleton';
import axios from '../../../_config/axios';
import FavoriteClubModal from './FavoriteClubModal';
import DeleteFavoriteClubModal from './DeleteFavouriteClubsModal';

import { isAuthenticate } from '../../../_helper/authentication';
import { Row, Col, Image } from 'react-bootstrap';
import imgAddClub from '../../../assets/img/tm-add.png';
import Modal from 'react-responsive-modal';
import imgDeleteClub from '../../../assets/img/tm-delete.png';
import addButton from '../../../assetsStaging/img/ic-green-add.png';
import minusButton from '../../../assetsStaging/img/ic-purple-minus.png';
import './addFavoriteTeams.css';
import Cookies from 'js-cookie';



function expandIcon({ isActive }) {
    return (
        <i style={{ marginRight: '1rem', position: 'absolute', right: '0px', fontSize: '24px', color: '#337ab7' }}>
            {isActive ? `-` : `+`}
        </i>
    );
}

const AddFavoriteClub = () => {
    const isLoggedIn = isAuthenticate();
    if (isLoggedIn)
        return <AddFavoriteClubWithLogin />
    return <AddFavoriteClubWithOutLogin />
};

export default AddFavoriteClub;

const AddFavoriteClubWithLogin = React.memo(withRouter(({ history }) => {
    const [show, setShow] = React.useState(false);
    const [clubs, setClubs] = React.useState([]);
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const [openDeleteModal, setDeleteModal] = React.useState(false);
    const [expandClubs, setExpandClubs] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    //const lastSegment = (Cookies.get('googtrans') !='') ? Cookies.get('googtrans').split("/").pop() : '';
    const lastSegment = 'my';
    var msg = "deba";
    React.useEffect(() => {
        setIsLoading(true)
        getClub();
    }, []);
//test
    const getClub = () => {
        const payload = new FormData();
        // console.log(payload)
        const userdetails = JSON.parse(localStorage.getItem('userDetails'));
        // payload.append('user_id', (userdetails.id));
        payload.append('user_id', userdetails.id);
        axios({
            method: 'post',
            url: 'api/favteam',

            headers: {
                'JWT': localStorage.getItem('JWT'),
            },
            data: payload
        }).then(res => {
            //console.log(res)
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.favteams && isArray(res.data.favteams)) {
                    setClubs(res.data.favteams);

                }
                setIsLoading(false);
            }
        }).catch(err => {
            console.log({ err })
        })
    }

    // const openModal = () => {
    //     getClub();
    //     setModal(true);
    // }

    const closeModalSave = () => {
        getClub();
        setOpenAddModal(false);
        setDeleteModal(false);

    }
    const closeModal = () => {
        setOpenAddModal(false);
        setDeleteModal(false);

    }
    const showAllClubs = () => {
        //console.log('open')
        setExpandClubs(true)
    }
    const showThreeClubs = () => {
        //console.log('close');
        setExpandClubs(false)
    }

    return (

        <React.Fragment>
            {isLoading && <Skeleton count={3} />}
            <Modal open={openAddModal} onClose={() => closeModal()} center styles={{
                modal: {
                    height: '100%',
                    width: '100%',
                    padding: 0,
                    overflow: 'auto'

                }
            }}>
                {<FavoriteClubModal closeModal={() => closeModal()} closeModalSave={()=>closeModalSave()} />}
            </Modal>

            <Modal open={openDeleteModal} onClose={() => closeModal()} center styles={{
                modal: {
                    height: '100%',
                    width: '100%',
                    padding: 0,
                    overflow: 'scroll'
                }
            }}>
                {<DeleteFavoriteClubModal closeModalSave={()=>closeModalSave()}/>}
            </Modal>
            {!expandClubs && !isLoading &&
                <div className="block">
                    <div className="my-team bg-white border radius-1 row">
                        <span><strong>My Team</strong></span>
                        <ul>
                            {clubs.slice(0, 3).map((club, key) => (
                                <li key={key} onClick={() => history.push(`/club-info/${club.id}`)}><img src={club.badge} alt="" /></li>
                            ))}
                        </ul>
                        <a onClick={showAllClubs}><img src={addButton} alt="" /></a>
                    </div>
                </div>}
            {expandClubs && <div className="block">
                <div className="my-team bg-white border radius-1 row" style={{ display: 'block' }}>
                    <div>
                        <span style={{ margin: '12px' }} ><strong>My Team</strong></span>

                        <a onClick={() => setOpenAddModal(true)}><img style={{ height: '50px', margin: '9px' }} src={imgAddClub} alt="" /></a>
                        <a onClick={() => setDeleteModal(true)}><img style={{ height: '50px', margin: '9px' }} src={imgDeleteClub} alt="" /></a>
                        <a onClick={showThreeClubs}><img style={{ height: '50px', margin: '9px' }} src={minusButton} alt="" /></a>

                        <div className="clearfix" style={{ clear: 'both' }}></div>
                    </div>
                    <Row>
                        {clubs.map((club, key) => (
                            <Col key={key} xs={3} onClick={() => history.push(`/club-info/${club.id}`)}>
                                <div className="pd-5">
                                    <Image src={club.badge} responsive style={{ height: 50, width: 50 }} />
                                </div>
                                <div className="clearfix" style={{ clear: 'both' }}></div>
                            </Col>
                        ))}


                    </Row>
                </div>
            </div>}

            {/* <Modal open={open} onClose={() => closeModal()} center styles={{
                modal: {
                    height: '100%',
                    width: '100%',
                    padding: 0,
                    overflow: 'auto'

                }
            }}>
                {<FavoriteClubModal closeModal={() => closeModal()} />}
            </Modal>

            <Modal open={openDeleteModal} onClose={() => closeModal()} center styles={{
                modal: {
                    height: '100%',
                    width: '100%',
                    padding: 0,
                    overflow: 'hidden'
                }
            }}>
                {<DeleteFavoriteClubModal closeModal={() => closeModal()} />}
            </Modal>
            <Row>
                <Col xs={12} className="pd-0 mb-10" >
                    <Collapse accordion={true} expandIcon={expandIcon}>
                        <Panel header={
                            <><div className="col-md-8" style={{ paddingRight: 7, paddingLeft: 6 }}>MyTeam</div>
                                <div className="col-md-4 padding-left" style={{ width: '100%' }}>
                                    {clubs.slice(0, 5).map((club, key) => (
                                        <div style={{ float: 'right', paddingRight: 5, paddingLeft: 5 }}> <Image src={club.badge} responsive style={{ height: 28, width: 28 }} /> </div>
                                    ))}
                                </div>
                            </>
                        } headerClass="my-header-class">
                            <Row>
                                {clubs.map((club, key) => (
                                    <Col key={key} xs={3} onClick={() => history.push(`team/${club.id}`)}>
                                        <div className="pd-5">
                                            <Image src={club.badge} responsive style={{ height: 50, width: 50 }} />
                                        </div>
                                        <div className="clearfix" style={{ clear: 'both' }}></div>
                                    </Col>
                                ))}
                                <Col xs={6} >
                                    <div className="pd-5" >
                                        <Image onClick={() => setModal(true)} src={imgAddClub} responsive style={{ height: 50, width: 50 }} />
                                        <Image src={imgDeleteClub} onClick={() => setDeleteModal(true)} responsive style={{ height: 50, width: 50, marginLeft: '27%' }} />
                                        <div className="clearfix" style={{ clear: 'both' }}>
                                        </div>
                                    </div>
                                </Col>
                                <div className="clearfix" style={{ clear: 'both' }}></div>
                            </Row>
                        </Panel>
                    </Collapse>
                </Col>
            </Row> */}

            
        </React.Fragment>
    )
}));





const AddFavoriteClubWithOutLogin = React.memo(withRouter(({ history }) => {
    const onClickLogin = () => {
        Swal.fire({
            type: 'info',

            title: 'Login first to add your favorite clubs!!',

            confirmButtonText: 'login',
        }).then(result => {
            if (result.value) {
                history.push('/login');
            }
        });
    }
    return (
        <div class="block">
            <div class="my-team bg-white border radius-1 row">
                <span><strong>My Team</strong></span>

                <a onClick={onClickLogin}><img src={addButton} alt="" /></a>
            </div>
        </div>
        // <Row>
        //     <Col xs={12} className="pd-0 mb-10" onClick={onClick}>
        //         <Collapse accordion={true} expandIcon={expandIcon}>
        //             <Panel header="MyTeam" headerClass="my-header-class" disabled></Panel>
        //         </Collapse>
        //     </Col>
        // </Row>
    )
}));