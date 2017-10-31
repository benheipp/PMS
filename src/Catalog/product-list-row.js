import React from 'react'
import {Link} from 'react-router'
import ProductListDetailModal from './product-detail-modal'
import ReactHover from 'react-hover'

var ProductListRow = React.createClass({
   getInitialState: function () {
    return {
      showProductDetailModal: false
      }
    },
  render: function () {
  var disableVar
  disableVar = false
  var indxStore = this.props.storeLookup.findIndex(i => i.id === this.props.store);
  if (this.props.storeLookup[indxStore].store_lock == true) { disableVar = true }

const optionsCursorTrueWithMargin = {
  followCursor: true,
  shiftX: 20,
  shiftY: 0
}

    if (this.props.product.disabled)
    {
      disableVar = true
    }

  var thumbImage
  var bigImage
      switch (this.props.store) {
        case 12:
          bigImage = '//cdn.firedog.com' + this.props.product.image
          thumbImage = '//cdn.firedog.com/thumb' + this.props.product.image
          break
        case 11:
          bigImage = '//cdn.partzilla.com' + this.props.product.image
          thumbImage = '//cdn.partzilla.com/thumb' + this.props.product.image
          break
        case 10:
          bigImage = '//cdn.boats.net' + this.props.product.image
          thumbImage = '//cdn.boats.net/thumb' + this.props.product.image
          break
      }
    return (
      <tr>
                <td><button disabled={disableVar} onClick={this.quickMove} className={`btn btn-sm btn-default${this.props.copyDocKeys.findIndex(i => i.doc_key === this.props.doc_key && i.sku === this.props.product.sku) > -1 ? ' active' : ''}`}><i className='glyphicon glyphicon-copy' /> Move</button></td>
       <td>
      <ReactHover
          options={optionsCursorTrueWithMargin}>
          <ReactHover.Trigger>
            <div><img src={thumbImage} /></div>
          </ReactHover.Trigger>
          <ReactHover.Hover>
            <div><img src={bigImage} /></div>
          </ReactHover.Hover>
        </ReactHover>
       </td>
        <td>
        <a href='#' onClick={this.handleShowProductDetailListModal}>{this.props.product.sku}</a>
        </td>
        <td>{this.props.product.doc_key}</td>
        <td>{this.props.product.name}</td>
        {this.state.showProductDetailModal ? <ProductListDetailModal product_id={this.props.product.doc_key} storeLookup={this.props.storeLookup} store_id={this.props.product.store_id} handleHideModal={this.handleHideProductDetailListModal} /> : null}
      </tr>
    )
  },
  handleShowProductDetailListModal: function(){
    this.setState({ showProductDetailModal: true })
  },
  handleHideProductDetailListModal: function () {
    this.setState({ showProductDetailModal: false })
  },
  quickMove: function () {
    this.props.quickMove(this.props.product.sku,this.props.doc_key)
  }
})

export default ProductListRow
