import React from 'react'
var VendorListRow = React.createClass({
	    render: function () {
	    	return (
  <div>
    <input type='checkbox' onChange={e => this.handleCheckChange(e, this.props.vendor)} name='Vendor' style={{visibility: 'visible'}} value={this.props.vendor.vendor_name} />{this.props.vendor.vendor_name}
  </div>
	    		)
	    },
	    handleCheckChange: function (e, vendor) {
	    	this.props.handleVendorCheckChange(e.target.checked, vendor)
	    }
})

export default VendorListRow
