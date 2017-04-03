import React from 'react';
var StoreControlRow = React.createClass({
    render: function () {
        return (
            <div className="col-sm-12" style={{fontSize:'12px'}}>
                <div className="row">
                    <div className="col-sm-6" style={{fontSize:'50px'}}>
                    <strong><a style={{cursor:'pointer',color:this.props.storeLookup.css_box_color}} onClick={this.handleSelectStore.bind(this,this.props.storeLookup.id, this.props.storeLookup.store_name  )}>{this.props.storeLookup.store_name}</a></strong>
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
