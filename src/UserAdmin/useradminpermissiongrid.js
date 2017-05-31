import React from 'react'
import UserAdminPermissionGridRow from './useradminpermissiongridrow'

var UserAdminPermissionGrid = React.createClass({
  componentDidMount () {
    $('#UserAdminPermissionModal').modal('show')
    $('#UserAdminPermissionModal').on('hidden.bs.modal', this.props.handleHideUserPermissionModal)
  },
  render: function () {
    var rows = this.props.permissions.map(function (permission) {
      return <UserAdminPermissionGridRow permission={permission} user={this.props.user} reloadPermissions={this.reloadPermissions} />
    }, this)
    return (
      <div id='UserAdminPermissionModal' className='modal fade'>
        <div className='modal-dialog modal-sm'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Permissions for {this.props.user.username}</h4>
            </div>
            <div className='modal-body'>
              <table className='table table-user-information' style={{marginBottom: '0px'}}>
                {rows}
              </table>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
            </div>
          </div>

        </div>
      </div>
    )
  },
  reloadPermissions: function () {
    this.props.reloadPermissions()
  }
})

export default UserAdminPermissionGrid
