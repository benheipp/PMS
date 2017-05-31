import React from 'react'
import UserAdminPermissionGrid from './useradminpermissiongrid'

var UserAdminPermissionGridRow = React.createClass({

  render: function () {
 	var chk
 	if (this.props.permission.username != '') {
 		chk = true
 	} else { chk = false }

 	return (
   <tr>
     <td>{this.props.permission.permission_type}</td>
     <td><input type='checkbox' className='form-control' onChange={this.onChange} defaultChecked={chk} onChange={this.onChange} name='check' style={{visibility: 'visible', width: '30px'}} /></td>
   </tr>
 		)
  },
  onChange: function (event) {
 	SaveUserPermission(this.props.user.username, this.props.user.id, this.props.permission.id, event.target.checked, this.saveUserPermissionCallback)
  },
  saveUserPermissionCallback: function (data) {
 	if (data.Result == '0') {
 		this.props.reloadPermissions()
 	}
  }
})

export default UserAdminPermissionGridRow
