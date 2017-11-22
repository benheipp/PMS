import React from 'react'
import VendorImport from './vendor-import'
import VendorMock from './vendor_mock'
import AttributeImport from './attribute-import'
var ImportNew = React.createClass({
   getInitialState: function () {
    return {
      storeLookup:[],
    }
  },
  componentWillMount: function () {
    GetStoreLookups(this.callbackStoreLookups)
    if (localStorage.ImportVisibility != 'true') {
      localStorage.clear()
      window.location.href = '/login'
    }
  },
  render: function () {
    	return (<div className='container'>
          <VendorMock storeLookup={this.state.storeLookup} />
          <AttributeImport storeLookup={this.state.storeLookup} />
    			</div>
    			)
  },
  callbackStoreLookups: function (data) {
    this.setState({ storeLookup: data })
  }
})

export default ImportNew
