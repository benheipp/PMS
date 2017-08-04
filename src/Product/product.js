import React from 'react'
import ProductAutoComplete from './product-autocomplete'
import ProductDisplay from './product-display'
import VendorList from './product-vendorlist'
import FeedBack from '../Controls/feedback'
var ProductMain = React.createClass({
  componentWillMount: function () {
    if (localStorage.ProductVisibility != 'true') {
      localStorage.clear()
      window.location.href = '/login'
    }
  },
  componentDidMount: function () {
    GetVendorList(this.vendorListCallback)
    GetStoreLookups(this.callbackStoreLookups)
  },
  getInitialState: function () {
    return {
      	showProductDisplay: false,
      	prod: [],
      	vendorList: [],
      	searchVendors: [],
      	showFeedback: false,
      	feedbackResult: 0,
      	feedbackMessage: '',
        storeLookup: []
    	}
  },
  render: function () {
    	return (
      <div className='container marginTop100' style={{width: '50%' }}>
        <FeedBack Result={this.state.feedbackResult} Message={this.state.feedbackMessage} visible={this.state.showFeedback} delay={2000} resetFeedbackState={this.resetFeedbackState} />
        <div className='panel panel-default'>
          <div className='panel-heading'>Product Search</div>
          <div className='panel-body'>
            <ProductAutoComplete displayRecord={this.displayRecord} searchVendors={this.state.searchVendors} />
            <div className='panel panel-default' style={{marginTop: '25px' }}>
              <div className='panel-body'>
                <VendorList VendorList={this.state.vendorList} handleVendorCheckChange={this.handleVendorCheckChange} />
              </div>
            </div>
          </div>
        </div>
        { this.state.showProductDisplay ? <ProductDisplay data={this.state.prod} handleSaveProdClick={this.handleSaveProdClick} showFeedBack={this.showFeedBack} rollbackComplete={this.saveProdCallback} store={this.state.prod.store_id} storeLookup={this.state.storeLookup}  /> : null }
      </div>)
  },
  displayRecord: function (item) {
    	this.setState({showProductDisplay: true, prod: item})
  },
  vendorListCallback: function (data) {
    	this.setState({vendorList: data})
  },
  handleVendorCheckChange: function (chkValue, vendor) {
    	var itmArray = this.state.searchVendors
    	if (chkValue)    	{
    		itmArray.push(vendor.id)
    	} else {
    		itmArray.splice(itmArray.indexOf(vendor.id), 1)
    	}
    	this.setState({searchVendors: itmArray})
  },
  handleSaveProdClick: function (newProdName, prodData) {
    	SaveProductMaster(newProdName, prodData.name, prodData.id, prodData.doc_key, prodData.store_id, this.saveProdCallback)
  },
  saveProdCallback: function (data, newName) {
    	var prodNew = this.state.prod
    prodNew.name = newName
    this.setState({prod: prodNew})
    	this.showFeedBack(data)
  },
  resetFeedbackState: function () {
    	this.setState({ showFeedback: false })
  },
  showFeedBack: function (data) {
    	this.setState({ showFeedback: true, feedbackResult: data.Result, feedbackMessage: data.Message})
  },
  callbackStoreLookups: function (data) {
    this.setState({ storeLookup: data })
  }
})

export default ProductMain
