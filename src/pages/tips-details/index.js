import React from 'react';
import { withRouter } from 'react-router-dom';
import { post } from '../../api';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import iconDown from '../../assets/img/icon-down.png';
import MenuCategory from '../../components/menu-category';

class TipsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipdetails: {}
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        const payload = new FormData();
        payload.append('id', id);
        post('tipdetails', payload)
            .then(res => {
                console.log(res);
                this.setState({
                    tipdetails: JSON.parse(res.data.result).data[0]
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        console.log(this.state);
        const { tipdetails } = this.state;
        return (
            <React.Fragment>
                {/* <Helmet>
                    <title>Goaly | Tips</title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
                <div className="page-content mt-10">
                    <MenuCategory />
                    <div className="col-xs-12 lm ct">
                        <h2 className="title2">Detail Tips</h2>
                        <div className="hr"></div>
                        <div className="part">
                            {/* <h5 className="mb-15">Lorem ipsum dolore sockets rgba</h5>
					    <h5>Select A League:</h5> */}
                            {/* <div className="pt-input">
                            <select id="predict-league" name="predict-league" className="pt-select"
                                style={{
                                    background: `url(${iconDown})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 8px',
                                    backgroundSize: '30px'
                                }}
                            >
                                <option value="">Please Choose</option>
                                <option value="">UEFA Champions League</option>
                                <option value="">UEFA Europa League</option>
                                <option value="">Serie A</option>
                                <option value="">Premier League</option>
                                <option value="">La Liga</option>
                                <option value="">Ligue 1</option>
                                <option value="">Bundesliga</option>
                                <option value="">EUFA European Championship 2020</option>
                                <option value="">FIFA World Cup 2022</option>
                            </select>
                        </div> */}
                            {/* <h5>Select A Match:</h5>
                        <div className="pt-input">
                            <select id="choose-match" name="choose-match" className="pt-select"
                                style={{
                                    background: `url(${iconDown})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 8px',
                                    backgroundSize: '30px'
                                }}
                            >
                                <option value="">Turkey vs Moldova</option>
                                <option value="">Portugal vs Serbia</option>
                                <option value="">Island vs France</option>
                                <option value="">Montenegro vs England</option>
                                <option value="">Kosovo vs Bulgaria</option>
                            </select>
                        </div>
                        <div className="pred">
                            <div className="pred-box">
                                <p className="title4">Predict Tip</p>
                                <h2 className="score"> 3-0 </h2>
                                <p className="country"> Turkey </p>
                            </div>
                        </div> */}
                            <div className="col-xs-12">
                                <h5 className="text-center">{tipdetails.hasOwnProperty('start_date') && dataFormat(tipdetails.start_date)}</h5>
                                <h5 className="text-center text-grey">
                                    {tipdetails.hasOwnProperty('home_team') && tipdetails.home_team} Vs {tipdetails.hasOwnProperty('away_team') && tipdetails.away_team}
                                </h5>
                                <h5 className="text-center text-grey">
                                    {tipdetails.hasOwnProperty('federation') && tipdetails.federation}
                                    {tipdetails.hasOwnProperty('competition_cluster') && tipdetails.competition_cluster}
                                    {tipdetails.hasOwnProperty('competition_name') && tipdetails.competition_name}
                                </h5>
                                <h5 className="text-center text-grey">
                                    {tipdetails.hasOwnProperty('season') && tipdetails.season}
                                </h5>
                            </div>
                            <div className="hr"></div>
                            <div className="widget-content">
                                {tipdetails.hasOwnProperty('prediction_per_market') && <div className="row">
                                    <div className="col-xs-7 text-center">
                                        <p className="title2 text-center">Prediction</p>
                                    </div>
                                    <div className="col-xs-5" style={{
                                        color: '#D8004B',
                                        fontWeight: 700
                                    }}>{tipdetails.prediction_per_market.classic.prediction}</div>
                                </div>}
                            </div>
                            <div className="hr"></div>
                            <div className="widget-content">
                                <p className="title2">Odds</p>
                                {tipdetails.hasOwnProperty('prediction_per_market') && <table className="table table-condensed">
                                    <tbody>
                                        {Object.entries(tipdetails.prediction_per_market.classic.odds).map((data, key) => (
                                            <tr key={key}>
                                                <th className="text-center">{data[0]}</th>
                                                <td className="text-center predscr">{data[1]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>}
                                {/* <p className="title2">12h forecast</p>
                            <table className="table table-condensed">
                                <thead>
                                    <tr>
                                        <th className="text-center">Home</th>
                                        <th className="text-center">Draw</th>
                                        <th className="text-center">Away</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center predscr">11.00</td>
                                        <td className="text-center predscr">4.50</td>
                                        <td className="text-center predscr">1.33</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="title2">48h forecast</p>
                            <table className="table table-condensed">
                                <thead>
                                    <tr>
                                        <th className="text-center">Home</th>
                                        <th className="text-center">Draw</th>
                                        <th className="text-center">Away</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center predscr">9.30</td>
                                        <td className="text-center predscr">5.50</td>
                                        <td className="text-center predscr">2.33</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="title2">Prediction probability</p>
                            <table className="table table-condensed">
                                <tbody>
                                    <tr>
                                        <th className="text-center">BTTS No</th>
                                        <td className="text-center predscr">1.57</td>
                                    </tr>
                                    <tr>
                                        <th className="text-center">BTTS Yes</th>
                                        <td className="text-center predscr">2.25</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="title2">Team Strengh</p>
                            <table className="table table-condensed">
                                <tbody>
                                    <tr>
                                        <th className="text-center">Over 2.5 Goals</th>
                                        <td className="text-center predscr">1.85</td>
                                    </tr>
                                    <tr>
                                        <th className="text-center">Under 2.5 Goals</th>
                                        <td className="text-center predscr">1.95</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="title2">1X2</p>
                            <table className="table table-condensed">
                                <tbody>
                                    <tr>
                                        <th className="text-center">Over 2.5 Goals</th>
                                        <td className="text-center predscr">1.85</td>
                                    </tr>
                                    <tr>
                                        <th className="text-center">Under 2.5 Goals</th>
                                        <td className="text-center predscr">1.95</td>
                                    </tr>
                                </tbody>
                            </table> */}
                            </div>
                        </div>
                        <div className="hr"></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default withRouter(TipsDetails);


const dataFormat = (timestamp) => {
    return timestamp.replace(/-/g, "/").replace(/T/g, " - ");
}