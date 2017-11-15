import React from 'react';
import uuid from 'uuid';

class PaginatedTable extends React.Component {
  constructor(props) {
    super(props);

    this.buildTable = this.buildTable.bind(this);
    this.buildTableHeader = this.buildTableHeader.bind(this);
    this.buildTableBody = this.buildTableBody.bind(this);

    this.buildPagination = this.buildPagination.bind(this);

    this.setPage = this.setPage.bind(this);
    this.state = { page: this.props.startingPage };
  }

  buildTable() {
    return (
      <div>
        <table className="table table-condensed table-hover">
          <thead>
            {this.buildTableHeader()}
          </thead>
          <tbody>
            {this.buildTableBody()}
          </tbody>
        </table>
      </div>
    );
  }

  buildTableHeader() {
    return (
      <tr>
        {this.props.headers.map(h => (<th key={uuid.v4()}>{h}</th>))}
      </tr>
    );
  }

  buildTableBody() {
    const begin = this.state.page * this.props.rowsPerPage;
    const end = begin + this.props.rowsPerPage;

    const visibleRows = this.props.rows.slice(begin, end);
    return visibleRows.map(row => {
      const cells = row.map(cell => (<td key={uuid.v4()}>{cell}</td>));
      return (<tr key={uuid.v4()}>{cells}</tr>);
    });
  }

  setPage(page) {
    this.setState({ page });
  }

  buildPagination() {
    const totalPages = Math.ceil(this.props.rows.length / Math.max(1, this.props.rowsPerPage));
    const delta = Math.floor(this.props.maxPagesToDisplay / 2);
    const begin = Math.max(0, this.state.page - delta);
    const end = Math.min(this.props.rows.length, 
      Math.max(this.state.page + delta + 1, this.props.maxPagesToDisplay));
    const pages = [...Array(totalPages).keys()].slice(begin, end);
    return (
      <div style={{ textAlign: 'center'}}>
        <ul className="pagination pagination-sm">
          <li className={this.state.page === 0 ? 'disabled' : ''}>
            <a href="#" onClick={() => { this.setPage(Math.max(0, this.state.page - 1)); }}>&laquo;</a>
          </li>
          { begin > 0 &&
            <li>
              <a
                href="#"
                onClick={() => {
                  this.setPage(Math.max(0, this.state.page - this.props.maxPagesToDisplay)); 
                }}
              >
                &hellip;
              </a>
            </li>
          }
          { pages.map(page => 
              (
                <li key={uuid.v4()} className={ this.state.page === page ? 'active' : '' }>
                  <a href="#" onClick={() => { this.setPage(page); }}>{page + 1}</a>
                </li>
              )
            )
          }
          { end < totalPages &&
            <li>
              <a
                href="#"
                onClick={() => {
                  this.setPage(Math.min(this.state.page + this.props.maxPagesToDisplay, totalPages - 1));
                }}
              >
                &hellip;
              </a>
            </li>
          }
          <li className={this.state.page === (totalPages - 1) ? 'disabled' : ''}>
            <a href="#" onClick={() => { this.setPage(Math.min(totalPages - 1, this.state.page + 1)); }}>&raquo;</a>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.buildTable()}
        {this.buildPagination()}
      </div>
    );
  }
}

PaginatedTable.propTypes = {
  headers: React.PropTypes.arrayOf(React.PropTypes.string),
  rows: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string)),

  startingPage: React.PropTypes.number,
  maxPagesToDisplay: React.PropTypes.number,
  rowsPerPage: React.PropTypes.number,
}

PaginatedTable.defaultProps = {
  headers: [],
  rows: [],

  startingPage: 0,
  maxPagesToDisplay: 15,
  rowsPerPage: 15,
}

export default PaginatedTable;
