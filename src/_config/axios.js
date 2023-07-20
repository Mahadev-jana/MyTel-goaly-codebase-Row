import axios from 'axios';

const BASE_URL = 'https://cms-mytel.goaly.mobi/';
const X_API_KEY = 'CODEX@123';

// Authorised AdminID and Password
const AUTH_ADMIN_ID = 'admin';
const AUTH_PASSWORD = '1234';

// Basic Auth
const BASIC_AUTH = `Basic ${window.btoa(`${AUTH_ADMIN_ID}:${AUTH_PASSWORD}`)}`;

export default axios.create({
    async: true,
    crossDomain: true,
    baseURL: BASE_URL,
    headers: {
        'Authorization': BASIC_AUTH,
        'X-API-KEY': X_API_KEY,
        'JWT': localStorage.getItem('JWT'),
        'cache-control': 'no-cache'
    },
    
    processData: false,
    contentType: false,
    mimeType: "multipart/form-data",
});