import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';
import { post } from '../../api';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';
import imgLatestNews from '../../assets/img/latest_news.png';
// import NewsComponent from './NewsComponent';
import TeamDetails from './team-details';
import NewsComponent from './team-details/tabs/NewsComponent';
import Match from './team-details/tabs/Match';


class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			suggestion: [],
			search: '',
			matches: [],
			news: [],
			loading: false,
			showTeamDetails: false,
		}
	}
	getSuggestion = event => {
		const _this = this;
		this.setState({ search: event.target.value });
		if (event.target.value.trim() !== '') {
			const payload = new FormData();
			payload.append('search', event.target.value)
			post('api/searchteam', payload)
				.then(res => {
					_this.setState({ suggestion: res.data.suggestion });
				})
				.catch(err => console.log(err));
		} else {
			this.setState({ suggestion: [] });
		}
	}

	setItem = search => {
		this.setState({ search, suggestion: [] });
	}

	getSearchDetails = event => {

		const payload = new FormData();
		payload.append('search', this.state.search);
		post('api/getteammatchesbyleague', payload).then(res => {
			console.log({ res });
			if (res.data.success == 1) {
				this.setState({
					matchList: res.data.matches,
					fixtures: res.data.fixtures,
					team: res.data.team,
					loading: false,
					id: res.data.id
				});
				this.getNewsDetails();

			}
		}).catch(err => {
			console.error(err);
		})




		event.preventDefault();
		this.setState({ showTeamDetails: true });
	}


	getMatchDetails() {
		console.log(this.state.id)
		const payloadteam = new FormData();
		payloadteam.append('id', this.state.id);
		post('api/matchsForSearch', payloadteam).then(res => {
			if (res.data.success == 1) {
				this.setState({
					matchList: res.data.matches,
					// fixtures: res.data.fixtures,
					team: res.data.team_name,
					loading: false
				});

			}
		}).catch(err => {
			console.error(err);
		})

	}
	getNewsDetails() {
		const payloadnews = new FormData();
		payloadnews.append('id', this.state.id);
		post('api/newsForTeam', payloadnews).then(res => {
			console.log({ res });
			if (res.data.success == 1) {
				this.setState({
					news: res.data.news
				});
				this.getMatchDetails();
			}
		}).catch(err => {
			console.error(err);
		})
	}

	news = (more, id) => {
		if (Boolean(more)) {
			const newsLinks = ["www.goal.com"];
			if (newsLinks.indexOf(more.split("/")[2]) > -1) {
				window.location.href = more;
			} else {
				this.props.history.push(`/latest/${id}`);
			}
		}
	}

	render() {
		const { loading, search, suggestion, matchList, news, showTeamDetails } = this.state;
		console.log(this.state.id)
		return (
			<Fragment>
				{/* <Helmet>
					<title>Goaly | Search</title>
					<link rel="icon" type="image/png" href={icon} sizes="20x20" />
				</Helmet> */}
			<div className=" mt-10">
				<div class="well" style={{ backgroundColor: '#f5f5f5', border: '1px solid #e3e3e3' }}>
					{!!search && <h5>Search result for: <strong>&nbsp; {search}</strong></h5>}
					<form onSubmit={this.getSearchDetails}>
						<fieldset>
							<div class="form-group">
								<span class="twitter-typeahead" style={{ position: "relative", display: "inline-block" }}>
									<input
										type="text"
										class=" form-control tt-query" type="text"
										autoComplete="off" spellCheck="off" disabled=""
										style={{ backgroundColor: "transparent" }}
										value={search}
										onChange={this.getSuggestion}
									/>
									{suggestion && Boolean(suggestion.length) && <div style={{
										background: '#fff',
										marginTop: '0px',
										overflow: 'auto',
										maxHeight: '300px'
									}}>
										<ul style={{ listStyle: 'none' }}>
											{suggestion.map((search, key) => (<li
												key={key}
												onClick={() => this.setItem(search)}
												style={{
													lineHeight: '20px',
													fontSize: '15px',
													color: '#847c7c',
													letterSpacing: '0.5px'
												}}
											>{search}</li>))}
										</ul>
									</div>}
									<span style={{ position: "absolute", left: "-9999px", visibility: "hidden", whiteSpace: "nowrap", fontFamily: "Roboto, Noto, Helvetica, Arial, sans-serif", fontSize: "14px", fontStyle: "normal", fontVariant: "normal", fontWeight: 400, wordSpacing: "0px", letterSpacing: "0px", textIndent: "0px", textRendering: "auto", textTransform: "none" }}>
									</span>
									<span class="tt-dropdown-menu" style={{ position: "absolute", top: "100%", left: "0px", zIndex: "100", display: "none" }}>
									</span>
								</span>

							</div>
							{suggestion && !Boolean(suggestion.length) &&
								<div className="text-center">
									<button className="btn btn-primary btn-round" onSubmit={this.getSearchDetails}>Search</button>
								</div>}
						</fieldset>
					</form>
				</div>

				<div class="clearfix"></div>
				<div class="well" style={{ backgroundColor: '#f5f5f5', border: '1px solid #e3e3e3' }}>
					<div class="team mt-0">
						
						{!!matchList && !!matchList.length && <Match matchList={matchList} id={this.state.id}/>}
						<div className="clearfix"></div>
						{!!news.length && <NewsComponent data={news} />}
						<div className="clearfix"></div>
						<div class="team mt-0">

							{!!matchList && !matchList.length && !news.length && <><div style={{textAlign: "center",marginTop: 150,height: 150}}>No Result Found</div>
								<div className="clearfix"></div></>}

						</div>
					</div>
				</div>
			</div>
			</Fragment>
		);
	}
};

export default Search;
