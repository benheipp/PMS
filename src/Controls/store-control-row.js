import React from 'react';
var StoreControlRow = React.createClass({
    render: function () {
        return (
            <div className="col-sm-12" style={{fontSize:'12px'}}>
                <div className="row">
                    <div className="col-sm-3">
                    <strong><a style={{cursor:'pointer'}} onClick={this.handleSelectStore.bind(this,this.props.storeLookup.id, this.props.storeLookup.store_name  )}>{this.props.storeLookup.store_name}</a></strong>
                    </div>
                </div>
            </div>
        );
    },
    handleSelectStore: function(storeId, name) {
        this.props.selectStore(storeId, name);
    }
});

export default StoreControlRow;
