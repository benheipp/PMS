﻿import React from 'react';
import FeedBack from '../Controls/feedback';
import StoreLookup from '../Controls/store-lookup'
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
            showFeedback: false
    };
    },
    render: function() {
        return (
            <div id="ProductDetailModal" className="modal fade">
                <div className="modal-dialog">
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
                              Editing {this.props.productData.name} with a sku of {this.props.productData.sku} 
                          </div>
                     </div>
                     <div className="row">
                          <div className="col-sm-2">
                              Name:
                          </div>
                          <div className="col-sm-10">
                              <input type="text" maxlength="255" className="form-control" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
                          </div>
                     </div>
                      <div className="row">
                          <div className="col-sm-2">
                              Description:
                          </div>
                          <div className="col-sm-10">
                              <input type="text" maxlength="255" className="form-control" value={this.state.description} onChange={this.handleChange.bind(this, 'description')} />
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-sm-12">
                              <StoreLookup storeLookup={this.props.storeLookup} docKey={this.props.productData.docKey} storeValues={this.props.storeValues} storeUpdate={this.storeUpdate} type={'component'} docId={this.props.productData.id} />
                          </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleCancelClick}>Cancel</button>
                      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSaveProductClick.bind(this, this.props.productData, this.state.name, this.state.description)}>Save changes</button>
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
    handleSaveProductClick: function (productData, newName, newDescription) {
        this.props.handleSaveProductClick(productData, newName, newDescription);
    },
    handleCancelClick: function() {
        this.props.handleCancelClick();
    },
    storeUpdate: function(data) {
        this.setState({ showFeedback: true, feedbackMessage: data.Message, feedbackResult: data.Result });
    },
resetFeedbackState: function() {
    this.setState({ showFeedback: false });
}
});

export default ProductModal;