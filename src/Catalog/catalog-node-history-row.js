import React from 'react';
var NodeHistoryRow = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-sm-4"><h6><strong>Previous Node</strong>: {this.props.history.previous_node}</h6></div>
                <div className="col-sm-4"><h6><strong>Changed To</strong>: {this.props.history.new_node}</h6></div>
                <div className="col-sm-2"><h6><strong>Date</strong>: {this.props.history.change_date}</h6></div>
                <div className="col-sm-2"><button data-dismiss="modal" onClick={this.handleRollbackClick} type="button" className="btn btn-primary">Rollback</button></div>
                </div>
        );
    },
    handleRollbackClick: function() {
        rollback(this.props.docKey, this.props.history.new_node, this.props.history.previous_node, formatNameKey(this.props.history.previous_node), this.props.catalogId, this.rollbackCallback);
    },
    rollbackCallback: function (data) {
        console.log(data);
        this.props.rollbackComplete(data);
    }
});

export default NodeHistoryRow;