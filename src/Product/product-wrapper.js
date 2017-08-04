import React from 'react'
import ProductAutoComplete from './product-autocomplete'
import ProductDisplay from './product-display'
import VendorList from './product-vendorlist'
import FeedBack from '../Controls/feedback'
var ProductWrapper = React.createClass({
  componentDidMount: function () {
    GetProductAndEntities(this.props.product_id, this.props.store_id, this.getProductCallBack)
  },
  getInitialState: function () {
    return {
      showFeedback: false,
      feedbackResult: 0,
      feedbackMessage: '',
      product: {
        id: 0,
        doc_key: '',
        vendor_id: 0,
        sku: '',
        name: '',
        webSent: false,
        webSentDatetime: '',
        Entities: []
      }
    }
  },
  render: function () {
    return (
      <div className='container'>
        <FeedBack Result={this.state.feedbackResult} Message={this.state.feedbackMessage} visible={this.state.showFeedback} delay={2000} resetFeedbackState={this.resetFeedbackState} />
        <ProductDisplay data={this.state.product} handleSaveProdClick={this.handleSaveProdClick} showFeedBack={this.showFeedBack} rollbackComplete={this.saveProdCallback} store={this.props.store_id} storeLookup={this.props.storeLookup} />
      </div>)
  },
  handleSaveProdClick: function (newProdName, prodData) {
    SaveProductMaster(newProdName, prodData.name, prodData.id, prodData.doc_key, this.props.store_id, this.saveProdCallback)
  },
  saveProdCallback: function (data, newName) {
    var prodNew = this.state.product
    prodNew.name = newName
    this.setState({product: prodNew})
    this.showFeedBack(data)
  },
  resetFeedbackState: function () {
    this.setState({ showFeedback: false })
  },
  showFeedBack: function (data) {
    this.setState({ showFeedback: true, feedbackResult: data.Result, feedbackMessage: data.Message})
  },
  getProductCallBack: function (data) {
    this.setState({product: data})
  }
})

export default ProductWrapper
