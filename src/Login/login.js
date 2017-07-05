import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'
import auth from './auth'

const LoginControl = withRouter(
  React.createClass({

    getInitialState () {
      return {
        error: false,
        errorMessage: ''
      }
    },

    handleSubmit (event) {
      event.preventDefault()

      const email = this.refs.email.value
      const pass = this.refs.pass.value

      auth.login(email, pass, (loggedIn) => {
        if (!loggedIn) { return this.setState({ error: true, errorMessage: 'Bad login information' }) }

        const { location } = this.props

        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/')
        }
      })
    },

    handleReset (event) {
      event.preventDefault();

      const username = this.refs.email.value;
      if (!username || username.length < 1) {
        return this.setState({ error: true, errorMessage: 'Enter username to reset password' });
      }

      auth.resetPassword(username, (response) => {
        this.setState({ error: true, errorMessage: response.Message })
      });
    },

    render () {
      return (
        <div>
          <div className='loginmodal-container'>

            <h1>ODN Product Management Login</h1>
            <form onSubmit={this.handleSubmit}>
              <input type='text' ref='email' placeholder='username' />
              <input type='password' ref='pass' placeholder='password' />
              <input type='submit' name='login' className='login loginmodal-submit' value='Login' />
              <button type="button" className="btn btn-warning" onClick={this.handleReset} style={{ width: '100%' }}>
                Reset Password
              </button>
            </form>

            <div className='login-help'>
              <div>{this.props.message}</div>
              {this.state.error && (<p>{this.state.errorMessage}</p>)}
            </div>
          </div>
        </div>
      )
    }
  })
)

export default LoginControl
