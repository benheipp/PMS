import React from 'react'
import PropTypes from 'prop-types'

const SortableTableHeader = React.createClass({
  renderSortIcon: function () {
    const isActive = this.props.field === this.props.sortField;
    const sortDirectionClassName = this.props.isReverseSort ? '-alt' : '';
    return (
      isActive ?
        <span className={`glyphicon glyphicon-sort-by-order${sortDirectionClassName}`} /> :
        null
    );
  },
  render: function() {
    return (
      <th style={{ cursor: 'pointer' }} onClick={() => { this.props.sort(this.props.field); }}>{this.props.text}{this.renderSortIcon()}</th>
    );
  }
});

SortableTableHeader.PropTypes = {
  text: PropTypes.string,
  field: PropTypes.string,
  sortField: PropTypes.string,
  isReverseSort: PropTypes.bool,
  sort: PropTypes.func,
};

export default SortableTableHeader;
