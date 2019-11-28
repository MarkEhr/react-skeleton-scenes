import React from 'react';


const config ={
    host:'http://localhost:8000',
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
    config.host='http://localhost:8000';

export default config;

export const ApiContext = React.createContext(null);
