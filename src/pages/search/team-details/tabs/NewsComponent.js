import React from 'react';
import { withRouter } from 'react-router-dom';
import { randomNewsBanner } from '../../../../_helper/random-image';
import Moment from 'react-moment';

class NewsComponent extends React.Component {
    news = (data) => {
        
        if (Boolean(data)) {
            window.location.href = data;
        }
    }
    render() {
        const { data } = this.props;
        console.log(this.props);
        console.log(data);
        return (
            <>
                <div class="well" style={{ backgroundColor: '#f5f5f5', border: '1px solid #e3e3e3' }}>
                    <div class="team mt-0">
                        {data && <h4>News</h4>}
                        {console.log(({ rendefr: data }))}
                        {data.map((news, key) => {
                            return <div class="">
                                <div class="post post-widget" onClick={() => this.news(news.url)} style={{marginBottom:15}}>
                                    <a class="post-img" ><img src={news.urlToImage} alt="" /></a>
                                    <div class="post-body">
                                        <p class="title-cat" style={{color:'black'}}></p>
                                        <h3 class="post-title">
                                            <a>
                                            {news.title.substring(0, 60)}...
                                            </a>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        })
                        }
                    </div>
                </div>
            </>
        );
    }
};

export default withRouter(NewsComponent);