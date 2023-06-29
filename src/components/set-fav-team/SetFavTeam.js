import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { post, authPost } from '../../api';

class SetFavTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamList: [],
            selectedFavTeamList: []
        }
    }

    componentDidMount() {
        this.getTeamList();
    }

    handleAddFavTeam = (e, team) => {
        const id = team.id;
        const { teamList } = this.state;
        const index = teamList.findIndex((team) => {return team.id === id});
        if (teamList[index].is_fav == 1) {
            teamList[index].is_fav = 0;
        } else {
            teamList[index].is_fav = 1;
        }
        this.setState({teamList});
    }
    saveFavTeam = () => {
        const { teamList } = this.state;
        let selectedFavTeamList = [];
        teamList.map((team)=>{
            if (team.is_fav == 1)
                selectedFavTeamList.push(team);
        })
        const _self = this; 
        const payload = new FormData();
        payload.append('teamlist', JSON.stringify(selectedFavTeamList));
        authPost('addfavteam', payload)
        .then( res => {
            // if(res.data.success == 1) {
                Swal.fire({
                    type: 'success',
                    title: res.data.message,
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.value) {
                        _self.props.closeSetFavTeam();
                        // window.location.href = '/';
                    }
                })
            // }
        })
        .catch( err => console.log(err));
    }
    getTeamList = (page=0) =>{
        const payload = new FormData();
        payload.append('page', page);
        authPost('getteams', payload)
        .then( res => {
            const team = res.data.team_list;
            this.setState(prevState => ({teamList: [...prevState.teamList, ...team], page}));
        })
        .catch( err => console.log(err));
    }
    render() {
        const { teamList, selectedFavTeamList } = this.state;
        let customMyTeam = [];
        let mod = 3;
        for (let i = 0; i < teamList.length; i = i + mod) {
            customMyTeam.push(teamList.slice(i, i + mod));
        }
        let noOfSelected = 0;
        teamList.forEach((team)=>{
            if (team.is_fav == 1)
                noOfSelected++;    
        })
        return(
             <div className="set-fav-team-overlay">
                 <div className="set-fav-team-container">
                    <div className="set-fav-team-header">
                        <span className="set-fav-team-title">Teams</span>
                        <span className="set-fav-team-close" onClick={()=>this.props.closeSetFavTeam()}>&times;</span>
                    </div>
                    <div className="container set-fav-team-body" style={{overflowX: 'hidden'}}>
                        {customMyTeam && customMyTeam.map((myTeam, key)=>(
                            <div key={key} className="row">
                                {myTeam && myTeam.map((team, key)=>{
                                    const response = selectedFavTeamList.find((favteam) => {
                                      return favteam.id == team.id;
                                    });
                                    if (team.badge.trim() != '')
                                        return(
                                            <div
                                                key={key}
                                                className="col-xs-4" 
                                                style={{
                                                    display: 'flex', 
                                                    justifyContent: 'center', 
                                                    alignContent: 'center', 
                                                    marginBottom: '5px',
                                                    alignItems: 'center'
                                                }}
                                                onClick={(e)=>this.handleAddFavTeam(e, team)}
                                            >
                                                {Boolean(team.is_fav == 1) && <i className="fa fa-check-square-o" style={{
                                                    fontSize: '36px', 
                                                    position: 'absolute', 
                                                    zIndex: 1,
                                                    color: '#1cff2f',
                                                    textShadow: '0 0 8px #000'
                                                    }}></i>}
                                                {Boolean(team.is_fav == 1) && <img src={team.badge} style={{height: '80px', width: '80px', filter: `grayscale(100%)`}}/> }
                                                {!Boolean(team.is_fav == 1) && <img src={team.badge} style={{height: '80px', width: '80px'}}/> }
                                            </div>
                                        )
                                })}
                            </div>
                        ))}
                    </div>
                    <div className="set-fav-team-footer">
                        <span>No of Select: <span style={{color: '#4d0053'}}>{noOfSelected}</span></span>
                        <span 
                            className="set-fav-team-save"
                            style={{
                                backgroundColor: '#4D0053',
                                color: '#fff',
                                padding: '0 16px',
                                margin: '2px',
                                borderRadius: '5px'
                            }}
                            onClick={ () => this.saveFavTeam()}
                        >SAVE</span>
                    </div>
                </div>
            </div>
        )
    }
};

export default withRouter(SetFavTeam);