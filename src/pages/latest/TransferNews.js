import React from 'react';
import classnames from 'classnames';
import { post } from '../../api';
import { randomNewsBanner } from '../../_helper/random-image';
import MenuCategory from '../../components/menu-category';
import News from './news';
import LatestNewsSlider from './latest-news-slider';
import { LatestNewsSliderSimmer } from '../../simmer-loader';
import Swal from 'sweetalert2';
import {isAuthenticate,getUserDetails} from '../../_helper/authentication';
import {withRouter} from "react-router-dom";

class PopularNews extends React.Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            news: [],
            page: 0,
            isLoadMore: true,
            loading: false,
            teamTab:this.props.teamTab,
            tab:this.props.tab
        }
    }
    componentDidMount() {
        if(this.state.teamTab==='allTeam'){
        this.getLatestNews()
        }
        else{
            console.log("no data found")
            this.getdetails();
        }
    }
    getdetails=()=>{
        if(isAuthenticate() && this.state.teamTab==='myTeam'){
            console.log("user login")
        }
        else{
            if(this.state.teamTab==='myTeam'){
                Swal.fire({
                    title: "No Data Currently. Please Add Favourite Team",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonText: "OKAY",
                    cancelButtonText: "CANCEL",
                }).then((result)=>{
                    if(result.value){
                        this.props.history.push("/");
                    }else{

                    }
                });
            }
        }
    }




    // loadMore = () => {
    //     const { page } = this.state;
    //     this.getLatestNews(page+1);
    //     this.setState({page: page+1});
    // }
    getLatestNews = (page = 0) => {
        this.setState({ loading: true });
        // const payload = new FormData();
        // payload.append('page', page);
        post('api/gettransfernews')
            .then(res => {
                if (res.data.success == 1) {
                    let news = res.data.news;
                    //console.log(news)
                    news.map((data, key) => {
                        if (!Boolean(data.media_url)) {
                            news[key].media_url = randomNewsBanner();
                        }
                    })
                    this.setState(prevState => ({ news: [...prevState.news, ...news], loading: false }));
                }
                if (res.data.success == 0) {
                    this.setState({ isLoadMore: false, loading: false });
                }
            })
            .catch(err => console.log(err));
    }
    render() {
        const { news, loading } = this.state;
        return (
            <React.Fragment>
                <div>
                    <div>
                        {!!loading && !Boolean(news.length) && <LatestNewsSliderSimmer />}
                        {!loading && Boolean(news.length) && <LatestNewsSlider news={news.slice(0, 3)} />}
                        {!loading && !Boolean(news.length) && <div className="col-xs-12 ct">
                            <div style={{ textAlign: "center", height: 150, marginTop: 150 }}> No News Found </div>
                        </div>}
                    </div>
                </div>


                {!loading && Boolean(news.length) && <News
                    news={news}
                    isLoadMore={this.state.isLoadMore}
                    loading={this.state.loading}
                // loadMore={this.loadMore}
                />}
            </React.Fragment>
        );
    }
};

export default withRouter(PopularNews);