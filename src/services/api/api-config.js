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
        {
            name: 'error',
            preventDefaultMethods: true,
            customMethods: {
                send: function( error, stack, user, ...additionalInfo ){
                    let params = { stack,
                        error: error && error.message,
                        user: user && {id: user.id, username: user.username},
                        ...additionalInfo };
                    return this.apiCall( '/frontend_error', "error_sent", params, { method: "POST", queueable: true, useCommonPath: false }  )
                }
            }
        },
    ],
};

if(process.env.NODE_ENV === 'development')
    config.host='http://localhost:8000';

export default config;

export const ApiContext = React.createContext(null);
