import React from 'react'
import SortOrderRow from './sort-order-row'
import { SaveSortOrders } from './actions';

const SortModal = React.createClass({
  getInitialState: function () {
    return {
      sortOrders: {},
    };
  },
  componentDidMount: function() {
    $('#SortModal').modal('show');
    $('#SortModal').on('hidden.bs.modal', this.props.handleHideModal);
  },
  handleSaveClick: function() {
    const sortOrders = Object.entries(this.state.sortOrders).map(s => ({ doc_key: s[0], sort_order: s[1] }));
    SaveSortOrders(this.props.storeId, sortOrders).then(() => {
      $('#SortModal').modal('hide');
    });
  },
  setSortOrder: function(doc_key, sort_order) {
    const sortOrders = { ...this.state.sortOrders };
    sortOrders[doc_key] = sort_order;
    this.setState({ sortOrders });
  },
  render: function() {
    return (
      <div id="SortModal" className="modal fade" data-keyboard="false" data-backdrop="static">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Sort</h4>
            </div>
            <div className="modal-body">
              <table className="table table-striped table-condensed">
                <thead>
                  <tr>
                    <th style={{ width: '80%' }}>Name</th>
                    <th style={{ width: '20%' }}>Sort Order</th>
                  </tr>
                </thead>
                <tbody>
                  { this.props.node.map(n => 
                      (<SortOrderRow
                          name={n.name}
                          sortOrder={n.sort_order}
                          key={n.id}
                          group_name={n.group_name}
                          setSortOrder={(value) => { this.setSortOrder(n.doc_key, value); }}
                        />)
                    )
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" onClick={this.handleSaveClick}>
                <span className="glyphicon glyphicon-floppy-save" /> Save
              </button>
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default SortModal;
