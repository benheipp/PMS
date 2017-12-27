import React from 'react'
import uuid from 'uuid';
import GroupRow from './group-row'
import { SaveGroups } from './actions';


const GroupModal = React.createClass({
  getInitialState: function () {
    return {
      groups: [],
      groupChanges: {},
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
  setGroup: function(id, name, sort_order) {
    const groupChanges = { ...this.state.groupChanges };
    groupChanges[id] = { name, sort_order };
    this.setState({ groupChanges });
  },
  handleAddNew: function() {
    const newGroup = {id: uuid.v4(), name: '', sort_order: '', autoFocus: true};
    const groups = [...this.state.groups, newGroup];
    this.setState({groups});
  },
  render: function() {
    return (
      <div id="GroupModal" className="modal fade" data-keyboard="false" data-backdrop="static">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Groups</h4>
            </div>
            <div className="modal-body">
              <button
                type="button"
                style={{ marginBottom: '5px' }}
                className="btn btn-xs btn-primary"
                onClick={this.handleAddNew}
                autoFocus
              >
                <span className="glyphicon glyphicon-plus" /> Add New
              </button>
              <table className="table table-striped table-condensed">
                
                <thead>
                  <tr>
                    <th style={{ width: '75%' }}>Name</th>
                    <th style={{ width: '25%' }}>Sort Order</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.groups.map(n => 
                      (<GroupRow
                          name={n.name}
                          sortOrder={n.sort_order}
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
