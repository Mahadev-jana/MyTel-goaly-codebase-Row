import React, { Component, Fragment } from 'react';
import { Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { LatestNewsSimmer } from '../../simmer-loader';
import logoLoadMore from '../../assets/img/load-more.png';
import logoLoadMoreLoader from '../../assets/img/load-more-loader.gif';
import NewsComponent from './NewsComponent';

class News extends Component {
    constructor() {
        super();
        this.state = {
            limit: 10
        }
    }
    loadMore = () => {

        this.setState({
            limit: this.state.limit + 5
        })
    }
    render() {
        const { news, loading } = this.props;
        //console.log(news.length)
        return (
            <Col className="team lm ct row">
                <div className="aside-widget">
                    {!Boolean(news.length) && loading && <>
                        <LatestNewsSimmer />
                        <LatestNewsSimmer />
                        <LatestNewsSimmer />
                    </>}
                    {loading == false && isEmpty(news) &&
                        <div style={{
                            display: 'flex',
                            lineHeight: '400px',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{
                                // color: 'red',
                                fontSize: '20px',
                                fontWeight: 100,
                                letterSpacing: '1px'
                            }}> No news found!</span>
                        </div>
                    }
                    {news && news.slice(0, this.state.limit).map((data, key) => (<NewsComponent key={key} data={data} />))}
                </div>
                {Boolean(news.length) && this.props.isLoadMore && !this.props.loading && <div style={{
                    textAlign: '-webkit-center',
                    padding: '10px'
                }}>
                    {/* {this.state.limit < news.length && 
                <div style={{
                    width: 'fit-content',
                    background: '#4d0053',
                    color: '#fff',
                    borderRadius: '2px',
                    padding: '2px 10px'
                }} onClick={this.loadMore}>
                
                        <img style={{
                            height: '12px',
                            width: '12px',
                            marginRight: '5px',
                            marginTop: '-3px'
                        }} src={logoLoadMore} />Load More</div>
                        } */}
                        
                        <span className="news-devider"></span>
                        {this.state.limit < news.length && 
            <a  className="btn btn-lg btn-dark w-100" style={{color: 'white'}} onClick={this.loadMore}>See All</a>}
                </div>
                }
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
