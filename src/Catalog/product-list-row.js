import React from 'react'
import {Link} from 'react-router'
var ProductListRow = React.createClass({
  render: function () {
    return (
      <tr>
        <td><Link to={`/product-detail?id=${this.props.product.doc_key}&store_id=${this.props.product.store_id}`}>{this.props.product.sku}</Link></td>
        <td>{this.props.product.doc_key}</td>
        <td>{this.props.product.name}</td>
      </tr>
    )
  }
})

export default ProductListRow
