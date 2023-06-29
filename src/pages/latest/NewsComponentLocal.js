import React from 'react';
import { withRouter,Link } from 'react-router-dom';
import { randomNewsBanner } from '../../_helper/random-image';
import { dateFomat, dateTimeFomat } from '../../_helper/date-format';
import { post } from '../../api';
import Moment from 'react-moment';
import ClampLines from 'react-clamp-lines';


class NewsComponent extends React.Component {
    
    render() {
        const { data } = this.props;
        return (
            
            <Link to={`/local/${data.id}`}>
                    <div className="block bg-white">
                        <div className="news" >
                            <div className="news-cover" style={{width: '100%',margin: '0px 10px 0px 10px'}}><img style={{/*maxWidth:'100px',*/ borderRadius:'12px',maxHeight: '160px',height:'120px'}} src={data.urlToImage === '' ? randomNewsBanner() : data.urlToImage} alt="" /></div>
                            <div className="news-title" style={{width:'450px'}}>

                                <h5>{data.title}</h5>
                                <span style={{color:'#4d0053'}}>-{data.name}</span><br/>
                                <span><Moment format="ddd, DD/MM/YY">{data.publishedAt}</Moment></span>

                            </div>
                        </div>
                    </div>
                </Link>
        
        );
    }
};

export default withRouter(NewsComponent);