import React from 'react'
import VendorListRow from './product-vendorlistrow'
var VendorList = React.createClass({
	    render: function () {
 		var rows = this.props.VendorList.map(function (vendor) {
   return <VendorListRow vendor={vendor} key={vendor.id + vendor.store_id + 100} handleVendorCheckChange={this.handleVendorCheckChange} />
 }, this)

    	return (
      <div>
        {rows}
      </div>
    		)
    },
  handleVendorCheckChange: function (chkValue, vendor) {
    	this.props.handleVendorCheckChange(chkValue, vendor)
  }
})

export default VendorList
