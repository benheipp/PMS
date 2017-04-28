import React from 'react';
import FeedBack from '../Controls/feedback';
import CopyAutoComplete from './copy-autocomplete';
var CopyModal = React.createClass({
  getInitialState: function() {
    return {
        showFeedback: false,
        feedbackResult:0,
        feedbackMessage: "",
        selectedDocKey: "",
        showCopyButton:false
      }
  },
    componentDidMount() {
        $('#CopyModal').modal('show');
        $('#CopyModal').on('hidden.bs.modal', this.props.handleHideModal);
    },
    render: function () {
        return (
            <div id="CopyModal" className="modal fade">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title">Copy</h4>
                    </div>
                    <div className="modal-body">
                      <div className="alert alert-info" role="alert">Copy <b>{this.props.DocKey}</b> to <b>{this.state.selectedDocKey}</b></div>
                       <FeedBack Result={this.state.feedbackResult} Message={this.state.feedbackMessage} visible={this.state.showFeedback} delay={2000} resetFeedbackState={this.resetFeedbackState} />
                       <CopyAutoComplete selectRecord={this.selectRecord} store={this.props.store} />
                      {this.state.showCopyButton ? <button onClick={this.handleCopy} type="button" style={{marginTop:'10px'}} className="btn btn-default"><i className="glyphicon glyphicon-copy"></i> Copy</button> : null }
                    </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
     </div>
    </div>
    </div>
    </div>
        );
},
handleHideModal: function() {
    this.props.handleHideModal();
},
  resetFeedbackState: function() {
      this.setState({ showFeedback: false });
},
  showFeedBack: function(data) {
      this.setState({ showFeedback: true, feedbackResult: data.Result, feedbackMessage: data.Message});
},
  selectRecord: function(item) {
    if(item.doc_key != ''){
       this.setState({selectedDocKey: item.doc_key, showCopyButton: true});
    }
},
  handleCopy: function(){
    var pieces = this.props.DocKey.split("/");
    console.log(pieces[pieces.length-1])
    Copy(pieces[pieces.length-1],this.props.DocKey,this.state.selectedDocKey,this.handleCopyCallback)
},
  handleCopyCallback: function(data){
  this.showFeedBack(data);
}
});

export default CopyModal;


