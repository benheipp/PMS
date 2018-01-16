import React from 'react'
import uuid from 'uuid';
import TypeRow from './type-row'
import { SaveTypes } from './actions';


const TypesModal = React.createClass({
  getInitialState: function () {
    return {
      types: [],
      typeChanges: {},
    };
  },
  componentDidMount: function() {
    $('#TypesModal').modal('show');
    $('#TypesModal').on('hidden.bs.modal', this.props.handleHideModal);
    this.setState({ types: this.props.types || [] });
  },
  handleSaveClick: function() {
    const types = Object.entries(this.state.typeChanges).map(s => ({ id: s[0], ...s[1] }));
    SaveTypes(types).then((data) => {
      console.log(data);
      this.props.setTypes(data);
      $('#TypesModal').modal('hide');
    });
  },
  setType: function(id, name) {
    const typeChanges = { ...this.state.typeChanges };
    typeChanges[id] = { name };
    this.setState({ typeChanges });
  },
  handleAddNew: function() {
    const newType = {id: uuid.v4(), name: '', autoFocus: true};
    const types = [...this.state.types, newType];
    this.setState({types});
  },
  render: function() {
    return (
      <div id="TypesModal" className="modal fade" data-keyboard="false" data-backdrop="static">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Types</h4>
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
              <table className="table table-striped table-condensed">
                
                <thead>
                  <tr>
                    <th style={{ width: '70%' }}>Name</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.types.map(n => 
                      (<TypeRow
                          name={n.name}
                          key={n.id}
                          id={n.id}
                          setType={this.setType}
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

export default TypesModal;
