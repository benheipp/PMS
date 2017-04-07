import React from 'react';
import ProductDetail from './EntityDetail/productdetail';
import EntityDetail from './EntityDetail/entitydetail';
import FeedBack from '../Controls/feedback';

var DataAnalysisDetailsModal = React.createClass({
  getInitialState: function() {
    return {
      feedbackResult:'',
      feedbackMessage:'',
      showFeedback: false
    }
  },
  componentDidMount() {
        $('#DataAnalysisDetailsModal').modal('show');
        $('#DataAnalysisDetailsModal').on('hidden.bs.modal', this.props.handleHideDetailsModal);
    },
    render: function() {
        return (
      <div id="DataAnalysisDetailsModal" className="modal fade">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">{this.props.ModalTitle} Details</h4>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                          <div className="col-sm-12">
                          <FeedBack Result={this.state.feedbackResult} Message={this.state.feedbackMessage} visible={this.state.showFeedback} delay={2000} resetFeedbackState={this.resetFeedbackState} />
              { this.props.detailType == 'product_shortSkus' ||
               this.props.detailType == 'product_invalidSkus' ||
               this.props.detailType == 'product_invalidSkusWStoreIDAssociation' ? <ProductDetail type={this.props.detailType} showFeedBack={this.showFeedBack} /> : null }
              { this.props.detailType == 'catalog_invalidChars' ||
                this.props.detailType == 'product_invalidChars' ? <EntityDetail type={this.props.detailType} showFeedBack={this.showFeedBack} /> : null }
                  </div>
              </div>

            </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

          );
    },
resetFeedbackState: function() {
    this.setState({ showFeedback: false });
},
showFeedBack: function(data) {
    this.setState({ showFeedback: true, feedbackResult: data.Result, feedbackMessage: data.Message});
}
});

export default DataAnalysisDetailsModal;
