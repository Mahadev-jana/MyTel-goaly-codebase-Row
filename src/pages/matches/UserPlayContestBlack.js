import React from 'react';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import { post } from '../../api';
import loadingGif from '../../assets/img/loading.gif';
import logoGoaly from '../../assets/img/logo-goaly.png';

class UserPlayContest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            status: '',
            noDataFound: false,
            loading: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.id != '' && nextProps.id != this.props.id) {
            this.setState({
                players: [],
                noDataFound: false,
                loading: false
            });
            this.getPlayer(nextProps.id);
        }
    }
    getPlayer = id => {
        this.setState({ loading: true });
        const payload = new FormData();
        payload.append('id', id);
        post('getcontestant', payload)
            .then(res => {
                if (Boolean(res.data.players.length)) {
                    this.setState({
                        players: res.data.players,
                        status: res.data.status,
                        loading: false
                    })
                } else {
                    this.setState({
                        players: res.data.players,
                        loading: false,
                        noDataFound: true
                    })
                }
            })
            .catch(err => console.log(err));
    }
    showPlayerDetails = player => {
        let html = `<div style="display: flex;flex-direction: column;">
                        <div style="display: flex;flex-direction: row-reverse;width: 100%;font-size: 15px;padding: 10px;">
                            <div style="border: 1px solid #b1afaf;padding: 2px 4px;border-radius: 5px;">${player.created_at}</div>
                        </div>
                        <div style="display: flex;flex-direction: row;width: 100%;font-size: 15px;padding: 10px;">
                            <div style="background: blue;color: #fff;padding: 2px 5px;border-radius: 2px;">Name</div>
                            <div style="padding: 2px 5px;border-radius: 2px;color: #000;">${player.name}</div>
                        </div>
                        <div style="display: flex;flex-direction: row;width: 100%;font-size: 15px;padding: 10px;">
                            <div style="background: blue;color: #fff;padding: 2px 5px;border-radius: 2px;">Prediction</div>
                            <div style="padding: 2px 5px;border-radius: 2px;color: #000;">${player.prediction}</div>
                        </div>
                        <div style="display: flex;flex-direction: row;width: 100%;font-size: 15px;padding: 10px;">
                            <div style="background: blue;color: #fff;padding: 2px 5px;border-radius: 2px;">Point</div>
                            <div style="padding: 2px 5px;border-radius: 2px;color: #000;">${Boolean(player.pts) ? player.pts:''}</div>
                        </div>
                    </div>`;
        if (this.state.status === 'Prediction') {
            html = `<div style="display: flex;flex-direction: column;">
                        <div style="display: flex;flex-direction: row-reverse;width: 100%;font-size: 15px;padding: 10px;">
                            <div style="border: 1px solid #b1afaf;padding: 2px 4px;border-radius: 5px;">${player.created_at}</div>
                        </div>
                        <div style="display: flex;flex-direction: row;width: 100%;font-size: 15px;padding: 10px;">
                            <div style="background: blue;color: #fff;padding: 2px 5px;border-radius: 2px;">Name</div>
                            <div style="padding: 2px 5px;border-radius: 2px;color: #000;">${player.name}</div>
                        </div>
                        <div style="display: flex;flex-direction: row;width: 100%;font-size: 15px;padding: 10px;">
                            <div style="background: blue;color: #fff;padding: 2px 5px;border-radius: 2px;">Prediction</div>
                            <div style="padding: 2px 5px;border-radius: 2px;color: #000;">${player.prediction}</div>
                        </div>
                    </div>`;
        }
        Swal.fire({
            title: '<strong>Player Details</strong>',
            html: html,
        })
    }
    render() {
        return (
            <Modal show={this.props.open} onHide={this.props.modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ textAlign: 'center' }}>
                        <img src={logoGoaly} alt="" height="60" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="standing">
                        <h2>User Play This Contest</h2>
                        <table className="table table-striped table-responsive">
                            <tbody>
                                <tr className="clr-aqua">
                                    <th>No</th>
                                    <th>Player</th>
                                    <th>{this.state.status}</th>
                                </tr>
                                {this.state.loading && <PlayersLoader />}
                                {this.state.noDataFound && <NoPlayerFound />}
                                {this.state.players.map((player, key) => (
                                    <tr key={key} className="wpos" onClick={() => this.showPlayerDetails(player)}>
                                        <td>{key + 1}</td>
                                        <td>{player.name}</td>
                                        <td><strong>{player.pts}</strong></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="col-xs-12 plfix">
                        <button type="button" className="btn-reg" onClick={this.props.modalClose}>
                            <strong>Close</strong>
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default UserPlayContest;

const NoPlayerFound = () => (
    <tr>
        <td colSpan="3">
            <div style={{
                display: 'flex',
                lineHeight: '100px',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <span style={{
                    color: 'red',
                    fontSize: '14px',
                    fontWeight: 100,
                    letterSpacing: '1px'
                }}>No player found!</span>
            </div>
        </td>
    </tr>
);

const PlayersLoader = () => (
    <tr>
        <td colSpan="3">
            <div style={{
                display: 'flex',
                lineHeight: '100px',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img src={loadingGif} alt="" style={{
                    height: '100px',
                    objectFit: 'none',
                    objectPosition: 'center'
                }} />
            </div>
        </td>
    </tr>
);