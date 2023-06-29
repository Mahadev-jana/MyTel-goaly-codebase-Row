import React from 'react';
import { withRouter } from 'react-router-dom';
import { randomNewsBanner } from '../../_helper/random-image';

class NewsComponent extends React.Component {
    news = ( id) => {
        if (Boolean(more)) {
            const newsLinks = ["www.goal.com"];
            if (newsLinks.indexOf(more.split("/")[2])>-1) {
                window.location.href = more;
            } else {
                this.props.history.push(`/latest/${id}`);
            }
        }
    }
    render() {
        const { data } = this.props;
        return(
            <div className="post post-widget" onClick={() => this.news(data.url)} >
                <a className="post-img">
                    <span style={{
                        position: 'absolute',
                        background: 'rgba(77, 0, 83, 0.7)',
                        color: '#fff',
                        fontSize: '11px',
                        padding: '1px 3px'
                    }}>{data.publishedDate.split(' ')[0]}</span>
                    {/* <img src={data.media_url === '' ? randomNewsBanner() : data.media_url} alt="" /> */}
                </a>
                <div className="post-body">
                    <h3 className="post-title">
                        <a>{data.title}</a>
                    </h3>
                    <span style={{
                        fontSize: '9px',
                        color: '#8e8c8c',
                        fontStyle: 'italic',
                        fontWeight: '600',
                        letterSpacing: '0.8px'
                    }}>{data.publishedDate}</span>
                </div>
            </div>  
        );
    }
};

export default withRouter(NewsComponent);