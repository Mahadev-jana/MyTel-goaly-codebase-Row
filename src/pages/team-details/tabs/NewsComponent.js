import React from 'react';
import { withRouter } from 'react-router-dom';
import { randomNewsBanner } from '../../../_helper/random-image';
import Moment from 'react-moment';

class NewsComponent extends React.Component {
    news = (data) => {
        
        if (Boolean(data)) {
            window.location.href = data;
        }
    }
    render() {
        const { data } = this.props;
      console.log(data);
        return(
            <>
             <div className="post post-widget" style={{padding:8, margin:'auto'}} onClick={() => this.news(data.url)}>
                     <a className="post-img">
                     <span style={{
                        position: 'absolute',
                        background: 'rgba(77, 0, 83, 0.7)',
                        color: '#fff',
                        fontSize: '11px',
                        padding: '1px 3px'
                    }}>{data.name}</span>
                    <img src={data.media_url === '' ? randomNewsBanner() : data.urlToImage} alt="" />
                </a>
                <div className="post-body">
                    <h3 className="post-title"
                    style={{
                        color: '#111',
                        textDecoration: 'none',
                        fontSize: 12,
                        margin:0    
                    }}>
                        <a style={{color: '#111',lineHeight: '20px'}}>{data.title.substring(0, 40)}...</a>
                    </h3>
                    <span style={{
                        fontSize: '9px',
                        color: '#8e8c8c',
                        fontStyle: 'italic',
                        fontWeight: '600',
                        letterSpacing: '0.8px'
                    }}><Moment format="ddd, DD/MM">{data.publishedAt}</Moment></span>

                </div>
            </div>  
            </>
        );
    }
};

export default withRouter(NewsComponent);