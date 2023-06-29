import React from 'react';
import { withRouter } from 'react-router-dom';
import { post } from '../../../../api';
import NewsComponent from './NewsComponent';

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            team: '',
            loading: false
        }
    }
    componentDidMount() {
        this.getMatches();
    }
    componentWillReceiveProps(oldProps, newProps) {
        if (oldProps !== newProps ) {
            this.getMatches();
        }
    }
    getMatches = () => {
        this.setState({loading: true});
        const payload = new FormData();
        payload.append('comp_id', this.props.search);
        post('allLeagueNews', payload).then(res => {
            console.log({res});
            if (res.data.success == 1) {
                this.setState({
                    news: res.data.news,
                    team: res.data.team,
                    loading: false
                });
            }
        }).catch(err => {
            console.error(err);
        })
    }
    render() {
        const { news, team, loading } = this.state;
        console.table(news);
        return(
            <div className="tab-pane fade active p-3 in">
                <div className="part" style={{padding: '10px 10px 10px 0px'}}>
                    <div className="tab-pane fade active p-3 in">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="lm" style={{marginLeft: '10px'}}>
                                    <h4>News {Boolean(team !== '') && <span style={{
                                                            color: '#b9b9b9',
                                                            padding: '0 2px',
                                                            letterSpacing: '0.8px'
                                                        }}
                                                    ></span>}</h4>
                                    <div class="liner"></div>
                                    {loading && <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '32px 0px',
                                        background: '#e9e9e9',
                                        color: '#8e8e8e',
                                        letterSpacing: '1px'
                                    }}>
                                        <div>Loading...</div>
                                    </div>}
                                    {!loading && (news.length ==0) && <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '32px 0px',
                                        background: '#e9e9e9',
                                        color: '#8e8e8e',
                                        letterSpacing: '1px'
                                    }}>
                                        <div>Oop!</div>
                                        <div>No news found about {team}!!</div>
                                    </div>}
                                    {(news.length >0) && news.map((data, key)=>(<NewsComponent key={key} data={data} />))}
								    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
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