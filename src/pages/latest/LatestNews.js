import React, { Component } from 'react';
import { isArray } from 'lodash';
import { Row, Col } from 'react-bootstrap';

import axios from '../../_config/axios';
import { randomNewsBanner } from '../../_helper/random-image';
import News from './news';
import LatestNewsSlider from './latest-news-slider';
import { LatestNewsSliderSimmer } from '../../simmer-loader';

import Swal from "sweetalert2";
import {
    isAuthenticate,
    getUserDetails,
  } from '../../_helper/authentication';
  import { withRouter } from "react-router-dom";

class LatestNews extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            news: [],
            page: 0,
            isLoadMore: true,
            isLoading: false,
            teamTab:props.teamTab,
            tab:props.tab,
            userId:props.userId
        }

    }
    componentDidMount() {
        if(this.state.teamTab==="allTeam"){
            this.getLatestNews();
        }
        else{
            this.getdetails();
        }
        //this.getLatestNews();
    }




    getdetails = () => {
        if(isAuthenticate() && this.state.teamTab=== 'myTeam'){
            console.log('user login',getUserDetails().id)
            const payload= new FormData();
            payload.append("user_id",getUserDetails().id)
            axios.post('Api/latestFavTeamNews',payload).then(res=>{
                console.log(res.data)
                this.setState({
                    news:res.data.news,
                    isLoading:false
                })
            })
            .catch(errror=>{console.log('error')})
        }
        else{
            if(this.state.teamTab==='myTeam'){
          Swal.fire({
              title: "No Data Currently. Please Add Favourite Team",
              type: "info",
              showCancelButton: true,
              confirmButtonText: "OKAY",
              cancelButtonText: "CANCEL",
            }).then((result) => {
              if (result.value) {
                this.props.history.push("/");
              } else {
              }
            });}
        }

     }



    getLatestNews = (page = 0) => {
        this.setState({
            isLoading: true
        })
        // const payload = new FormData();
        // payload.append('page', page);
        axios.post('api/latestNewsSM').then(res => {
            //console.log(res)
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.news && isArray(res.data.news)) {


                    this.setState({
                        news: res.data.news,
                        isLoading: false
                    })
                }
            }
            if (res.data.success == 0) {
                this.setState({
                    isLoading: false,
                    isLoadMore: false
                })
            }
        })
            .catch(err => console.log(err));
    }

    
    render() {
        const { news,teamTab } = this.state;
        return (
            

            <React.Fragment>
                {/*this.state.userId===null && teamTab==="myTeam" && <div><h1>Login in</h1></div>*/}
                <div>
                    <div>
                        {!Boolean(news.length) && <LatestNewsSliderSimmer />}
                        {Boolean(news.length) && <LatestNewsSlider news={news.slice(0, 3)} />}
                    </div>
                </div>
                <News
                    news={news}
                    isLoadMore={this.state.isLoadMore}
                    loading={this.state.isLoading}
                // loadMore={this.state.loadMore}
                />
            </React.Fragment>
        );
    }
}
export default LatestNews;







