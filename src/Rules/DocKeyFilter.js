import React from 'react'
import PropTypes from 'prop-types'

var DocKeyFilter = React.createClass({
  render: function () {
    return (
      <input className="form-control" onChange={this.props.onChange} placeholder="Filter by Doc Key" />
    )
  },
})

DocKeyFilter.PropTypes = {
  onChange: PropTypes.func,
};

export default DocKeyFilter
