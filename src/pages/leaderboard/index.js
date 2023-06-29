import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import imgslash from '../../assets/img/slash.png';
import imgAcc1 from '../../assets/img/acc-default.png';
import imgAcc2 from '../../assets/img/acc-default2.png';

class LeaderBoard extends Component {
    constructor(props) {
        super(props);
    }
     render() {
         return(
              <div className="page-content mt-10">
              	< div className ="col-xs-12 ct" >
				< div className ="mb-10" >
                	< div className ="part ml15" >
						< div className ="pt-title" > Leaderboard </div>
						<img className="unite" src={imgslash} alt=""/>
					</div>
                    <div className = "" >
                    <div className = "pb-0" >
						< div className = "lead-info mb-0" >
							<h5>
								Contest: Juventus Vs Milan 
								<span className="seemore"><Link to="/leaderboard/25">View</Link></span>
							</h5>
						</div>
					</div>
                       < div className = "leaderboard" >
                          <div className="table-responsive">          
							<table className="table v2">
								<tbody>
								  <tr>
									<td width="10%">
										<div className="set-img">
											<img src={imgAcc1} className="img-circle" alt=""/> 
										</div></td>
									<td width="80%">
										<div className="top">
											<span className="text-orange">1.</span> Debasish Midya
										</div> 
										<div className="mid">
											<hr width="90%"/>
										</div>
										<div className="botm">
											<p className="badge text-small clr-orange">Score</p>
											<p className="mt-3"> 2100 </p>
											<p className="badge text-small clr-orange">Time</p>
											<p className="mt-3">01:57:72</p>
										</div>
									</td>

									<td className="text-coin">550 Coin</td>
								  </tr>
								  <tr>
									<td width="10%">
										<div className="set-img">
											<img src={imgAcc2} className="img-circle" alt=""/> 
										</div>

									</td>
									<td width="80%">
										<div className="top">
											<span className="text-orange">2.</span> Aldo
										</div> 
										<div className="mid">
											<hr width="70%"/>
										</div>
										<div className="botm">
											<p className="badge text-small clr-orange">Score</p>
											<p className="mt-3"> 1500 </p>
											<p className="badge text-small clr-orange">Time</p>
											<p className="mt-3">02:14:36</p>
										</div>
									</td>

									<td className="text-coin">540 Coin</td>
								  </tr>
									<tr>
									<td width="10%">
										<div className="set-img">
											<img src={imgAcc1} className="img-circle" alt=""/> 
										</div>

									</td>
									<td width="80%">
										<div className="top">
											<span className="text-orange">3.</span> Fajar
										</div> 
										<div className="mid">
											<hr width="50%"/>
										</div>
										<div className="botm">
											<p className="badge text-small clr-orange">Score</p>
											<p className="mt-3"> 1200 </p>
											<p className="badge text-small clr-orange">Time</p>
											<p className="mt-3">03:41:11</p>
										</div>
									</td>

									<td className="text-coin">280 Coin</td>
								  </tr>

								</tbody>
							</table>
						</div>
                      </div>
                      <div className="pb-0">
						<div className="lead-info mb-0">
							<h5>
								Contest: Bayen Munchen Vs Liverpool 
								<span className="seemore"><Link to="/leaderboard/29">View</Link></span>
							</h5>
						</div>
					</div>
                    <div className="leaderboard">
						<div className="table-responsive">          
							<table className="table v2">
								<tbody>
								  <tr>
									<td width="10%">
										<div className="set-img">
											<img src={imgAcc2} className="img-circle" alt=""/> 
										</div>

									</td>
									<td width="80%">
										<div className="top">
											<span className="text-orange">1.</span> Debasish Midya
										</div> 
										<div className="mid">
											<hr width="90%"/>
										</div>
										<div className="botm">
											<p className="badge text-small clr-orange">Score</p>
											<p className="mt-3"> 2100 </p>
											<p className="badge text-small clr-orange">Time</p>
											<p className="mt-3">01:57:72</p>
										</div>
									</td>

									<td className="text-coin">550 Coin</td>
								  </tr>
								  <tr>
									<td width="10%">
										<div className="set-img">
											<img src={imgAcc1} className="img-circle" alt="" /> 
										</div>

									</td>
									<td width="80%">
										<div className="top">
											<span className="text-orange">2.</span> Aldo
										</div> 
										<div className="mid">
											<hr width="70%" />
										</div>
										<div className="botm">
											<p className="badge text-small clr-orange">Score</p>
											<p className="mt-3"> 1500 </p>
											<p className="badge text-small clr-orange">Time</p>
											<p className="mt-3">02:14:36</p>
										</div>
									</td>

									<td className="text-coin">540 Coin</td>
								  </tr>
									<tr>
									<td width="10%">
										<div className="set-img">
											<img src={imgAcc2} className="img-circle" alt="" /> 
										</div>

									</td>
									<td width="80%">
										<div className="top">
											<span className="text-orange">3.</span> Fajar
										</div> 
										<div className="mid">
											<hr width="50%"/>
										</div>
										<div className="botm">
											<p className="badge text-small clr-orange">Score</p>
											<p className="mt-3"> 1200 </p>
											<p className="badge text-small clr-orange">Time</p>
											<p className="mt-3">03:41:11</p>
										</div>
									</td>

									<td className="text-coin">280 Coin</td>
								  </tr>

								</tbody>
							</table>
						</div>
                        </div>
                    	<div className="clearfix"></div>
                    
                    </div>
                </div>
                </div>
                </div>

         );
     }
    };
    export default withRouter(LeaderBoard);

  