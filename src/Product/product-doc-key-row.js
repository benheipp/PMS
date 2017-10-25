import React from 'react'
var ProductDocKeyRow = React.createClass({
	    render: function () {
	    		return (
  <div className='row'>
    <div className='col-sm-8'>
	    				Doc Key:{this.props.dockey.docKey}
    </div>
        <div className='col-sm-1'>
        </div>
    <div className='col-sm-3'>
             Store:{this.props.dockey.store}
    </div>
  </div>)
	    }
})

export default ProductDocKeyRow
