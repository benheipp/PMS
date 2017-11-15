import React from 'react';
import { GetDataCheckData } from './actions';
import PaginatedTable from '../../Component/PaginatedTable/paginated-table';

const DataCheckModal = React.createClass({
  getInitialState: function() {
    return { hasData: false };
  },
  componentDidMount: function () {
    console.log(this.props.data);
    $('#DataCheckModal').modal('show');
    $('#DataCheckModal').on('hidden.bs.modal', this.props.handleHideModal);
    this.fetchData();
  },
  fetchData: function () {
    const dataCheck = this.props.data.dataCheck;
    GetDataCheckData(dataCheck.DataCheck.Id, dataCheck.StoreId, dataCheck.VendorId)
    .then((data) => {
      this.setState({ hasData: true, data });
    });
  },
  render: function () {
    return (
      <div id='DataCheckModal' className='modal fade' data-keyboard='false' data-backdrop='static'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header' style={{ backgroundColor: this.props.data.color, color: '#FFF' }}>
              <h4 className='modal-title'>
              { `${this.props.data.text} for ${this.props.data.dataCheck.VendorName || 'no vendor'} on ${this.props.data.dataCheck.StoreName}` }
              </h4>
            </div>
            <div className='modal-body'>
              { this.state.hasData &&
                <PaginatedTable headers={this.state.data.Headers} rows={this.state.data.Rows} />
              }
              { !this.state.hasData &&
                <p>Fetching data...</p>
              }
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default DataCheckModal;

