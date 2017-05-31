import React from 'react'
import ProductDisplay from '../Product/product-display'
import FeedBack from '../Controls/feedback'
var ProductDetailDisplay = React.createClass({
  getInitialState: function () {
    return {
      showFeedback: false,
      feedbackResult: 0,
      feedbackMessage: '',
      prod: this.props.prod
    }
  },
  componentDidMount () {
    $('#ProductMasterModal').modal('show')
    $('#ProductMasterModal').on('hidden.bs.modal', this.props.handleHideModal)
  },
  render: function () {
    return (
      <div id='ProductMasterModal' className='modal fade'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              <h4 className='modal-title'>Product</h4>
            </div>
            <div className='modal-body'>
              <FeedBack Result={this.state.feedbackResult} Message={this.state.feedbackMessage} visible={this.state.showFeedback} delay={2000} resetFeedbackState={this.resetFeedbackState} />
              <ProductDisplay data={this.state.prod} handleSaveProdClick={this.handleSaveProdClick} showFeedBack={this.showFeedBack} rollbackComplete={this.saveProdCallback} />
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal'>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  handleHideModal: function () {
    this.props.handleHideModal()
  },
  handleSaveProdClick: function (newProdName, prodData) {
    SaveProductMaster(newProdName, prodData.name, prodData.id, prodData.doc_key, this.saveProdCallback)
  },
  resetFeedbackState: function () {
    this.setState({ showFeedback: false })
  },
  showFeedBack: function (data) {
    this.setState({ showFeedback: true, feedbackResult: data.Result, feedbackMessage: data.Message})
  },
  saveProdCallback: function (data, newName) {
    var prodNew = this.state.prod
    prodNew.name = newName
    this.setState({prod: prodNew})
    this.showFeedBack(data)
  }
})

export default ProductDetailDisplay
