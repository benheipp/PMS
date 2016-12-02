import React from 'react';
import ProductAutoComplete from './product-autocomplete';
import ProductDisplay from './product-display'
var ProductMain = React.createClass({
    render: function () {
    	return (
    		<div className="container">
    	 	  <ProductAutoComplete displayRecord={this.displayRecord} />
    	 	  <ProductDisplay />
    		</div>);
    },
    displayRecord: function(item) {
    	console.log(item);
    }
});

export default ProductMain;