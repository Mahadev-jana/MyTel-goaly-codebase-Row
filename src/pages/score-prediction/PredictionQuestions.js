import React from 'react';
import { post } from '../../api';
const winPoints = {
    textAlign: 'right',
    float: 'right',
    fontSize: '16px',
};
class PredictionQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prediction: {},
            questionIndex: 0,
        }
    }
    componentDidMount() {
        const payload = new FormData();
        payload.append('id', 104)
        post('getpredictiongames', payload)
        .then(res => {
            this.setState({prediction: res.data.prediction});
        })
        .catch(err => console.log(err));
    }
    changeQusetion = questionIndex => {
        this.setState({questionIndex});
    }
    render() {
        const { prediction, questionIndex } = this.state;
        return(
            <React.Fragment>
                {Boolean(Object.keys(prediction).length >= questionIndex + 1) && <>
                    {Boolean(prediction.questions[questionIndex].option_num == 2) ?
                        <QuestionType2
                            questionNo={questionIndex+1}
                            awayTeam={prediction.awayTeam}
                            homeTeam={prediction.homeTeam}
                            banner={prediction.banner}
                            question={prediction.questions[questionIndex]}
                            startDate={prediction.start_date}
                            changeQusetion={this.changeQusetion}
                        /> : <QuestionType1
                            questionNo={questionIndex+1}
                            awayTeam={prediction.awayTeam}
                            homeTeam={prediction.homeTeam}
                            banner={prediction.banner}
                            question={prediction.questions[questionIndex]}
                            startDate={prediction.start_date}
                            changeQusetion={this.changeQusetion}
                        />
                    }
                </>}
                {/* {Boolean(Object.keys(prediction).length) && Boolean(Object.keys(prediction).length < questionIndex + 1) && <PredictionQuestionsAnswer />} */}
            </React.Fragment>
        );
        return '';
    }
};

export default PredictionQuestions;

