import React from 'react';
var ProgressBar = React.createClass({
    render: function () {

    	var styleWidth = {
            width: this.props.percentComplete + '%'
        }

    	return (
    			<div>
				<h4>{this.props.status}</h4>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow={this.props.percentComplete} aria-valuemin="0" aria-valuemax="100" style={styleWidth}>
                        <span className="sr-only">{this.props.percentComplete}% Complete</span>
                    </div>
                </div>
               </div>
    		);
    }
});

export default ProgressBar;