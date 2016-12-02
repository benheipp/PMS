import React from 'react';
var ProductDisplay = React.createClass({
    render: function () {
    	return (
    			<div>
    				<div className="row">
    					<div className="col-xs-2">Product Name: </div>
    					<div className="col-xs-10">{this.props.data.name}</div>
    				</div>
    				<div className="row">
    					<div className="col-xs-2">Sku: </div>
    					<div className="col-xs-10">{this.props.data.sku}</div>
    				</div>
    				<div className="row">
    					<div className="col-xs-2">Doc Key: </div>
    					<div className="col-xs-10">{this.props.data.doc_key}</div>
    				</div>
    			</div>
    		);
    }
 });

export default ProductDisplay;