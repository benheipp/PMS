import React from 'react';
import UserAdminGridRow from './useradmingridrow'
var UserAdminGrid = React.createClass({	
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
            </tr>
            {rows}
          </table>
				  </div>
				 </div>);    	
},
reloadGrid: function(){
  this.props.reloadGrid();
},
reloadPermissions: function(){
  this.props.reloadPermissions();
}
});

export default UserAdminGrid;