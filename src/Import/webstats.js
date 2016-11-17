import React from 'react';
import ProgressBar from './progressbar';
import TimerMixin from 'react-timer-mixin';
var WebSendComponent = React.createClass({
	mixins: [TimerMixin],
	getInitialState: function() {
		return {
			counter: 0,
			webSendInProgress: false,
			intervalId: 0
		}
	},
	componentDidMount: function() {
		    var intId = this.setInterval( () => { 
		      if (this.state.counter >=15)
				{
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

  	},
  	handleCancelClick: function() {

  	},
    render: function () {

    	var status = "Sending to Web...";
    	var percentComplete = "20";
    	var styleMargin25 = {
            marginTop: 50
        }

    	return (
    				<div style={styleMargin25}>
    				{this.state.counter}
    				{this.state.intervalId}
    					<table className="table table-striped">
    						<tr><td><h3>Web Stats</h3></td></tr>
                       		<tr>
                            	<td><strong>Pending Catalog Items</strong></td>
                                <td><strong>Pending Products</strong></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>500</td>
                                <td>1200</td>
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
                            	<ProgressBar status={status} percentComplete={percentComplete} />
                            </div>
                        </div>
    				</div>

    			);
    }
});

export default WebSendComponent;


