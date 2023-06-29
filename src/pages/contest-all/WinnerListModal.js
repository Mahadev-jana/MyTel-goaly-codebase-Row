import React from 'react';
import { Modal, Button  } from 'react-bootstrap';
import { post } from '../../api';
import loadingGif from '../../assets/img/loading.gif';

class WinnerListModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: {},
            loading: false 
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.pid != this.props.pid) {
            this.getWinnerList(newProps.pid);
        }
    }
    
    getWinnerList = pid => {
        this.setState({loading: true});
        const payload = new FormData();
        payload.append('pid', pid);
        post('pastpredictionwinners', payload)
        .then(res => {
            if (res.data.success == 1) {
                const winner = {
                    title: res.data.title,
                    winners: res.data.winner_list
                }
                this.setState({winner, loading: false});
            }
        })
        .catch(err => console.log(err));
    }
    render() {
        return(
            <Modal show={this.props.open} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.winner.hasOwnProperty('title') && this.state.winner.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="leaderboard">
                        <div className="table-responsive">
                            {this.state.loading && <PlayersLoader />}         
                            <table className="table v2 no-bdrad">
                                <tbody>
                                    {this.state.winner.hasOwnProperty('winners') && this.state.winner.winners.map((data, key)=>(
                                        <tr key={key}>
                                            <td width="10%">
                                                <div className="set-img">
                                                    <img src={data.image} className="img-circle" alt="" /> 
                                                </div>
                                            </td>
                                            <td width="80%" className="vmid">
                                                <div>
                                                    <span className="text-orange">{key+1}.</span> {data.name}
                                                </div> 
                                            </td>
                                            <td className="text-coin">{data.coins} Coin</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default WinnerListModal;


const PlayersLoader = () => (
    
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
        }}/>
    </div>

);