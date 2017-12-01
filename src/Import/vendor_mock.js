import React from 'react'
import TimerMixin from 'react-timer-mixin'
import ProgressBar from './progressbar'
import CheckboxTree from 'react-checkbox-tree'
import { BeatLoader } from 'react-spinners';

var VendorMock = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function () {
    return {
      nodes:[],
      checked: [],
      expanded: [],
      nodes2:[],
      checked2: [],
      expanded2: [],
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
      showVendorSelection:false,
      showLoader: false,
      loadingVendorTree:false,
      selectedStore:'',
      status: {
        status_message: 'System Ready',
        percent_complete: 0,
        last_checked: '',
        importing: false
      }
    }
  },
  componentDidMount: function () {
  GetCurrentVendorImportStatus("1",this.getStatusCallback)

     var intId = this.setInterval(() => {
      if (this.state.counter >= 30) {
        GetCurrentVendorImportStatus("1",this.getStatusCallback)
        this.setState({
          counter: 0
        })
      } else {
        this.setState({
          counter: this.state.counter + 1
        })
      }
    }, 1000)
    this.setState({intervalId: intId})
  },
  vendorListCallback: function (data) {
    this.setState({vendorList: data})
  },
  handleImportClick: function () {
    var statusData = this.state.status
    statusData.importing = true
    this.setState({status: statusData,showLoader:true,nodes:[],nodes2:[] })
    UpdateImportFlag('canam', true, 'Starting Import...', "1", this.importCallback)
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
    UpdateImportFlag('canam', false, 'Send Cancelled',"1", this.importCallback)
  },
  importCallback: function (data) {
    var statusData = this.state.status
    statusData.status_message = ''
    this.setState({status: statusData,showVendorSelection:false })
  },
  getStatusCallback: function (data) {
    var statusData = this.state.status
    statusData.status_message = data.status_message
    statusData.last_checked = data.last_checked
    statusData.importing = data.importing
    statusData.percent_complete = data.percent_complete
    if (statusData.status_message == 'Finished Processing!')
    {
      this.setState({showVendorSelection:true, showLoader:false})
    }
    this.setState({status: statusData})
  },
  handleVendorChange: function (event) {
    if (this.state.selectedStore == '')
    {
      alert('please select a store first')
      return
    }
    else {
        this.setState({selectedVendor: event.target.value,loadingVendorTree:true})
        GetVendorImportTree(event.target.value, this.state.selectedStore, this.callBackGetVendorImportTree)
        GetProductionImportTree(event.target.value, this.state.selectedStore, this.callBackProductionImportTree)
    }
  },
  handleStoreChange: function (event) {
      this.setState({selectedStore: event.target.value,selectedVendor:'',nodes:[],nodes2:[]})
      GetVendors(this.vendorListCallback)
  },
  callBackGetVendorImportTree:function(data){
    this.setState({nodes:$.parseJSON(data),loadingVendorTree:false})
  },
  callBackProductionImportTree:function(data){
    this.setState({nodes2:$.parseJSON(data)})
  },
  createVendorItems: function () {
    let items = []
    items.push(<option value='' />)
    for (let i = 0; i < this.state.vendorList.length; i++) {
      items.push(<option key={i} value={this.state.vendorList[i].vendor_name_normalized}>{this.state.vendorList[i].vendor_name_normalized}</option>)
    }
    return items
  },
  createStoreLookup: function () {
    let items = []
    items.push(<option value='' />)
    for (let i = 0; i < this.props.storeLookup.length; i++) {
      items.push(<option key={this.props.storeLookup[i].id} value={this.props.storeLookup[i].id}>{this.props.storeLookup[i].store_name}</option>)
    }
    return items
  },
  handleViewChanges: function (){
    this.setState({showModal:true,interval:1000000})
  },
  handleHideModal: function(){
    this.setState({showModal:false,interval:1000})
  },
  handleClearStartOverClick: function(){
    var statusData = this.state.status
    statusData.importing = false
    this.setState({status: statusData,nodes:[],nodes2:[],checked:[],checked2:[],selectedStore:'', selectedVendor:'' })
    UpdateImportFlag('canam', false, '',"1", this.importCallback)
  },
  render: function () {
    var styleMargin25 = {
      marginTop: 50,
      borderRadius: '4px',
      backgroundColor: 'grey'
    }

    var countDown = (30 - this.state.counter)
    var showTree = false
    if (this.state.nodes.length > 0){
      showTree = true
    }

    var showTree2 = false
    if (this.state.nodes2.length > 0){
      showTree2 = true
    }

    var showImportButton = false
    if (this.state.checked.length > 0)
    {
      showImportButton = true
      console.log(showImportButton)
    }
    return (
      <div className='webSend-container' style={{maxWidth:'2000px'}}>
        <div className='modal-header' style={{ backgroundColor: 'rgb(51, 122, 183)', color: 'white' }}><h4 className='modal-title'>Vendor Source Import</h4></div>
        <div className='row'>
                        &nbsp;
        </div>
        <div className='row'>
          <div className='col-sm-2'>
          {!this.state.showViewChangesButton ? <button disabled={this.state.status.importing} className='btn btn-success' onClick={this.handleImportClick}><span className='glyphicon glyphicon-arrow-up' aria-hidden='true' /> Identify New Records</button> : null}
          {this.state.showViewChangesButton ? <button className='btn btn-info' onClick={this.handleViewChanges}><span className='glyphicon glyphicon-search' aria-hidden='true' /> View Changes</button> : null}
          {this.state.showModal ? <VendorMockModal handleHideModal={this.handleHideModal} /> : null}
          </div>
          <div className='col-sm-1'>
            <button disabled={!this.state.status.importing} type='button' className='btn btn-danger' onClick={this.handleCancelClick}><span className='glyphicon glyphicon-remove' aria-hidden='true' /> Cancel</button>
          </div>
          <div className='col-sm-7'>
          </div>
          <div className='col-sm-2'>
            <button type='button' className='btn btn-danger' onClick={this.handleClearStartOverClick}><span className='glyphicon glyphicon-remove' aria-hidden='true' /> Clear/Start Over</button>
          </div>
        </div>
       <div className='row'>
          <div className='col-sm-12'>
           {this.state.status.importing ?  <ProgressBar data={this.state.status} /> : null }
           <BeatLoader
          color={'#123abc'} 
          loading={this.state.status.importing} 
        />
        </div>
      </div>
    {this.state.showVendorSelection ?
    <div>
     <div className='row' style={{marginTop:'20px'}}>
          <div className='col-sm-3'>
                <strong>Select a Store</strong>
            </div>
          <div className='col-sm-2'>
            </div>
            <div className='col-sm-2'>
              <strong>Select a Vendor</strong>
            </div>
          </div> 
         <div className='row'>
          <div className='col-sm-4'>
                <div>   
                   <select className='form-control' value={this.state.selectedStore} style={{width: '300px'}} onChange={this.handleStoreChange}>
              {this.createStoreLookup()}
            </select>
                </div>
          </div>
          <div className='col-sm-1'>
             <BeatLoader
          color={'#123abc'} 
          loading={this.state.loadingVendorTree} 
        />
          </div>
            <div className='col-sm-4'>
                <div>   
        
            <select className='form-control' value={this.state.selectedVendor} style={{width: '300px'}} onChange={this.handleVendorChange}>
              {this.createVendorItems()}
            </select>
            </div>
          </div>
                      <div className='col-sm-1'>
                        </div>
            <div className='col-sm-1'>
              {showImportButton ? <button className='btn btn-success'><span className='glyphicon glyphicon-import' aria-hidden='true' /> Import</button> : null}
            </div>
      </div></div> : null} 
        <div className='row'>
          <div id="vendorImportTreeBase" className='col-sm-6'>
         {showTree ? <div style={{maxHeight:'500px',overflowY:'scroll'}}> <div><h4>New Records - {this.state.checked.length} items selected</h4></div>
         <div id="vendorImportTreeFloat" style={{border:'1px solid black',borderRadius:'5px',minWidth:'500px'}}>
          <CheckboxTree
                nodes={this.state.nodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
            /> </div></div> : null}   
            </div>
            <div className='col-sm-6'>
             {showTree2 ?  <div style={{maxHeight:'500px',overflowY:'scroll'}}><div><h4>Current</h4></div>
             <div style={{border:'1px solid black',borderRadius:'5px'}}>
               <CheckboxTree
                nodes={this.state.nodes2}
                checked={this.state.checked2}
                expanded={this.state.expanded2}
                disabled={true}
                onCheck={checked2 => this.setState({ checked2 })}
                onExpand={expanded2 => this.setState({ expanded2 })}
            /> </div></div> : null} 
            </div>
          </div>
      </div>

    )
  }
})

export default VendorMock
