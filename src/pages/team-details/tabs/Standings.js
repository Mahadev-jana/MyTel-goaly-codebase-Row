import React from 'react';
import { withRouter } from 'react-router-dom';
import { post } from '../../../api';
import NewsComponent from './NewsComponent';
import loader from '../../../assets/loader/loaderspinner.gif';
import '../../../assets/css/detail-club.css';
import Chelsea from '../../../assets/img/Chelsea.svg';
import {isEmpty} from 'lodash';
class Standings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            league: '',
            isLoading: true,
            scrolled:false,
            standing:[]

        }
    }
    componentDidMount() {
        console.log('this.props');
        console.log(this.props);
        const id = 3;
        this.getStandingDetails(this.props.id);
        
        console.log(this.state.standing)
        window.addEventListener('scroll',()=>{
            let valuScroll=39*this.state.standing.length;
            const isTop = window.scrollY<valuScroll;
            // console.log(window.scrollY)
            if(isTop!==true){
              this.setState({
                scrolled:true
              })
            }
            else{
              this.setState({
                scrolled:false
              })
            }
        })
       
    }
    componentWillUnmount(){

        window.removeEventListener('scroll',()=>{});
      }
    getStandingDetails = (id) => {
        this.setState({ loading: true });
        const payload = new FormData();
        payload.append('id', id);
        post('teamStanding', payload)
            .then(res => {
                if (res.data.success == 1) {
                    this.setState({
                        standing: res.data.standing,
                        loading: false
                    })
                }
                this.setState({
                    isLoading: false
                }); 
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    isLoading: false
                });
            })
    }

    render() {
        const { standing, league, isLoading } = this.state;
        // console.log(league)
        console.log(standing.length)
        console.log(this.props.name)

        return (<div role="tabpanel" class="tab-pane" id="Standings" style={{    marginLeft: "-10px",paddingBottom: "25px"
                ,marginRight: "-13px",padding: "9px"}}>

                {isLoading && <div> <div class="col-xs-4">
                </div>
                    <div class="col-xs-4 s" >
                        <img src={loader} alt="" style={{ height: 60, marginTop: 120 }} />
                    </div> </div>
                }


                {!isLoading && standing.length>0 && <div>  <h2>{league}</h2>
                    <table class="table-top" style={{ margin: "15px" }}>
                        <thead>
                            <tr>
                                <th style={{ width: "1%" }}>Pos</th>
                                <th>Teams</th>
                                <th>Pl</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>GD</th>
                                <th>Pts</th>
                            </tr>
                        </thead>
                        <tbody>

                            {standing.map((data, key) => (
                                data.team_name !==this.props.name ?
                                <tr key={key} >
                                    <td>{key + 1}</td>
                                    <td><img src={data.team_logo} height="22" />&nbsp; {data.team_name.toUpperCase()}</td>
                                    <td>{data.games_played}</td>
                                    <td>{data.won}</td>
                                    <td>{data.draw}</td>
                                    <td>{data.lost}</td>
                                    <td>{data.goal_difference}</td>
                                    <td><strong>{data.points}</strong></td>
                                </tr>
                                :
                                
                                <tr key={key} >
                                    <td>{key + 1}</td>
                                    <td><img src={data.team_logo} height="22" />&nbsp; {data.team_name.toUpperCase()}</td>
                                    <td>{data.games_played}</td>
                                    <td>{data.won}</td>
                                    <td>{data.draw}</td>
                                    <td>{data.lost}</td>
                                    <td>{data.goal_difference}</td>
                                    <td><strong>{data.points}</strong></td>
                                </tr>
                            ))}
                            
                            
                        </tbody>
                    </table>
                    
                                
                     <table className={this.state.scrolled ? "table-btmfixx" :"table-btm"}>
                     {/* {console.log(standing)} */}
                            <tbody>
                            {standing.map((data, key) => (
                                data.team_name ===this.props.name &&
                                <tr key={key}>
                                <td>{key + 1}</td>
                                    <td><img src={data.team_logo} height="22" />&nbsp; {data.team_name.toUpperCase()}</td>
                                    <td>{data.games_played}</td>
                                    <td>{data.won}</td>
                                    <td>{data.draw}</td>
                                    <td>{data.lost}</td>
                                    <td>{data.goal_difference}</td>
                                    <td><strong>{data.points}</strong></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                   
                </div>
                }
                {isEmpty(standing) && !isLoading &&
                                        <div class="col-xs-12" style={{height: '222px',paddingTop: '70px'}}>
                                            <h4 style={{ textAlign: 'center' }}>Oops !</h4>
                                            <h4 style={{ textAlign: 'center' }}> No Standings Record Found.</h4>
                                        </div>
                }
                {/* <table class="table-btm">
                    <tbody>
                        <tr>
                            <td style={{ width: "8%" }}>24</td>
                            <td><img src="./assets/img/Chelsea.svg" alt="" /> Chelsea</td>
                            <td>25</td>
                            <td>17</td>
                            <td>4</td>
                            <td>4</td>
                            <td>47</td>
                            <td>55</td>
                        </tr>
                    </tbody>
                </table> */}
            </div>

        );
    };
};

export default withRouter(Standings);

//PREVIOUS CODE ONLY RETURN CODE


// <div className="tab-pane fade active p-3 in">

            //     <div className="part" style={{minHeight:'420px'}} >

            //         <div class="standing">
            //         <div className="row">
            //             <div className="col-xs-9">
            //                 <div className="pt-team">
            //                     <img src="img/psg.png" height="24px" alt="" />
            //                 </div>
            //             </div>
            //             <div className="col-xs-3">
            //                 <a onClick={() => this.props.history.goBack()} className="stand btn btn-default chk2" style={{fontSize: '1.1em'}}>
            //                     <i class="fas fa-arrow-left">&nbsp; <span style={{fontSize: '13px',fontWeight: 300}}> Back</span></i>
            //                 </a>
            //             </div>
            //         </div>
                    // { isLoading && <> <div class="col-xs-4">
                    // </div>
                    //     <div class="col-xs-4 s" >
                    //         <img src={loader} alt="" style={{ height: 60,marginTop:120}} />
                    //     </div> </>
                    // }


                    // {!isLoading && standing &&  <>  <h2>{league}</h2>
            //             <table class="table table-striped table-responsive">
            //                 <thead>
            //                     <tr class="clr-aqua">
            //                         <th>Pos</th>
            //                         <th>Teams</th>
            //                         <th>Pl</th>
            //                         <th>W</th>
            //                         <th>D</th>
            //                         <th>L</th>
            //                         <th>GD</th>
            //                         <th>Pts</th>
            //                     </tr>
            //                 </thead>
            //                 <tbody>

            //                     {standing.map((data, key) => (
            //                         <tr className="wpos" key={key}>
            //                             <td>{key + 1}</td>
            //                             <td><img src={data.team_logo} height="22" />&nbsp; {data.team_name.toUpperCase()}</td>
            //                             <td>{data.games_played}</td>
            //                             <td>{data.won}</td>
            //                             <td>{data.draw}</td>
            //                             <td>{data.lost}</td>
            //                             <td>{data.goal_difference}</td>
            //                             <td><strong>{data.points}</strong></td>
            //                         </tr>
            //                     ))}
            //                 </tbody>
            //             </table>
            //             </>
            //             }
            //         </div>
            //     </div>
            // </div>