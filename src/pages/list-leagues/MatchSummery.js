import React from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import { withRouter } from 'react-router-dom';
import imgLive from '../../assets/img/logo-live.png';

const MatchSummery = React.memo(({ id, status, awayTeam, homeTeam, date_time, history }) => {
    const homeTeamParse = JSON.parse(homeTeam);
    const awayTeamParse = JSON.parse(awayTeam);

    return (
        <tr className="clickable-row" onClick={() => history.push(`/match/details/${id}`)}>
            <td className="text-small">
                <Moment format="DD/MM/YYYY - HH:mm">{utcToLocal(date_time)}</Moment> <br />
                {status=='CANCL' ?<span style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>CANCEL</span>
                :
                <span style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>{status}</span>
                }
            </td>
            <td>
                <div className="col-xs-6 scrL">
                    <img src={homeTeamParse.logo_path} alt=""  style={{height:'40px',width:'40px'}}/>
                   { status=='NS' | status=='POSTP' | status=='TBA' | status=='CANCL' ? <span style={{ marginLeft:'15px',fontSize: 45}}>-</span> :<span style={{ marginLeft:'15px',fontSize: 30}}>{homeTeamParse.score}</span>}
                    <h4 className="tl mt-10" style={{textAlign:'center',fontSize: 11,marginLeft: 4}}>{homeTeamParse.name}</h4>
                </div>
                <div className="col-xs-6 scrR">
                { status=='NS' | status=='POSTP' | status=='TBA' | status=='CANCL' ? <span style={{marginRight:'15px',fontSize: 45}}>-</span> :<span style={{marginRight:'15px',fontSize: 30}}>{awayTeamParse.score}</span>}
                    <img src={awayTeamParse.logo_path} alt="" style={{height:'40px',width:'40px'}}/>
                    <h4 className="tl mt-10" style={{textAlign:'center',fontSize: 11,marginLeft: -4}}>{awayTeamParse.name}</h4>
                </div>
            </td>
        </tr>
    )

});

export default withRouter(MatchSummery);

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}




// {live && live[1].map((data, key) => {
//     if (Boolean(data.type === 'current'))
//         return (<tr key={key} className="clickable-row" onClick={() => this.props.history.push(`/match/details/${data.id}`)}>
//             <td className="text-small">
//                 {dateTimeFomat(data.started)} <br />
//                 <img src={imgLive} />
//             </td>
//             <td>
//                 <div className="col-xs-6 scrL">
//                     <img src={data.homeTeam.badge} alt="" />
//                     <span>{data.homeTeam.score}</span>
//                     <h4 className="tl mt-10">{data.homeTeam.name}</h4>
//                 </div>
//                 <div className="col-xs-6 scrR">
//                     <span>{data.awayTeam.score}</span>
//                     <img src={data.awayTeam.badge} alt="" />
//                     <h4 className="tl mt-10">{data.awayTeam.name}</h4>
//                 </div>
//             </td>
//         </tr>);
//     if (Boolean(data.type === 'passed'))
//         return (<tr key={key} className="clickable-row" onClick={() => this.props.history.push(`/match/details/${data.id}`)}>
//             <td className="text-small">
//                 {dateTimeFomat(data.started)} <br />
//                 {/* <img src={imgLive} /> */}
//             </td>
//             <td>
//                 <div className="col-xs-6 scrL">
//                     <img src={data.homeTeam.badge} alt="" />
//                     <span>{data.homeTeam.score}</span>
//                     <h4 className="tl mt-10">{data.homeTeam.name}</h4>
//                 </div>
//                 <div className="col-xs-6 scrR">
//                     <span>{data.awayTeam.score}</span>
//                     <img src={data.awayTeam.badge} alt="" />
//                     <h4 className="tl mt-10">{data.awayTeam.name}</h4>
//                 </div>
//             </td>
//         </tr>);
//     return (<tr key={key} className="clickable-row" onClick={() => this.props.history.push(`/match/details/${data.id}`)}>
//         <td className="text-small">
//             {dateTimeFomat(data.started)}
//         </td>
//         <td>
//             <div className="col-xs-6 scrL">
//                 <img src={data.homeTeam.badge} alt="" />
//                 <span>-</span>
//                 <h4 className="tl mt-10">{data.homeTeam.name}</h4>
//             </div>
//             <div className="col-xs-6 scrR">
//                 <span>-</span>
//                 <img src={data.awayTeam.badge} alt="" />
//                 <h4 className="tl mt-10">{data.awayTeam.name}</h4>
//             </div>
//         </td>
//     </tr>);
// })}