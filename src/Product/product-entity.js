import React from 'react';
import ProductEntityRow from './product-entity-row'
var ProductEntity = React.createClass({
	    render: function () {
	    var rows = this.props.entities.map(function (entity) {
            return <ProductEntityRow entity={entity} key={entity.key} />;
        }, this);
	    	return (
	    		<div className="row">
	    			{rows}
	    		</div>
	    	);
	    }
});

export default ProductEntity;