import React, { Component, Fragment } from 'react';
import Timeline from './tabs/timeline';
// import Stats from './tabs/stats';
import Comments from './tabs/comments';
import Commentary from './tabs/commentary';

class TabComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tab : 0,
        }
    }

    handleTabChange = tab => {
        this.setState({tab});
    }
    
    render() {
        const { tab } = this.state;
        return(
            <Fragment>
                <div className="row">
                    <div className="hr"></div>
                </div>
                <div className="row cm">
                    <div className="col-xs-4 text-center" onClick={()=>this.handleTabChange(0)}>
                        <a>
                            {Boolean(tab===0) ? <strong>Timeline</strong> : `TimeLine` }
                        </a>
                    </div>
                    <div className="col-xs-4 text-center" onClick={()=>this.handleTabChange(1)}>
                        <a>
                            {Boolean(tab===1) ? <strong>Commentary</strong> : `Commentary` }
                        </a>
                    </div>
                    {/* <div className="col-xs-3 text-center" onClick={()=>this.handleTabChange(2)}>
                        <a>
                            {Boolean(tab===2) ? <strong>Stats</strong> : `Stats` }
                        </a>
                    </div> */}
                    <div className="col-xs-4 text-center" onClick={()=>this.handleTabChange(3)}>
                        <a>
                            {Boolean(tab===3) ? <strong>Live Chat</strong> : `Live Chat` }
                        </a>
                    </div>
                </div>
                <div className="row mt-10">
                    <div className="hr"></div>
                </div>
                {Boolean(tab===0) && <Timeline />}
                {Boolean(tab===1) && <Commentary />}
                {/* {Boolean(tab===2) && <Stats />} */}
                {Boolean(tab===3) && <Comments />}
            </Fragment>
        );
    }
};

export default TabComponent;