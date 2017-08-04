import React from 'react'
import UserAdminLockGridRow from './useradminlockgridrow'
var UserAdminLock = React.createClass({
	    render: function () {
      var rows = this.props.storeLookup.map(function (store) {
        return <UserAdminLockGridRow store={store} reloadLockGrid={this.reloadLockGrid}/>
      }, this)
	    		return (
  <div className='panel panel-info' style={{width: '600px'}}>
    <div className='panel-heading'>Store Lock</div>
    <div className='panel-body'>

      <table className='table table-user-information' style={{marginBottom: '0px'}}>
        <tr>
          <th>Store</th>
          <th>Locked</th>
        </tr>
        {rows}
      </table>
    </div>
  </div>)
    },
  reloadLockGrid: function () {
    this.props.reloadLockGrid()
  }
})

export default UserAdminLock
