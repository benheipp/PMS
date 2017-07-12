import React from 'react'
import WebSendComponent from './webstats'
import DataAnalysis from './dataanalysis'
import CatalogTypeAssignment from './catalog-type-assignment'
var ImportMain = React.createClass({
  getInitialState: function () {
    return {
      storeLookup: []
    }
  },
  componentDidMount: function () {
    GetStoreLookups(this.callbackStoreLookups)
  },
  componentWillMount: function () {
    if (localStorage.ImportVisibility != 'true') {
      localStorage.clear()
      window.location.href = '/login'
    }
  },
  render: function () {
    	return (<div className='container'>
      <WebSendComponent storeLookup={this.state.storeLookup} />
      <DataAnalysis />
      <CatalogTypeAssignment storeLookup={this.state.storeLookup} />
    			</div>
    			)
  },
  callbackStoreLookups: function (data) {
    this.setState({ storeLookup: data })
  }
})

export default ImportMain
