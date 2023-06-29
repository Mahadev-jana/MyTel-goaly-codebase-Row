import React, { Component } from 'react';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import Matches from './Matches';
import Standings from './Standings';
import Stats from './Stats';
import News from './News-LeagueOverview';


class ListMatches extends Component {

    constructor(props) {
        super(props);
        this.state = {
            competitions: [],
            activeItemIndex: 0,
            items: [],
            selectedId: null,
            selectedCompetitionName: null,
            tab: 'matches',
            id: null
        }
    }

    componentDidMount() {
        this.setState({ id: this.props.id });
        
        }

    

    componentWillReceiveProps(newprops) {
        this.setState({ id: newprops.id });
    }

    setTab(tab) {
        this.setState({
            tab: tab
        });
        this.setState({ id: this.props.id });
    }


    render() {
        //console.log(this.props)
        return (
            <div className="batbat" >
                <Tabs id="list-match-tabs" activeKey={this.state.tab} onSelect={this.setTab.bind(this)}
                    className="card-header tab-card-header">
                    <Tab eventKey="matches" title="Matches" tabClassName="nav-item" style={{
                        fontWeight: 100,
                        letterSpacing: '1px',
                        fontSize: '14px'
                    }}>
                        <div className="scrollbar scrollbar-primary">
                            {this.state.id && <Matches id={this.state.id} />}
                        </div>
                    </Tab>
                    <Tab eventKey="news" title="News" tabClassName="nav-item" style={{
                        fontWeight: 100,
                        letterSpacing: '1px',
                        fontSize: '14px',
                        margin: 0
                    }}>
                        <div className="scrollbar scrollbar-primary">
                            {this.state.tab === 'news' && <News id={this.state.id} />}
                        </div>
                    </Tab>
                    <Tab eventKey="standings" title="Standings" tabClassName="nav-item" style={{
                        fontWeight: 100,
                        letterSpacing: '1px',
                        fontSize: '14px'
                    }}>
                        <div className="scrollbar scrollbar-primary">
                            {this.state.tab === 'standings' && <Standings id={this.state.id} />}
                        </div>
                    </Tab>
                    <Tab eventKey="stats" title="Stats" tabClassName="nav-item" style={{
                        fontWeight: 100,
                        letterSpacing: '1px',
                        fontSize: '14px'
                    }}>
                        <div className="scrollbar scrollbar-primary">
                            {this.state.tab === 'stats' && <Stats id={this.state.id} />}
                        </div>
                    </Tab>
                </Tabs>

            </div>
        );
    }
};

export default ListMatches;