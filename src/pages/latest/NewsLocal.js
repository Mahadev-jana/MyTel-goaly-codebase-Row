import React, { Component, Fragment } from 'react';
import { Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { LatestNewsSimmer } from '../../simmer-loader';
import logoLoadMore from '../../assets/img/load-more.png';
import logoLoadMoreLoader from '../../assets/img/load-more-loader.gif';
import NewsComponentLocal from './NewsComponentLocal';

class News extends Component {
    constructor(){
        super();
        this.state={
            limit:10
        }
    }
   
    loadMore=()=>{
        this.setState({
            limit:this.state.limit+5
        })
    }
    render() {
        const { news } = this.props;
        //console.log(news)
        return (
            <Col className="team lm ct row">
                <div className="aside-widget">
                    {!Boolean(news.length) && <>
                        <LatestNewsSimmer />
                        <LatestNewsSimmer />
                        <LatestNewsSimmer />
                    </>}
                    {news && news.slice(0,this.state.limit).map((data, key) => (<NewsComponentLocal key={key} data={data} />))}
                </div>
                <div className="clearfix"></div>
                
                {this.state.limit<news.length &&
                <div style={{
                    width: 'fit-content',
                    background: '#0F7B30',
                    color: '#fff',
                    borderRadius: '2px',
                    padding: '2px 10px',
                    margin: '0px 90px 15px'
                }} onClick={this.loadMore}>
                        <img style={{
                            height: '12px',
                            width: '12px',
                            marginRight: '5px',
                            marginTop: '-3px'
                        }} src={logoLoadMore} />Load More</div>
                        }
                        {/* </div>} */}
                {Boolean(news.length) && this.props.loading && <div style={{
                    textAlign: '-webkit-center',
                    padding: '10px'
                }}>
                    <img style={{
                        height: '25px',
                        width: '25px'
                    }} src={logoLoadMoreLoader} />
                </div>}
            </Col>
        );
    }
};

export default withRouter(News);
