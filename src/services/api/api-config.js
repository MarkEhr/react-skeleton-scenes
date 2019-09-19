import React from 'react';


const config ={
    host:'https://itakat-back.tide.company',
    commonPath:'api',
    credentials:'include',
    saveTokenToLocalStorage: true,
    getDataFromResponse:(r)=>r.data,
    getMetaDataFromResponse:(r)=>r.meta,
    endpoints:[
        'me',
    ],
};

if(process.env.NODE_ENV === 'development')
    config.host='https://itakat-back.tide.company';

export default config;

export const ApiContext = React.createContext(null);
