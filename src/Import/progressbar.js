import React from 'react';
var ProgressBar = React.createClass({
    render: function () {

    	var styleWidth = {
            width: this.props.data.percent_complete + '%'
        }

    	return (
    			<div>
				<h4>{this.props.data.status_message}</h4>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow={this.props.data.percent_complete} aria-valuemin="0" aria-valuemax="100" style={styleWidth}>
                        <span className="sr-only">{this.props.data.percent_complete}% Complete</span>
                    </div>
                </div>
               </div>
    		);
    }
});

export default ProgressBar;