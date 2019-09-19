import React,{useCallback, useContext} from 'react';
import {ApiContext} from "../../services/api/api-config";

const Login=()=>{

    const api=useContext(ApiContext);

    const login=useCallback(()=>{
        api.login('admin','admin');
    },[api]);

    return (
        <div className='Login'>
            <button onClick={login}>Login</button>

        </div>
    );
};

export default Login;
