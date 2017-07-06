import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'
import auth from './auth'
import PasswordResetModal from './PasswordResetModal'

const LoginControl = withRouter(
  React.createClass({

    getInitialState () {
      return {
        error: false,
        errorMessage: '',
        requirePasswordReset: false,
        username: '',
        showResetModal: false,
      }
    },

    handleSubmit (event) {
      event.preventDefault()

      const email = this.refs.email.value
      const pass = this.refs.pass.value

      auth.login(email, pass, (loggedIn, requirePasswordReset) => {
        if (!loggedIn) { return this.setState({ error: true, errorMessage: 'Bad login information' }) }

        if (requirePasswordReset) { return this.setState({ requirePasswordReset: true, showResetModal: true }); }

        this.handleLogin();
      })
    },
    
    handleLogin() {
        if (this.state.requirePasswordReset && !this.state.showResetModal) { return this.setState({ showResetModal: true }); }
        const { location } = this.props

        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/')
        }
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

    handleHideModal: function() {
      this.setState({ showResetModal: false });
    },

    savePassword: function(newPassword) {
      auth.setPassword(newPassword, (success) => {
        if (!success) { return this.setState({ error: true, errorMessage: 'Error saving password', showResetModal: false }) }

        this.setState({ requirePasswordReset: false });
        this.handleHideModal();
        this.handleLogin();
      })
    },

    render () {
      return (
        <div>
          {this.state.showResetModal && <PasswordResetModal handleHideModal={this.handleHideModal} savePassword={this.savePassword} />}
          <div className='loginmodal-container'>

            <h1>ODN Product Management Login</h1>
            <form onSubmit={this.handleSubmit}>
              <input type='text' ref='email' placeholder='username' onChange={(e) => { this.setState({ username: e.target.value })}} />
              <input type='password' ref='pass' placeholder='password' />
              <input type='submit' name='login' className='login loginmodal-submit' value='Login' />
              { this.state.username.length > 0 &&
                <button type="button" className="btn btn-warning" onClick={this.handleReset} style={{ width: '100%' }}>
                  Forgot Password?
                </button>
              }
            </form>

            <div className='login-help top-10'>
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
