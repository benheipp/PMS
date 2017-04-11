import React from 'react';
import CatalogTreeRow from './catalog-row';
import FeedBack from '../Controls/feedback';
import BreadCrumb from '../BreadCrumb/breadcrumb';
import BreadCrumbModal from '../BreadCrumb/breadcrumb-modal';
import ComponentLevel from '../Component/component';
import LoadingControl from '../Controls/loading';


var CatalogTree = React.createClass({
    getInitialState: function() {
        return {
            nodeLevel: 1,
            node: [],
            nodeName: "",
            docKey: 'catalog',
            showComponent: false,
            componentData: [],
            componentName: "",
            componentImage: "",
            showFeedback: true,
            feedbackResult: 0,
            feedbackMessage: "Loading...",
            showBreadCrumbModal: false,
            breadCrumbText: "",
            loading: false,
            noResultsMessage: false,
            showDisabled: false
        };
    },
    componentWillMount: function() {
        if(localStorage.CatalogVisibility != 'true')
        {
            localStorage.clear();
            window.location.href = "/login";
        }
    },
    componentDidMount: function() {
        getNodes(1, null, [], this.props.selectedStore.value, this.props.disabled, this.state.showDisabled, this.handleNewData);
    },
    render: function () {
        var stylemargin = {
            marginTop: "60px"
        };
        var rows = this.state.node.map(function(node) {
            return <CatalogTreeRow storeLookup={this.props.storeLookup} node={node} key={node.key} nodeLevel={this.state.nodeLevel} onNodeClick={this.onNodeClick} showFeedBack={this.showFeedBack} reloadData={this.reloadData} storeUpdate={this.storeUpdate } updateAllCatalogs={this.updateAllCatalogs} />;
        }, this);
        return (
            <div style={stylemargin}>
             {this.props.disabled == "1" ? <h1>Disabled Items</h1> : null }
              <BreadCrumb docKey={this.state.docKey} callbackBreadCrumbClick={this.BreadCrumbClick} handleEditBreadCrumbText={this.handleEditBreadCrumbText} selectedStore={this.props.selectedStore} handleClearSelectedStore={this.props.handleClearSelectedStore} />
{this.state.showBreadCrumbModal ? <BreadCrumbModal docKey={this.state.docKey} breadCrumbText={this.state.breadCrumbText} handleHideModal={this.handleHideModal} handleSaveBreadCrumbClick={this.handleSaveBreadCrumbClick}  /> : null}
              <FeedBack Result={this.state.feedbackResult} Message={this.state.feedbackMessage} visible={this.state.showFeedback} delay={2000} resetFeedbackState={this.resetFeedbackState} />
              { this.state.showComponent ? <ComponentLevel component={this.state.componentData} componentName={this.state.componentName} diagramUrl={this.state.componentImage} docKey={this.state.docKey} showFeedBack={this.showFeedBack} nodeName={this.state.nodeName} nodeLevel={this.state.nodeLevel} reloadDataFromComponent={this.reloadDataFromComponent} storeLookup={this.props.storeLookup}/> : null }
               <b>Show Disabled</b><input
            name="disabled"
            type="checkbox"
            defaultChecked={this.state.showDisabled}
            onChange={this.handleShowDisabledChange} />
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td><b>Node</b></td>
                    <td></td>
                    <td></td>
                    <td><b>Disabled</b></td>
                  </tr>
                  {rows}
                  {this.state.noResultsMessage ? <p style={{fontSize:'50px'}}>No Results</p> : null }
                </tbody>
              </table>
            </div>
        );
},
handleShowDisabledChange: function(event){
    this.setState({showDisabled: event.target.checked});
    getNodes(this.state.nodeLevel, this.state.docKey, this.state.nodeName, this.props.selectedStore.value, this.props.disabled, event.target.checked, this.handleNewData);
},
reloadData: function (docKey, nodeName, nodeLevel) {
    var nDocKey = docKey.substring(0, docKey.lastIndexOf("/"));
    getNodes(nodeLevel, nDocKey, nodeName, this.props.selectedStore.value, this.props.disabled, this.state.showDisabled, this.handleNewData);
    GetBreadCrumbText(docKey, this.editBreadCrumbCallback);
    this.setState({ docKey: nDocKey, nodeName: nodeName });
},
reloadDataFromComponent: function (docKey, nodeName, nodeLevel) {
    getNodes(nodeLevel, docKey, nodeName, this.props.selectedStore.value, this.props.disabled, this.state.showDisabled, this.handleNewData);
    GetBreadCrumbText(docKey, this.editBreadCrumbCallback);
    this.setState({ docKey: docKey, nodeName: nodeName });
},
onNodeClick: function (docKey, nodeName, nodeLevel) {
    getNodes(nodeLevel + 1, docKey, nodeName, this.props.selectedStore.value, this.props.disabled, this.state.showDisabled, this.handleNewData);
    GetBreadCrumbText(docKey, this.editBreadCrumbCallback);
    this.setState({ docKey: docKey, nodeLevel: nodeLevel + 1, showFeedback: false });
},
handleNewData: function (data, docKey, nodeName) {
    this.setState({ node: data, nodeName: nodeName });
    if (data.length == 0 && this.state.nodeLevel == 1)
    {
        this.setState({noResultsMessage:true});
    }
    if (data.length == 0 && docKey != null) {
        getComponentProducts(docKey, nodeName, this.HandleComponentData);
    } else {
        this.setState({ componentData: [] });
        this.setState({ showComponent: false, showFeedback:false });
    }
},
BreadCrumbClick: function (nodeLevel, docKey) {
    getNodes(nodeLevel, docKey, [], this.props.selectedStore.value, this.props.disabled, this.state.showDisabled, this.handleNewData);
    GetBreadCrumbText(docKey, this.editBreadCrumbCallback);
    this.setState({ docKey: docKey, nodeLevel: nodeLevel, showFeedback: false });
},
HandleComponentData: function (data, componentName) {
    this.setState({ componentData: data, componentName: componentName, componentImage: '//cdn.firedog.com/diagram/' + data[0].ImageUrl + '.png', showComponent: true });
},
showFeedBack: function(data) {
    this.setState({ showFeedback: true, feedbackResult: data.Result, feedbackMessage: data.Message});
},
handleEditBreadCrumbText: function () {
    this.setState({ showBreadCrumbModal: true });
},
handleSaveBreadCrumbClick: function(docKey, breadCrumbText) {
    SaveBreadCrumbText(docKey, breadCrumbText, this.breadCrumbTextSaveCallback);
},
breadCrumbTextSaveCallback: function(data) {
    this.showFeedBack(data);
    this.setState({ showBreadCrumbModal: false });
    GetBreadCrumbText(this.state.docKey, this.editBreadCrumbCallback);
},
editBreadCrumbCallback: function (data) {
    this.setState({ breadCrumbText: data.breadcrumb_text });
},
handleHideModal: function() {
    this.setState({ showBreadCrumbModal: false });
},
resetFeedbackState: function() {
    this.setState({ showFeedback: false });
},
storeUpdate: function(data) {
    this.showFeedBack(data);
},
handleClearSelectedStore: function(){
    this.props.handleClearSelectedStore();
},
updateAllCatalogs: function(){
    this.props.updateAllCatalogs();
}
});

export default CatalogTree;
