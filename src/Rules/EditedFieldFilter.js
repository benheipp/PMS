import React from 'react'
import PropTypes from 'prop-types'

var EditedFieldFilter = React.createClass({
  render: function () {
    return (
      <select className="form-control" onChange={this.props.onChange}>
        <option value="">-- Filter By Edited Field --</option>
        { this.props.editedFields.map((s) => 
          (<option key={s} value={s}>{s}</option>)
        )}
      </select>
    )
  },
})

EditedFieldFilter.PropTypes = {
  editedFields: PropTypes.array,
  onChange: PropTypes.func,
};

export default EditedFieldFilter
