import React from 'react';
import { Link } from 'react-router-dom';
import { post } from '../../api';
import iconDown from '../../assets/img/icon-down.png';

class TodaysTips extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			predictionDays: [],
			predictDay: '',
			leagues: [],
			league: '',
			predictionList: []
		}
	}
	componentDidMount() {
		this.getPredictionDays();
		this.getLeagues();
	}
	handleChange = prop => event => {
		const {predictDay, league} = this.state;
		this.setState({[prop]: event.target.value});
		if (prop == 'league')
			this.getFootballPredictionList(predictDay, event.target.value);
		if (prop == 'predictDay')
			this.getFootballPredictionList(event.target.value, league);
	}
	getPredictionDays = () => {
		post('getpredictiondate')
		.then(res => {
			this.setState({predictionDays: res.data.dates});
		})
		.catch(err => console.log(err));
	}
	getLeagues = () => {
		post('federations')
		.then(res => {
			
			this.setState({leagues: JSON.parse(res.data.result).data});
		})
		.catch(err => console.log(err));
	}
	getFootballPredictionList = (predictDay, league) => {
		if (predictDay != '' && league != '') {
			// call api
			const payload = new FormData();
			payload.append('date', predictDay);
			payload.append('league', league);
			post('footballpredictionlist', payload)
			.then(res => {
				
				this.setState({predictionList: JSON.parse(res.data.result).data});
			})
			.catch(err => console.log(err));
		}
	}
    render() {
		const { predictionDays, leagues, predictionList } = this.state;
        return(
            <div className="col-xs-12 lm ct">
		  		<h2 className="title2">Today's Tips</h2>
				<div className="hr"></div>
				<div className="mb-10 part">
		   			<h5>Check out our free football predictions for today.</h5>
					<h5>Choose Predictions:</h5>
					<div className="pt-input">
						<select id="predict-day" name="predict-day" className="pt-select"
                            style={{
                                background: `url(${iconDown})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 8px',
                                backgroundSize: '30px'
							}}
							value={this.state.predictDay}
							onChange={this.handleChange('predictDay')}
                        >
							<option value="">Prediction Day</option>
							{predictionDays.map((data, key) => (
								<option key={key} value={data.date}>{data.format}</option>
							))}
						</select>
					</div>
					<h5>Select A League:</h5>
					<div className="pt-input">
						<select id="predict-league" name="predict-league" className="pt-select"
                            style={{
                                background: `url(${iconDown})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 8px',
                                backgroundSize: '30px'
							}}
							value={this.state.league}
							onChange={this.handleChange('league')}
                        >
							<option value="">Please Choose</option>
							{leagues.map((league, key) => (
								<option key={key} value={league}>{league}</option>
							))}
						</select>
					</div>
					<div className="widget-content">
						{Boolean(predictionList.length) &&
						<table className="table table-striped table-bordered">
							<thead>
								<tr>
									<th>Event</th>
									<th>Score</th>
									<th className="td-actions"></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{predictionList.map((data, key) => (
									<tr>
										<td>{data.home_team} Vs {data.away_team}</td>
										<td className="text-center">{data.result}</td>
										<td className="text-center"> <span className="stat-h">H</span></td>
										<td className="text-center">
											<Link to={`tips/${data.id}`} className="view-tip">View Tip</Link>
										</td>
									</tr>
								))}
								{/* <tr>
									<td>Turkey Vs Moldova</td>
									<td className="text-center">3-0</td>
									<td className="text-center"> <span className="stat-h">H</span></td>
									<td className="text-center">
										<Link to="tips/12" className="view-tip">View Tip</Link>
									</td>
								</tr>
								<tr>
									<td>Portugal Vs Serbia</td>
									<td className="text-center">2-1</td>
									<td className="text-center"> <span className="stat-h">H</span></td>
									<td className="text-center">
										<Link to="tips/12" className="view-tip">View Tip</Link>
									</td>
								</tr>
								<tr>
									<td>Island Vs France</td>
									<td className="text-center">1-3</td>
									<td className="text-center"> <span className="stat-a">A</span></td>
									<td className="text-center">
										<Link to="tips/12" className="view-tip">View Tip</Link>
									</td>
								</tr>
								<tr>
									<td>Montenegro Vs England</td>
									<td className="text-center">1-3</td>
									<td className="text-center"> <span className="stat-a">A</span></td>
									<td className="text-center">
										<Link to="tips/12" className="view-tip">View Tip</Link>
									</td>
								</tr>
								<tr>
									<td>Kosovo Vs Bulgaria</td>
									<td className="text-center">1-1</td>
									<td className="text-center"> <span className="stat-d">D</span></td>
									<td className="text-center">
										<Link to="tips/12" className="view-tip">View Tip</Link>
									</td>
								</tr> */}
							</tbody>
						</table>}
					</div>
				</div>
				<div className="hr"></div>
		  	</div>
        );
    }
};

export default TodaysTips;