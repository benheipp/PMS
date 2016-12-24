import React from 'react';
import UserStats from './userstats';

var UserStatsModal = React.createClass({
	componentDidMount() {
        $('#UserStatsModal').modal('show');
        $('#UserStatsModal').on('hidden.bs.modal', this.props.handleHideUserStats);
    },
    render: function() {

        return (
 			<div id="UserStatsModal" className="modal fade">
                <div className="modal-dialog modal-md" style={{width:'630px'}}>
                  <div className="modal-content">
                    <div className="modal-body">
                      <div className="row">
                          <div className="col-sm-12">
							             <UserStats user={this.props.user} reloadUserStats={this.reloadUserStats} />
        				        </div>
   					  </div>
        
  					</div>
  				<div className="modal-footer">
    				<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
 				</div>
			</div>
		</div>
	</div>

        	);
    },
    reloadUserStats: function(data){
      this.props.reloadUserStats(data);
  }
});

export default UserStatsModal;