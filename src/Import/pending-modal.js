import React from 'react'
import PendingDataTable from '../Controls/PendingItems/pending'

var PendingItemsModal = React.createClass({
  componentDidMount () {
    $('#PendingItemsModal').modal('show')
    $('#PendingItemsModal').on('hidden.bs.modal', this.props.handleHidePendingModal)
  },
  render: function () {
    return (
      <div id='PendingItemsModal' className='modal fade'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Pending Items</h4>
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-sm-12'>
                  <PendingDataTable />
                </div>
              </div>

            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>

        	)
  }
})

export default PendingItemsModal
