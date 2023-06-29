import React, { useState, Fragment } from 'react';
import Modal from 'react-responsive-modal';
import { HowToPlay, PrizeList, TermsCondition } from './ModalTabs';
import Howtoplay from '../../components/splas-screen/How-to-play';
const TabModal = () => {
    const [{ open, tab }, setModal] = useState({ open: false, tab: '' });

    return (
        <Fragment>
            <Modal open={open} onClose={() => setModal({ open: false, tab: '' })} center
                styles={{
                    modal: {
                        borderRadius: '5px'
                    }
                }}
                showCloseIcon={false}
                focusTrapped={false}
                onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
            >

                {tab === 'PRIZE_LIST' && <PrizeList closeModal={() => setModal({ open: false, tab: '' })} />}
                {tab === 'TERMS_AND_CONDITION' && <TermsCondition closeModal={() => setModal({ open: false, tab: '' })} />}
            </Modal>

            {tab === 'HOW_TO_PLAY' && <Howtoplay closeModal={() => setModal({ open: false, tab: '' })} />}

            <button type="button" class="btn btn-lg btn-purple w-100 my-1" onClick={() => setModal({ open: true, tab: 'HOW_TO_PLAY' })}>How To Play</button>
            <div class="d-flex">
                <button type="button" class="btn btn-default btn-lg w-100 mr-1" onClick={() => setModal({ open: true, tab: 'PRIZE_LIST' })}>Prize List</button>
                <button type="button" class="btn btn-default btn-lg w-100" onClick={() => setModal({ open: true, tab: 'TERMS_AND_CONDITION' })}>Term & Condition</button>
            </div>

        </Fragment>
    );
};

export default TabModal;

{/* <Fragment>
            <Modal open={open} onClose={() => setModal({ open: false, tab: '' })} center
                styles={{
                    modal: {
                        borderRadius: '5px'
                    }
                }}
                showCloseIcon={false}
                focusTrapped={false}
                onEntered={() => {document.getElementsByTagName('html')[0].style.width = '100%';}}
            >
                {tab === 'HOW_TO_PLAY' && <HowToPlay closeModal={() => setModal({ open: false, tab: '' })} />}
                {tab === 'PRIZE_LIST' && <PrizeList closeModal={() => setModal({ open: false, tab: '' })} />}
                {tab === 'TERMS_AND_CONDITION' && <TermsCondition closeModal={() => setModal({ open: false, tab: '' })} />}
            </Modal>
            <div className="col-xs-12 lm ct mt-10" style={{ padding: '10px 5px' }}>
                <div className="col-xs-4 pl-5 pr-5">
                    <a className="btn btn-contest wd100" onClick={() => setModal({ open: true, tab: 'HOW_TO_PLAY' })}>How to Play</a>
                </div>
                <div className="col-xs-4 pl-5 pr-5">
                    <a className="btn btn-contest wd100" onClick={() => setModal({ open: true, tab: 'PRIZE_LIST' })}>Prize List</a>
                </div>
                <div className="col-xs-4 pl-5 pr-5" style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <a className="btn btn-contest wd100" onClick={() => setModal({ open: true, tab: 'TERMS_AND_CONDITION' })}>Terms & Condition</a>
                </div>
            </div>
        </Fragment> */}