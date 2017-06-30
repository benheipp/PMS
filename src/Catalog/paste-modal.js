import React from 'react'
import FeedBack from '../Controls/feedback'

var PasteModal = React.createClass({
  getInitialState: function () {
    return {
      showFeedback: false,
      feedbackResult: 0,
      feedbackMessage: '',
      copyDocKeys: this.props.copyDocKeys,
      disableButtons: false,
    }
  },
  componentDidMount () {
    $('#PasteModal').modal('show')
    $('#PasteModal').on('hidden.bs.modal', this.props.handleHideModal)
  },
  getNewDocKey (docKey) {
    const pieces = docKey.split('/');
    return `${this.props.targetDocKey}/${pieces[pieces.length -1]}`;
  },
  handleRemove (docKeyToRemove) {
    const copyDocKeys = this.state.copyDocKeys;
    const index = copyDocKeys.indexOf(docKeyToRemove);
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
    MoveMultiple(this.state.copyDocKeys, this.props.targetDocKey, this.props.store, this.handlePasteCallback, this.pasteErrorCallback);
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
        if (data.Message.indexOf(`${docKey}`) < 0) {
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
      <div id='PasteModal' className='modal fade' data-keyboard='false' data-backdrop='static'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Paste</h4>
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
                  { this.state.copyDocKeys.map(doc_key =>
                    (
                      <tr key={doc_key}>
                        <td>
                          <button disabled={this.state.disableButtons} type="button" className="btn btn-sm btn-danger" onClick={() => { this.handleRemove(doc_key); }}>
                            Remove
                          </button>
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>{doc_key}</td>
                        <td style={{ verticalAlign: 'middle' }}>{this.getNewDocKey(doc_key)}</td>
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

export default PasteModal;
