import React from 'react'
import {Link} from 'react-router'
import ProductListDetailModal from './product-detail-modal'

var ProductListRow = React.createClass({
   getInitialState: function () {
    return {
      showProductDetailModal: false
      }
    },
  render: function () {
    return (
      <tr>
        <td>
        <a href='#' onClick={this.handleShowProductDetailListModal}>{this.props.product.sku}</a>
        </td>
        <td>{this.props.product.doc_key}</td>
        <td>{this.props.product.name}</td>
        {this.state.showProductDetailModal ? <ProductListDetailModal product_id={this.props.product.doc_key} store_id={this.props.product.store_id} handleHideModal={this.handleHideProductDetailListModal} /> : null}
      </tr>
    )
  },
  handleShowProductDetailListModal: function(){
    this.setState({ showProductDetailModal: true })
  },
  handleHideProductDetailListModal: function () {
    this.setState({ showProductDetailModal: false })
  }
})

export default ProductListRow
