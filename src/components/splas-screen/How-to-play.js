import React, { useState, useRef } from 'react';
import FollowGif from '../../assets/img/htp/11.gif';
import LetsPlay from '../../assets/img/htp/2.gif';
import Prize from '../../assets/img/htp/3.gif';
import Swiper from 'react-id-swiper';
import Modal from 'react-awesome-modal';
const params = {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,

    },

    height: '30px',
    backgroundColor: '#fff',
    slidesPerView: 1,
    spaceBetween: 10
};
const data = [
    {
        id: 0,
        image: FollowGif,
        smallText: 'Follow Your Favourite Club',
        largeText: 'Follow yor favourite clubs to get more news about their match schedule. you will alsi be getting indormation about your team competition result', tab: 0
    },
    {
        id: 1,
        image: LetsPlay,
        smallText: 'Join a Prediction and Win the Prize',
        largeText: 'You can join any match prediction and accumulate point to win the prize that we provide. each time you make correct prediction, you will get point that can also be exchange for prize',
        tab: 1
    },
    {
        id: 2,
        image: Prize,
        smallText: 'Reedem Your Points',
        largeText: 'Win many competition and have many points? You can exchange it eith the exclusive prize that we offer',
        tab: 2
    }
]


const Howtoplay = (props) => {
    const [open] = React.useState(true);
    const swiperRef = useRef(null);
    
    
    const nextButton = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();

        }
    };

    console.log(props)
    return (
        <React.Fragment>
            <Modal visible={open} onClickAway={props.closeModal} width="320" height="95%" effect="fadeInUp">
                <Swiper ref={swiperRef} {...params}>
                    {data.map((data,key )=> (
                        <div key ={key} id="modal-htp" class="modal" tabindex="-1" role="dialog" style={{ display: 'block', paddingTop: '0px' }}>
                            <div className="modal-dialog modal-sm" role="document">
                                <div className="modal-content">
                                    <div className="modal-body text-center">
                                        <div id="how-to-play-slider" class="carousel slide">

                                            <div className="carousel-inner" role="listbox">

                                                <div className="item active">
                                                    <div className="banner" style={{ left: 0, position: 'inherit', top: '-30px' }}><img src={data.image} alt="" /></div>
                                                    <div className="desc">
                                                        <h4><strong>{data.smallText}</strong></h4>
                                                        <p>{data.largeText}</p>
                                                    </div>

                                                    <div className="control-slide">
                                                        {data.id <= 1 ?
                                                            <div className="d-flex j-between">

                                                                <button className="btn btn-pill btn-next btn-purple w-50 p-1" onClick={() => nextButton()} ><strong>NEXT</strong></button>
                                                                <button className="btn btn-pill btn-grey w-50 p-1" ><strong onClick={props.closeModal}>SKIP</strong></button>

                                                            </div>
                                                            :

                                                            <div className="d-flex j-between" style={{ display: 'block' }}>
                                                                <button className="btn btn-pill btn-grey w-50 p-1" ><strong onClick={props.closeModal}>SKIP</strong></button>

                                                            </div>
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex h-100 ais-center modal-vertical-center">
                                </div>
                            </div>
                        </div>

                    ))}

                </Swiper>
            </Modal>

        </React.Fragment>

    )
}
export default Howtoplay;