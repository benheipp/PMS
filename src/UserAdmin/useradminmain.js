import React from 'react';
import UserStats from './userstats'
import UserAdminGrid from './useradmingrid'
var UserAdminMain = React.createClass({
	getInitialState: function () {
        return {
            userData: [],
            userAdminGridData: []
        };
    },
	componentDidMount() {
		GetUserStats(localStorage.username,this.GetUserStatsCallback)

		if (localStorage.UserAdmin == 'true')
		{
			GetAllUsers(this.userAdminGridCallback);
		}
	},
	    render: function () {

	    	var adminGridVis = false;
			if (localStorage.UserAdmin == 'true')
			{
				adminGridVis = true;
			}

	    	return(<div className="container" style={{marginTop:'100px',width:'50%'}}>
					<UserStats user={this.state.userData} reloadUserStats={this.reloadUserStats} />
					{ adminGridVis ? <UserAdminGrid users={this.state.userAdminGridData} reloadGrid={this.reloadGrid} reloadPermissions={this.reloadPermissions} /> : null }
	    			</div>);
},
GetUserStatsCallback: function(data){
	this.setState({userData:data});
},
reloadUserStats: function(data){
	GetUserStats(localStorage.username,this.GetUserStatsCallback)
},
userAdminGridCallback: function(data)
{
	this.setState({userAdminGridData:data});
},
reloadGrid: function(){
	if (localStorage.UserAdmin == 'true')
	{
		GetAllUsers(this.userAdminGridCallback);
	}
},
reloadPermissions: function(){
	if (localStorage.UserAdmin == 'true')
	{
		GetAllUsers(this.userAdminGridCallback);
	}
}
});

export default UserAdminMain;
