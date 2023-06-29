import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { post, authPost } from '../../../api';
import { isAuthenticate } from '../../../_helper/authentication';
import { CommentarySimmer } from '../../../simmer-loader';
import axios from '../../../_config/axios';
import { isArray } from 'lodash';
import Swal from 'sweetalert2';
import { Link, animateScroll as scroll } from "react-scroll";

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            live: [],
            comment: '',
            loading: false,
            value: ''
        }
    }
    componentDidMount() {
        this.scrollToBottom();
        //console.log('componentDidMount')
        this.setState({ loading: true });
        this.getComments();
        this.interval = setInterval(() => {
            this.getComments();
        },60000);

    }
    componentWillUnmount() {
        
        console.log('componentWillUnmount')
        clearInterval(this.interval);

    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    }

        
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    getComments = () => {

        const _this = this;
        const matchId = this.props.id;
        const payload2 = new FormData();
        const user = JSON.parse(localStorage.getItem('userDetails'));

        if (user) {
            payload2.append('user_id', user.id);
            payload2.append('match_id', matchId);
            payload2.append('comment', '');
            axios.post('/StageGoalyApi/addusercomment', payload2).then(res => {
                if (res.data && res.data.success && res.data.success == 1) {
                    if (res.data.user_comments && isArray(res.data.user_comments)) {
                        
                        this.setState({ live: res.data.user_comments });
                        this.scrollToBottom();
                        
                        
                    } else {
                    }
                }
            }).catch(err => {
                console.log({ err });
            })

        }
    }



    submitchat() {
        const user = JSON.parse(localStorage.getItem('userDetails'));
        if (user == null) {
            Swal.fire({
                type: 'error',
                title: 'Login first to add your comments!!',
                confirmButtonText: 'login',
            }).then(result => {
                if (result.value) {
                    this.props.history.push('/login');
                }
            });

        } else {
            
            const matchId = this.props.id;
            const payload = new FormData();
            payload.append('user_id', user.id);
            payload.append('match_id', matchId);
            payload.append('comment', this.state.value);
            axios.post('/StageGoalyApi/addusercomment', payload).then(res => {
                if (res.data && res.data.success && res.data.success == 1) {
                    if (res.data.user_comments && isArray(res.data.user_comments)) {
                        this.setState({ live: res.data.user_comments });
                        // this.setState({ value: '' });
                        // console.log(this.state.value.length)
                        if(this.state.value.length>=1){
                        this.scrollToBottom();
                        }
                        this.setState({ value: '' });
                        
                    } else{
                        this.setState({ value: '' });
                        
                    }
                }
            }).catch(err => {
                console.log({ err });
            })
        }
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }




    render() {
        const { live } = this.state;
        return (
            <div class="timeline">
                <div class="overflow">
                    {/* 
                    <div ref={(el) => { this.messagesEnd = el; }}>
                    </div> */}
                    <ul class="chat">
                        {live && live.map((chat, key) => (
                            <li class="left clearfix" style={{ marginBottom: 2 }}><span class="chat-img pull-left">
                                <img src={chat.image} alt="User Avatar" class="img-circle" style={{ height: 40, width: 40, padding: 10 }} />
                            </span>
                                <div class="chat-body clearfix">
                                    <div class="header">
                                        <strong class="primary-font">{chat.name}</strong> <small class="pull-right text-muted">
                                            <span class="glyphicon glyphicon-time"></span>{chat.time_elapse}</small>
                                    </div>
                                    <p>
                                        {chat.comment}
                                    </p>
                                </div>
                            </li>
                        ))}

                        <li style={{ float: "left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </li>

                    </ul>

                </div>
                <div class="panel-footer">
                    <div class="input-group">
                        <input id="btn-input" type="text" class="form-control input-sm form-chat" placeholder="Type your message here..." value={this.state.value} onChange={this.handleChange.bind(this)} />
                        <span class="input-group-btn">
                            <button class="btn btn-warning btn-sm" id="btn-chat" onClick={this.submitchat.bind(this)}>
                                Send</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
};

export default withRouter(Comments);