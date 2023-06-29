import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import SwipeableTabs from 'react-swipeable-tabs';
import { withRouter } from 'react-router-dom';
import MenuCategory from '../../components/menu-category';
import { post } from '../../api';
import LiveMatchDetails from './LiveMatchDetails';
import { LiveMatchMenuSimmer } from '../../simmer-loader';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import LeagueList from './league-list/LeagueList';

class MatchDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            competitions: [],
            activeItemIndex: 0,
            items: [],
            selectedId: null,
            selectedCompetitionName: null,
            leagues: [],
            isLoading: false
        }
    }
    componentDidMount() {
        this.getLeagues();
        this.setState({ activeItemIndex: 0 });
    }
    getStanding = (selectedId, selectedCompetitionName) => {
        this.setState({ selectedId, selectedCompetitionName });
    }

    getLeagues = () => {
        this.setState({ isLoading: true })
        const payload = new FormData();
        payload.append('page', 'live');
        post('api/getleagues', payload)
            .then(res => {
                const { leagues } = res.data;
                this.setState({ leagues: res.data.leagues })
                let items = [];
                leagues.forEach((league, key) => {
                    items.push(<a onClick={() => this.getStanding(league.competition_id, league.competition_name)} className="nav-link"><div className="text-l">{league.competition_name}</div><div className="logo-l"><img src={league.logo} /></div></a>)
                })

                this.setState({
                    items,
                    selectedId: leagues[0].competition_id,
                    selectedCompetitionName: leagues[0].competition_name
                });
                this.setState({ isLoading: false })
            })
            .catch(err => console.log(err));
    }

    render() {
        const { items, selectedId, selectedCompetitionName, competitions, leagues, isLoading } = this.state;
        return (
            <React.Fragment>
                {/* <Helmet>
                    <title>Goaly | Matches</title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
                <MenuCategory />
                <LeagueList leagues={leagues} isLoading={isLoading} />
                {/* <Row style={{paddingTop:'65px'}}>
                    <Col xs={12}>
                        <div className="row">
                            <div className="col-6">
                                <div className="mt-10 plr15">
                                    {!Boolean(items.length) && <LiveMatchMenuSimmer />}
                                    {Boolean(items.length) &&
                                    <div > <SwipeableTabs  
                                        noFirstLeftPadding={false}
                                        noLastRightPadding={false}
                                        fitItems={false}
                                        alignCenter={false}
                                        borderWidthRatio={1}
                                        activeItemIndex={this.state.activeItemIndex}
                                        onItemClick={(item, index) => this.setState({ activeItemIndex: index })}
                                        items={items}
                                        borderPosition="bottom"
                                        borderThickness={5}
                                        borderColor="#D9004B"
                                        activeStyle={{
                                            color: '#D9004B'
                                        }}
                                        itemStyle={{
                                            padding: 0,
                                        }}
                                    />
                                    </div>}
                                    {Boolean(selectedId) && Boolean(selectedCompetitionName) && <LiveMatchDetails id={selectedId} title={selectedCompetitionName} />}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row> */}
            </React.Fragment>
        );
    }
};

export default withRouter(MatchDetails);
