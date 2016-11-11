import React from 'react';
var BreadCrumbModal = React.createClass({
    componentDidMount() {
        $('#BreadCrumbModal').modal('show');
        $('#BreadCrumbModal').on('hidden.bs.modal', this.props.handleHideModal);
    },
    getInitialState: function () {
        return {
            breadcrumbText: this.props.breadCrumbText
        };
    },
    render: function() {
        return (
            <div id="BreadCrumbModal" className="modal fade">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title">Breadcrumb Description</h4>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                          <div className="col-sm-12">
                              <div className="alert alert-info">
                                     Editing Breadcrumb text for: <strong>{this.props.docKey}</strong> 
                              </div>
        </div>
   </div>
   <div className="row">
        <div className="col-sm-4">
            Bread Crumb Text:
        </div>
        <div className="col-sm-8">
            <textarea className="form-control" onChange={this.handleChange.bind(this, 'breadcrumbText')} value={this.state.breadcrumbText} ></textarea>
        </div>
   </div>
  </div>
  <div className="modal-footer">
    <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSaveBreadCrumbClick.bind(this, this.props.docKey, this.state.breadcrumbText)}>Save changes</button>
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
    handleSaveBreadCrumbClick: function (docKey, breadcrumbText) {
        this.props.handleSaveBreadCrumbClick(docKey, breadcrumbText);
        console.log('description:' + breadcrumbText);
    }

});

export default BreadCrumbModal;