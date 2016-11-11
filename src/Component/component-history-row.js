import React from 'react';
var ComponentHistoryRow = React.createClass({
    render: function () {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4"><h4><strong>Previous Values</strong></h4></div>
                </div>
                <div className="row">
                    <div className="col-sm-2">Ref Id: <strong>{this.props.history.old_ref_id}</strong></div>
                    <div className="col-sm-2">Ref Qty: <strong>{this.props.history.old_ref_qty}</strong></div>
                    <div className="col-sm-2">Sku: <strong>{this.props.history.old_sku}</strong></div>
               </div>
               <div className="row">
                    <div className="col-sm-4"><h4><strong>Changed To Values</strong></h4></div>
               </div>
               <div className="row">
                    <div className="col-sm-2">Ref Id: <strong>{this.props.history.new_ref_id}</strong></div>
                    <div className="col-sm-2">Ref Qty: <strong>{this.props.history.new_ref_qty}</strong></div>
                    <div className="col-sm-2">Sku: <strong>{this.props.history.new_sku}</strong></div>
               </div>
               <div className="row">
                    <div className="col-sm-4"><h4><strong>Changed: {this.props.history.change_date}</strong></h4></div>
                   <div className="col-sm-4"> <button data-dismiss="modal" onClick={this.handleRollbackClick} type="button" className="btn btn-primary">Rollback</button></div>
               </div>
                
                </div>

        );
    },
    handleRollbackClick: function() {
        rollbackComponentData(this.props.docKey, this.props.docId, this.props.history.new_ref_id, this.props.history.old_ref_id, this.props.history.new_ref_qty, this.props.history.old_ref_qty, this.props.history.new_sku, this.props.history.old_sku, this.rollbackCallback);
    },
    rollbackCallback: function (data) {
        console.log(data);
        this.props.rollbackComplete(data);
    }
});

export default ComponentHistoryRow;