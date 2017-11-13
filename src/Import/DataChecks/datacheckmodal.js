import React from 'react';
import { GetDataCheckData } from './actions';

const DataCheckModal = React.createClass({
  getInitialState: function() {
    return { hasData: false, page: 0, rowsPerPage: 15, maxPagesToDisplay: 16 };
  },
  componentDidMount: function () {
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
  getTableHeader: function() {
    const cells = this.state.data.Headers.map(h => (<th>{h}</th>));
    return (<tr>{cells}</tr>);
  },
  getTableBody: function() {
    const beginIndex = this.state.page * this.state.rowsPerPage;
    const endIndex = beginIndex + this.state.rowsPerPage;
    const visibleRows = this.state.data.Rows.slice(beginIndex, endIndex);
    return visibleRows.map(r => {
      const cells = r.map(c => (
        <td>{c}</td>
      ));
      return (<tr>{cells}</tr>);
    });
  },
  setPage: function(page) {
    this.setState({ page });
  },
  getPagination() {
    const totalPages = Math.ceil(this.state.data.Rows.length / this.state.rowsPerPage);
    const delta = Math.floor(this.state.maxPagesToDisplay / 2);
    const beginIndex = Math.max(0, this.state.page - delta);
    const endIndex = Math.min(this.state.data.Rows.length, Math.max(this.state.page + delta, this.state.maxPagesToDisplay));
    const pages = [...Array(totalPages).keys()].slice(beginIndex, endIndex);
    return (
      <ul className="pagination">
        <li className={this.state.page === 0 ? 'disabled' : ''}>
          <a href="#" onClick={() => { this.setPage(this.state.page - 1); }}>&laquo;</a>
        </li>
        { this.state.page > beginIndex &&
          <li>
            <a href="#" onClick={() => { this.setPage(Math.max(0, this.state.page - this.state.maxPagesToDisplay)); }}>...</a>
          </li>
        }
        { pages.map(p => 
            (
              <li className={ this.state.page === (p) ? 'active' :'' }>
                <a href="#" onClick={() => { this.setPage(p); }}>{p + 1}</a>
              </li>
            )
          )
        }
        { endIndex < totalPages &&
          <li>
            <a href="#" onClick={() => { this.setPage(Math.min(this.state.page + this.state.maxPagesToDisplay, totalPages)); }}>...</a>
          </li>
        }
        <li className={this.state.page === totalPages ? 'disabled' : ''}>
          <a href="#" onClick={() => { this.setPage(this.state.page + 1); }}>&raquo;</a>
        </li>
      </ul>
    );
  },
  getTable: function() {
    return (
      <div>
        <table className="table">
          <thead>
            {this.getTableHeader()}
          </thead>
          <tbody>
            {this.getTableBody()}
          </tbody>
        </table>
      </div>
    );
  },
  render: function () {
    return (
      <div id='DataCheckModal' className='modal fade' data-keyboard='false' data-backdrop='static'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>
                { this.props.data.text }
              </h4>
            </div>
            <div className='modal-body'>
              { this.state.hasData && this.getTable() }
              { this.state.hasData &&
                this.state.data.Rows.length > this.state.rowsPerPage &&
                this.getPagination()
              }
              { !this.state.hasData && 
                <div>Fetching data...</div> 
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

