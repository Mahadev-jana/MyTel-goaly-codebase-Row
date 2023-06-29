import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import imgTeamAdd from '../../assets/img/tm-add.png';
import iconLoadMore from '../../assets/img/load_more_icon.png';
import { authPost } from '../../api';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';


class MyTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myTeams: [],
            page: 0,
            show: false
        }
    }
    componentDidMount() {
        this.setState({ myTeams: [] });
        this.getMyTeams();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ myTeams: [] });
        this.getMyTeams();
    }
    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }
    getMyTeams = (page = 0) => {
        const payload = new FormData();
        payload.append('page', page);
        authPost('getfavteam', payload)
            .then(res => {
                const team = res.data.team_list;
                this.setState(prevState => ({ myTeams: team, page }));
            })
            .catch(err => console.log(err));
    }
    loadMore = () => {
        const { page } = this.state;
        console.log({ page });
        this.getMyTeams(page + 1);
    }
    deleteTeam = id => event => {
        const _this = this;
        console.log({ id });
        if (this.clickTimer) {
            window.clearTimeout(this.clickTimer);
            this.clickEvent = null;
        }
        this.clickTimer = window.setTimeout(() => {
            // alert('Pressed for 3 seconds');

            Swal.fire({
                type: 'warning',
                title: 'Are you sure to remove?',
                allowOutsideClick: false,
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {
                    console.log('Api Call');
                    const payload = new FormData();
                    payload.append('id', id);
                    authPost('removefavteam', payload)
                        .then(res => {
                            console.log(res);
                            _this.getMyTeams();
                        })
                        .catch(err => console.log(err))
                    // window.location.href = '/';
                }
            })
        }, 1000);
        this.clickEvent = event;
    }
    clearInterval = () => {
        window.clearTimeout(this.clickTimer)
        this.clickEvent = null;
    }
    render() {
        const { openSubscriptionModal } = this.state;
        const { myTeams } = this.state;

        let customMyTeam = [];
        let mod = 2;
        for (let i = 0; i < myTeams.length;) {
            console.log({ start: i, end: i + mod });
            customMyTeam.push(myTeams.slice(i, i + mod));
            i = i + mod
            mod = 3;
        }
        console.log({ customMyTeam });
        return (
            <Fragment>
                <div className="team col-xs-12">
                    <div className="title3">MyTeam
                    </div>
                    {customMyTeam && !Boolean(customMyTeam.length) && <div className="col-xs-4" onClick={() => this.props.openSetFavTeam()}>
                        <img src={imgTeamAdd} alt="" />
                    </div>}
                    {customMyTeam && customMyTeam.map((team, key) => (
                        <div key={key} className="row">
                            {Boolean(key == 0) && <div className="col-xs-4" onClick={() => this.props.openSetFavTeam()}>
                                <img src={imgTeamAdd} alt="" />
                            </div>}
                            {team && team.map((data, key) => (
                                <div key={key} className="col-xs-4"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignContent: 'center'
                                    }}
                                >
                                    <Link to={`/my-team/${data.id}`}>
                                        <img src={data.badge} alt="" style={{ height: '100px', pointerEvents: 'none' }} />
                                    </Link>
                                </div>
                            ))}
                        </div>))}
                </div>
            </Fragment>
        );
    }
}

export default MyTeam;