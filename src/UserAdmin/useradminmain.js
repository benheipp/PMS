import React from 'react';
import UserStats from './userstats'
var UserAdminMain = React.createClass({
	getInitialState: function () {
        return {
            userData: []
        };
    },
	componentDidMount() {
		GetUserStats(localStorage.username,this.GetUserStatsCallback)
	},
	    render: function () {
	    	return(<div className="container" style={{marginTop:'100px',width:'50%'}}>
					<UserStats user={this.state.userData} />
	    			</div>);
},
GetUserStatsCallback: function(data){
	this.setState({userData:data});
}
});

export default UserAdminMain;