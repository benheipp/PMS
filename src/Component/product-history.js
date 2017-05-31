import React from 'react'
import ProductHistoryRow from './product-history-row'
var ProductHistoryComponent = React.createClass({
  render: function () {
    var rows = this.props.data.map(function (history) {
      return <ProductHistoryRow data={history} rollbackComplete={this.rollbackComplete} key={history.key} docId={this.props.docId} docKey={this.props.docKey} />
    }, this)
    return (<div>{rows}</div>)
  },
  rollbackComplete: function (oldName, oldDescription) {
    this.props.rollbackComplete(oldName, oldDescription)
  }
})

export default ProductHistoryComponent
