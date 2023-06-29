import React from 'react';
import { withRouter } from 'react-router-dom';
import { post } from '../../../api';
import NewsComponent from './NewsComponent';
import loader from '../../../assets/loader/loaderspinner.gif';
import Moment from 'react-moment';
import { isArray, isEmpty } from 'lodash';
import '../../../assets/css/detail-club.css';
// import people3 from '../../../assets/img/detail-club/people3.png'
// import people from '../../../assets/img/detail-club/people.png'
// import people2 from '../../../assets/img/detail-club/people2.png';
import classnames from 'classnames';
class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            // team: '',
            isLoading: false,
            // tab: 0,
            // listOpen:false,
            // newsType:'Hottest'

        }
    }

    componentDidMount() {
        // this.hottestNews();
        this.setState({
            isLoading: true
        });
        this.getMatches(this.props.id);
    }

    getMatches = (id) => {
        const payload = new FormData();
        payload.append('id', id);
        post('newsForTeam', payload).then(res => {
            console.warn({ res });
            if (res.data.success == 1) {
                this.setState({
                    news: res.data.news,
                    // team: res.data.team
                });
                this.setState({
                    isLoading: false
                });
            } else {
                this.setState({
                    isLoading: false
                });
            }
        }).catch(err => {
            console.error(err);
            this.setState({
                isLoading: false
            });
        })
    }
    // hottestNews = () => {
    //     this.setState({ tab: 0, isLoading: true })
    //     post('/getpopularnews').then(res => {
    //         console.warn({ res });
    //         if (res.data.success == 1) {
    //             this.setState({
    //                 news: res.data.news,
    //                 team: res.data.team,
    //                 listOpen:false,
    //                 newsType:'Hottest'
    //             });
    //             this.setState({
    //                 isLoading: false
    //             });
    //         } else {
    //             this.setState({
    //                 isLoading: false
    //             });
    //         }
    //     }).catch(err => {
    //         console.error(err);
    //         this.setState({
    //             isLoading: false
    //         });
    //     })
    // }
    // latestNews = () => {
    //     this.setState({ tab: 1, isLoading: true })
    //     post('/latestNewsSM').then(res => {
    //         console.warn({ res });
    //         if (res.data.success == 1) {
    //             this.setState({
    //                 news: res.data.news,
    //                 team: res.data.team,
    //                 listOpen:false,
    //                 newsType:'Latest'
    //             });
    //             this.setState({
    //                 isLoading: false
    //             });
    //         } else {
    //             this.setState({
    //                 isLoading: false
    //             });
    //         }
    //     }).catch(err => {
    //         console.error(err);
    //         this.setState({
    //             isLoading: false
    //         });
    //     })
    // }
    // trasferNews = () => {
    //     this.setState({ tab: 2, isLoading: true })
    //     post('/gettransfernews').then(res => {
    //         console.warn({ res });
    //         if (res.data.success == 1) {
    //             this.setState({
    //                 news: res.data.news,
    //                 team: res.data.team,
    //                 listOpen:false,
    //                 newsType:'Transfer'
    //             });
    //             this.setState({
    //                 isLoading: false
    //             });
    //         } else {
    //             this.setState({
    //                 isLoading: false
    //             });
    //         }
    //     }).catch(err => {
    //         console.error(err);
    //         this.setState({
    //             isLoading: false
    //         });
    //     })
    // }
    // spreadList=()=>{
	// 	// console.log('open listttttt')
	// 	this.setState(prevState => ({
	// 		listOpen: !prevState.listOpen
	// 	  }))
	// }
    render() {
        const { news, team, isLoading, tab,listOpen } = this.state;
        console.log(news);
        return (


            <div role="tabpanel" class="tab-pane" id="News">
                {/* <ul className="nav nav-tabs" style={{padding: '13px',border:'none'}}>
                    <li className={classnames("nav-item", { "active": Boolean(tab === 0) })} onClick={this.hottestNews}>
                        <a className="nav-link" style={{ fontSize: 14 }}>Hottest</a>
                    </li>
                    <li className={classnames("nav-item", { "active": Boolean(tab === 1) })} onClick={this.latestNews}>
                        <a className="nav-link" style={{ fontSize: 14 }}>Latest</a>
                    </li>
                    <li className={classnames("nav-item", { "active": Boolean(tab === 2) })} onClick={this.trasferNews}>
                        <a className="nav-link" style={{ fontSize: 14 }}>Transfer</a>
                    </li>
                </ul> */}
                {/* <div class="dropdown">
                            <button class="btn btn-default dropdown-toggle w-100" 
                            style={{border: '1px solid #9c25a8',marginLeft: '10px',
                            width: '95%',
                            marginTop: '20px',
                            marginBottom: '5px',
                            marginBottom: '20px'}} 
                            type="button" id="dropdownMenuMatches" data-toggle="dropdown"
                             aria-haspopup="true" aria-expanded="true" onClick={this.spreadList}>
                                {this.state.newsType}
                                <span class="caret"></span>
                            </button>
                            {listOpen && <ul class="dropdown-menu w-100" aria-labelledby="dropdownMenuMatches"
                             style={{display:'block',marginTop:'-15px',width: '95%',
                                marginLeft: '10px',}}>
                                <li onClick={this.hottestNews}><a>Hottest</a></li>
                                <li onClick={this.latestNews}><a>Latest</a></li>
                                <li onClick={this.trasferNews}><a>Transfer</a></li>
                            </ul>}
                        </div> */}
                <div class="part" id="myTabContent" style={{ paddingBottom: 0, minHeight: 420,background: '#eee' }}>
                    {isLoading && <div> <div class="col-xs-4" style={{ height: 90 }}>
                    </div>
                        <div class="col-xs-4 s" >
                            <img src={loader} alt="" style={{
                                height: 60,
                                marginTop: 120
                            }} />
                        </div> </div>
                    }
                    {!isLoading && <div class="tab-pane fade active p-3 in" id="one" aria-labelledby="one-tab">
                        <div className="row">
                            <div class="col-xs-12">
                                <div class="lm" style={{ margin: '10px' ,background: '#eee'}}>
                                    {!!news && !isLoading && <h4 style={{ marginLeft: 10 }}></h4>}
                                    {!!news && news.map((data, key) => (
                                        <div class="main-news">
                                        <a href={data.url}>
                                            <div class="cover"><img src={data.urlToImage} alt="" /></div>
                                            <div class="caption">
                                                <h3>{data.title.substring(0, 40)}...</h3>
                                                <p>{data.publishedAt}</p>
                                            </div>
                                        </a>
                                        </div>
                                    ))}
                                    { !isLoading && isEmpty(news) &&<>
                                        <div style={{ color: '#343434', fontSize: 14, fontWeight: 700, textAlign: 'center' }}>
                                            <div>oops !</div>
                                            <div>No News Found</div>
                                        </div>
                                    </>
                                    }
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        );
    };
};

export default withRouter(News);

const dateFormat = (date) => {
    // console.log({date});
    const array = date.split(' ');
    // console.log({array});
    return date;
}

//PREVIOUS CODE

// <div className="tab-pane fade active p-3 in">
// <div className="part"  >

//     <div className="row">
//         <div className="col-xs-9">
//             <div className="pt-team">
//                 <img src="img/psg.png" height="24px" alt="" />{team}
//             </div>
//         </div>
//         <div className="col-xs-3">
//             <a onClick={() => this.props.history.goBack()} className="stand btn btn-default chk2">
//                 <i class="fas fa-arrow-left"></i>&nbsp; Back
//             </a>
//         </div>
//     </div>
// </div>
// <div class="part" id="myTabContent" style={{paddingBottom:0,minHeight:420}}>
// { isLoading && <> <div class="col-xs-4" style={{height:90}}>
//     </div>
//         <div class="col-xs-4 s" >
//             <img src={loader} alt="" style={{ 
//                         height: 60,
//                         marginTop: 120
//                 }} />
//         </div> </>
//     }
//     <div class="tab-pane fade active p-3 in" id="one" aria-labelledby="one-tab">
//         <div className="row">
//             <div class="col-xs-12">
//                 <div class="lm" style={{ marginLeft: '10px' }}>
//                 {!! news && !isLoading && <h4 style={{marginLeft:10}}></h4>}
//                     {!!news && news.map((data, key) => (<><NewsComponent key={key} data={data} /></>))}
//                     { !news.length && !isLoading && <>
//                     <div style={{color: '#343434', fontSize: 14,fontWeight: 700,textAlign:'center'}}>
//                             <div>oops !</div>
//                             <div>No News Found</div>
//                             </div>
//                     </>
//                     }
//                     <div class="clearfix"></div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// </div>