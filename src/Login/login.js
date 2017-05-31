import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'
import auth from './auth'

const LoginControl = withRouter(
  React.createClass({

    getInitialState () {
      return {
        error: false
      }
    },

    handleSubmit (event) {
      event.preventDefault()

      const email = this.refs.email.value
      const pass = this.refs.pass.value

      auth.login(email, pass, (loggedIn) => {
        if (!loggedIn) { return this.setState({ error: true }) }

        const { location } = this.props

        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/')
        }
      })
    },

    render () {
      return (
        <div>
          <div className='loginmodal-container'>

            <h1>ODN Product Management Login</h1>
            <form onSubmit={this.handleSubmit}>
              <input type='text' ref='email' placeholder='email' />
              <input type='password' ref='pass' placeholder='password' />
              <input type='submit' name='login' className='login loginmodal-submit' value='Login' />
            </form>

            <div className='login-help'>
              <div>{this.props.message}</div>
              {this.state.error && (<p>Bad login information</p>)}
            </div>
          </div>
        </div>
      )
    }
  })
)

export default LoginControl
