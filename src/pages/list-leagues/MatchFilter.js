import React from 'react';
import classnames from 'classnames';
import imgLive from '../../assets/img/logo-live.png';




const MatchFilter = React.memo(props => {
    const { type, filter } = props;

    return (
        <div className="row" style={{
            marginTop: '15px'
        }}>
            <div className="col-xs-3" style={{
                textAlign: 'center'
            }}>
                <span className={
                    classnames(
                        "filter-button",
                        {
                            "filter-button-active": Boolean(type === 'live')
                        }
                    )
                }
                    onClick={() => filter('live')}
                ><img src={imgLive} alt="live logo" /></span>
            </div>
            <div className="col-xs-9" style={{
                textAlign: 'right'
            }}>
                <span className={
                    classnames(
                        "datetime", "btn", "btn-default",

                    )
                }
                    style={Boolean(type === 'yesterday') ? { background: '#D8004B', color: '#fff' } : { background: '#fff', color: '#000' }}
                    onClick={() => filter('yesterday')}
                >Previous </span>
                <span className={
                    classnames(
                        "datetime", "btn", "btn-default",

                    )
                }
                    style={Boolean(type === 'today') ? { background: '#D8004B', color: '#fff' } : { background: '#fff', color: '#000' }}
                    onClick={() => filter('today')}
                >Today</span>
                <span className={
                    classnames(
                        "datetime", "btn", "btn-default",
                    )
                }
                    style={Boolean(type === 'tomorrow') ? { background: '#D8004B', color: '#fff' } : { background: '#fff', color: '#000' }}
                    onClick={() => filter('tomorrow')}
                >Next</span>
            </div>
        </div>
    );
});

export default MatchFilter;