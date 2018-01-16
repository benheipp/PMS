import React from 'react'

const TypeRow = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.name,
    };
  },
  handleNameChange: function (event) {
    const value = event.target.value.toLowerCase().replace(/\s/g, '-');
    this.setState({name: value});
    this.props.setType(this.props.id, value);
  },
  render: function() {
    return (
      <tr>
        <td>
          <input
            type="text"
            className="form-control input-sm"
            value={this.state.name}
            onChange={this.handleNameChange}
            autoFocus={this.props.autoFocus}
          />
        </td>
      </tr>
    );
  }
});

TypeRow.propTypes ={
  name: React.PropTypes.string,
};

export default TypeRow;
