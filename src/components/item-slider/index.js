import React from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import 'swiper/dist/css/swiper.min.css';
import matchBanner from '../../assets/img/match-banner.png';
import { dateFomat } from '../../_helper/date-format';

const ItemSlider = (props) => {
    const params = {
        slidesPerView: 2,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    };
    const { matches } = props;
    return( 
        <Swiper {...params}>
            {matches && matches.map((match, key)=>(
                <div key={key}>
                    <Slide id={match.id} homeTeam={match.homeTeam} awayTeam={match.awayTeam} startDate={match.started}/>
                </div>
            ))}
        </Swiper>        
    );
};

const Slide = ({id, homeTeam, awayTeam, startDate}) => (
    <Link to={`match/details/${id}`} className="link display-block">
        <div className="thumb">
            <span style={{
                position: 'absolute',
                background: 'rgba(77, 0, 83, 0.7)',
                color: 'rgb(255, 255, 255)',
                fontSize: '11px',
                padding: '1px 3px'
            }}>{dateFomat(startDate)}</span>
            <div className="cover-bg" style={{background: `url(${matchBanner}) center`, backgroundSize: 'cover'}}>
                <div style={{
                    height: '60px', 
                    width: '60px', 
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    margin: 'auto'
                }}>
                    <img src={homeTeam.badge} height="100%" width="100%"/>
                </div>
                <div style={{
                    height: '60px',
                    width: '60px',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    margin: 'auto'
                }}>
                    <img src={awayTeam.badge} height="100%" width="100%"/>
                </div>
            </div>
            <div className="thumb-meta">
                <p>{homeTeam.name} VS {awayTeam.name}</p>
            </div>
        </div>
    </Link>
);

export default ItemSlider;