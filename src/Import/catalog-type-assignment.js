import React from 'react'

var CatalogTypeAssignment = React.createClass({
  getInitialState: function () {
    return {
      nodeLevel: 2,
      selectedVendor: '',
      vendorList: [],
      storeLookup: [],
      selectedStore: '',
      selectedCatalogType: '',
      catalogTypes: []
    }
  },
  componentDidMount: function () {
    GetVendorList(this.vendorListCallback)
    GetCatalogNodeTypes(this.callbackCatalogNodeTypes)
    // GetDataAnalysisStats(this.statsCallback);
  },
  render: function () {
    return (
      <div className='webSend-container'>
        <div className='modal-header' style={{ backgroundColor: 'rgb(51, 122, 183)', color: 'white' }}><h4 className='modal-title'>Catalog Type Assignment</h4></div>
        <div className='row'>
          <div className='col-sm-3'>
                Select a Type to apply:             <select className='form-control' value={this.state.selectedCatalogType} style={{width: '150px'}} onChange={this.handleCatalogTypeChange}>
                  {this.createCatalogTypeItems()}
                </select>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-3'>
                Node Level: <input type='number' className='form-control' min='2' value={this.state.nodeLevel} onChange={this.handleNodeLevelChange} style={{width: '50px'}} />
          </div>
          <div className='col-sm-6'>
                Vendor:
                <select className='form-control' value={this.state.selectedVendor} style={{width: '300px'}} onChange={this.handleVendorChange}>
                  {this.createVendorItems()}
                </select>
          </div>
          <div className='col-sm-3'>
                Store:
               <select className='form-control' value={this.state.selectedStore} style={{width: '100px'}} onChange={this.handleStoreSelectChange}>
                 {this.createStoreItems()}
               </select>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-3'>
            <button className='btn btn-success' onClick={this.handleApplyRuleClick}><span className='glyphicon glyphicon-arrow-up' /> Apply Rule</button>
          </div>
        </div>
      </div>)
  },
  handleNodeLevelChange: function (event) {
    this.setState({ nodeLevel: event.target.value })
  },
  handleVendorChange: function (event) {
    this.setState({selectedVendor: event.target.value})
  },
  handleApplyRuleClick: function () {
    AddCatalogTypeRule(this.state.selectedCatalogType, this.state.nodeLevel, this.state.selectedVendor, this.state.selectedStore, this.addCatalogTypeRuleCallback)
  },
  addCatalogTypeRuleCallback: function () {

  },
  createVendorItems: function () {
    let items = []
    items.push(<option value='' />)
    for (let i = 0; i < this.state.vendorList.length; i++) {
      items.push(<option key={i} value={this.state.vendorList[i].id}>{this.state.vendorList[i].vendor_name}</option>)
    }
    return items
  },
  vendorListCallback: function (data) {
    this.setState({vendorList: data})
  },
  handleStoreSelectChange: function (event) {
    this.setState({selectedStore: event.target.value})
  },
  createStoreItems: function () {
    let items = []
    items.push(<option value='0' />)
    for (let i = 0; i < this.props.storeLookup.length; i++) {
      items.push(<option key={i} value={this.props.storeLookup[i].id}>{this.props.storeLookup[i].store_name}</option>)
    }
    return items
  },
  handleCatalogTypeChange: function (event) {
    this.setState({selectedCatalogType: event.target.value})
  },
  createCatalogTypeItems: function () {
    let items = []
    items.push(<option value='' />)
    for (let i = 0; i < this.state.catalogTypes.length; i++) {
      items.push(<option key={i} value={this.state.catalogTypes[i].id}>{this.state.catalogTypes[i].name}</option>)
    }
    return items
  },
  callbackCatalogNodeTypes: function (data) {
    this.setState({ catalogTypes: data })
  }
})

export default CatalogTypeAssignment
