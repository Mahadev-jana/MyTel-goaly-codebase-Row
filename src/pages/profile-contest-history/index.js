import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { post } from '../../api';
import { getUserDetails } from '../../_helper/authentication';
import { Helmet } from "react-helmet";
import icon from '../../assets/img/logo-goaly.png';

class ContestHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contestHistory: []
        }
    }
    componentDidMount() {
        this.getContestHistory();
    }
    getContestHistory = () => {
        const userId=getUserDetails().id;
        const payload = new FormData();
        payload.append('user_id',userId);
        post('api/getprofilecontest',payload)
            .then(res => {
                this.setState({ contestHistory: res.data.contest_history });
            })
            .catch(err => console.log(err));
    }
    render() {
        const { contestHistory } = this.state;
        return (
            <React.Fragment>
                {/* <Helmet>
                    <title>Goaly | My Contest History</title>
                    <link rel="icon" type="image/png" href={icon} sizes="20x20" />
                </Helmet> */}
                <div className="page-content mt-10">
                    <div className="part">
                        <div className="series-title">Your Account</div>
                        <a onClick={() => this.props.history.goBack()} className="stand btn btn-default chk2">
                            <i className="fas fa-arrow-left"></i>&nbsp; Back
                    </a>
                        <div className="col-xs-12 mt-10">
                            <div className="standing ct-history">
                                <h2>Your Contest History</h2>
                                {Boolean(contestHistory.length) &&
                                    <table className="table table-striped table-responsive">
                                        <tbody>
                                            <tr className="clr-aqua">
                                                <th>No</th>
                                                <th>Contest Title</th>
                                                <th>Prediction</th>
                                                <th>Result</th>
                                                <th>Coin</th>
                                            </tr>
                                            {contestHistory.map((data, key) => (
                                                <tr key={key} className="wpos">
                                                    <td>{key + 1}</td>
                                                    <td>{data.title}</td>
                                                    <td>{data.prediction}</td>
                                                    <td className={
                                                        classnames({
                                                            "text-red": Boolean(data.f == 0)
                                                        }, {
                                                            "text-green": Boolean(data.f == 1)
                                                        }, {
                                                            "text-bold": Boolean(data.f == 1)
                                                        })
                                                    } >
                                                        {data.result}
                                                    </td>
                                                    <td>{data.coin}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>}
                            </div>
                        </div>
                        <div className="liner"></div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default withRouter(ContestHistory);