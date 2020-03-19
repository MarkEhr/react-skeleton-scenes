import React, {useEffect, useMemo} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Api from 'tide-api';
import apiConfig from './services/api/api-config'
import {ApiContext} from "./services/api/api-config";
import './assets/fonts/fonts.scss';
import './assets/styles/App.scss';
import {LOGIN_STATE} from "tide-api";
import store from "./services/redux/store";
import {useSelector} from "react-redux";
import Splash from "./components/Splash";
import SecurityManager from "./services/SecurityManager";
import getAppRoutes from "./services/routes/appRoutes";
import notLoggedRoutes from "./services/routes/notLoggedRoutes";

const api = new Api({...apiConfig, reduxStore: store});

function App() {

    const loggedIn=useSelector(({api})=>api.loggedIn===LOGIN_STATE.LOGGED_IN);

    const loading=useSelector(({loadingIds})=>!!loadingIds['Initializing.me']);
    const me=useSelector(({api})=>api.me);

    useEffect(()=>{
        if(!me && !loading && loggedIn)
            api.me.get({loadingId:'Initializing.me'}).catch(()=>api.logout());
    },[me, loading, loggedIn]);

    const securityManager=useMemo(()=> me? new SecurityManager(me) : null,[me]);

    const routes= loggedIn && me?
        getAppRoutes(securityManager)
        :notLoggedRoutes;

    const splash=loading || (loggedIn && !me);

    return (
        <div className="App">
            <ApiContext.Provider value={api} >
                <Router>
                    {splash ?
                        <Splash/>
                        :
                        <Switch>
                            {routes.map(route =>
                                <Route key={route.path} path={route.path} component={route.component}
                                       exact={route.exact !== false}/>
                            )}
                            <Redirect from='/' to={routes[0].path}/>
                        </Switch>
                    }
                </Router>
            </ApiContext.Provider>
        </div>
    );
}

export default App;
