import React from 'react';
import Ionicon from 'react-ionicons';
import Swal from 'sweetalert2';
import { isArray, chunk, findIndex, filter, isEqual } from 'lodash';

import axios from '../../../_config/axios';
import goalyLogo from '../../../assets/img/the-logo.png';


const FavoriteClubModal = ({ closeModal }) => {
    const [clubs, setClubs] = React.useState([]);
    const [selectedClubs, setSelectedClubs] = React.useState([]);

    // React.useEffect(() => {
    //     axios.post('/clubTeam').then(res => {
    //         if (res.data && res.data.success && res.data.success == 1) {
    //             if (res.data.favteams && isArray(res.data.favteams)) {
    //                 setSelectedClubs(res.data.favteams);
    //             }
    //             if (res.data.teams && isArray(res.data.teams)) {
    //                 setClubs(res.data.teams);
    //             }
    //         }
    //     }).catch(err => {
    //     })
    // }, []);

    const selectClub = club => {
        setSelectedClubs(prevSelectedClubs => {
            if (findIndex(prevSelectedClubs, selected => selected.id == club.id) == -1) {
                return [...prevSelectedClubs, club];
            } else {
                return filter(prevSelectedClubs, prevSelectedClub => !isEqual(prevSelectedClub, club));
            }
        })
    }
    const saveFavoriteClubs = e => {
        e.preventDefault();
        const payload = new FormData();
        payload.append('clubs', JSON.stringify(selectedClubs));
        axios.post('api/UserFavouriteTeam', payload).then(res => {
            closeModal();
            Swal.fire({
                type: 'success',
                title: 'Successfully Teams Added!'
            });
        }).catch(err => {
            closeModal();
            console.log({err});
        });
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999999,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div className="black" style={{ display: 'flex' }}>
                <div className="logo">
                    <a><img src={goalyLogo} height="64" alt="" /></a>
                </div>
                <div className="m-0">&nbsp;</div>
                <div className="open-right" style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Ionicon onClick={closeModal} icon="md-close" className="hydrated" fontSize="32px" color="#fff" style={{ marginRight: '15px' }} />
                </div>
            </div>
            <div style={{
                height: 'calc(100vh - 60px)',
                background: '#fff',
                position: 'sticky',
                overflow: 'hidden',
                overflowY: 'scroll',
                padding: '5px',
                textAlign: 'center'
            }}>
                
                {chunk(clubs, 3).map((chunkClubs, key) => (
                    <div key={key} className="row">
                        {chunkClubs.map((club, key) => (
                            <div key={key} className="col-xs-4">
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative'
                                }} onClick={() => selectClub(club)}>
                                    {findIndex(selectedClubs, selected => selected.id == club.id) != -1 && <div style={{
                                        position: 'absolute',
                                        padding: '5px 10px',
                                        background: 'rgba(0,0,0,0.5)',
                                        color: 'green',
                                        borderRadius: '2px'
                                    }}>
                                        <Ionicon icon="md-checkmark" className="hydrated" fontSize="32px" color="#1aaf25" />
                                    </div>}
                                    <div>
                                        <img src={club.badge} alt="" />
                                    </div>
                                    <div>{club.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

            </div>
            <div style={{
                background: '#000',
                padding: '5px 10px'
            }}>
                <button onClick={saveFavoriteClubs} className="pull-right">SAVE</button>
            </div>
        </div>
    )
};

export default FavoriteClubModal;