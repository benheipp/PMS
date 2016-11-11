import React from 'react';
import ProductModal from './product-modal'
import ComponentHistoryModal from './component-history'

var ComponentRow = React.createClass({
    getInitialState: function () {
        return {
            isEditMode: false,
            refId: this.props.component.RefId,
            qty: this.props.component.RefQty,
            sku: this.props.component.Sku,
            showHistoryModal: false,
            showModal: false,
            ProductData: {
                docKey: "",
                sku: "",
                name: "",
                description: "",
                id: ""
            }
        };
    },
    render: function () {

        if (this.state.isEditMode) {
            return (
            <tr>
                            <td></td>
                         <td><input type="number" style={{"width" : "70px"}} className="form-control" id="txtEditRefId" value={this.state.refId} onChange={this.handleChange.bind(this, 'refId')} /></td>
                         <td><a href="#" onClick={this.handleShowModal.bind(this, this.props.docKey, this.props.component.Sku, this.props.component.ProductName, this.props.component.Description) }>{this.props.component.ProductName}</a></td>
                         <td><input type="number" style={{ "width": "70px" }} className="form-control" id="txtEditQty" value={this.state.qty} onChange={this.handleChange.bind(this, 'qty')} /></td>
                         <td><input type="text" style={{"width" : "120px"}} className="form-control" id="txtEditSku" value={this.state.sku} onChange={this.handleChange.bind(this, 'sku')} /></td>
                         <td><button onClick={this.handleSaveClick.bind(this, this.props.docKey, this.props.component, this.state.refId, this.state.qty, this.props.nodeName, this.props.nodeLevel, this.state.sku)} className="btn btn-default"><i className="glyphicon glyphicon-floppy-disk"></i></button></td>
                         <td><button onClick={this.handleCancelClick} className="btn btn-default"><i className="glyphicon glyphicon-remove"></i></button></td>
            </tr>
        );
} else {
    return (
    <tr>
                <td>{this.state.showModal ? <ProductModal handleHideModal={this.handleHideModal} productData={this.state.ProductData} handleSaveProductClick={this.handleSaveProductClick} storeValues={this.props.component.StoreInfo} storeLookup={this.props.storeLookup} handleCancelClick={this.handleProductModalCancelClick} /> : null}</td>
<td>{this.props.component.RefId}</td>
<td><a href="#" onClick={this.handleShowModal.bind(this, this.props.docKey, this.props.component.Sku, this.props.component.ProductName, this.props.component.Description, this.props.component.id) }>{this.props.component.ProductName}</a></td>
<td>{this.props.component.RefQty}</td>
<td>{this.props.component.Sku}</td>
<td><button onClick={this.handleEditClick} className="btn btn-default"><i className="glyphicon glyphicon-pencil"></i></button></td>
<td><button onClick={this.showHistoryModal} className="btn btn-default"><i className="glyphicon glyphicon-book"></i></button>
    {this.state.showHistoryModal ? <ComponentHistoryModal docKey={this.props.docKey} docId={this.props.component.id} handleHideComponentHistoryModal={this.handleHideComponentHistoryModal} rollbackComplete={this.rollbackComplete } /> : null}
        </td>
</tr> 
        );
}
},
handleChange: function (name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
},
handleHideComponentHistoryModal: function () {
    this.setState({ showHistoryModal: false });
},
showHistoryModal: function() {
    this.setState({ showHistoryModal: true });
},
handleCancelClick: function () {
    this.setState({ isEditMode : false});
},
handleEditClick: function () {
    this.setState({ isEditMode: true });
},
handleSaveClick: function (docKey, component, refId, refQty, nodeName, nodeLevel, sku) {
    SaveComponentData(docKey, component, refId, refQty, nodeName, nodeLevel, sku, this.saveComponentCallback);
    this.setState({ isEditMode: false });
},
saveComponentCallback: function (data, docKey, nodeName, nodeLevel) {
    this.props.showFeedBack(data);
    this.props.reloadData(docKey, nodeName, nodeLevel);
},
handleHideModal: function() {
    this.setState({ showModal: false });
},
handleShowModal: function (docKey, sku, productName, description, id) {
    var prodData = this.state.ProductData;
    prodData.docKey = docKey;
    prodData.sku = sku;
    prodData.name = productName;
    prodData.description = description;
    prodData.id = id;
    this.setState({ showModal: true });
},
handleSaveProductClick: function (productData, newName, newDescription) {
    saveProduct(productData, newName, newDescription, this.props.component.id, this.saveProductCallback);
},
saveProductCallback: function (data) {
    this.props.showFeedBack(data);
    this.setState({ showModal: false });
    this.props.reloadData(this.props.docKey, this.props.nodeName, this.props.nodeLevel);
},
handleProductModalCancelClick: function () {
    this.props.reloadData(this.props.docKey, this.props.nodeName, this.props.nodeLevel);
},
rollbackComplete: function (data) {
    this.props.showFeedBack(data);
    this.props.reloadData(this.props.docKey, this.props.nodeName, this.props.nodeLevel);
}

});

export default ComponentRow;