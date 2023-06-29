import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { post } from '../../../api';
import NewsComponent from './NewsComponent';
import loader from '../../../assets/loader/loaderspinner.gif';
import player from '../../../assets/img/detail-club/player.png';
import '../../../assets/css/detail-club.css';
class Players extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: '',
            isLoading: false,
            players: ''

        }
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        });
        const id = this.props.match.params.id;
        this.getPlayers(id);
    }

    getPlayers = (id) => {
        const payload = new FormData();
        payload.append('id', id);
        post('getteamplayers', payload).then(res => {
            console.warn({ res });
            if (res.data.success == 1) {
                res.data.players.sort((a,b) => a.position_id - b.position_id);
                this.setState({
                    players: res.data.players,
                    msg: res.data.message,
                })
                this.setState({
                    isLoading: false
                })
            } else {
                this.setState({
                    isLoading: false
                })

            }
            console.log(this.state.players.player_id)
        }).catch(err => {
            console.error(err);
            this.setState({
                isLoading: false
            });
        })

    }
    render() {
        const { news, players, team, msg, isLoading } = this.state;
        return (
            <div role="tabpanel" class="tab-pane" id="Players" style={{ margin: "3px", padding: "8px" }}>
                {isLoading && !players && <> <div class="col-xs-4">
                </div>
                    <div class="col-xs-4">
                        <img src={loader} alt="" style={{
                            height: 60,
                            marginTop: 120
                        }} />
                    </div> </>
                }
                <div class="player-container">
                    {players && players.map((data, key) => (
                        
                        <div class="player-itm" key={key} onClick={() => this.props.history.push(`/player-details/${data.team_id}/${data.player_id}`)}>
                            <div class="img"><img src={data.image_path} alt="" /></div>
                            <div class="name">{data.common_name}</div>
                            <div class="name">{data.position_name}</div>
                        </div>


                    ))}
                    {!players && !isLoading &&
                        <div class="col-xs-12">
                            <h4 style={{ textAlign: 'center' }}>Oops !</h4>
                            <h4 style={{ textAlign: 'center' }}> No Plyer Found.</h4>
                        </div>
                    }


                </div>

            </div>






        );
    };
};

export default withRouter(Players);

const dateFormat = (date) => {
    // console.log({date});
    const array = date.split(' ');
    // console.log({array});
    return date;
}


//PREVIOUS CODES IN RETURN


// <div className="tab-pane fade active p-3 in">
            //     <div className="part"  >
            //         <div className="row">
            //             <div className="col-xs-9">
            //                 <div className="pt-team">
            //                     <img src="img/psg.png" height="24px" alt="" />{team}
            //                 </div>
            //             </div>
            //             <div className="col-xs-3">
            //                 <a onClick={() => this.props.history.goBack()} className="stand btn btn-default chk2">
            //                     <i class="fas fa-arrow-left"></i>&nbsp; Back
            //                 </a>
            //             </div>
            //         </div>
            //     </div>

            //     <div class="part" id="myTabContent" style={{minHeight:420}}>
            //         <div class="tab-pane fade active p-3 in" id="one" aria-labelledby="one-tab">
            //             <div className="row">
            //                 {isLoading && !players && <> <div class="col-xs-4">
            //                 </div>
            //                     <div class="col-xs-4">
            //                         <img src={loader} alt="" style={{ 
			// 						    height: 60,
			// 							marginTop: 120
			// 					}} />
            //                     </div> </>
            //                 }
            //                 <div class="col-xs-12 pdfix">
            //                     <div className="row" style={{
            //                         marginRight: '0px',
            //                         marginLeft: '15px'
            //                     }}>
            //                         {players && players.map((data, key) => (
            //                             <div key={key} class="col-xs-4" style={{textAlign: 'center',height: 100}}>
            //                                 <img src={data.image_path} style={{ height:50 }} alt="" class="rounded img-responsive center-block" />
            //                                 <h4 style={{ textAlign: 'center' }}>{data.firstname}</h4>

            //                             </div>
            //                         ))}
            //                         {!players && !isLoading &&
            //                             <div class="col-xs-12">
            //                                 <h4 style={{ textAlign: 'center' }}>Oops !</h4>
            //                                 <h4 style={{ textAlign: 'center' }}> No Plyer Found.</h4>
            //                             </div>
            //                         }

            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>