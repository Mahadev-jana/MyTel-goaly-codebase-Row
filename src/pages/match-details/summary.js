import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import MatchInfo from './tabs/match-info';
import Comments from './tabs/comments';
class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0
        }
    }
    setTab = tab => {
        this.setState({tab});
    }
    render() {
        const { tab } = this.state;
        return(
            <Fragment>
                <div className="col-xs-12 main-cat lm" style={{paddingTop: '10px', paddingBottom: '10px', marginBottom: '1px'}}>
                    <ul className="nav nav-tabs match-tab">
                        <li><a onClick={()=>this.setTab(0)} className={classnames({'active':Boolean(tab===0)})}>Match Info</a></li>
                        <li><a onClick={()=>this.setTab(1)} className={classnames({'active':Boolean(tab===1)})}>Comments</a></li>
                        <li><a onClick={()=>this.setTab(2)} className={classnames({'active':Boolean(tab===2)})}>Statistics</a></li>
                        <li><a onClick={()=>this.setTab(3)} className={classnames({'active':Boolean(tab===3)})}>Line-ups</a></li>
                    </ul>
                </div>
                {Boolean(tab===0) && <MatchInfo id={this.props.matchId}/>}
                {Boolean(tab===1) && <Comments id={this.props.matchId}/>}
                {Boolean(tab===2) && <MatchInfo/>}
                {Boolean(tab===3) && <MatchInfo/>}
            </Fragment>
        );
    }
};

export default Summary;