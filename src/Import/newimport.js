import React from 'react'
import VendorImport from './vendor-import'
var ImportNew = React.createClass({
  componentWillMount: function () {
    if (localStorage.ImportVisibility != 'true') {
      localStorage.clear()
      window.location.href = '/login'
    }
  },
  render: function () {
    	return (<div className='container'>
          <VendorImport />
    			</div>
    			)
  }
})

export default ImportNew
