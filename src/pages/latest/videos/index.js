import React from 'react';
import noDataImg from '../../../assetsStaging/img/no_data_found.png';
//import {post} from '../../../api/index';
//import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../../_config/axios';
//import '../../home/match-time/matchTime.css';
//import MatchTime from '../../home/match-time/MatchTime'
//import { isArray, isEmpty, times } from 'lodash';
//import Prediction from '../../home/Prediction';
//import NewSubscriberModal from '../../home/NewSubscriberModal';

import Swal from "sweetalert2";
import {
    isAuthenticate,
    getUserDetails,
  } from '../../../_helper/authentication';
  import { withRouter } from "react-router-dom";



//const list = (props) => {
    //const [limit,setLimit]=useState(5);
    //const[showLeague,setshowLeague]=useState([]);
    //const[openList,setopenList]=useState(false);
    //const[leagueId,setleagueId]=useState(0);
    //const[selectedLeague,setselectedLeague]=useState('All League');
    
    //const { videos } = props;
    //console.log(props);
    //useEffect(() => {
        
        //const payload = new FormData();
		//payload.append('page', 'live');
        //post('api/getleagues',payload)
        //.then(res=>{
            //console.log(res.data.leagues)
            //this.setState({showLeague:res.data.leagues})
            //console.log(showLeague)
            //setshowLeague(res.data.leagues)
           // console.log(showLeague)
            
        //})
        //.catch(error=>{
            //console.log("error")
            //this.setState({errorMsg:"Error Displaying in League"})
        //})
        
      //},[]);
    //const showMore = () =>{
        // console.log(limit)
        //setLimit(limit+5);
    //}
    // console.log(limit)
   
    //const spreadList = () => {
        //setopenList(prevState => {
           // openList: !prevState.openList})
    //}
    

    //return (
        //<div>
        //{/*console.log(showLeague)*/}

        
          //<List/>
   
        //<div className="tab-content">
            //<br />
            //{videos.length>0 ?
           // <>
            //{videos &&  videos.slice(0,limit).map((video, key) => {
               // return<div key={key}>
                  //  <iframe src={video.url}
                    //    frameBorder="0" width="600" height="760" allowFullScreen 
                       // style={{ width: '377px', height: '225px', overflow: 'hidden', display: 'block', marginLeft: '-15px' }}
                       // className=""></iframe>
                    //<br />
                //</div>
            //})}
             //<a  className="btn btn-lg btn-dark w-100" style={{color: 'white'}} onClick={showMore}>SHOW MORE</a>
             //</>
             //:
             //<div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
              //      <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
              //</div>
            //}
            
            {/* <iframe src="https://www.scorebat.com/embed/g/978298/?s=3"
                frameBorder="0" width="600" height="760" allowFullScreen allow="autoplay; fullscreen"
                style={{ width: '377px', height: '225px', overflow: 'hidden', display: 'block', marginLeft: '-15px' }}
                className=""></iframe><br/>
                <iframe src="https://www.scorebat.com/embed/g/978298/?s=3"
                frameBorder="0" width="600" height="760" allowFullScreen allow="autoplay; fullscreen"
                style={{ width: '377px', height: '225px', overflow: 'hidden', display: 'block', marginLeft: '-15px' }}
                className=""></iframe><br/> */}
       // </div>
        //</div>
    //)
//}
//export default Videos;

class Videos extends React.Component{
    
    constructor(props) {
        super(props);
        //console.log(props)
        this.state = {
            leagues: "",
            sectedLeague: 'All League',
            leagueId: 0,
            openList: false,
            video:[],
            limit:5,
            isloading:false,
            teamTab:props.teamTab,
            tab:props.tab,
            videos:[]
            
        }
    }
    componentDidMount() {

        if(this.state.teamTab==='allTeam'){

            const payload=new FormData();
            axios.post('/StageGoalyApi/highLightsVideo')
           .then(res=>{
            if(res.data.code === 200 && res.data.error === 0 && res.data.success === 1){
                // console.log(res);
                this.setState({videos:res.data.videos})
                this.leagueshow()
            }else{
                this.setState({videos:[]})
            }
           
        })
        
        //this.leagueshow()
        }
        else{
            
            this.getdetails();
            //this.setState({videos:[],video:[]})
        }
       // const payload = new FormData();
        //payload.append('page', 'live');
        //axios.post('api/getleagues', payload).then(res => {
            //console.log(res.data.leagues)
            //this.setState({ leagues: res.data.leagues })

        //}).catch(err => {
           // console.log({ err })
       // });

       
        
    } 


    getdetails=()=>{
        if(isAuthenticate() && this.state.teamTab==='myTeam'){
            console.log("user login")
        }
        else{
            if(this.state.teamTab==='myTeam'){
                Swal.fire({
                    title: "No Data Currently. Please Add Favourite Team",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonText: "OKAY",
                    cancelButtonText: "CANCEL",
                }).then((result)=>{
                    if(result.value){
                        this.props.history.push("/");
                    }else{

                    }
                });
            }
        }
    }

     leagueshow=()=>{

        //this.leagueshow()
        const payload = new FormData();
        payload.append('page', 'live');
        axios.post('api/getleagues', payload).then(res => {
            //console.log(res.data.leagues)
            this.setState({ leagues: res.data.leagues })

        }).catch(err => {
            console.log({ err })
        });

     }
  


    getFilterByLeague = async (id, name) => {
        //this.setState({isLoading:true})
        await this.setState({ sectedLeague: name, leagueId: id });
    }
    spreadList = () => {
        //console.log('open listttttt')
        this.setState(prevState => ({
            openList: !prevState.openList
        }))
    }
    
     video_id= async (comId)=>{
         //console.log(comId)
        const payload = new FormData();
        payload.append('comp_id',comId)
        axios.post('/StageGoalyApi/highLightsVideoByLeague',payload)
        .then(res=>{
            //console.log(props)
            //console.log(res.data)
            //console.log(res.data.videos) 
            if(this.state.video.length >0){
                this.setState({isloading:false})
            }
            else{
                this.setState({isloading:true})
            } 
            this.setState({video:res.data.videos}) 
            
            
        })
        .catch(error=>{
            console.log("error")   
        })

    }
    
    render() {
        
        const { openList,  sectedLeague, leagues, leagueId,videos,teamTab} = this.state;
        return (
            <React.Fragment>
              

                <div className="dropdown filter-league" style={{ padding: ' 8px 0px 14px 0' }}>
                    <button className="btn btn-default dropdown-toggle w-100 d-flex ais-center"
                        type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                        style={{ background: '#fff' }}
                        aria-expanded="false" onClick={this.spreadList}
                    >
                        {leagueId===0 ? 
                        <span className="mr-auto">All League</span>
                        :
                        <span className="mr-auto">{sectedLeague}</span>
                        }
                        
                        <span className="caret"></span>
                    </button>

                    {openList && leagues &&
                        <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenu2" style={{ display: 'block', margin: '-12px 0' }}>
                            <li onClick={() => {/*this.getFilterByAllLeague(); */this.spreadList(),this.setState({leagueId:0,limit:5})}}><a>All Leagues</a></li>
                            {leagues.map((league, key) => (
                                <li key={key} onClick={() => { this.getFilterByLeague(league.sportsmonks_id, league.competition_name),this.video_id(league.competition_id) ,this.spreadList(),this.setState({limit:5}) }}><a>{league.competition_name}</a></li>
                            ))}
                        </ul>


                    }

                </div>
                 
                 {videos.length>0 && leagueId===0?<>
                    { 
                videos &&  videos.slice(0,this.state.limit).map((video, key) => {
                return<div key={key}>
                    <iframe src={video.url}
                        frameBorder="0" width="600" height="760" allowFullScreen 
                        style={{ width: '377px', height: '225px', overflow: 'hidden', display: 'block', marginLeft: '-15px' }}
                        className=""></iframe>
                    <br />
                </div>
            })}
            {this.state.limit<videos.length?<>
                <a  className="btn btn-lg btn-dark w-100" style={{color: 'white'}} onClick={()=>this.setState({limit:this.state.limit+5})}>SHOW MORE</a>
            </>:null}
                 </>:<>
                 <div className="tab-content">
                {this.state.video.length>0?
                
                <>
                <br/>
                {this.state.video.slice(0,this.state.limit).map((video,key)=>{
                    return(
                        <div key={key}>
                    <iframe src={video.url}
                        frameBorder="0" width="600" height="760" allowFullScreen 
                        style={{ width: '377px', height: '225px', overflow: 'hidden', display: 'block', marginLeft: '-15px' }}
                        className=""></iframe>
                    <br />
                </div>

                    
                 ) })}
                 {this.state.limit<this.state.video.length?<>
                <a  className="btn btn-lg btn-dark w-100" style={{color: 'white'}} onClick={()=>this.setState({limit:this.state.limit+5})}>SHOW MORE</a>
            </>:null}

                 </>:<>{this.state.isloading && (<div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                   <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
              </div>)}</>}

              </div>
                 </>}
                  
            </React.Fragment>
        )
    }
}
export default withRouter(Videos);