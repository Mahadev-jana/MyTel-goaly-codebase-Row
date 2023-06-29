import React from 'react';
import Moment from 'react-moment';
import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
function checkLogin(){
    Swal.fire({
        type: 'error',
        title: 'Login First To See Details',
        allowOutsideClick: false
    }).then((result) => {
        if (result.value) {
            
            window.location.href = '/login';
        }
    })
}
const PartTeam = React.memo(({ homeTeam, awayTeam, date_time, status,id,userId }) => {
    
    const userdetails = JSON.parse(localStorage.getItem('userDetails'))
    // console.log(userdetails)
    const awayTeamParse = JSON.parse(awayTeam);
    const homeTeamParse = JSON.parse(homeTeam);
    const matchId=JSON.parse(id);
    // console.log(userId)
    return (

        <Row className="part-team m-0" style={{color:'black'}}>
            <Col xs={3} className="pd-0">
                <Row>
                    <Col xs={12} className="text-center fs-12">
                        {status != 'NS' && status != 'CANCL' && <div class="matchdate" style={{color:'black',fontWeight: 600,fontSize: 10,letterSpacing: 0}}>{status}</div>}
                        {status == 'CANCL' && <div class="matchdate" style={{color:'black',fontWeight: 600,fontSize: 10,letterSpacing: 0}}>CANCEL</div>}
                        
                        <div class="text-grey" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            fontSize: '13px',
                            color: '#000'
                        }}>
                            <Moment format="ddd, DD/MM/YY" style={{color:'black',fontWeight: 600,fontSize: 10,letterSpacing: 0}}>{utcToLocal(date_time)}</Moment>
                            <Moment format="HH:mm" style={{color:'black',fontWeight: 600,fontSize: 10,letterSpacing: 0}}>{utcToLocal(date_time)}</Moment>
                        </div>
                    </Col>
                </Row>
            </Col>
            {/* {userdetails!==null ? */}
            <Col xs={9} class="col-xs-9 pd-0 ingrid">
                <Row>
                    <Col xs={12} className="fs-12" on >
                        <Image src={homeTeamParse.logo_path} width="20px" rounded  />&nbsp; <Link to={`/team/${homeTeamParse.id}`}  style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{homeTeamParse.name}</Link>
                        <div class="pull-right pr-10 fs-14"> <Link to={`match/details/${matchId}`}  style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{status != 'NS' && status != 'POSTP'  && status != 'CANCL' && homeTeamParse.score} </Link></div>
                    </Col>
                    <Col xs={12} className="fs-12" style={{marginTop:5}} >
                        <Image src={awayTeamParse.logo_path} width="20px" rounded />&nbsp; <Link to={`/team/${awayTeamParse.id}`}  style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}> {awayTeamParse.name} </Link>
                        <div class="pull-right pr-10 fs-14" ><Link to={`match/details/${matchId}` }  style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}> {status != 'NS' && status != 'POSTP' && status != 'CANCL' &&   awayTeamParse.score}</Link> </div>
                    </Col>
                </Row>
            </Col>
            {/* : */}
            {/* <Col xs={9} class="col-xs-9 pd-0 ingrid">
                <Row>
                    <Col xs={12} className="fs-12" on >
                        <Image src={homeTeamParse.logo_path} width="20px" rounded  />&nbsp; <Link onClick={checkLogin}   style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{homeTeamParse.name}</Link>
                        <div class="pull-right pr-10 fs-14">
                         <Link  onClick={checkLogin} style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}>{status != 'NS' && status != 'POSTP' && homeTeamParse.score} 
                         </Link></div>
                    </Col>
                    <Col xs={12} className="fs-12" style={{marginTop:5}} >
                        <Image src={awayTeamParse.logo_path} width="20px" rounded />&nbsp; <Link onClick={checkLogin}  style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}> {awayTeamParse.name} </Link>
                        <div class="pull-right pr-10 fs-14" ><Link onClick={checkLogin}  style={{color:'black',fontWeight: 600,fontSize: 13,letterSpacing: 0}}> {status != 'NS' && status != 'POSTP' &&  awayTeamParse.score}</Link> </div>
                    </Col>
                </Row>
            </Col>
            } */}
        </Row>

    )
});

export default PartTeam;

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}