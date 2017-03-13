import React from 'react';
var UserStats = React.createClass({
		getInitialState: function () {
        return {
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            email: this.props.user.email,
            isEditMode:false
        };
    },
	    render: function () {

	    	var mailtoStr = "mailto:" + this.props.user.email;

	    	if (this.state.isEditMode)
	    	{
	    		return(
				<div className="panel panel-info" style={{width:'600px'}}>
				  <div className="panel-heading">User Details</div>
				  <div className="panel-body">
				  <table className="table table-user-information" style={{marginBottom:'0px'}}>
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
                        <td>
                        First Name:<input type="text" id="txtFirstNameUser" className="form-control" defaultValue={this.props.user.firstname} onChange={this.handleChange.bind(this, 'firstname')}/>
						Last Name:<input type="text" id="txtLastNameUser" className="form-control" defaultValue={this.props.user.lastname} onChange={this.handleChange.bind(this, 'lastname')} />
                        </td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td><input type="text" className="form-control" value={this.state.email} onChange={this.handleChange.bind(this, 'email')}/></td>
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
                      <tr>
                      	<td><button onClick={this.handleSaveClick} className="btn btn-md btn-default" style={{marginRight:'20px'}}><i className="glyphicon glyphicon-floppy-disk"></i> Save</button>
							<button onClick={this.handleCancelClick} className="btn btn-md btn-default"><i className="glyphicon glyphicon-remove"></i></button>
                      	</td>
                      	<td></td>
                      </tr>
                    </tbody>
                  </table>
				  </div>
				 </div>);

	    	}else{
	    		return(
				<div className="panel panel-info" style={{width:'600px'}}>
				  <div className="panel-heading">User Details</div>
				  <div className="panel-body">
				  <table className="table table-user-information" style={{marginBottom:'0px'}}>
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
                        <td><a href={mailtoStr}>{this.props.user.email}</a></td>
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
                      <tr>
                      	<td><button onClick={this.handleEditClick} className="btn btn-md btn-default"><i className="glyphicon glyphicon-book"></i> Edit</button></td>
                      	<td></td>
                      </tr>
                    </tbody>
                  </table>
				  </div>
				 </div>);
	    	}


},
handleEditClick: function(){
	this.setState({isEditMode:true,firstname:this.props.user.firstname,lastname:this.props.user.lastname,email:this.props.user.email});
},
handleCancelClick: function(){
	this.setState({isEditMode:false});
},
handleSaveClick: function(){
	SaveUserInfo(this.props.user.username,this.props.user.id,this.state.firstname,this.state.lastname,this.state.email,this.handleSaveCallback);
	this.setState({isEditMode:false});
},
handleSaveCallback: function(data){
	this.props.reloadUserStats(data);
},
handleChange: function (name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
}
});

export default UserStats;
