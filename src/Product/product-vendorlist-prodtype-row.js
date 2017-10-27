import React from 'react'
var VendorListProdTypeRow = React.createClass({
   getInitialState: function () {
    return {
      selectedOption:this.props.vendor.product_type
      }
    },
	    render: function () {
	    	return (
  <div>
    <div>
      <div className='row'>
                  <div className='col-sm-2'>
                    <table>
                          <tr>
                            <td> <input type='radio' value={1}
                                checked={this.state.selectedOption === 1}
                                onChange={this.handleOptionChange} /></td>
                            <td>OE</td>
                          </tr>
                        </table>
                  </div>
                  <div className='col-sm-2'>
                    <table>
                          <tr>
                            <td> <input type='radio' value={2}
                                checked={this.state.selectedOption === 2}
                                onChange={this.handleOptionChange} /></td>
                            <td>Aftermarket</td>
                          </tr>
                        </table>
                  </div>
              <div className='col-sm-6'>
                   {this.props.vendor.vendor_name}
              </div>
               <div className='col-sm-2'>
                   Store: {this.props.vendor.store_id}
              </div>
          </div>
    </div>
  </div>
	    		)
	    },
  handleOptionChange: function (changeEvent) {
    this.setState({
      selectedOption: parseInt(changeEvent.target.value)
    })
    CreateProductTypeRule('product/'+ this.props.vendor.vendor_name_normalized,this.props.vendor.store_id,changeEvent.target.value,this.createProductTypeRuleCallBack)
  },
  createProductTypeRuleCallBack: function(data){
    this.props.showFeedBack(data)
  }
})

export default VendorListProdTypeRow
