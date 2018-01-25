import React from 'react'
import uuid from 'uuid';
import GroupRow from './group-row'
import { SaveGroups, GetGroups } from './actions';


const GroupModal = React.createClass({
  getInitialState: function () {
    return {
      groups: [],
      groupChanges: {},
      filterGroups: false,
    };
  },
  componentDidMount: function() {
    $('#GroupModal').modal('show');
    $('#GroupModal').on('hidden.bs.modal', this.props.handleHideModal);
    this.setState({ groups: this.props.groups || [] });
  },
  handleSaveClick: function() {
    const groups = Object.entries(this.state.groupChanges).map(s => ({ id: s[0], ...s[1] }));
    SaveGroups(this.props.storeId, this.props.parentDocKey, groups).then((data) => {
      this.props.setGroups(data);
      $('#GroupModal').modal('hide');
    });
  },
  setGroup: function(id, name, sort_order, is_active) {
    const groupChanges = { ...this.state.groupChanges };
    groupChanges[id] = { name, sort_order, is_active };
    this.setState({ groupChanges });
  },
  handleAddNew: function() {
    const newGroup = {id: uuid.v4(), name: '', sort_order: '', is_active: true, autoFocus: true};
    const groups = [...this.state.groups, newGroup];
    this.setState({groups});
  },
  filterGroups: function(e) {
    const groups = e.target.checked ? this.props.filteredGroups : this.props.groups;
    this.setState({ groups, filterGroups: e.target.checked });
  },
  render: function() {
    return (
      <div id="GroupModal" className="modal fade" data-keyboard="false" data-backdrop="static">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Groups</h4>
            </div>
            <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)',  overflowY: 'auto' }}>
              <button
                type="button"
                style={{ marginBottom: '5px' }}
                className="btn btn-xs btn-primary"
                onClick={this.handleAddNew}
                autoFocus
              >
                <span className="glyphicon glyphicon-plus" /> Add New
              </button>
              <span className="pull-right">
                <input
                  type="checkbox"
                  value={this.state.filterGroups}
                  checked={this.state.filterGroups}
                  onChange={this.filterGroups}
                /> Only Show Assigned Groups
              </span>
              <table className="table table-striped table-condensed">
                <thead>
                  <tr>
                    <th style={{ width: '70%' }}>Name</th>
                    <th style={{ width: '15%' }}>Sort Order</th>
                    <th style={{ width: '5%' }}>Active?</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.groups.map(n => 
                      (<GroupRow
                          name={n.name}
                          sortOrder={n.sort_order}
                          isActive={n.is_active}
                          key={n.id}
                          id={n.id}
                          setGroup={this.setGroup}
                          autoFocus={n.autoFocus}
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

export default GroupModal;
