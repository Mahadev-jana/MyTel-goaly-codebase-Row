import React from 'react';
import classnames from 'classnames';
import { post } from '../../api';
import { randomNewsBanner } from '../../_helper/random-image';
import MenuCategory from '../../components/menu-category';
import News from './news';
import LatestNewsSlider from './latest-news-slider';
import { LatestNewsSliderSimmer } from '../../simmer-loader';
import Swal from "sweetalert2";
import {
    isAuthenticate,
    getUserDetails,
  } from '../../_helper/authentication';
  import { withRouter } from "react-router-dom";
import axios from '../../_config/axios';


class PopularNews extends React.Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            news: [],
            page: 0,
            isLoadMore: true,
            loading: false,
            teamTab:props.teamTab,
            tab:props.tab,
            userId:props.userId
        }
    }
    componentDidMount() {

             if(this.state.teamTab==='allTeam'){
                this.getLatestNews()
             } 
             else{
                 this.getdetails()
             }
      
        //this.getLatestNews()
    }
    // loadMore = () => {
    //     const { page } = this.state;
    //     this.getLatestNews(page+1);
    //     this.setState({page: page+1});
    // }
     getdetails = () => {
        if(isAuthenticate() && this.state.teamTab=== 'myTeam'){
            console.log('user login')
            const payload = new FormData()
            payload.append('user_id',getUserDetails().id)
            axios.post('Api/hottestFavTeamNews',payload).then(res=>{
                console.log(res)
                this.setState({news:res.data.news})
            })
            .catch(err=>{
                console.log('error')
            })
        }
        else{
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
            });
        }

     }
      


    getLatestNews = (page = 0) => {
        this.setState({ loading: true });
        // const payload = new FormData();
        // payload.append('page', page);
        post('api/getpopularnews')
            .then(res => {
                if (res.data.success == 1) {
                    let news = res.data.news;
                    news.map((data, key) => {
                        if (!Boolean(data.media_url)) {
                            news[key].media_url = randomNewsBanner();
                        }
                    })
                    this.setState(prevState => ({ news: [...prevState.news, ...news], loading: false }));
                }
                if (res.data.success == 0) {
                    this.setState({ loading: false });
                }
            })
            .catch(err => console.log(err));
    }
    render() {
        const { news } = this.state;
        return (
            <React.Fragment>
                <div>
                    <div>
                        {!Boolean(news.length) && <LatestNewsSliderSimmer />}
                        {Boolean(news.length) && <LatestNewsSlider news={news.slice(0, 3)} />}
                    </div>
                </div>
                <News
                    news={news}
                    isLoadMore={this.state.isLoadMore}
                    loading={this.state.loading}
                // loadMore={this.state.loadMore}
                />
            </React.Fragment>
        );
    }
};

export default withRouter(PopularNews);