import React from 'react'
import FeedBack from '../Controls/feedback'

var ProductPasteModal = React.createClass({
  getInitialState: function () {
    return {
      showFeedback: false,
      feedbackResult: 0,
      feedbackMessage: '',
      copyDocKeys: this.props.copySkus,
      disableButtons: false,
      targetValidation: this.props.copySkus.reduce((acc, v) => {
        acc[v] = true;
        return acc;
      }, {})
    }
  },
  componentDidMount () {
    $('#ProductPasteModal').modal('show')
    $('#ProductPasteModal').on('hidden.bs.modal', this.props.handleHideModal)
    this.validateCopyDocKeys();
  },
  validateCopyDocKeys () {
    this.state.copyDocKeys.forEach((docKey) => {
      ValidateProduct(docKey.sku, docKey.doc_key, this.props.targetDocKey, this.props.store, this.updateTargetValidation);
    });
  },
  updateTargetValidation (sku, docKey, docKeyExists) {
    const targetValidation = { ...this.state.targetValidation };
    targetValidation[sku + docKey] = !docKeyExists;
    this.setState({ targetValidation });
  },
  getNewDocKey (docKey) {
    const pieces = docKey.split('/');
    return `${this.props.targetDocKey}/${pieces[pieces.length -1]}`;
  },
  handleRemove (sku,docKeyToRemove) {
    const copyDocKeys = this.state.copyDocKeys;
    const index = copyProductDocKeys.findIndex(i => i.doc_key === docKeyToRemove && i.sku === sku);
    copyDocKeys.splice(index, 1);
    this.setState({ copyDocKeys });
  },
  showFeedback: function (data) {
    this.setState({ showFeedback: true, feedbackResult: data.Result, feedbackMessage: data.Message})
  },
  handlePaste: function () {
    var data = {
      Result:'',
      Message:'Attempting to Copy Data'
    }
    this.setState({ disableButtons: true });
    this.showFeedback(data);
    MoveProducts(this.state.copyDocKeys, "", this.props.targetDocKey, this.props.store, this.handlePasteCallback, this.pasteErrorCallback);
  },
  pasteErrorCallback: function (msg) {
    const data = { Result: 1, Message: msg };
    this.showFeedback(data);
    this.setState({ disableButtons: false });
  },
  handlePasteCallback: function (data) {
    if (data.Result === 0) { 
      this.removeAll(); 
    }
    else {
      const docKeysToRemove = [];
      this.state.copyDocKeys.forEach(docKey => {
        if (data.Message.indexOf(`${docKey}:`) < 0) {
          docKeysToRemove.push(docKey);
        }
      });
      docKeysToRemove.forEach(d => { this.handleRemove(d); });
    }
    this.showFeedback(data);
    this.setState({ disableButtons: false });
  },
  removeAll: function () {
    const copyDocKeys = this.state.copyDocKeys;
    copyDocKeys.splice(0, copyDocKeys.length);
    this.setState({ copyDocKeys });
  },
  render () {
    return (
      <div id='ProductPasteModal' className='modal fade' data-keyboard='false' data-backdrop='static'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Paste Products</h4>
            </div>
            <div className='modal-body'>
              <FeedBack noTimer='true' Result={this.state.feedbackResult} Message={this.state.feedbackMessage} visible={this.state.showFeedback} delay={2000} resetFeedbackState={this.resetFeedbackState} />              
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Source</th>
                    <th>Target</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.copyDocKeys.map(o =>
                    (
                      <tr key={o.doc_key + o.sku} className={this.state.targetValidation[o.doc_key + o.sku] ? '' : 'danger'} title={this.state.targetValidation[o.doc_key + o.sku] ? '' : 'Target Product already exists'}>
                        <td>
                          <button disabled={this.state.disableButtons} type="button" className="btn btn-sm btn-danger" onClick={() => { this.handleRemove(sku,doc_key); }}>
                            Remove
                          </button>
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>{o.sku} - {o.doc_key}</td>
                        <td style={{ verticalAlign: 'middle' }}>{this.props.targetDocKey}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <div className='modal-footer'>
              { this.state.copyDocKeys.length > 0 &&
                <div>
                  <button  disabled={this.state.disableButtons} type="button" className="btn btn-danger" onClick={this.removeAll}>Remove All</button>
                  <button disabled={this.state.disableButtons} type="button" className="btn btn-primary btn-large" onClick={this.handlePaste}><span className="glyphicon glyphicon-paste" />Paste</button>
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

export default ProductPasteModal;
