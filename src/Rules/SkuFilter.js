import React from 'react'
import PropTypes from 'prop-types'

var SkuFilter = React.createClass({
  render: function () {
    return (
      <input className="form-control" onChange={this.props.onChange} placeholder="Filter by SKU" />
    )
  },
})

SkuFilter.PropTypes = {
  onChange: PropTypes.func,
};

export default SkuFilter
