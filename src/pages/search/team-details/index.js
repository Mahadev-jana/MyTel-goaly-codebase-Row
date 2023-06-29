import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import Match from './tabs/Match';
import News from './tabs/News';
import Players from './tabs/Players';
import Standings from './tabs/Standings';
import ListMatches from '../../home/list-matches/ListMatchesTabs';
import { post } from '../../../api';

class TeamDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            id: null
        }
    }

    componentDidMount() {
        this.getSearchdetails();
    }

    getSearchdetails = () => {
        this.setState({ loading: true });
        const payload = new FormData();
        payload.append('search', this.props.search);
        post('api/getteammatchesbyleague', payload).then(res => {
            console.log({ res });
            if (res.data.success == 1) {
                this.setState({
                    matchList: res.data.matches,
                    fixtures: res.data.fixtures,
                    team: res.data.team,
                    loading: false,
                    id: res.data.id
                });
            }
        }).catch(err => {
            console.error(err);
        })
    }


    setTab = tab => {
        window.scrollTo(0, 0);
        this.setState({ tab })
    }
    render() {
        const { tab, id } = this.state;
        const { search } = this.props;
        return (
            <div>
                <div class="col-xs-12 main-cat">
                    <div class="well">
                        <h5>Search result for: <strong>&nbsp; Juventus</strong></h5>
                        <form>
                            <fieldset>
                                <div class="form-group">
                                    <span class="twitter-typeahead" style={{ position: "relative", display: "inline-block" }}>
                                        <input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled=""
                                            style={{
                                                position: "absolute", top: "0px", left: "0px", borderColor: "transparent",
                                                boxShadow: "none",
                                                background: "none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255)"
                                            }} />
                                        <input type="text" class="form-control tt-query" name="query" id="query" placeholder="" autocomplete="off" spellcheck="false" dir="auto"
                                            style={{ position: "relative", verticalAlign: "top", backgroundColor: "transparent" }} />
                                        <span style={{
                                            position: "absolute", left: "-9999px", visibility: "hidden", whiteSpace: "nowrap",
                                            fontFamily: "Roboto, Noto, Helvetica, Arial, sans-serif", fontSize: "14px",
                                            fontStyle: "normal", fontVariant: "normal", fontWeight: "400", wordSpacing: "0px", letterSpacing: "0px",
                                            textIndent: "0px",
                                            textRendering: "auto", textTransform: "none"
                                        }}></span>
                                        <span class="tt-dropdown-menu" style={{ position: "absolute", top: "100%", left: "0px", zIndex: "100", display: "none" }} ></span>
                                    </span>
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="btn btn-primary btn-round">Search</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    
                    <div class="well">
                        <div class="team mt-0">
                            <h4>News</h4>
                            <div class="">
                                <div class="post post-widget">
                                    <a class="post-img" href=""><img src="img/lt2.jpg" alt="" /></a>
                                    <div class="post-body">
                                        <p class="title-cat">Serie A</p>
                                        <h3 class="post-title">
                                            <a href="">
                                                Juventus celebrations on hold after Napoli draw
										</a>
                                        </h3>
                                    </div>
                                </div>
                                <div class="post post-widget">
                                    <a class="post-img"><img src="img/lt3.jpg" alt="" /></a>
                                    <div class="post-body">
                                        <p class="title-cat">UEFA Champions League</p>
                                        <h3 class="post-title">
                                            <a href="">
                                                Bonucci: Kean abuse comments 'misunderstood'
										</a>
                                        </h3>
                                    </div>
                                </div>
                                <div class="post post-widget">
                                    <a class="post-img" href=""><img src="img/lt4.jpg" alt="" /></a>
                                    <div class="post-body">
                                        <p class="title-cat">Serie A</p>
                                        <h3 class="post-title">
                                            <a href="">
                                                Teenager Kean strikes twice as Juve sweep Udinese aside
										</a>
                                        </h3>
                                    </div>
                                </div>
                                <div class="post post-widget">
                                    <a class="post-img" href=""><img src="img/lt1.jpg" alt="" /></a>
                                    <div class="post-body">
                                        <p class="title-cat">Serie A</p>
                                        <h3 class="post-title">
                                            <a href="">
                                                Ramsey agrees '£400,000-a-week deal' with Juventus
										</a>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <h4>Match</h4>
                            <div class="lm bg-f4">
                                <table class="table table-striped custab">
                                    <tbody><tr class="clickable-row" >
                                        <td class="text-small">
                                            Saturday 
                                                04/06/2018 21:00 
                                                    <img src="img/logo-live.png" alt="" />
										</td>
                                                <td>
                                                    <div class="col-xs-6 scrL">
                                                        <img src="img/juventus_black.png" alt="" />
                                                        <span>_</span>
                                                        <h4 class="tl mt-10">Juventus</h4>
                                                    </div>
                                                    <div class="col-xs-6 scrR">
                                                        <span>_</span>
                                                        <img src="img/milan.png" alt="" />
                                                        <h4 class="tl mt-10">Milan</h4>
                                                    </div>
                                                </td>
									</tr>
                                            <tr>
                                                <td class="text-small">
                                                    Wednesday 
                                                        04/03/2018 16:30
                                                            <img src="img/logo-live.png" alt="" />
										</td>
                                                        <td>
                                                            <div class="col-xs-6 scrL">
                                                                <img src="img/Inter_Milan.png" alt="" />
                                                                <span>0</span>
                                                                <h4 class="tl mt-10">Inter Milan</h4>
                                                            </div>
                                                            <div class="col-xs-6 scrR">
                                                                <span>1</span>
                                                                <img src="img/juventus_black.png" alt="" />
                                                                <h4 class="tl mt-10">Juventus</h4>
                                                            </div>
                                                        </td>
									</tr>
								</tbody></table>
							</div>
					</div>
                                        <div class="clearfix"></div>
				</div>
			</div>

                            </div>
                            );
                        }
                    };
                    
export default withRouter(TeamDetails);