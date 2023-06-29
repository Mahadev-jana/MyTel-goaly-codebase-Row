import React from 'react';
import CheckMark from './CheckMark';

const LanguageListItem = ({language, isActive, setLanguage }) => {
    return (
        <div className="item-list pt-0" onClick={() => setLanguage()} style={{ borderColor: '#fff', borderBottom: '1px solid rgba(173, 171, 171, 0.5)', marginTop: '10px' }}>
            <a className="item-content notranslate" style={{ padding: '15px 0px' }}>
                <div className="col-xs-6 title text-left" style={{ textAlign: 'left' }}>{language}</div>
                <div className="col-xs-6 text-right">
                    {isActive && setLanguage && <CheckMark />}
                </div>
            </a>
        </div>
    );
}

export default React.memo(LanguageListItem);
