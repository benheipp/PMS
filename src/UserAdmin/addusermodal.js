import React from 'react'

var AddUserModal = React.createClass({
  getInitialState: function () {
    return {
      username: '',
      password: '',
      passwordconfirm: '',
      first: '',
      last: '',
      email: '',
      error: false,
      invalidUsername: false,
      errorMessage: ''
    }
  },
  componentDidMount () {
    $('#AddUserModal').modal('show')
    $('#AddUserModal').on('hidden.bs.modal', this.props.handleHideAddUser)
  },
  render: function () {
    return (
      <div id='AddUserModal' className='modal fade'>
        <div className='modal-dialog modal-md' style={{width: '630px'}}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>New User</h4>
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-sm-12'>
                  {this.state.error ? <div className='alert alert-warning'><strong>Warning</strong> {this.state.errorMessage}</div> : null }
                  {this.state.invalidUsername ? <div className='alert alert-danger'><strong>Error</strong> Invalid Username</div> : null }
                  <table style={{width: '500px'}}>
                    <tr>
                          <td>Username</td>
                          <td><input type='text' className='form-control' value={this.state.username} onChange={this.handleChange.bind(this, 'username')} onBlur={this.validateUsername} style={{marginTop: '5px', height: '34px'}} /></td>
                        </tr>
                    <tr>
                          <td>Password</td>
                          <td><input maxLength='50' type='password' className='form-control' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} onBlur={this.validatePasswords} style={{marginTop: '5px', height: '34px', marginBottom: 0}} /></td>
                        </tr>
                    <tr>
                          <td>Confirm Password</td>
                          <td><input maxLength='50' type='password' className='form-control' value={this.state.passwordconfirm} onChange={this.handleChange.bind(this, 'passwordconfirm')} onBlur={this.validatePasswords} style={{marginTop: '5px', height: '34px', marginBottom: 0}} /></td>
                        </tr>
                    <tr>
                          <td>First Name</td>
                          <td><input maxLength='100' type='text' className='form-control' value={this.state.first} onChange={this.handleChange.bind(this, 'first')} style={{marginTop: '5px', height: '34px', marginBottom: 0}} onBlur={this.validate} /></td>
                        </tr>
                    <tr>
                          <td>Last Name</td>
                          <td><input maxLength='100' type='text' className='form-control' value={this.state.last} onChange={this.handleChange.bind(this, 'last')} style={{marginTop: '5px', height: '34px', marginBottom: 0}} onBlur={this.validate} /></td>
                        </tr>
                    <tr>
                          <td>Email</td>
                          <td><input maxLength='200' type='text' className='form-control' value={this.state.email} onChange={this.handleChange.bind(this, 'email')} style={{marginTop: '5px', height: '34px', marginBottom: 0}} onBlur={this.validate} /></td>
                        </tr>
                  </table>
                </div>
              </div>

            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-primary' onClick={this.AddUser}>Add User</button>
              <button type='button' className='btn btn-default' data-dismiss='modal'>Cancel</button>
            </div>
          </div>
        </div>
      </div>

        	)
  },
  handleChange: function (name, e) {
    var change = {}
    change[name] = e.target.value
    this.setState(change)
  },
  validatePasswords: function () {
    this.validate()
    if (this.state.password != this.state.passwordconfirm) {
      this.setState({error: true, errorMessage: 'Passwords Must Match'})
    }
  },
  validateUsername: function () {
    this.validate()
    if (this.state.username != '') {
      IsUniqueUsername(this.state.username, this.IsUniqueUsernameCallback)
    }
  },
  IsUniqueUsernameCallback: function (data) {
    if (data == false) {
      this.setState({invalidUsername: true})
    } else { this.setState({invalidUsername: false}) }
  },
  AddUser: function () {
    if (this.state.error == false && this.state.invalidUsername == false) {
      AddUser(this.state.username, this.state.password, this.state.first, this.state.last, this.state.email, this.AddUserCallback)
    }
  },
  AddUserCallback: function (data) {
    $('#AddUserModal').modal('hide')
    this.props.reloadGrid()
  },
  validate: function () {
    var Err = false
    var ErrMessage = ''

    if (this.state.username == '') {
      this.setState({error: true, errorMessage: 'Username is required'})
      return
    }
    if (this.state.password == '') {
      this.setState({error: true, errorMessage: 'Password is required'})
      return
    }
    if (this.state.first == '') {
      this.setState({error: true, errorMessage: 'First Name is required'})
      return
    }
    if (this.state.last == '') {
      this.setState({error: true, errorMessage: 'Last Name is required'})
      return
    }
    if (this.state.email == '') {
      this.setState({error: true, errorMessage: 'Email is required'})
      return
    }

    this.setState({error: false, errorMessage: ''})
  }
})

export default AddUserModal
