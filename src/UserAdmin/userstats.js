import React from 'react';
var UserStats = React.createClass({
	    render: function () {
	    	return(
				<div className="panel panel-info" style={{width:'600px'}}>
				  <div className="panel-heading">User Details</div>
				  <div className="panel-body">
				  <table className="table table-user-information">
                    <tbody>
                      <tr>
                        <td>Username:</td>
                        <td>{this.props.user.username}</td>
                      </tr>
                      <tr>
                        <td>Last Login DT:</td>
                        <td>{this.props.user.lastloginDT}</td>
                      </tr>
                      <tr>
                        <td>Full Name:</td>
                        <td>{this.props.user.firstname} {this.props.user.lastname}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td><a href="mailto:{this.props.user.email}">{this.props.user.email}</a></td>
                      </tr>
                      <tr>
                        <td># Node Changes</td>
                        <td>{this.props.user.nodeChanges}</td>
                      </tr>
                        <tr>
                        <td># Component Changes</td>
                        <td>{this.props.user.componentChanges}</td>
                      </tr>
                      <tr>
                        <td># Component Product Changes</td>
                        <td>{this.props.user.componentProductChanges}</td>
                      </tr>
                      <tr>
                        <td># Master Product Changes</td>
                        <td>{this.props.user.masterProductChanges}</td>
                      </tr>
                    </tbody>
                  </table>
				  </div>
				 </div>);
}
});

export default UserStats;