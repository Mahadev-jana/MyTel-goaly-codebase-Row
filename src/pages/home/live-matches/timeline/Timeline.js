import React, { Component } from 'react';
import Goal from './Goal';
import YellowCard from './YellowCard';
import loader from '../../../../assets/loader/loaderspinner.gif';
// import "../../../../assets/css/live-matches.css";
import group from '../../../../assets/img/detail-match/icon-timeline/Group 114.png';
import { MatchDetailsSimmer } from '../../../../simmer-loader';
import corner from '../../../../assets/timeline/corner1.png';
// import goal from '../../../../assets/timeline/goal.png';
import goal from '../../../../assets/timeline/goal_2.png';
import kickoff from '../../../../assets/timeline/kickoff.png';
import redcard from '../../../../assets/timeline/redcard.png';
import yellowcard from '../../../../assets/timeline/yellowcard.png';
import substitution from '../../../../assets/timeline/substitution.png';
import freekick from '../../../../assets/timeline/Group 115.png';
import finish from '../../../../assets/timeline/finish.png';
import field from '../../../../assets/img/detail-match/field.png';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeline: [],
            image: '',
            commentText: '',
            event: '',
            order: null,
            timeliness: [],
            isLoading: false
            // scrolled:false
        }
    }

    componentDidMount() {
        //console.log(this.props.comment)

        this.props.comment.forEach(element => {
            if (element.comment.search("free kick") != -1) {
                // var hours = Math.floor(element.minute / 60);
                // var minutes = element.minute % 60;
                let sub = {
                    "event": "FREE KICK",
                    "image": freekick,
                    "commenttext": element.comment,
                    // "time":"0"+hours +":"+ ('0' + minutes).slice(-2)
                    "time": element.minute + "'",
                    "order": element.order
                }
                this.state.timeline.push(sub);
            }

            if (element.comment.search("Goal") != -1) {
                // var hours = Math.floor(element.minute / 60);
                // var minutes = element.minute % 60;

                let sub = {
                    "event": "GOAL",
                    "image": goal,
                    "commenttext": element.comment,
                    // "time":"0"+hours +":"+ ('0' + minutes).slice(-2)
                    "time": element.minute + "'",
                    "order": element.order
                }
                this.state.timeline.push(sub);
            }

            if (element.comment.search("Foul") != -1) {
                // var hours = Math.floor(element.minute / 60);
                // var minutes = element.minute % 60;
                let sub = {
                    "event": "FOUL",
                    "image": kickoff,
                    "commenttext": element.comment,
                    // "time":"0"+hours +":"+ ('0' + minutes).slice(-2)
                    "time": element.minute + "'",
                    "order": element.order
                }
                this.state.timeline.push(sub);
            }

            if (element.comment.search("First Half ended") != -1) {
                // var hours = Math.floor(element.minute / 60);
                // var minutes = element.minute % 60;
                let sub = {
                    "event": "FIRST HALF END",
                    "image": kickoff,
                    "commenttext": element.comment,
                    // "time":"0"+hours +":"+ ('0' + minutes).slice(-2)
                    "time": element.minute + "'",
                    "order": element.order
                }
                this.state.timeline.push(sub);
            }

            if (element.comment.search("Second Half Starts") != -1) {
                // var hours = Math.floor(element.minute / 60);
                // var minutes = element.minute % 60;
                let sub = {
                    "event": "SCOND HALF STARTED",
                    "image": kickoffs,
                    "commenttext": element.comment,
                    // "time":"0"+hours +":"+ ('0' + minutes).slice(-2)
                    "time": element.minute + "'",
                    "order": element.order
                }
                this.state.timeline.push(sub);
            }

            if (element.comment.search("Substitution") != -1) {
                // var hours = Math.floor(element.minute / 60);
                // var minutes = element.minute % 60;
                let sub = {
                    "event": "SUBSTITUTION",
                    "image": substitution,
                    "commenttext": element.comment,
                    // "time":"0"+hours +":"+ ('0' + minutes).slice(-2)
                    "time": element.minute + "'",
                    "order": element.order
                }
                this.state.timeline.push(sub);
            }

            if (element.comment.search("red card") != -1) {
                // var hours = Math.floor(element.minute / 60);
                // var minutes = element.minute % 60;
                let sub = {
                    "event": "RED CARD",
                    "image": redcard,
                    "commenttext": element.comment,
                    // "time":"0"+hours +":"+ ('0' + minutes).slice(-2)
                    "time": element.minute + "'",
                    "order": element.order
                }
                this.state.timeline.push(sub);
            }

            if (element.comment.search("yellow card") != -1) {
                // var hours = Math.floor(element.minute / 60);
                // var minutes = element.minute % 60;
                let sub = {
                    "event": "YELLOW CARD",
                    "image": yellowcard,
                    "commenttext": element.comment,
                    // "time":"0"+hours +":"+ ('0' + minutes).slice(-2)
                    "time": element.minute + "'",
                    "order": element.order
                }
                this.state.timeline.push(sub);
            }

            if (element.comment.search("Thats all") != -1) {
                // var hours = Math.floor(element.minute / 60);
                // var minutes = element.minute % 60;
                let sub = {
                    "event": "FINISHED",
                    "image": finish,
                    "commenttext": element.comment,
                    // "time":"0"+hours +":"+ ('0' + minutes).slice(-2)
                    "time": element.minute + "'",
                    "order": element.order
                }
                this.state.timeline.push(sub);
            }


            if (element.comment.search("Corner") != -1) {
                // var hours = Math.floor(element.minute / 60);
                // var minutes = element.minute % 60;
                let sub = {
                    "event": "CORNER",
                    "image": corner,
                    "commenttext": element.comment,
                    // "time":"0"+hours +":"+ ('0' + minutes).slice(-2)
                    "time": element.minute + "'",
                    "order": element.order
                }
                this.state.timeline.push(sub);
            }
            // if (element.comment.search("Offside ") != -1) {
            //     // var hours = Math.floor(element.minute / 60);
            //     // var minutes = element.minute % 60;
            //     let sub = {
            //         "event": "OFFSIDE",
            //         // "image": corner,
            //         "commenttext": element.comment,
            //         // "time":"0"+hours +":"+ ('0' + minutes).slice(-2)
            //         "time": element.minute + "'",
            //         "order": element.order
            //     }
            //     this.state.timeline.push(sub);
            // }
            // if (element.comment.search("New attacking attempt") != -1) {
            //     // var hours = Math.floor(element.minute / 60);
            //     // var minutes = element.minute % 60;
            //     let sub = {
            //         "event": "NEW ATTACK",
            //         // "image": corner,
            //         "commenttext": element.comment,
            //         // "time":"0"+hours +":"+ ('0' + minutes).slice(-2)
            //         "time": element.minute + "'",
            //         "order": element.order
            //     }
            //     this.state.timeline.push(sub);
            // }
            // if (element.comment.search("First Half starts") != -1) {
            //     // var hours = Math.floor(element.minute / 60);
            //     // var minutes = element.minute % 60;
            //     let sub = {
            //         "event": "FIRST HALF",
            //         // "image": corner,
            //         "commenttext": element.comment,
            //         // "time":"0"+hours +":"+ ('0' + minutes).slice(-2)
            //         "time": element.minute + "'",
            //         "order": element.order
            //     }
            //     this.state.timeline.push(sub);
            // }
        });
        this.setState({
            isLoading: true
        })

    }


    render() {
        this.state.timeline.sort((a, b) => parseInt(b.order) - parseInt(a.order));

        const { timeline, isLoading } = this.state;
        // console.log(this.props.scrolled)
        //console.log(timeline.length)
        return (

            <div className={this.props.scrolled ? "tab-content scrolledHeight" : "tab-content"}>
                {this.props.loadingCommentLineup &&

                    <div className="col-xs-4 s" >

                        <img src={loader} alt="" style={{
                            height: 60,
                            marginTop: 120,
                            marginLeft: '125px',
                            marginBottom: 120
                        }} />
                    </div>
                }
                {timeline.length==0 && <tbody>
                    
                    <tr>
                        <th colSpan="2"
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
                        </th>
                    </tr>
                </tbody>}
                {/* {this.props.timelines.length===0 && <div>data not fount</div>} */}
                <div role="tabpanel" className="tab-pane active" id="timeline" style={{ marginBottom: "20px" }}>
                    {timeline && timeline.map((data, key) => {

                        return (
                            data.event !== "GOAL" ?

                                <div className="row activity" key={key}>

                                    <div className="col-xs-2">
                                        <div className="notif-icon">
                                            <div className="icon">
                                                <img src={data.image} alt="" style={{ height: 47, width: 40 }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-10">

                                        <div className="notif-body">
                                            {data.commenttext.length <= 130 ? (
                                                <div className="msg" style={{ height: "auto" }}>

                                                    <h4 style={{ fontSize: "15px" }}>{data.event}<div className="goalTime"> {data.time}</div></h4>

                                                    <span style={{ fontSize: "13px" }}>{data.commenttext}</span>

                                                </div>)
                                                : (

                                                    (<div className="msg" style={{}}>

                                                        <h4 style={{ fontSize: "15px" }}>{data.event}<div className="goalTime"> {data.time}</div></h4>


                                                        <span style={{ fontSize: "13px" }}>{data.commenttext}</span>


                                                    </div>)
                                                )}
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="row activity"  key={key}>

                                    <div className="col-xs-2">
                                        <div className="notif-icon">
                                            <div className="icon">
                                                <img src={data.image} alt="" style={{ height: 47, width: 40 }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-10">

                                        <div className="green">
                                            {data.commenttext.length <= 130 ? (
                                                <div className="msg" style={{ background: "#DBFFB9" }}>

                                                    <h4 style={{ fontSize: "15px" }}>{data.event}<div className="goalTime"><div>{data.time}</div></div></h4>

                                                    <span style={{ fontSize: "13px" }}>{data.commenttext}</span>

                                                </div>)
                                                : (

                                                    (<div className="msg" style={{ background: "#DBFFB9" }}>

                                                        <h4 style={{ fontSize: "15px" }}>{data.event} <div className="goalTime"> {data.time}</div></h4>


                                                        <span style={{ fontSize: "13px" }}>{data.commenttext}</span>


                                                    </div>)
                                                )}
                                        </div>
                                    </div>
                                </div>
                        )

                    })

                    }

                </div>
            </div>
        );
        // });
    }
}

export default Timeline;

{/* <div class="timeline" style={{ marginLeft: '10px', height: 320, overflow: 'auto' }}>
            {timelines.slice(0).reverse().map((data, index) => {
                return <div  style={{background: "white"}}>
                    <div class="imso_gf__gf-cmtry">
                    </div>
                    <div class="imso_gf__in-card-hr">
                        <i class="fa fa-headphones" aria-hidden="true" style={{ marginTop: -1, marginRight: 5 }}></i>
                        <div class="imso_gf__nofold" style={{ padding: '5px 16px 5px 0px' }}>
                            <div class="imso_gf__fh-ttl" style={{ fontFamily: "arial,sans-serif-medium,sans-serif", fontWeight: 'bold', fontSize: 11, letterSpacing: "0.75px", lineHeight: '16px' }}>COMMENTARY</div><div class="imso_gf__fh-sub">{data.minute}'</div>
                        </div></div>
                    <div class="imso_gf__hdr-div"></div>
                    <div data-ved="2ahUKEwidr9qi0qrmAhWn4jgGHU8FAj0QqrwEegQIARAI">
                        <div class="imso_gf__xtxt" style={{ margin: 5, color: '#535d64' }}>{data.comment}&nbsp;</div>
                    </div>
                </div>
            })
            }

        </div> */}