import React from 'react';
var ProductHistoryRow = React.createClass({
    render: function () {

        var rollbackDisable;
        if (localStorage.CatalogEditing == 'true'){rollbackDisable = false;} else {rollbackDisable = true;}

        return (
            <div>
                <div className="row">
                    <div className="col-sm-2">Name: <strong>{this.props.data.old_name}</strong></div>
                    <div className="col-sm-6">Description: <strong>{this.props.data.old_description}</strong></div>
                    <div className="col-sm-3"><strong>Changed: {this.props.data.change_date}</strong></div>
                    <div className="col-sm-1"><button disabled={rollbackDisable} onClick={this.handleRollbackClick} type="button" className="btn btn-primary">Rollback</button></div>
               </div>
            </div>

        );
    },
    handleRollbackClick: function() {
      var desc;
      desc = this.props.data.old_description;
      if( !this.props.data.old_description ) {
        desc = "";
      } 
      console.log(this.props.data.old_description);
      this.props.rollbackComplete(this.props.data.old_name,desc);
    }
});

export default ProductHistoryRow;