import React from 'react';
import semver from 'semver-lite';
import pckg from '../../pckg';

const config ={
    host:'http://localhost:8000',
    commonPath:'api',
    credentials:'include',
    saveTokenToLocalStorage: true,
    getDataFromResponse: handleResponse,
    getMetaDataFromResponse:(r)=>r.meta,
    endpoints:[
        'me',
        {
            name: 'error',
            preventDefaultMethods: true,
            customMethods: {
                send: function( error, stack, user, additionalInfo ){
                    let params = { stack,
                        error: error && error.message,
                        user: user && {id: user.id, username: user.username},
                        ...additionalInfo };
                    return this.apiCall( '/frontend_error', "error_sent", params, { method: "POST", queueable: true, useCommonPath: false }  )
                }
            }
        },
    ],
    login:{
        createBody: ( username, password )=>{
            let credentials = new FormData();
            credentials.append("_username", username );
            credentials.append("_password", password);
            credentials.append("client_data", window?.navigator?.userAgent||'no-data');
            return credentials;
        },
    },
};


function handleResponse(response, headers){

    try {
        let server = headers.get("X-App-Version");
        let force = !!server && server[server.length - 1] === 'f';
        if (force) server = server.slice(0, server.length - 1);

        if (semver.validate(pckg.version) && semver.validate(pckg.version) && semver.gt(server, pckg.version)) {
            if(!this.newerVersion)
                console.log("Newer version detected " + server);
            if (!this.newerVersion && window.swRegistration) {
                window.swRegistration.update()
                    .then(() => {
                        //This will broadcast the refresh message to all active tabs of the app through the sw
                        if (force)
                            window.navigator.serviceWorker.controller.postMessage('force_refresh');
                    });
            }
            this.newerVersion = pckg.version;
            if (force && !window.swRegistration)
                window.location.reload();
        }
    }
    catch(e){
        console.error('Error reading versions: '+e);
    }

    return response.data;
}

if(process.env.REACT_APP_BUILD === 'dev')
    config.host=localStorage.host||'http://localhost:8000';

export default config;

export const ApiContext = React.createContext(null);
