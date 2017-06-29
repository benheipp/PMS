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
    MoveMultiple(this.state.copyDocKeys, this.props.targetDocKey, this.props.store, this.handlePasteCallback);
  },
  handlePasteCallback: function (data) {
    if (this.data.Result === 0) { this.setState({ copyDocKeys: [] }); }
    this.showFeedback(data);
    this.setState({ disableButtons: false });
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
              <button disabled={this.state.disableButtons} type="button" className="btn btn-primary btn-large" onClick={this.handlePaste}>Quick Paste</button>
              <button disabled={this.state.disableButtons} type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default PasteModal;
