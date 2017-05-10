import React from 'react';
import ProductHistoryMasterRow from './product-history-master-row'
var ProductHistoryMaster = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },
    componentDidMount() {
        $('#ProductHistoryMasterModal').modal('show');
        $('#ProductHistoryMasterModal').on('hidden.bs.modal', this.props.handleHideProductMasterHistoryModal);
        GetProductMasterHistory(this.props.prod.id, this.getProductMasterHistoryCallback);
    },
    componentWillReceiveProps: function () {
    },
    getProductMasterHistoryCallback: function (data) {
        this.setState({ data: data });
    },
    render: function () {
        var rows = this.state.data.map(function (history) {
            return <ProductHistoryMasterRow history={history} rollbackComplete={this.rollbackComplete} key={history.key} docKey={this.props.prod.doc_key} id={this.props.prod.id} handleRollbackClick={this.handleRollbackClick} />;
        }, this);
        return (
            <div id="ProductHistoryMasterModal" className="modal fade">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title">Product History</h4>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                          <div className="col-sm-12">
                              <div className="alert alert-info">
                                     History for: <strong>{this.props.prod.name}</strong>
                              </div>
        </div>
   </div>
                   <div className="row">
                    <div className="col-sm-4"><h4><strong>Previous Values</strong></h4></div>
                </div>
        {rows}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
     </div>
    </div>
    </div>
    </div>
        );
},
rollbackComplete: function(data,newName) {
    this.props.rollbackComplete(data,newName);
},
handleHideModal: function() {
    this.props.handleHideModal();
},
handleRollbackClick: function(history){
    RollbackProductMaster(history.previous_name,history.new_name,history.product_id,history.doc_key,this.rollbackComplete);
}
});

export default ProductHistoryMaster;


