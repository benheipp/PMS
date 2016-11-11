import React from 'react';
import StoreLookup from '../Controls/store-lookup'
import NodeHistoryModal from './catalog-node-history'

var CatalogTreeRow = React.createClass({
    getInitialState: function() {
        return {
            isEditMode: false,
            nodeValue: this.props.node.name,
            nodeKey: this.props.node.name_key,
            showHistoryModal: false
        };
    },
    render: function () {


        if (this.state.isEditMode) {
            return (
             <tr>
                <td>
                    <input type="text" className="form-control" id="txtNodeInput" value={this.state.nodeValue} onChange={this.handleInputChange}/>
                </td>
                <td>
                    <input type="text" className="form-control" id="txtNodeKey" value={this.state.nodeKey} onChange={this.handleNodeKeyChange} />
                </td>
                <td><button onClick={this.handleSaveClick.bind(this, this.props.node, this.props.nodeLevel, this.state.nodeValue, this.state.nodeKey, this.props.node.id)} className="btn btn-default"><i className="glyphicon glyphicon-floppy-disk"></i></button></td>
                <td><button onClick={this.handleCancelClick.bind(this, this.props.node, this.props.nodeLevel)} className="btn btn-default"><i className="glyphicon glyphicon-remove"></i></button></td>
            </tr>
           );
    } else {
            return(

            <tr>
            <td><a href="#" onClick={this.handleClick.bind(this, this.props.node.doc_key, this.props.node.name, this.props.nodeLevel) }>{this.props.node.name}</a></td>
            <td><button disabled={!this.props.node.web_sent} onClick={this.handleEditClick.bind(this,this.props.node)} className="btn btn-default"><i className="glyphicon glyphicon-pencil"></i></button></td>
            <td><button onClick={this.showHistoryModal} className="btn btn-default"><i className="glyphicon glyphicon-book"></i></button>
                {this.state.showHistoryModal ? <NodeHistoryModal docKey={this.props.node.doc_key} catalogId={this.props.node.id} handleHideModal={this.handleHideModal} rollbackComplete={this.rollbackComplete} /> : null}
                </td>
            <td>
                <StoreLookup storeLookup={this.props.storeLookup} docKey={this.props.node.doc_key} storeValues={this.props.node.store} storeUpdate={this.storeUpdate} type={'node'} docId={0} />
            </td>
           </tr>
            );
}
    },
showHistoryModal: function() {
    this.setState({ showHistoryModal: true });
},
storeUpdate: function(data) {
    this.props.storeUpdate(data);
},
handleClick: function(docKey,nodeName,nodeLevel) {
    this.props.onNodeClick(docKey, nodeName, nodeLevel);
},
handleEditClick: function () {
    this.setState({ isEditMode: true });
},
handleHideModal: function() {
    this.setState({ showHistoryModal: false });
},
handleSaveClick: function (node, nodeLevel, newNode, newNodeKey, catalogId) {
    //Save Logic Here
    saveNode(node, nodeLevel, newNode, newNodeKey, catalogId, this.saveCallBack);
    this.setState({ isEditMode: false });
},
handleCancelClick: function (node, nodeLevel) {
    this.setState({ isEditMode: false });
},
saveCallBack: function (data, node, nodeLevel) {
    this.props.showFeedBack(data);
    this.props.reloadData(node.doc_key, node.name, nodeLevel);
},
handleInputChange: function (event) {
    this.setState({ nodeValue: event.target.value });
    this.setState({ nodeKey: formatNameKey(event.target.value) });
},
handleNodeKeyChange: function (event) {
    this.setState({ nodeKey: event.target.value });
},
rollbackComplete: function(data) {
    this.props.showFeedBack(data);
    this.props.reloadData(this.props.node.doc_key, this.props.node.name, this.props.nodeLevel);
}
});

export default CatalogTreeRow;