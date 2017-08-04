import React from 'react'
import UserStats from './userstats'
import UserAdminGrid from './useradmingrid'
import UserAdminLock from './useradminlock'
var UserAdminMain = React.createClass({
  getInitialState: function () {
    return {
      userData: [],
      userAdminGridData: [],
      storeLookup: []
    }
  },
  componentDidMount () {
    GetUserStats(localStorage.username, this.GetUserStatsCallback)

    if (localStorage.UserAdmin == 'true')		{
      GetAllUsers(this.userAdminGridCallback)
      GetStoreLookups(this.callbackStoreLookups)
    }
  },
	    render: function () {
	    	var adminGridVis = false
      if (localStorage.UserAdmin == 'true')			{
        adminGridVis = true
      }

	    	return (<div className='container' style={{marginTop: '100px', width: '50%'}}>
  <UserStats user={this.state.userData} reloadUserStats={this.reloadUserStats} />
  { adminGridVis ? <UserAdminGrid users={this.state.userAdminGridData} reloadGrid={this.reloadGrid} reloadPermissions={this.reloadPermissions} /> : null }
  { adminGridVis ? <UserAdminLock storeLookup={this.state.storeLookup} reloadLockGrid={this.reloadLockGrid} /> : null }
	    			</div>)
    },
  GetUserStatsCallback: function (data) {
    this.setState({userData: data})
  },
  reloadUserStats: function (data) {
    GetUserStats(localStorage.username, this.GetUserStatsCallback)
  },
  userAdminGridCallback: function (data) {
    this.setState({userAdminGridData: data})
  },
  reloadGrid: function () {
    if (localStorage.UserAdmin == 'true')	{
      GetAllUsers(this.userAdminGridCallback)
    }
  },
  reloadPermissions: function () {
    if (localStorage.UserAdmin == 'true')	{
      GetAllUsers(this.userAdminGridCallback)
    }
  },
  reloadLockGrid: function () {
    GetStoreLookups(this.callbackStoreLookups)
  },
  callbackStoreLookups: function (data) {
    this.setState({ storeLookup: data })
  }
})

export default UserAdminMain
