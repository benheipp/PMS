import React from 'react'
import VendorListProdTypeRow from './product-vendorlist-prodtype-row'
var VendorListProdType = React.createClass({
	    render: function () {
 		var rows = this.props.VendorList.map(function (vendor) {
   return <VendorListProdTypeRow vendor={vendor} key={vendor.id + vendor.store_id + 100} showFeedBack={this.showFeedBack} />
 }, this)

    	return (
      <div>
        {rows}
      </div>
    		)
    },
  showFeedBack: function (data) {
    this.props.showFeedBack(data)
  }
})

export default VendorListProdType
