import React, { useState, useEffect, Fragment } from 'react';
import { isObject } from 'lodash';
import axios from '../../_config/axios';
import loadingGif from '../../assets/img/loading.gif';
import logoGoaly from '../../assets/img/logo-goaly.png';

export const HowToPlay = ({ closeModal }) => {
    const [{ content, isLoading }, setContent] = useState({ content: '', isLoading: false });

    useEffect(() => {
        setContent(prevContent => ({ ...prevContent, isLoading: true }));
        axios.post('/gethowtoplay').then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.instruction && isObject(res.data.instruction)) {
                    const { content, type } = res.data.instruction;
                    setContent(prevContent => ({ ...prevContent, content, isLoading: false }));
                }
                setContent(prevContent => ({ ...prevContent, isLoading: false }));
            }
        }).catch(err => {
            console.log({ err })
            setContent(prevContent => ({ ...prevContent, isLoading: false }));
        })
    }, []);
    if (isLoading)
        return <PlayersLoader />;
    return (
        <Fragment>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={logoGoaly} alt="" height="60" />
            </div>
            <div style={{ padding: '10px 5px' }} dangerouslySetInnerHTML={{ __html: content }} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="button" class="btn-reg" onClick={closeModal}>
                    <strong>Close</strong>
                </button>
            </div>
        </Fragment>
    );
};

export const PrizeList = ({ closeModal }) => {
    const [{ content, isLoading }, setContent] = useState({ content: '', isLoading: false });

    useEffect(() => {
        setContent(prevContent => ({ ...prevContent, isLoading: true }));
        axios.post('/getprizelist').then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.prize && isObject(res.data.prize)) {
                    const { content, type } = res.data.prize;
                    setContent(prevContent => ({ ...prevContent, content, isLoading: false }));
                }
                setContent(prevContent => ({ ...prevContent, isLoading: false }));
            }
        }).catch(err => {
            console.log({ err })
            setContent(prevContent => ({ ...prevContent, isLoading: false }));
        })
    }, []);
    if (isLoading)
        return <PlayersLoader />;
    return (
        <Fragment>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={logoGoaly} alt="" height="60" />
            </div>
            <div style={{ padding: '10px 5px' }} dangerouslySetInnerHTML={{ __html: content }} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="button" class="btn-reg" onClick={closeModal}>
                    <strong>Close</strong>
                </button>
            </div>
        </Fragment>
    );
};

export const TermsCondition = ({ closeModal }) => {
    const [{ content, isLoading }, setContent] = useState({ content: '', isLoading: false });

    useEffect(() => {
        setContent(prevContent => ({ ...prevContent, isLoading: true }));
        axios.post('/getTermAndCondition').then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.TermAndCon) {
                    const { TermAndCon } = res.data;
                    setContent(prevContent => ({ ...prevContent, content: TermAndCon, isLoading: false }));
                }
                setContent(prevContent => ({ ...prevContent, isLoading: false }));
            }
        }).catch(err => {
           // console.log({ err })
            setContent(prevContent => ({ ...prevContent, isLoading: false }));
        })
    }, []);





































    if (isLoading)
        return <PlayersLoader />;
    return (
        <Fragment>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={logoGoaly} alt="" height="60" />
            </div>
            <div style={{ padding: '10px 5px' }} dangerouslySetInnerHTML={{ __html: content }} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="button" class="btn-reg" onClick={closeModal}>
                    <strong>Close</strong>
                </button>
            </div>
        </Fragment>
    );
};


const PlayersLoader = () => (

    <div style={{
        display: 'flex',
        lineHeight: '100px',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <img src={loadingGif} alt="" style={{
            height: '100px',
            objectFit: 'none',
            objectPosition: 'center'
        }} />
    </div>

);