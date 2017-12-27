import React from 'react'

const SortOrderRow = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.sortOrder === null ? '' : this.props.sortOrder
    };
  },
  handleChange: function (event) {
    const value = event.target.value;
    this.setState({value});
    this.props.setSortOrder(value);
  },
  getGroupLabel: function() {
    return (this.props.group_name &&
      <span className="label label-info" style={{ float: 'right', fontSize: '100%' }}>{this.props.group_name}</span>
    );
  },
  render: function() {
    return (
      <tr>
        <td style={{ verticalAlign: 'middle' }}>
          {this.props.name}
          {this.getGroupLabel()}
        </td>
        <td>
          <input
            type="number"
            style={{ textAlign: 'right' }}
            className="form-control"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </td>
      </tr>
    );
  }
});

SortOrderRow.propTypes ={
  name: React.PropTypes.string,
  sortOrder: React.PropTypes.number,
  
};

export default SortOrderRow;
