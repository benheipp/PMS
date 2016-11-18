import React from 'react';
import ProgressBar from './progressbar';
import TimerMixin from 'react-timer-mixin';
var WebSendComponent = React.createClass({
	mixins: [TimerMixin],
	getInitialState: function() {
		return {
			counter: 0,
			webSendInProgress: false,
			intervalId: 0,
			totalRecordsSendClick: 0,
			StatusData: {
                status_message: "",
                percent_complete: 0,
                catalog_records_remaining: 0,
                product_records_remaining: 0,
                last_checked: "",
                status_flag: true,
                send_flag: false
            }
		}
	},
	componentDidMount: function() {
			GetCurrentImportStatus(this.getCurrentImportStatusCallback);
		    var intId = this.setInterval( () => { 
		      if (this.state.counter >=15)
				{
					GetCurrentImportStatus(this.getCurrentImportStatusCallback);
					this.setState({
			        counter: 0
					});
				}
				else{ 
				      this.setState({
				        counter: this.state.counter+1
				      });
				}
		    }, 1000);
		    this.setState({intervalId:intId});
  	},
  	handleSendToWebClick: function() {
  		var statusData = this.state.StatusData;
  		var totalRecords = this.state.StatusData.catalog_records_remaining + this.state.StatusData.product_records_remaining;
  		if(totalRecords < 1){
  			statusData.status_message = "Nothing to send!";
  			this.setState({StatusData: statusData });
  			return;
  		}
  		statusData.status_message = "Queueing data...";
  		statusData.send_flag = true;
  		this.setState({totalRecordsSendClick: totalRecords,StatusData: statusData });
  		UpdateSendToWebFlag(true,"Preparing to send...",this.updateSendToWebFlagCallback)
  	},
  	handleCancelClick: function() {
  		var statusData = this.state.StatusData;
  		if(statusData.send_flag == false){
  			statusData.status_message = "Nothing to cancel!";
  			this.setState({StatusData: statusData });
  			return;
  		}
  		statusData.status_message = "Cancelling send...";
  		statusData.send_flag = false;
  		this.setState({totalRecordsSendClick: 0,StatusData: statusData });
  		UpdateSendToWebFlag(false,"Send Cancelled",this.updateSendToWebFlagCallback)
  	},
  	updateSendToWebFlagCallback: function(data) {
  		console.log("updateSendToWebFlagCallback callback");
  	},
  	getCurrentImportStatusCallback: function(data) {
  		var statusData = this.state.StatusData;
  		statusData.status_message = data.status_message;
  		if (data.send_flag == true)
  		{
  			statusData.percent_complete = this.calcPercentLeft();
  		} else {
  			statusData.percent_complete = 0;
  		}
  		statusData.catalog_records_remaining = data.catalog_records_remaining;
  		statusData.product_records_remaining = data.product_records_remaining;
  		statusData.last_checked = data.last_checked;
  		statusData.status_flag = data.status_flag;
  		statusData.send_flag = data.send_flag;
  		this.setState({StatusData : statusData});
  	},
  	calcPercentLeft: function() {
  		return (100 - (((this.state.StatusData.catalog_records_remaining + this.state.StatusData.product_records_remaining) / this.state.totalRecordsSendClick) * 100))
  	},
    render: function () {

    	var status = "Sending to Web...";
    	var percentComplete = "20";
    	var styleMargin25 = {
            marginTop: 50,
            borderRadius: '4px',
            backgroundColor: "grey"
        }

        var countDown = (15 - this.state.counter);

    	return (
    				<div className="webSend-container">
    				<div className="modal-header" style={{ backgroundColor: 'rgb(51, 122, 183)', color: 'white' }}><h4 className="modal-title">Web Stats</h4></div>
    					<table className="table table-striped">
    						<tr><td><br></br></td></tr>
                       		<tr>
                            	<td><strong>Pending Catalog Items</strong></td>
                                <td><strong>Pending Products</strong></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>{this.state.StatusData.catalog_records_remaining}</td>
                                <td>{this.state.StatusData.product_records_remaining}</td>
                                <td><button className="btn btn-info">View Pending Items</button></td>
                            </tr>
                        </table>
                        <div className="row">
                        	<div className="col-sm-3">
                        		<button className="btn btn-success" onClick={this.handleSendToWebClick}><span className="glyphicon glyphicon-arrow-up" aria-hidden="true"></span> Send to Web</button>
                        	</div>
                        	<div className="col-sm-3">
                        		<button type="button" className="btn btn-danger" onClick={this.handleCancelClick}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Cancel</button>
                        	</div>

                        </div>
                        <div className="row">
                        	<div className="col-sm-12">
                            	<ProgressBar data={this.state.StatusData} />
                            </div>
                        </div>
                        <div className="row">
                        	<div className="col-sm-6">
                        		<strong>Time til next update: {countDown} seconds...</strong>
                        	</div>
                        	<div className="col-sm-6">
                        	<strong>Last Updated: {this.state.StatusData.last_checked} </strong>
                        	</div>
                        </div>
    				</div>

    			);
    }
});

export default WebSendComponent;


