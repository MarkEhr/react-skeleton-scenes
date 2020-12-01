import React from 'react'
import DeviceDetector from 'device-detector-js'
import { version } from '../../../package.json'
import { ApiContext } from '../../services/api/api-config'
import { connect } from 'react-redux'
import crashImg from './assets/monalisa-7.jpg'
import './ErrorBoundary.scss'

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { broken: false }
  }

  static getDerivedStateFromError () {
    return { broken: true }
  }

  componentDidCatch (error, errorInfo) {
    const user = this.props.api && this.props.api.me

    if (process.env.REACT_APP_BUILD === 'prod' && !this.errorSent) {
      let browser = ''
      try {
        browser = (new DeviceDetector()).parse(window.navigator.userAgent)
        browser.userAgent = window.navigator.userAgent
      } catch (e) {
        browser = { browserReadError: e.message }
      }

      browser.appVersion = version
      browser.userAgent = window.navigator.userAgent

      const info = {
        location: window.location.href,
        browser
      }

      // if (this.api.requestLog && this.api.requestLog)
      //    info.requestLog = this.api.requestLog.slice(-5);

      this.props.api.error.send(error, errorInfo.componentStack, user, info)
        .then(() => {
          this.setState({ sendingLogs: false })
        })
    }
    this.errorSent = true
  }

  render () {
    if (!this.state.broken) { return this.props.children }

    return (
      <div className='ErrorBoundary'>
        <div className='left sides'>
          <img src={crashImg} alt='Crash' className='crash-img animated hinge' />
        </div>
        <div className='right sides'>
          <h1 className='title'>¡Oh no! Parece que hubo un error.</h1>
          <p className='message'>Algo salió mal en la aplicación, pero los detalles del error ya fueron enviados a soporte técnico</p>
          <div className='but-container'>
            <a href='/'><button className='button'>Regresar al inicio</button></a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ api: { me } }) => ({ me })

const ErrorBoundaryWithApi = (props) =>
  <ApiContext.Consumer>
    {(api) => <ErrorBoundary api={api} {...props} />}
  </ApiContext.Consumer>

export default connect(mapStateToProps)(ErrorBoundaryWithApi)
