import React from 'react'
import PropTypes from 'prop-types'

var StoreSelector = React.createClass({
  render: function () {
    return (
      <select className="form-control" onChange={this.props.onChange}>
        <option value="0">-- Filter By Store --</option>
        { this.props.stores.map((s) => 
          (<option key={s.id} value={s.id}>{s.store_name}</option>)
        )}
      </select>
    )
  },
})

StoreSelector.PropTypes = {
  stores: PropTypes.array,
  onChange: PropTypes.func,
};

export default StoreSelector
