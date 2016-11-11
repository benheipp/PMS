import React from 'react';
import CatalogTree from '../Catalog/catalog';

var CatalogMain = React.createClass({
    componentWillMount: function() {
    },
    componentDidMount: function() {
        GetStoreLookups(this.callbackStoreLookups);
    },
    getInitialState: function() {
        return {
            storeLookup: []
        };
    },
    render: function() {

        return (<div className="container">
                <CatalogTree storeLookup={this.state.storeLookup}/>
              </div>);
    },
    callbackStoreLookups: function (data) {
        this.setState({ storeLookup: data });
    }
});

export default CatalogMain;

