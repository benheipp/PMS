import React from 'react'
import VendorImport from './vendor-import'
import VendorMock from './vendor_mock'
var ImportNew = React.createClass({
  componentWillMount: function () {
    if (localStorage.ImportVisibility != 'true') {
      localStorage.clear()
      window.location.href = '/login'
    }
  },
  render: function () {
    	return (<div className='container'>
          <VendorMock />
    			</div>
    			)
  }
})

export default ImportNew
