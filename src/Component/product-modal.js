import React from 'react';
import FeedBack from '../Controls/feedback';
import ProductHistoryComponent from './product-history';

var ProductModal = React.createClass({
    componentDidMount() {
        $('#ProductDetailModal').modal('show');
        $('#ProductDetailModal').on('hidden.bs.modal', this.props.handleHideModal);
    },
    getInitialState: function () {
        return {
            name: this.props.productData.name,
            description: this.props.productData.description,
            sku: this.props.productData.sku,
            feedbackResult: 0,
            feedbackMessage: "",
            showFeedback: false,
            prodHistory: false,
            prodHistoryData:[]
    };
    },
    render: function() {

        var saveDisable;
        if (localStorage.CatalogEditing == 'true'){saveDisable = false;} else {saveDisable = true;}

        return (
            <div id="ProductDetailModal" className="modal fade">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title">Product Detail</h4>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <FeedBack Result={this.state.feedbackResult} Message={this.state.feedbackMessage} visible={this.state.showFeedback} delay={2000} resetFeedbackState={this.resetFeedbackState} />
                            </div>
                        </div>
                      <div className="row">
                          <div className="col-sm-12">
                              <div className="alert alert-info">
                                     Editing: <strong>{this.props.productData.name}</strong> with a sku of <strong>{this.props.productData.sku} </strong>
                              </div>
                          </div>
                      </div>
                     <div className="row" style={{ marginTop: '5px' }}>
                          <div className="col-sm-2">
                              Name:
                          </div>
                          <div className="col-sm-10">
                              <input type="text" maxlength="255" className="form-control" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
                          </div>
                     </div>
                      <div className="row" style={{ marginTop: '5px' }}>
                          <div className="col-sm-2">
                              Description:
                          </div>
                          <div className="col-sm-10">
                              <input type="text" maxlength="255" className="form-control" value={this.state.description} onChange={this.handleChange.bind(this, 'description')} />
                          </div>
                      </div>
                     <div className="row" style={{ marginTop: '5px' }}>
                      <div className="col-sm-10">
                        <button onClick={this.showProdHistory} className="btn btn-default"><i className="glyphicon glyphicon-book"></i></button> <strong>Show History</strong>
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: '5px' }}>
                      <div className="col-sm-11">
                        { this.state.prodHistory ? <ProductHistoryComponent docId={this.props.productData.id} docKey={this.props.productData.docKey} data={this.state.prodHistoryData} rollbackComplete={this.rollbackComplete}/> : null }
                      </div>
                    </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleCancelClick}>Cancel</button>
                      <button disabled={saveDisable} type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSaveProductClick.bind(this, this.props.productData, this.state.name, this.state.description)}>Save changes</button>
                   </div>
                  </div>
                </div>
              </div>
        );
    },
    handleChange: function (name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    },
    showProdHistory: function() {
      console.log(this.props.productData.id);
       GetComponentProductHistory(this.props.productData.id, this.historyCallBack);
    },
    handleSaveProductClick: function (productData, newName, newDescription) {
        this.props.handleSaveProductClick(productData, newName, newDescription);
    },
    handleCancelClick: function() {
        this.props.handleCancelClick();
    },
    historyCallBack: function(data){
      this.setState({prodHistoryData: data, prodHistory:true});
    },
resetFeedbackState: function() {
    this.setState({ showFeedback: false });
},
rollbackComplete: function(oldName,oldDescription) {
  this.setState({ name: oldName, description: oldDescription});
}
});

export default ProductModal;