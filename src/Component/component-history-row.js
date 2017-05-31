import React from 'react'
var ComponentHistoryRow = React.createClass({
  render: function () {
    var rollbackDisable
    if (localStorage.CatalogEditing == 'true') { rollbackDisable = false } else { rollbackDisable = true }

    return (
      <div>
        <div className='row' style={{ marginTop: '5px' }}>
          <div className='col-sm-2'>Ref Id: <strong>{this.props.history.old_ref_id}</strong></div>
          <div className='col-sm-2'>Ref Qty: <strong>{this.props.history.old_ref_qty}</strong></div>
          <div className='col-sm-2'>Sku: <strong>{this.props.history.old_sku}</strong></div>
          <div className='col-sm-4'><strong>Changed On: {this.props.history.change_date}</strong></div>
          <div className='col-sm-2'> <button disabled={rollbackDisable} data-dismiss='modal' onClick={this.handleRollbackClick} type='button' className='btn btn-primary'>Rollback</button></div>
        </div>

      </div>

    )
  },
  handleRollbackClick: function () {
    rollbackComponentData(this.props.docKey, this.props.docId, this.props.history.new_ref_id, this.props.history.old_ref_id, this.props.history.new_ref_qty, this.props.history.old_ref_qty, this.props.history.new_sku, this.props.history.old_sku, this.rollbackCallback)
  },
  rollbackCallback: function (data) {
    this.props.rollbackComplete(data)
  }
})

export default ComponentHistoryRow
