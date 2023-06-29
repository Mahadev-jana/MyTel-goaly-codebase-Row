import React from 'react';
import { authPost } from '../../../api';
import { getUserDetails } from '../../../_helper/authentication';
import Swal from 'sweetalert2';
import loader from '../../../../src/assets/loader/loaderspinner.gif';
import goalyLogo from '../../../../src/assets/img/logo-goaly.png';
import axios from '../../../_config/axios';



const DeleteFavoriteClubModal = ({closeModalSave}) => {
    const [myTeam, SetmyTeam] = React.useState([]);
    const [isLoading, SetisLoading] = React.useState(false);

    React.useEffect(() => {
        SetisLoading(true);
        getFavTeam();
    }, []);



    const getFavTeam = () => {
        SetisLoading(true);
        const payload = new FormData();
        const userdetails = JSON.parse(localStorage.getItem('userDetails'));
        payload.append('user_id', (userdetails.id));

        axios.post('api/clubTeam', payload).then(res => {
            console.log(res)
            if (res.data && res.data.success && res.data.success == 1  && res.data.favteams.length>0) {
                SetmyTeam(res.data.favteams);
                SetisLoading(false);

            }
            if (res.data && res.data.success && res.data.success == 1 && res.data.favteams.length==0) {
                SetmyTeam(res.data.favteams);
                SetisLoading(true);

            }
            if (res.data.success == 0) {
                SetmyTeam(res.data.team_list);
                SetisLoading(false);
            }
        })
            .catch(err => console.log(err),
                SetisLoading(false)
            );
    }


    const deleteTeam = teamId => {
        Swal.fire({
            type: 'warning',
            title: 'Are you sure to remove?',
            allowOutsideClick: false,
            showCancelButton: true,
        }).then((result) => {

            if (result.value) {
                console.log(getUserDetails().id);
                let userId=getUserDetails().id
                SetisLoading(true)
                const payload = new FormData();
                payload.append('id', teamId);
                payload.append('user_id', userId);
                axios.post('StageGoalyApi/removefavteam', payload)
                    .then(res => {
                        console.log(res.data.success)
                        if (res.data.success) {
                            // getFavTeam();
                            SetisLoading(false);
                            Swal.fire({
                                type: 'success',
                                title: 'Club removed sucessfully',
                                allowOutsideClick: false,
                                // showCancelButton: true,
                            }).then(res=>{
                                closeModalSave();
                                //    getFavTeam();
                            })
                        }else{
                            Swal.fire({
                                type: 'error',
                                title: 'Club not removed',
                                allowOutsideClick: false,
                                // showCancelButton: true,
                            }).then(res=>{
                                
                        })
                        }
                        
                        
                    })
                    .catch(err => {
                        console.log(err)
                        SetisLoading(false)
                    });
            }
        });
    }


    return (

        <>
            {myTeam && !isLoading && myTeam.length == 0 && <> <div class="col-xs-4">
            </div>
                <div class="col-xs-12" style={{ minHeight: 200, textAlign: 'center', marginTop: 100 }}>
                    <img src={loader} alt="" style={{ height: 60 }} />
                </div> </>
            }

            {!!myTeam.length &&
                <div style={{ textAlign: 'center', padding: 10, borderBottom: '1px solid #efefef' }}>
                    <img src={goalyLogo} alt="goalylogo" style={{ height: 50, width: 'auto' }} />
                </div>}
            <div style={{ padding: '10px 10px 8px' }}>
                {!!myTeam.length && <div style={{ fontWeight: 700, fontSize: 15, margin: '0px 0px 10px 12px', textAlign: 'center' }}>Delete Your Favourite Clubs</div>}
            </div>
            <div style={{ padding: '0px' }}>
                {myTeam && myTeam.map((data, key) => (
                    <React.Fragment key={key}>
                        <div className="col-xs-3">
                            <img src={data.badge} style={{ height: '40px', width: '40px' }} />
                        </div>
                        <div className="col-xs-7" >
                            <h4 className="mt-10 bg-f5"
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '100%'
                                }}
                            >{data.name}</h4>
                        </div>
                        <div className="col-xs-2">
                            <div style={{
                                padding: '5px',
                                borderRadius: '3px'
                            }}
                                className="mt-10 "
                                onClick={() => deleteTeam(data.id)}
                            ><i className="fa fa-trash" style={{ fontSize: '20px', color: '#000' }}></i></div>
                        </div>
                    </React.Fragment>
                ))}
                {myTeam && isLoading && myTeam.length == 0 && <React.Fragment>
                    <div className='row'>
                        <div className="col-xs-3">

                        </div>
                        <div className="col-xs-7" style={{ textAlign: 'center', marginTop: '80%' }}>
                            No Favourite club  added!
											</div>
                        <div className="col-xs-2">

                        </div>
                    </div>
                </React.Fragment>
                }
            </div>


        </>
    )
};

export default DeleteFavoriteClubModal;


