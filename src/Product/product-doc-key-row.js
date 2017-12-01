import React from 'react'
var ProductDocKeyRow = React.createClass({
	    render: function () {
	    		return (
  <div className='row'>
    <div className='col-sm-8'>
	    				Doc Key:<a target="_window" href={`catalog?doc_key=${this.props.dockey.docKey}&store_id=${this.props.dockey.store_id}&store_name=${this.props.dockey.store_name}`}>{this.props.dockey.docKey}</a>
    </div>
        <div className='col-sm-1'>
        </div>
    <div className='col-sm-3'>
             Store:{this.props.dockey.store_name}
    </div>
  </div>)
	    }
})

export default ProductDocKeyRow
