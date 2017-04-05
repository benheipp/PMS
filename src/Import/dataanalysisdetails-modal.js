import React from 'react';
import ProductDetail from './EntityDetail/productdetail';
import EntityDetail from './EntityDetail/entitydetail';

var DataAnalysisDetailsModal = React.createClass({
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
              { this.props.detailType == 'product_shortSkus' ||
               this.props.detailType == 'product_invalidSkus' ||
               this.props.detailType == 'product_invalidSkusWStoreIDAssociation' ? <ProductDetail type={this.props.detailType} /> : null }
              { this.props.detailType == 'catalog_invalidChars' ||
                this.props.detailType == 'product_invalidChars' ? <EntityDetail type={this.props.detailType} /> : null }
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
    }
});

export default DataAnalysisDetailsModal;
