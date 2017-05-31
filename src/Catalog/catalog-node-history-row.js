import React from 'react'
var NodeHistoryRow = React.createClass({
  render: function () {
    var rollBackDisable
    if (localStorage.CatalogEditing == 'true' || this.props.web_sent == 1) {
      rollBackDisable = false
    } else {
      rollBackDisable = true
    }

    return (
      <div className='row' style={{ marginTop: '5px' }}>
        <div className='col-sm-6'><h6><strong>Historical Value</strong>: {this.props.history.previous_node}</h6></div>
        <div className='col-sm-4'><h6><strong>Changed On</strong>: {this.props.history.change_date}</h6></div>
        <div className='col-sm-2'><button disabled={rollBackDisable} data-dismiss='modal' onClick={this.handleRollbackClick} type='button' className='btn btn-primary'>Rollback</button></div>
      </div>
    )
  },
  handleRollbackClick: function () {
    rollback(this.props.docKey, this.props.history.new_node, this.props.history.previous_node, formatNameKey(this.props.history.previous_node), this.props.catalogId, this.rollbackCallback)
  },
  rollbackCallback: function (data) {
    this.props.rollbackComplete(data)
  }
})

export default NodeHistoryRow
