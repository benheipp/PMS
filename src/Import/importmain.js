import React from 'react';
import WebSendComponent from './webstats';
import DataAnalysis from './dataanalysis';
var ImportMain = React.createClass({
    componentWillMount: function() {
        if(localStorage.ImportVisibility != 'true')
        {
            localStorage.clear();
            window.location.href = "/login";
        }
    },
    render: function () {
    	return (<div className="container">
    			<WebSendComponent />
                <DataAnalysis />
    			</div>
    			);
    }
});

export default ImportMain;
