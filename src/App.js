import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Login from "./scenes/Login/Login";
import Api from 'tide-api';
import apiConfig from './services/api/api-config'
import {ApiContext} from "./services/api/api-config";
import './assets/fonts/fonts.scss';
import './assets/styles/App.scss';
import Register from "./scenes/Register/Register";
import {LOGIN_STATE} from "tide-api";
import store from "./services/redux/store";
import {useSelector} from "react-redux";
import Splash from "./components/Splash";
import sceneForUser from "./services/sceneForUser";

const api = new Api({...apiConfig, reduxStore: store});

function App() {

    const loggedIn=useSelector(({api})=>api.loggedIn===LOGIN_STATE.LOGGED_IN);

    useEffect(()=>{
        api.me.get({loadingId:'Initializing.me'});
    },[]);

    const loading=useSelector(({loadingIds})=>!!loadingIds['Initializing.me']);
    const me=useSelector(({api})=>api.me);

    const Main=sceneForUser(me);

  return (
      <div className="App">
              <ApiContext.Provider value={api} >
                  {loading ?
                      <Splash/>
                      :
                      <Router>
                          <Switch>
                              {loggedIn && Main ?
                                  <Main/>
                                  :
                                  <>
                                      <Route path={'/login'} component={Login}/>
                                      <Route path={'/register'} component={Register}/>
                                      <Redirect from={'/'} to={'/login'}/>
                                  </>
                              }
                          </Switch>
                      </Router>
                  }
              </ApiContext.Provider>
      </div>
  );
}

export default App;
