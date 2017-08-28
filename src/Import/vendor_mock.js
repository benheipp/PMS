import React from 'react'
import TimerMixin from 'react-timer-mixin'
import ProgressBar from './progressbar'
import VendorMockModal from './vendor_mock_modal'
var VendorMock = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function () {
    return {
      counter: 0,
      interval: 1000,
      webSendInProgress: false,
      intervalId: 0,
      totalRecordsSendClick: 0,
      showPendingItems: false,
      selectedVendor: '',
      vendorList: [],
      showViewChangesButton: false,
      showModal: false,
      status: {
        status_message: 'System Ready',
        percent_complete: 0,
        last_checked: '',
        importing: false
      }
    }
  },
  componentDidMount: function () {
    GetVendorList(this.vendorListCallback)
  },
  vendorListCallback: function (data) {
    this.setState({vendorList: data})
  },
  handleImportClick: function () {
    var statusData = this.state.status
    if (this.state.selectedVendor == '') {
      statusData.status_message = 'Select a vendor'
      this.setState({status: statusData})
      return
    }
    statusData.status_message = 'Changed Records Identified'
    statusData.importing = true
    this.setState({status: statusData,showViewChangesButton:true  })
  },
  handleCancelClick: function () {
    var statusData = this.state.status
    if (statusData.importing == false) {
      statusData.status_message = 'Nothing to cancel!'
      this.setState({status: statusData })
      return
    }
    statusData.status_message = 'Cancelling send...'
    statusData.importing = false
    this.setState({status: statusData })
  },
  importCallback: function (data) {

  },
  getStatusCallback: function (data) {
    var statusData = this.state.status
    statusData.status_message = data.status_message
    statusData.last_checked = data.last_checked
    statusData.importing = data.importing
    statusData.percent_complete = data.percent_complete
    this.setState({status: statusData, selectedVendor: data.vendor})
  },
  handleVendorChange: function (event) {
    this.setState({selectedVendor: event.target.value})
  },
  createVendorItems: function () {
    let items = []
    items.push(<option value='' />)
    for (let i = 0; i < this.state.vendorList.length; i++) {
      items.push(<option key={i} value={this.state.vendorList[i].vendor_name}>{this.state.vendorList[i].vendor_name}</option>)
    }
    return items
  },
  handleViewChanges: function (){
    this.setState({showModal:true,interval:1000000})
  },
  handleHideModal: function(){
    this.setState({showModal:false,interval:1000})
  },
  render: function () {
    var styleMargin25 = {
      marginTop: 50,
      borderRadius: '4px',
      backgroundColor: 'grey'
    }

    var countDown = (30 - this.state.counter)
    return (
      <div className='webSend-container'>
        <div className='modal-header' style={{ backgroundColor: 'rgb(51, 122, 183)', color: 'white' }}><h4 className='modal-title'>Vendor Source Import</h4></div>
        <div className='row'>
          <div className='col-sm-3'>
            <strong>Select a Vendor</strong>
            <select className='form-control' value={this.state.selectedVendor} style={{width: '300px'}} onChange={this.handleVendorChange}>
              {this.createVendorItems()}
            </select>
          </div>
        </div>
        <div className='row'>
                        &nbsp;
        </div>
        <div className='row'>
          <div className='col-sm-3'>
          {!this.state.showViewChangesButton ? <button disabled={this.state.status.importing} className='btn btn-success' onClick={this.handleImportClick}><span className='glyphicon glyphicon-arrow-up' aria-hidden='true' /> Identify New Records</button> : null}
          {this.state.showViewChangesButton ? <button className='btn btn-info' onClick={this.handleViewChanges}><span className='glyphicon glyphicon-search' aria-hidden='true' /> View Changes</button> : null}
          {this.state.showModal ? <VendorMockModal handleHideModal={this.handleHideModal} /> : null}
          </div>
          <div className='col-sm-3'>
            <button disabled={!this.state.status.importing} type='button' className='btn btn-danger' onClick={this.handleCancelClick}><span className='glyphicon glyphicon-remove' aria-hidden='true' /> Cancel</button>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12'>
            <ProgressBar data={this.state.status} />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <strong>Time til next update: {countDown} seconds...</strong>
          </div>
          <div className='col-sm-6'>
            <strong>Last Updated: {this.state.status.last_checked} </strong>
          </div>
        </div>
      </div>

    )
  }
})

export default VendorMock
