import React from 'react'
import ProductWrapper from '../Product/product-wrapper'

var ProductListDetailModal = React.createClass({
  componentDidMount () {
    $('#ProductListDetailModal').modal('show')
    $('#ProductListDetailModal').on('hidden.bs.modal', this.props.handleHideModal)
  },
  render: function () {

    return (
      <div id='ProductListDetailModal' className='modal fade'>
        <div className='modal-dialog modal-lg' style={{width:'1200px'}}>
          <div className='modal-content'>
            <div className='modal-body'>
              <ProductWrapper product_id={this.props.product_id} store_id={this.props.store_id} storeLookup={this.props.storeLookup} />
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default ProductListDetailModal
