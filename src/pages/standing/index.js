import React from 'react';
import SwipeableTabs from 'react-swipeable-tabs';
import { LiveMatchMenuSimmer } from '../../simmer-loader';
import MenuCategory from '../../components/menu-category';
import { post } from '../../api';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import StandingContent from './standing-content';
import Standings from '../home/list-matches/Standings';

class Standing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leagues: [],
            activeItemIndex: 0,
            items: [],
            selectedId: null,
            selectedCompetitionName: null
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

        const payload = new FormData();
        payload.append('comp_id', this.props.match.params.id);
        post('standing', payload)
            .then(res => {
                const leagues = res.data.standing[0].data;
                let items = [];
                leagues.forEach((league, key) => {
                    items.push(<a onClick={() => this.getStanding(league.competition_id, league.competition_name)} className="nav-link"><div className="text-l">{league.competition_name}</div><div className="logo-l"><img src={league.logo} /></div></a>)
                })

                this.setState({
                    items,
                    selectedId: leagues[0].league_id,
                    selectedCompetitionName: leagues[0].competition_name
                });
            })
            .catch(err => console.log(err));
    }
    render() {
        const { items, selectedId, selectedCompetitionName } = this.state;
        return (
            <React.Fragment>
                {/* <Helmet>
                    <title>Goaly | Standings</title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
                <div className=" mt-10">
                    <MenuCategory />
                    <div className="col-xs-12" style={{paddingTop:'50px',paddingLeft:'0',paddingRight:'0'}}>
                        <div className="row">
                            <div className="col-6">
                                <div className="mt-10 plr15">
                                    {/* {!Boolean(items.length) && <LiveMatchMenuSimmer />} */}
                                    {/* <div style={{ backgroundColor: 'rgb(166, 78, 173)' }}>
                                    {Boolean(items.length) && <SwipeableTabs
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
                                    />}
                                </div> */}
                                    {/* {Boolean(selectedId) && <StandingContent id={selectedId} />} */}
                                    {Boolean(this.props.match.params.id) && <Standings id={this.props.match.params.id} />}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default Standing;