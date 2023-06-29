import React from 'react';
import { Link } from 'react-router-dom';
import { isArray, isEmpty } from 'lodash';
import OtherMatchSlider from './OtherMatchSlider';
import axios from '../../_config/axios';
import { ItemSliderSimmer } from '../../simmer-loader';

const OtherMatches = () => {
    const [otherMatchList, setOtherMatchList] = React.useState([]);

    React.useEffect(() => {
        axios.post('/otherMatchlist').then(res => {
            if (res && res.data && res.data.success && res.data.success === 1) {
                if (res.data.matches && isArray(res.data.matches)) {
                    // sessionStorage.setItem('liveMatches', JSON.stringify(res.data.matches));
                    setOtherMatchList(res.data.matches);
                }
            }
        }).catch(err => {
            console.log({ err })
            // const liveMatches = sessionStorage.getItem('liveMatches');
            // setOtherMatchList(liveMatches ? JSON.parse(liveMatches) : [])
        })
    }, []);
    return (
        <React.Fragment>
            <div className="hr"></div>
            <div style={{ backgroundColor: '#fff', overflow: 'auto', padding: '10px 0px', borderTop: '1px solid #D4D7D9' }}>
                <div className="col-xs-12">
                    <Link to='/live' style={{ float: 'right' }}>See All</Link>
                    <div className="title2">Other Matches</div>
                    {isEmpty(otherMatchList) && <ItemSliderSimmer />}
                    {!isEmpty(otherMatchList) && <OtherMatchSlider matches={otherMatchList} />}
                </div>
            </div>
        </React.Fragment>
    );
}


export default OtherMatches;