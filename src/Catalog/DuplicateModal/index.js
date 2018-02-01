import React from 'react';
import { Copy } from './actions';

const DuplicateModal = React.createClass({
  getInitialState() {
    return {
      feedback: '',
      copyDocKeys: this.props.copyDocKeys,
      copyNodes: this.props.node.filter(n => (
        this.props.copyDocKeys.includes(n.doc_key)
      )).map(n => ({ ...n, new_name: n.name, new_doc_key: n.doc_key })),
      disableButtons: false,
      targetValidation: this.props.copyDocKeys.reduce((acc, v) => {
        acc[v] = true;
        return acc;
      }, {})
    };
  },
  componentDidMount () {
    $('#DuplicateModal').modal('show')
    $('#DuplicateModal').on('hidden.bs.modal', this.props.handleHideModal)
    this.validateCopyNodes();
  },
  validateCopyNodes () {
    this.state.copyNodes.forEach((node) => {
      ValidateDocKey(node.doc_key, node.new_doc_key, this.props.storeId, this.updateTargetValidation);
    });
  },
  updateTargetValidation (docKey, docKeyExists) {
    const targetValidation = { ...this.state.targetValidation };
    targetValidation[docKey] = !docKeyExists;
    this.setState({ targetValidation });
  },
  updateNode (originalDocKey, newName) {
    const index = this.state.copyNodes.findIndex(n => (n.doc_key === originalDocKey));
    const copyNodes = [...this.state.copyNodes];
    copyNodes[index] = { ...copyNodes[index],
      new_name: newName,
      new_doc_key: `${this.props.rootDocKey}/${formatNameKey(newName)}`,
    };
    this.setState({ copyNodes  });
    this.validateCopyNodes();
  },
  handleRemove (docKeyToRemove) {
    const copyNodes = [...this.state.copyNodes];
    const index = copyNodes.findIndex(n => (n.doc_key === docKeyToRemove));
    copyNodes.splice(index, 1);
    this.setState({ copyNodes });
  },
  handlePaste () {
    this.setState({ hasError: false, feedback: 'Copying node... ' });

    return Copy(this.state.copyNodes, this.props.rootDocKey, this.props.storeId)
      .then(
        () => { this.setState({ feedback: 'Copy successfully completed '}); },
        (err) => { this.setState({ hasError: true, feedback: err })})
  },
  render() {
    return (<div id='DuplicateModal' className='modal fade' data-keyboard='false' data-backdrop='static'>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title'>Paste</h4>
          </div>
          <div className='modal-body'>
            { this.state.feedback &&
              <div className={`alert alert-${this.state.hasError ? 'danger' : 'info'}`}>
                {this.state.feedback}
              </div>
            }
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>Source Doc Key</th>
                  <th>Name</th>
                  <th>Target Doc Key</th>
                </tr>
              </thead>
              <tbody>
                { this.state.copyNodes.map(node =>
                  (
                    <tr key={node.doc_key} className={this.state.targetValidation[node.doc_key] ? '' : 'danger'} title={this.state.targetValidation[node.doc_key] ? '' : 'Target doc key already exists'}>
                      <td style={{ verticalAlign: 'middle'}}>
                        <button disabled={this.state.disableButtons} type="button" className="btn btn-xs btn-danger" onClick={() => { this.handleRemove(node.doc_key); }}>
                          <span title="Remove" className="glyphicon glyphicon-remove-circle" />
                        </button>
                      </td>
                      <td style={{ verticalAlign: 'middle', fontSize: 'smaller' }}>{node.doc_key}</td>
                      <td style={{ verticalAlign: 'middle'}}>
                        <input
                          type="text"
                          className="form-control"
                          value={node.new_name}
                          onFocus={(e) => { 
                            const val = e.target.value;
                            e.target.value = '';
                            e.target.value = val;
                          }}
                          onChange={(e) => {
                            this.updateNode(node.doc_key, e.target.value);
                          }}
                        />
                      </td>
                      <td style={{ verticalAlign: 'middle', fontSize: 'smaller' }}>{node.new_doc_key}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className='modal-footer'>
            { this.state.copyNodes.length > 0 &&
              <div>
                <button disabled={this.state.disableButtons} type="button" className="btn btn-primary btn-large" onClick={this.handlePaste}><span className="glyphicon glyphicon-paste" />Paste</button>
              </div>
            }
            <div className="top-10">
              <button disabled={this.state.disableButtons} type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
});

export default DuplicateModal;
