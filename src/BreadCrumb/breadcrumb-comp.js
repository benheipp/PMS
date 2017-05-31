import React from 'react';
var BreadCrumbComp = React.createClass({
    render: function () {

    	var strDocKeyBuild = '';
        var strNodeNameCrumb = '';
    	var htmlStr = [];
    	var i;
    	if (this.props.docKeySplit.length > 1)
    	{
 			for (i = 0; i < this.props.docKeySplit.length; i++) {
	    	 	strDocKeyBuild = strDocKeyBuild + this.props.docKeySplit[i] + '/'
                strNodeNameCrumb = strNodeNameCrumb + this.props.nodeNameCrumb[i] + '[|]'
	    	 	if ((this.props.docKeySplit.length - 1) == i)
	    	 	{
	    	 		htmlStr.push(<li key={i} id="licomponent">{this.props.nodeNameCrumb[i]}</li>);
	    	 	}else{
	    	 		htmlStr.push(<li key={i} id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, (i+1), strDocKeyBuild, strNodeNameCrumb) }>{this.props.nodeNameCrumb[i]}</a></li>);
	    	 	}
    		}
    	} else{
    			htmlStr.push(<li key={i} id="licomponent">{this.props.nodeNameCrumb[0]}</li>);
    	}

    	return (<ol className="breadcrumb">
        <a onClick={this.handleClearSelectedStore} style={{cursor:'pointer'}}>{this.props.selectedStore.name}</a> - &nbsp;
    			{htmlStr}
    			</ol>
    	);
    },
    handleBreadCrumbClick: function (nodeLevel, docKey, nodeNameCrumb) {
    	docKey = docKey.substring(0, docKey.length - 1);
        nodeNameCrumb = nodeNameCrumb.substring(0, nodeNameCrumb.length - 3);
        this.props.callbackBreadCrumbClick(nodeLevel, docKey, nodeNameCrumb);
    },
    handleClearSelectedStore: function(){
        this.props.handleClearSelectedStore();
    }
});

export default BreadCrumbComp;
