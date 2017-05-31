import React from 'react'

var EntityDetailRow = React.createClass({
  getInitialState: function () {
    return {
      isEditMode: false,
      name: this.props.detail.name
    }
  },
  render: function () {
    if (this.state.isEditMode) {
      return (
        <tr>
          <td>
            <input type='text' className='form-control' id='txtName' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
          </td>
          <td><button onClick={this.handleSaveClick.bind(this, this.props.detail, this.state.name)} className='btn btn-sm btn-default'><i className='glyphicon glyphicon-floppy-disk' /></button></td>
          <td><button onClick={this.handleCancelClick} className='btn btn-sm btn-default'><i className='glyphicon glyphicon-remove' /></button></td>
        </tr>
      )
    } else {
      return (

        <tr>
          <td>{this.props.detail.name}</td>
          <td><button onClick={this.handleEditClick} className='btn btn-sm btn-default'><i className='glyphicon glyphicon-pencil' /> Edit</button></td>
          <td />
        </tr>
      )
    }
  },
  handleEditClick: function () {
    this.setState({ isEditMode: true })
  },
  handleSaveClick: function (detail, name) {
    SaveCatEntity(this.props.type, detail.id, name, this.saveCallBack)
    this.setState({ isEditMode: false })
  },
  handleCancelClick: function () {
    this.setState({ isEditMode: false })
  },
  saveCallBack: function (data, node, nodeLevel) {
    this.props.showFeedBack(data)
    this.props.reloadData()
  },
  handleChange: function (name, e) {
    var change = {}
    change[name] = e.target.value
    this.setState(change)
  }
})

export default EntityDetailRow
