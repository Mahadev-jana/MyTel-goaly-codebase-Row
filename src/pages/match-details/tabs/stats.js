import React, { Component } from 'react';
import Chelsea from '../../../assets/img/Chelsea.svg';
import Manchester from '../../../assets/img/Manchester united.svg';
import field from '../../../assets/img/detail-match/field.png';
class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            comment: '',
            loading: false
        }

    }


    render() {
        // console.log((Object.keys(this.props.playersStats).length))
        return (
            <div>
                {(Object.keys(this.props.playersStats).length)===0 && !this.props.loadingPlayerStat && <tbody>
                    <tr>
                        <td colspan="2"
                            style={{
                                fontSize: '25px',
                                color: 'rgb(183, 167, 167)',
                                letterSpacing: '1px',
                                fontWeight: 100,
                                padding: '50px 50px',
                                textAlign: 'center',
                                lineHeight: 1.3
                            }}
                        >
                            <img src={field} style={{ height: 100, padding: 11 }} />

                            <div><span style={{ fontWeight: 800 }}>NO DATA</span></div>
                            <div>YET FOR THIS MATCH</div>
                        </td>
                    </tr>
                </tbody>}
                
                {(Object.keys(this.props.playersStats).length)>0 && !this.props.loadingPlayerStat &&


                    <div role="tabpanel" className={this.props.scrolled ? "tab-pane scrolledHeight" : "tab-pane"} id="stats">
                        <div className="stats-header">
                            <img src={this.props.homeTeamLogo} alt="" />
                            <h4>TEAM STATS</h4>
                            <img src={this.props.awayTeamLogo} alt="" />
                        </div>
                        <div className="stats-body">
                            {/* <div class="stats-item">
                                <div class="point-left"
                                    style={{ width: `${((this.props.playersStats.final_shots[0].shots_goal / (this.props.playersStats.final_shots[0].shots_goal + this.props.playersStats.final_shots[1].shots_goal)) * 100)}%` }}
                                >
                                    {this.props.playersStats.final_shots[0].shots_goal}
                                </div>
                                <div class="point-name">Shots</div>
                                <div class="point-right"
                                    style={{ width: `${((this.props.playersStats.final_shots[1].shots_goal / (this.props.playersStats.final_shots[0].shots_goal + this.props.playersStats.final_shots[1].shots_goal)) * 100)}%` }}
                                >
                                    {this.props.playersStats.final_shots[1].shots_goal}
                                </div>
                            </div> */}
                            <div className="stats-item">
                                <div className="point-left"
                                    style={{ width: `${((this.props.playersStats.final_shots[0].shots_total / (this.props.playersStats.final_shots[0].shots_total + this.props.playersStats.final_shots[1].shots_total)) * 100)}%` }}
                                >
                                    {this.props.playersStats.final_shots[0].shots_total}
                                </div>
                                <div className="point-name">Shot On Target</div>
                                <div className="point-right"
                                    style={{ width: `${((this.props.playersStats.final_shots[1].shots_total / (this.props.playersStats.final_shots[0].shots_total + this.props.playersStats.final_shots[1].shots_total)) * 100)}%` }}
                                >
                                    {this.props.playersStats.final_shots[1].shots_total}
                                </div>
                            </div>
                            <div className="stats-item">
                                <div className="point-left"
                                    style={{ width: `${((this.props.playersStats.final_passingAccuracy[0].passing_accuracy / (this.props.playersStats.final_passingAccuracy[0].passing_accuracy + this.props.playersStats.final_passingAccuracy[1].passing_accuracy)) * 100)}%` }}
                                >
                                    {this.props.playersStats.final_passingAccuracy[0].passing_accuracy}
                                </div>
                                <div className="point-name">Pass accuracy</div>
                                <div className="point-right"
                                    style={{ width: `${((this.props.playersStats.final_passingAccuracy[1].passing_accuracy / (this.props.playersStats.final_passingAccuracy[0].passing_accuracy + this.props.playersStats.final_passingAccuracy[1].passing_accuracy)) * 100)}%` }}
                                >
                                    {this.props.playersStats.final_passingAccuracy[1].passing_accuracy}
                                </div>
                            </div>
                            <div className="stats-item">
                                <div className="point-left"
                                    style={{ width: `${((this.props.playersStats.final_passes[0].passes_total / (this.props.playersStats.final_passes[0].passes_total + this.props.playersStats.final_passes[1].passes_total)) * 100)}%` }}
                                >
                                    {this.props.playersStats.final_passes[0].passes_total}
                                </div>
                                <div className="point-name">Passes</div>
                                <div className="point-right"
                                    style={{ width: `${((this.props.playersStats.final_passes[1].passes_total / (this.props.playersStats.final_passes[0].passes_total + this.props.playersStats.final_passes[1].passes_total)) * 100)}%` }}
                                >
                                    {this.props.playersStats.final_passes[1].passes_total}
                                </div>
                            </div>
                            <div className="stats-item">
                                <div className="point-left"
                                    style={{ width: `${((this.props.playersStats.final_crosses[0].crosses_total / (this.props.playersStats.final_crosses[0].crosses_total + this.props.playersStats.final_crosses[1].crosses_total)) * 100)}%` }}
                                >
                                    {this.props.playersStats.final_crosses[0].crosses_total}
                                </div>
                                <div className="point-name">Crosses</div>
                                <div className="point-right"
                                    style={{ width: `${((this.props.playersStats.final_crosses[1].crosses_total / (this.props.playersStats.final_crosses[0].crosses_total + this.props.playersStats.final_crosses[1].crosses_total)) * 100)}%` }}
                                >
                                    {this.props.playersStats.final_crosses[1].crosses_total}
                                </div>
                            </div>
                            {this.props.playersStats.final_shots[0].fouls_committed!=0 && this.props.playersStats.final_shots[1].fouls_committed !=0 &&<div class="stats-item">
                                <div className="point-left" style={{ width: `${((this.props.playersStats.final_shots[0].fouls_committed / (this.props.playersStats.final_shots[0].fouls_committed + this.props.playersStats.final_shots[1].fouls_committed)) * 100)}%` }}>
                                    {this.props.playersStats.final_shots[0].fouls_committed}
                                    </div>
                                <div className="point-name">Fouls</div>
                                <div className="point-right" style={{ width: `${((this.props.playersStats.final_shots[1].fouls_committed / (this.props.playersStats.final_shots[0].fouls_committed + this.props.playersStats.final_shots[1].fouls_committed)) * 100)}%` }}>
                                    {this.props.playersStats.final_shots[1].fouls_committed}
                                    </div>
                            </div>}
                            {this.props.playersStats.final_shots[0].fouls_committed==0 && this.props.playersStats.final_shots[1].fouls_committed ==0 &&
                            <div className="stats-item">
                                <div className="point-left" style={{ width: '50%' }}>
                                    {this.props.playersStats.final_shots[0].fouls_committed}
                                    </div>
                                <div className="point-name">Fouls</div>
                                <div className="point-right" style={{ width: '50%' }}>
                                    {this.props.playersStats.final_shots[1].fouls_committed}
                                    </div>
                            </div>}
                            {/* <div class="stats-item">
                                <div class="point-left"
                                    style={{ width: `${Math.round(((this.props.stats[0].shots.ongoal / (this.props.stats[0].shots.ongoal + this.props.stats[1].shots.ongoal)) * 100))}%` }}
                                >
                                    {this.props.stats[0].shots.ongoal}</div>
                                <div class="point-name">Shot On Target</div>
                                <div class="point-right"
                                    style={{ width: `${Math.round(((this.props.stats[1].shots.ongoal / (this.props.stats[0].shots.ongoal + this.props.stats[1].shots.ongoal)) * 100))}%` }}
                                >
                                    {this.props.stats[1].shots.ongoal}</div>
                            </div>
                            <div class="stats-item">
                                <div class="point-left" style={{ width: `${((this.props.stats[0].possessiontime / (this.props.stats[0].possessiontime + this.props.stats[1].possessiontime)) * 100)}%` }}>{this.props.stats[0].possessiontime}</div>
                                <div class="point-name">Possession</div>
                                <div class="point-right" style={{ width: `${((this.props.stats[1].possessiontime / (this.props.stats[0].possessiontime + this.props.stats[1].possessiontime)) * 100)}%` }}>{this.props.stats[1].possessiontime}</div>
                            </div>
                            <div class="stats-item">
                                <div class="point-left" style={{ width: `${((this.props.stats[0].passes.total / (this.props.stats[0].passes.total + this.props.stats[1].passes.total)) * 100)}%` }}>{this.props.stats[0].passes.total}</div>
                                <div class="point-name">Passes</div>
                                <div class="point-right" style={{ width: `${((this.props.stats[1].passes.total / (this.props.stats[0].passes.total + this.props.stats[1].passes.total)) * 100)}%` }}>{this.props.stats[1].passes.total}</div>
                            </div>
                            <div class="stats-item">
                                <div class="point-left" style={{ width: `${Math.round(((this.props.stats[0].passes.accurate) / (this.props.stats[0].passes.total) * 100) / (((this.props.stats[0].passes.accurate) / (this.props.stats[0].passes.total) * 100) + ((this.props.stats[1].passes.accurate) / (this.props.stats[1].passes.total) * 100)) * 100)}%` }}>{Math.round((this.props.stats[0].passes.accurate) / (this.props.stats[0].passes.total) * 100)}</div>
                                <div class="point-name">Pass accuracy</div>
                                <div class="point-right" style={{
                                    width: `${Math.round(
                                        ((this.props.stats[1].passes.accurate) / (this.props.stats[1].passes.total) * 100) / (((this.props.stats[0].passes.accurate) / (this.props.stats[0].passes.total) * 100) + ((this.props.stats[1].passes.accurate) / (this.props.stats[1].passes.total) * 100)) * 100)}%`
                                }}>{Math.round((this.props.stats[1].passes.accurate) / (this.props.stats[1].passes.total) * 100)}</div>
                            </div>
                            <div class="stats-item">
                                <div class="point-left" style={{ width: `${((this.props.stats[0].fouls / (this.props.stats[0].fouls + this.props.stats[1].fouls)) * 100)}%` }}>{this.props.stats[0].fouls}</div>
                                <div class="point-name">Fouls</div>
                                <div class="point-right" style={{ width: `${((this.props.stats[1].fouls / (this.props.stats[0].fouls + this.props.stats[1].fouls)) * 100)}%` }}>{this.props.stats[1].fouls}</div>
                            </div> */}
                        </div>
                    </div>}
            </div>

        );
    }
};

export default Stats;
