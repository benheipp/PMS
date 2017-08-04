import React from 'react'

var UserAdminLockGridRow = React.createClass({

  render: function () {
 	return (
   <tr>
     <td>{this.props.store.store_name}</td>
     <td><input type='checkbox' className='form-control' onChange={this.onChange} defaultChecked={this.props.store.store_lock} name='check' style={{visibility: 'visible', width: '30px'}} /></td>
   </tr>
 		)
  },
  onChange: function (event) {
 	  UpdateStoreLock(event.target.checked, this.props.store.id, this.saveStoreLockCallback)
  },
  saveStoreLockCallback: function (data) {
 	if (data.Result == '0') {
 		this.props.reloadLockGrid()
 	}
  }
})

export default UserAdminLockGridRow
