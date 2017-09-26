import React from 'react'
import ProductListRow from './product-list-row'
import ProductPasteModal from './product-paste-modal'

var ProductList = React.createClass({
   getInitialState: function () {
    return {
      showPasteModal: false
    }
  },
  render: function () {
    var rows = this.props.products.map(function (product) {
      return <ProductListRow product={product} key={product.key} store={this.props.store.value} storeLookup={this.props.storeLookup} quickMove={this.quickMoveProduct} resetQuickMove={this.resetQuickMove} doc_key={this.props.docKey} copyDocKeys={this.props.copyDocKeys} />
    }, this)
    return (
<div>
  <div style={{marginBottom:'20px'}}>
  {this.props.copyProductActive && this.props.copyDocKeys.length > 0 ? <a href="#top"><button className='btn btn-sm btn-default' onClick={this.showPasteModal}><i className='glyphicon glyphicon-paste' /> Paste Products</button></a> : null }
  {this.state.showPasteModal ? <ProductPasteModal handleHideModal={this.handleHidePasteModal} copySkus={this.props.copyDocKeys} targetDocKey={this.props.docKey} store={this.props.store.value} /> : null }
  </div>
       { this.props.copyDocKeys && this.props.copyDocKeys.length > 0 ? 
          <div>
            Product Copy Doc Keys
            <ul>
              {this.props.copyDocKeys.map(d => (<li key={d.doc_key + d.sku}>{d.doc_key} - {d.sku}</li>))}
            </ul>
          </div> : 
          null
        }
      <table className='table table-bordered table-hover table-responsive table-striped'>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Sku</th>
            <th>Doc Key</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      </div>
    )
  },
  quickMoveProduct: function (sku,doc_key) {
    this.props.quickMoveProduct(sku,doc_key)
  },
  showPasteModal: function () {
    this.setState({ showPasteModal: true })
  },
  handleHidePasteModal: function () {
    this.setState({ showPasteModal: false })
    this.props.reloadData(this.props.docKey, this.props.nodeName, this.props.nodeLevel)
  }
})

export default ProductList
