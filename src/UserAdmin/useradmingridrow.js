import React from 'react';
import UserStatsModal from './userstatsmodal'
import UserAdminPermissionGrid from './useradminpermissiongrid';

var UserAdminGridRow = React.createClass({	
  getInitialState: function () {
        return {
            userData: [],
            showUserDetails: false,
            showPermissionDetails: false
        };
    },
	    render: function () {
	    		return(
				    <tr className="tableRowSpace">
              <td>{this.props.user.username}</td>
              <td>{this.props.user.firstname} {this.props.user.lastname}</td>
              <td><button onClick={this.handleDetailClick} className="btn btn-md btn-default"><i className="glyphicon glyphicon-info-sign"></i> Details</button></td>
              <td><button onClick={this.handleShowPermissions} className="btn btn-md btn-default"><i className="glyphicon glyphicon-eye-open"></i> Permissions</button></td>
              <td>{ this.state.showUserDetails ? <UserStatsModal handleHideUserStats={this.handleHideUserStats} user={this.state.userData} reloadUserStats={this.reloadUserStats} /> : null }</td>
              <td>{ this.state.showPermissionDetails ? <UserAdminPermissionGrid handleHideUserPermissionModal={this.handleHideUserPermissionModal} permissions={this.props.user.permissions} user={this.props.user} reloadPermissions={this.reloadPermissions} /> : null }</td>
            </tr>);    	
},
reloadUserStats: function(data){
  GetUserStats(this.props.user.username,this.GetUserStatsCallback)
  this.props.reloadGrid();
},
handleDetailClick: function(){
  this.setState({showUserDetails:true,userData:this.props.user});
},
handleHideUserStats: function(){
    this.setState({showUserDetails:false});
},
GetUserStatsCallback: function(data){
  this.setState({userData:data});
},
handleHideUserPermissionModal: function(){
  this.setState({showPermissionDetails:false});
},
handleShowPermissions: function(){
  this.setState({showPermissionDetails:true});
},
reloadPermissions: function(){
    this.props.reloadPermissions();
}
});

export default UserAdminGridRow;