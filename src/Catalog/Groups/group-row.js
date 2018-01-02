import React from 'react'

const GroupRow = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.name,
      sortOrder: this.props.sortOrder === null ? '' : this.props.sortOrder,
      isActive: this.props.isActive,
    };
  },
  handleNameChange: function (event) {
    const value = event.target.value;
    this.setState({name: value});
    this.props.setGroup(this.props.id, value, this.state.sortOrder, this.state.isActive);
  },
  handleSortOrderChange: function (event) {
    const value = event.target.value;
    this.setState({sortOrder: value});
    this.props.setGroup(this.props.id, this.state.name, value, this.state.isActive);
  },
  handleIsActiveChange: function (event) {
    const value = event.target.checked;
    this.setState({isActive: value});
    this.props.setGroup(this.props.id, this.state.name, this.state.sortOrder, value);
  },
  render: function() {
    return (
      <tr>
        <td>
          <input
            type="text"
            className="form-control"
            value={this.state.name}
            onChange={this.handleNameChange}
            autoFocus={this.props.autoFocus}
          />
        </td>
        <td>
          <input
            type="number"
            style={{ textAlign: 'right' }}
            className="form-control"
            value={this.state.sortOrder}
            onChange={this.handleSortOrderChange}
          />
        </td>
        <td>
          <input
            type="checkbox"
            className="form-control input-sm"
            checked={this.state.isActive}
            onChange={this.handleIsActiveChange}
          />
        </td>
      </tr>
    );
  }
});

GroupRow.propTypes ={
  name: React.PropTypes.string,
  sortOrder: React.PropTypes.number,
  isActive: React.PropTypes.bool,
};

export default GroupRow;
