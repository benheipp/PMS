import React from 'react'
import ProductDocKeyRow from './product-doc-key-row'
var ProductDocKeys = React.createClass({
	    render: function () {
	    var rows = this.props.data.map(function (dockey) {
      return <ProductDocKeyRow dockey={dockey} key={dockey.key} />
    }, this)
	    	return (
  <div className='row'>
    <div className='col-sm-12'>
      {rows}
    </div>
  </div>
	    	)
	    }

})

export default ProductDocKeys
