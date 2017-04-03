import React from 'react';
import StoreControlRow from './store-control-row'

var StoreControl = React.createClass({
    render: function () {
        var rows = this.props.storeLookup.map(function (storeLookup) {
            return <StoreControlRow storeLookup={storeLookup} key={storeLookup.key} selectStore={this.props.selectStore}/>;
        }, this);
        return (
            <div className="row">
                {rows}
              <div className="col-sm-12" style={{fontSize:'50px'}}>
                <div className="row">
                    <div className="col-sm-6">
                    <strong><a style={{cursor:'pointer', color:'black'}} onClick={this.selectStore.bind(this,'999','Not Assigned')}>Not Assigned</a></strong>
                    </div>
                </div>
              </div>
            </div>
        );
    },
    selectStore: function(storeId, name) {
        this.props.selectStore(storeId, name);
    }
});

export default StoreControl;
