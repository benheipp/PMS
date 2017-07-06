import React from 'react'

var PasswordResetModal = React.createClass({
  getInitialState: function () {
    return {
      passwordsMatch: false,
      passwordIsValid: false,
    }
  },
  componentDidMount () {
    $('#PasswordResetModal').modal('show')
    $('#PasswordResetModal').on('hidden.bs.modal', this.props.handleHideModal)
  },
  confirmPasswords () {
    const pw1 = this.refs.password.value;
    const pw2 = this.refs.confirmPassword.value;

    const passwordIsValid = /^(?=.*[a-zA-Z])(?=.*\d).{7,}$/.test(pw1);

    this.setState({ passwordsMatch: pw1 === pw2, passwordIsValid });
  },
  handlePasswordSet () {
    this.props.savePassword(this.refs.password.value);
  },
  render () {
    return (
      <div id='PasswordResetModal' className='modal fade' data-keyboard='false' data-backdrop='static'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Reset Password</h4>
            </div>
            <div className='modal-body'>
              <input type="password" placeholder="New Password" ref="password"  onChange={this.confirmPasswords}/>
              <input type="password" placeholder="Confirm Password" ref="confirmPassword" onChange={this.confirmPasswords} />
              { this.state.passwordsMatch && !this.state.passwordIsValid &&
                <p style={{ color: 'red' }}>Password must be at least 7 characters long and contain at least one letter and one number.</p>
              }
            </div>
            <div className='modal-footer'>
              <div className="top-10">
                { this.state.passwordsMatch && this.state.passwordIsValid &&
                  <button type="button" className="btn btn-primary" onClick={this.handlePasswordSet} data-dismiss="modal">Set New Password</button>
                }
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default PasswordResetModal;
