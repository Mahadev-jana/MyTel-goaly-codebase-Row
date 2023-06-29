import React from 'react';
import { Link } from 'react-router-dom';
import { LatestNewsSimmer } from '../../simmer-loader';
import { randomNewsBanner } from '../../_helper/random-image';
import imgLatestNews from '../../assets/img/latest_news.png';
import NewsComponent from './NewsComponent';


const LatestNews = ({latestNews}) => {
    return( 
        <div className="team col-xs-12">
            <Link to='/latest' style={{float: 'right'}}>See All</Link>
            <div className="title3">Latest News</div>
            <div className="aside-widget">
                {latestNews && !Boolean(latestNews.length) && <><LatestNewsSimmer /><LatestNewsSimmer /><LatestNewsSimmer /></>}
                {latestNews && latestNews.map((data, key)=>(<NewsComponent key={key} data={data} />))}
            </div>
        </div>
    );
};

const News = ({data}) => (
    <div className="post post-widget">
        <Link to={`/latest/${data.id}`} className="post-img">
            <img src={data.media_url===''? randomNewsBanner() : data.media_url} alt="" />
        </Link>
        <div className="post-body">
            <h3 className="post-title">
                <Link to={`/latest/${data.id}`}>{data.title}</Link>
            </h3>
        </div>
    </div>
);

export default LatestNews;