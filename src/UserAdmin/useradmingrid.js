import React from 'react';
import UserAdminGridRow from './useradmingridrow';
import AddUserModal from './addusermodal';
var UserAdminGrid = React.createClass({	
      getInitialState: function () {
        return {
            showAddUserComponent: false
        };
      },
	    render: function () {
      var rows = this.props.users.map(function (user) {
            return <UserAdminGridRow  user={user} reloadGrid={this.reloadGrid} reloadPermissions={this.props.reloadPermissions} />;
        }, this);
	    		return(
				<div className="panel panel-info" style={{width:'600px'}}>
				  <div className="panel-heading">User Admin</div>
				  <div className="panel-body">

				  <table className="table table-user-information" style={{marginBottom:'0px'}}>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Enabled</th>
            </tr>
            {rows}
            <tr>
              <td>
              { this.state.showAddUserComponent ? <AddUserModal handleHideAddUser={this.handleHideAddUser} reloadGrid={this.reloadGrid} /> : null }
              <button onClick={this.handleAddUserClick} className="btn btn-md btn-default"><i className="glyphicon glyphicon-plus"></i> Add User</button></td>
            </tr>
          </table>
				  </div>
				 </div>);    	
},
reloadGrid: function(){
  this.setState({showAddUserComponent:false});
  this.props.reloadGrid();
},
reloadPermissions: function(){
  this.props.reloadPermissions();
},
handleAddUserClick: function(){
  this.setState({showAddUserComponent:true});
},
handleHideAddUser: function(){
  this.setState({showAddUserComponent:false});
}
});

export default UserAdminGrid;