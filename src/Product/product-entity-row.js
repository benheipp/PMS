import React from 'react';
var ProductEntityRow = React.createClass({
	    render: function () {

	    	if (this.props.entity.type == 'image')
	    	{
	    		var imgUrl = "https://cdn.firedog.com" + this.props.entity.value;
	    		return (<div className="col-sm-2">Entity Type:{this.props.entity.type} <img src={imgUrl} /></div>);
	    	} else
	    	{
	    		return (<div className="col-sm-2">Entity Type:{this.props.entity.type} {this.props.entity.value}</div>);
	    	}
	    }
});

export default ProductEntityRow;