import React from 'react';
import Swal from 'sweetalert2';
import { isAuthenticate } from '../../_helper/authentication';
const winPoints = {
	textAlign: 'right',
	float: 'right',
	fontSize: '16px',
};
import Moment from 'react-moment';

class QuestionType2 extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            score: ''
        }
    }
    onHandleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    }
    onSubmit = questionNo => {
		const { score } = this.state;
		if (isAuthenticate()) {
			if (score.trim() === '') {
				Swal.fire({
					type: 'warning',
					title: 'Enter your answer first!!'
				});
			}else {
				this.props.changeQusetion(questionNo, score);
			}
		} else {
			Swal.fire({
				type: 'warning',
				title: 'Please login first to submit your prediction!!'
			});
		}
    }
    render() {
        const {questionNo, homeTeam, awayTeam, banner, question, startDate, changeQusetion} = this.props;
        return(
            <div className="col-xs-12 lm ct">
			<h2 className="text-left" style={{color:'black'}}><p style={winPoints}>Points Win:-{question.reward}</p></h2>
			<div className="hr"></div>
			<h2 className="ct-title" style={{color:'black'}}>{question.text}</h2>
			<div style={{
					position: 'relative'
			}}>
					<div style={{
							position: 'absolute',
							color: '#fff',
							top: '5px',
							right: '5px',
							background: 'rgba(0, 0, 0, 0.5)',
							padding: '5px 10px',
							border: '1px solid #fff',
							borderRadius: '3px',
							fontSize: '11px'
					}}><Moment format="ddd, DD/MM">{startDate}</Moment></div>
			<img src={banner} style={{
									height: '200px',
									width: '100%',
									objectFit: 'cover',
									objectPosition: 'center'
							}} /> 
			</div>
			<div className="hr"></div>
			<div className="col-xs-4 scrL">
					<img src={homeTeam.logo} alt="" />
					<input type="text" className="ct-input-scr" value="1" disabled />
					<span>&nbsp;</span>
					<br />
					<h4 className="tl">{homeTeam.name}</h4>
					<p className="marcatori-partita">&nbsp; </p>
			</div>
			<div className="col-xs-4 scrR">
					<span>&nbsp;</span>
					<input type="text" className="ct-input-scr" value="2" disabled />
					<img src={awayTeam.logo} alt=""/>
					<br />
					<h4 className="tl">{awayTeam.name}</h4>
					<p className="marcatori-partita">&nbsp; </p>
			</div>
			<div className="col-xs-4 scrR">
					<span>&nbsp;</span>
					<input type="text" className="ct-input-scr" value="3" disabled />
					<br />
					<h4 className="tl" style={{marginTop: '10px'}}>Nither</h4>
					<p className="marcatori-partita">&nbsp; </p>
			</div>
			<div className="clearfix"></div>
			<div className="col-xs-12 text-center mb-10" style={{marginTop: '-20px'}}>
		<h4 className="tl">Your answer</h4>
		<input type="number" className="ct-input-scr" onChange={this.onHandleChange('score')}/>
	</div>
			<div className="col-xs-12" style={{textAlign: 'center', paddingBottom: '40px'}}>
					<button 
							type="button"
							className="btn btn-primary btn-ct black"
							onClick={() => this.onSubmit(questionNo)}
					>Submit Answer {questionNo}</button>
			</div>
	</div>
);
}
}
export default QuestionType2;