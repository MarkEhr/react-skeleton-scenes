import React, { useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Api, { LOGIN_STATE } from 'tide-api'
import apiConfig, { ApiContext } from './services/api/api-config'

import './assets/fonts/fonts.scss'
import './assets/styles/App.scss'

import store from './services/redux/store'
import { useSelector } from 'react-redux'
import Splash from './components/Splash'
import SecurityManager, { SecurityContext } from './services/SecurityManager'
import getAppRoutes from './services/routes/appRoutes'
import notLoggedRoutes from './services/routes/notLoggedRoutes'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import TideToaster from './components/TideToaster/TideToaster'
import { notifierRef } from './services/notifier'

const api = new Api({ ...apiConfig, reduxStore: store })

function App () {
  const loggedIn = useSelector(({ api }) => api.loggedIn === LOGIN_STATE.LOGGED_IN)

  const loading = useSelector(({ loadingIds }) => !!loadingIds['Initializing.me'])
  const me = useSelector(({ api }) => api.me)

  useEffect(() => {
    if (!me && !loading && loggedIn) { api.me.get({ loadingId: 'Initializing.me' }).catch(() => api.logout()) }
  }, [me, loading, loggedIn])

  const securityManager = useMemo(() => me ? new SecurityManager(me) : null, [me])

  const routes = loggedIn && me
    ? getAppRoutes(securityManager)
    : notLoggedRoutes

  const splash = loading || (loggedIn && !me)
  const routesMap = routes.map(function routeObjectToComponent ({ path, component, exact }) {
    return <Route key={path} path={path} component={component} exact={exact !== false} />
  })
  const firstRoutePath = routes[0].path
  const maybeRedirect = firstRoutePath === '/' ? null : <Redirect from='/' to={firstRoutePath} />

  return (
    <div className='App'>
      <TideToaster ref={notifierRef} />
      <SecurityContext.Provider value={securityManager}>
        <ApiContext.Provider value={api}>
          <ErrorBoundary>
            <Router>
              {splash
                ? <Splash />
                : <Switch>{routesMap}{maybeRedirect}</Switch>}
            </Router>
          </ErrorBoundary>
        </ApiContext.Provider>
      </SecurityContext.Provider>
    </div>
  )
}

export default App
