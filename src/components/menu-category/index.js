import React, { Fragment,useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import { includes } from 'lodash';
import { Link } from 'react-router-dom';
import contest from '../../assets/icon/contest.png';
import pinkwin from '../../assets/icon/pinkwin.png';
import './index.css';
import contestImg from '../../assetsStaging/img/Group169.png';
import matchesImg from '../../assetsStaging/img/Group168.png';
import leaguesImg from '../../assetsStaging/img/Group167.png';
import newsImg from '../../assetsStaging/img/Group166.png';

import contestImgActive from '../../assetsStaging/img/Group162.png';
import matchesImgActive from '../../assetsStaging/img/Group163.png';
import leaguesImgActive from '../../assetsStaging/img/Group164.png';
import newsImgActive from '../../assetsStaging/img/Group165.png';
import Cookies from 'js-cookie';

const activeTab = {
    '/': 'HOME',
    '/matches': 'MATCHES',
    '/league-list': 'LEAGUELIST',
    '/news': 'NEWS'
};


const MenuCategory = () => {
    const language = { "en": "English", "id": "Indonesia", "ms": "Malaysia", "nl": "Deutch", 'km': 'Khmer','my' : 'Myanmar' };
    useEffect(()=>{
        language[selectedLanguage()] 
    })
    console.log(language[selectedLanguage()] )
    let divStyle={}
    if(language[selectedLanguage()]==="Malaysia"){
        divStyle={
            fontSize:'12px',
        }
    }
    if(language[selectedLanguage()]==="Deutch"){
        divStyle={
            fontSize:'13px',
        }
    }
    return(
    <div className="block bg-grey row" style={{background:'#c9c3c396'}}>
        <div className="topmenu"
         style={divStyle}
         >
            <div className="topmenu-link col-xs-3">
                <Link to="/" >
                    {activeTab[window.location.pathname] === 'HOME' ?
                        <img src={contestImgActive} alt="" />
                        :
                        <img src={contestImg} alt="" />
                    }
                </Link>
                <span className={activeTab[window.location.pathname] === 'HOME' ? 'text-purple' : 'text-grey'}>
                { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?
                   <span class="notranslate">ကစားပွဲ</span>
                   :
                  <span>Contest</span>
                }
                

                </span>
            </div>
            <div className="topmenu-link col-xs-3">
                <Link to="/matches" >
                    {activeTab[window.location.pathname] === 'MATCHES' ?
                        <img src={matchesImgActive} alt="" />
                        :
                        <img src={matchesImg} alt="" />
                    }
                </Link>
                <span className={activeTab[window.location.pathname] === 'MATCHES' ? 'text-purple' : 'text-grey'}>
                

                { Cookies.get('googtrans') && Cookies.get('googtrans').length > 0 && Cookies.get('googtrans').split("/").pop() =='my' ?
                   <span class="notranslate">ယှဥ်ပြိုင်ပွဲများ</span>
                   :
                  <span>Matches</span>
                }

                </span>
            </div>
            <div className="topmenu-link col-xs-3">
                <Link to="/league-list">
                    {activeTab[window.location.pathname] === 'LEAGUELIST' ?
                        <img src={leaguesImgActive} alt="" />
                        :
                        <img src={leaguesImg} alt="" />
                    }
                </Link>
                <span className={activeTab[window.location.pathname] === 'LEAGUELIST' ? 'text-purple' : 'text-grey'}>
                { language[selectedLanguage()]==="Myanmar" ?
                   <span>လိဂ်</span>
                   :
                  <span>League</span>
                 }

                </span>
            </div>
            <div className="topmenu-link col-xs-3" >
                <Link to="/news">
                    {activeTab[window.location.pathname] === 'NEWS' ?
                        <img src={newsImgActive} alt="" />
                        :
                        <img src={newsImg} alt="" />
                    }
                </Link>
                <span className={activeTab[window.location.pathname] === 'NEWS' ? 'text-purple' : 'text-grey'}>News</span>
            </div>
        </div>
    </div>
    )

}

export default MenuCategory;
const selectedLanguage = () => {
	var name = 'googtrans';
	var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	if (match) return match[2].split('/')[2];
	return 'en';
}