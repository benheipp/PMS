import React from 'react'
import ProductListRow from './product-list-row'

var ProductList = React.createClass({
  render: function () {
    var rows = this.props.products.map(function (product) {
      return <ProductListRow product={product} key={product.key} storeLookup={this.props.storeLookup} />
    }, this)
    return (

      <table className='table table-bordered table-hover table-responsive table-striped'>
        <thead>
          <tr>
            <th>Sku</th>
            <th>Doc Key</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
})

export default ProductList
