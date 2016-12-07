import React from 'react';
var ProductHistoryMasterRow = React.createClass({
    render: function () {
        return (
            <div>
                <div className="row" style={{ marginTop: '5px' }}>
                    <div className="col-sm-6">Name: <strong>{this.props.history.previous_name}</strong></div>
                    <div className="col-sm-4"><strong>Changed On: {this.props.history.change_date}</strong></div>
                    <div className="col-sm-2"> <button data-dismiss="modal" onClick={this.handleRollbackClick.bind(this, this.props.history)} type="button" className="btn btn-primary">Rollback</button></div>
               </div>
      
                
                </div>

        );
    },
    handleRollbackClick: function(history) {
        this.props.handleRollbackClick(history);
    },
    rollbackCallback: function (data) {
        this.props.rollbackComplete(data);
    }
});

export default ProductHistoryMasterRow;