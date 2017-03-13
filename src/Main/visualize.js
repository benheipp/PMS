import React from 'react';
import CatalogTree from '../Catalog/catalog';
import StoreControl from '../Controls/store-control';

var CatalogMain = React.createClass({
    componentWillMount: function() {
    },
    componentDidMount: function() {
        GetStoreLookups(this.callbackStoreLookups);
    },
    getInitialState: function() {
        return {
            selectedStore: {
                name: '',
                value:''
            },
            storeLookup: []
        };
    },
    render: function() {

        var showCatalogTree;
        if (this.state.selectedStore.value != '')
        {
            showCatalogTree = true;
        }
        else
        {
            showCatalogTree = false;
        }

        return (<div className="container">
                { !showCatalogTree ? <StoreControl storeLookup={this.state.storeLookup} selectStore={this.selectStore} /> : null }
                { showCatalogTree ? <CatalogTree storeLookup={this.state.storeLookup} selectedStore={this.state.selectedStore} handleClearSelectedStore={this.handleClearSelectedStore} /> : null }
              </div>);
    },
    callbackStoreLookups: function (data) {
        this.setState({ storeLookup: data });
    },
    selectStore: function(storeId, name){
        var selectedStore = this.state.selectedStore;
        selectedStore.name = name
        selectedStore.value = storeId
        this.setState({selectedStore: selectedStore});
    },
    handleClearSelectedStore: function(){
        var selectedStore = this.state.selectedStore;
        selectedStore.name = '';
        selectedStore.value = '';
        this.setState({selectedStore: selectedStore});
    }
});

export default CatalogMain;

