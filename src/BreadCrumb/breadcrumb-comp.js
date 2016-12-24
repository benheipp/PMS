import React from 'react';
var BreadCrumbComp = React.createClass({
    render: function () {

    	var strDocKeyBuild = '';
    	var htmlStr = [];
    	var i;
    	if (this.props.docKeySplit.length > 1)
    	{
 			for (i = 0; i < this.props.docKeySplit.length; i++) { 
	    	 	strDocKeyBuild = strDocKeyBuild + this.props.docKeySplit[i] + '/'
	    	 	if ((this.props.docKeySplit.length - 1) == i)
	    	 	{
	    	 		htmlStr.push(<li key={i} id="licomponent">{this.props.docKeySplit[i]}</li>);
	    	 	}else{
	    	 		htmlStr.push(<li key={i} id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, (i+1), strDocKeyBuild) }>{this.props.docKeySplit[i]}</a></li>);
	    	 	}
    		}
    	} else{
    			htmlStr.push(<li key={i} id="licomponent">{this.props.docKeySplit[0]}</li>);
    	}

    	return (<ol className="breadcrumb">
    			{htmlStr}
    			</ol>
    	);
    },
    handleBreadCrumbClick: function (nodeLevel, docKey) {
    	docKey = docKey.substring(0, docKey.length - 1);
        this.props.callbackBreadCrumbClick(nodeLevel, docKey);
    }
});

export default BreadCrumbComp;