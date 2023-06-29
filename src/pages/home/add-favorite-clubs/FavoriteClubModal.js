import React from 'react';
import Ionicon from 'react-ionicons';
import Swal from 'sweetalert2';
import { isArray, chunk, findIndex, filter, isEqual } from 'lodash';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';
// import { Row, Col, Image } from 'react-bootstrap';
import axios from '../../../_config/axios';
import goalyLogo from '../../../../src/assets/img/logo-goaly.png';

import loader from '../../../../src/assets/loader/loaderspinner.gif';




const FavoriteClubModal = ({ closeModal,closeModalSave }) => {
    const [clubs, setClubs] = React.useState([]);
    const [selectedClubs, setSelectedClubs] = React.useState([]);
    const [allclubs , setAllClubs] = React.useState([]);
    const [isLoading, setIsLoaading] = React.useState(true);
    const [length, setLength] = React.useState(0);



    React.useEffect(() => {
        setIsLoaading(true);
        const payload = new FormData();
        const userdetails = JSON.parse(localStorage.getItem('userDetails'));
        payload.append('user_id', (userdetails.id));

        axios.post('api/clubTeam', payload).then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.teams && isArray(res.data.teams)) {
                    setAllClubs(res.data.teams);
                    setIsLoaading(false);
                }
                if (res.data.favteams && isArray(res.data.favteams)) {
                    setSelectedClubs(res.data.favteams);
                    setLength(res.data.favteams.length);
                    setIsLoaading(false);
                }
            }
        }).catch(err => {
            console.log({ err });
            setIsLoaading(false);
        })
    }, []);

    const selectClub = club => {
        setSelectedClubs(prevSelectedClubs => {
            if (findIndex(prevSelectedClubs, selected => selected.id == club.id) == -1) {
                return [...prevSelectedClubs, club];
            } else {
                return filter(prevSelectedClubs, prevSelectedClub => prevSelectedClub.id != club.id);
            }
        })

    }

    const saveFavoriteClubs = e => {
        if (length == selectedClubs.length) {
            Swal.fire({
                type: 'warnning',
                title: 'No new Team Added!'
            });
            closeModal();

        } else {
            e.preventDefault();
            
            const payload = new FormData();
            const userdetails = JSON.parse(localStorage.getItem('userDetails'));
            payload.append('clubs', JSON.stringify(selectedClubs));
            payload.append('user_id', (userdetails.id));
            axios.post('api/UserFavouriteTeam', payload).then(res => {
                if (res.data.success == 1) {
                    closeModalSave();
                    setIsLoaading(false);
                    Swal.fire({
                        type: 'success',
                        title: 'Successfully Updated!'
                    });
                }
            }).catch(err => {
                setIsLoaading(false);
                closeModalSave();
                console.log({ err });
            });
        }

    }

    return (

        <>

            {isLoading && <> <div class="col-xs-4">
            </div>
                <div class="col-xs-4" style={{ minHeight: 200, textAlign: 'center', marginTop: 100 }}>
                    <img src={loader} alt="" style={{ height: 60 }} />
                </div> </>
            }

            {!isLoading && allclubs &&
                <div style={{ textAlign: 'center', padding: 10, borderBottom: '1px solid #efefef' }}>
                    <img src={goalyLogo} alt="goalylogo" style={{ height: 50, width: 'auto' }} />
                </div>}
            <div style={{ padding: '10px 10px 25px 10px' }}>
                {!isLoading && allclubs && <div style={{ fontWeight: 700, fontSize: 15, margin: '0px 0px 10px 12px' }}>Add Your Favourite Clubs</div>}
                {!isLoading && allclubs && <Accordion>
                    {allclubs.map(({res, league_id,league_name,league_logo}, key) => (
                        <AccordionItem>
                            <AccordionItemHeading >
                                <AccordionItemButton>
                                    <span><img src={league_logo} style={{ height: 65, width: 100,minWidth:46 }} /></span>
                                    <span style={{ float: 'right', margin: '10px 6px 0px 0px', fontWeight: 900, fontSize: 12 }}>{league_name} </span>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            {res.map((club, key) => (
                                <AccordionItemPanel>
                                    <div className="pd-5" style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'relative',
                                        width: '33%',
                                        float: 'left'
                                    }} onClick={() => selectClub({...club, league_id, league_name})}>
                                        {findIndex(selectedClubs, selected => selected.id == club.id) != -1 && <div style={{
                                            position: 'absolute',
                                            padding: '5px 10px',
                                            background: 'rgba(0,0,0,0.5)',
                                            color: 'green',
                                            borderRadius: '2px'
                                        }}>
                                            <Ionicon icon="md-checkmark" className="hydrated" fontSize="32px" color="#1aaf25" />
                                        </div>}
                                        <div >
                                            <img src={club.badge} alt="" style={{ height: 75, width: 75, padding: '10px' }} />
                                        </div>
                                    </div>
                                </AccordionItemPanel>
                            ))}
                        </AccordionItem>
                    ))}
                </Accordion>}

                {!isLoading && allclubs && <div style={{
                    padding: '5px 10px'
                }}>
                    <button onClick={saveFavoriteClubs} className="pull-right" style={{ width: '100%', background: 'rgb(22, 80, 14)', marginBottom: 5 }}>SAVE</button>
                    <button className="pull-right" style={{ width: '100%', background: '#d70d4e', marginBottom: 15 }} onClick={closeModal}>Close</button>
                </div>}
            </div>



        </>
    )
};

export default FavoriteClubModal;


