import React from 'react'
import FeedBack from '../Controls/feedback'

var CatalogTypeChangeModal = React.createClass({
  getInitialState: function () {
    return {
      nodesToUpdate: this.props.nodes,
      disableButtons: false,
      showFeedback: false,
      feedbackResult: 0,
      feedbackMessage: '',
    }
  },
  componentDidMount () {
    $('#CatalogTypeChangeModal').modal('show')
    $('#CatalogTypeChangeModal').on('hidden.bs.modal', this.props.hideModal)
  },
  handleRemove (nodeToRemove) {
    const nodesToUpdate = this.state.nodesToUpdate.filter(n => n !== nodeToRemove);
    this.setState({ nodesToUpdate });
  },
  lookupCatalogTypeName (typeId) {
    const selectedType = this.props.catalogTypes.find(t => Number(t.id) === Number(typeId));
    return selectedType ? selectedType.name : null;
  },
  showFeedback: function (data) {
    this.setState({ showFeedback: true, feedbackResult: data.Result, feedbackMessage: data.Message})
  },
  handleUpdate () {
    this.setState({ disableButtons: true });
    UpdateCatalogType(this.state.nodesToUpdate, this.props.nodeLevel, this.props.targetCatalogTypeId, this.props.storeId, this.handleSuccess, this.handleError);
  },
  handleSuccess (data) {
    this.showFeedback(data);
    this.setState({ disableButtons: false });
    this.props.reloadData();
  },
  handleError (errorMsg) {
    const data = { Result: 1, Message: errorMsg };
    this.showFeedback(data);
    this.setState({ disableButtons: false });
  },
  render () {
    const targetCatalogType = this.lookupCatalogTypeName(this.props.targetCatalogTypeId);
    return (
      <div id='CatalogTypeChangeModal' className='modal fade' data-keyboard='false' data-backdrop='static'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Change Catalog Type</h4>
            </div>
            <div className='modal-body'>
              <FeedBack noTimer='true' Result={this.state.feedbackResult} Message={this.state.feedbackMessage} visible={this.state.showFeedback} delay={2000} resetFeedbackState={this.resetFeedbackState} />              
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Node</th>
                    <th>Original Type</th>
                    <th>New Type</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.nodesToUpdate.map(node =>
                    (
                      <tr key={node.name_key}>
                        <td>
                          <button disabled={this.state.disableButtons} type="button" className="btn btn-sm btn-danger" onClick={() => { this.handleRemove(node); }}>
                            Remove
                          </button>
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>{node.name}</td>
                        <td style={{ verticalAlign: 'middle' }}>{this.lookupCatalogTypeName(node.type_id)}</td>
                        <td style={{ verticalAlign: 'middle' }}>{targetCatalogType}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <div className='modal-footer'>
              { this.state.nodesToUpdate.length > 0 &&
                <div>
                  <button disabled={this.state.disableButtons} type="button" className="btn btn-primary" onClick={this.handleUpdate}>Change Type</button>
                </div>
              }
              <div className="top-10">
                <button disabled={this.state.disableButtons} type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default CatalogTypeChangeModal;
