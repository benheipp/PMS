import React from 'react';

var ProductDetailRow = React.createClass({
    getInitialState: function() {
        return {
            isEditMode: false,
            sku: this.props.detail.sku,
            name: this.props.detail.name,
            docKey: this.props.detail.doc_key
        };
    },
    render: function () {

        if (this.state.isEditMode) {
            return (
             <tr>
                <td><input type="text" className="form-control" id="txtDocKey" value={this.state.docKey} disabled /></td>
                <td>
                    <input type="text" className="form-control" id="txtSku" value={this.state.sku} onChange={this.handleChange.bind(this, 'sku')} onChange={this.handleInputChange} />
                </td>
                <td>
                    <input type="text" className="form-control" id="txtName" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
                </td>
                <td><button onClick={this.handleSaveClick} className="btn btn-sm btn-default"><i className="glyphicon glyphicon-floppy-disk"></i></button></td>
                <td><button onClick={this.handleCancelClick} className="btn btn-sm btn-default"><i className="glyphicon glyphicon-remove"></i></button></td>
            </tr>
           );
    } else {
            return(

            <tr>
            <td>{this.props.detail.doc_key}</td>
            <td>{this.props.detail.sku}</td>
            <td>{this.props.detail.name}</td>
            <td><button onClick={this.handleEditClick} className="btn btn-sm btn-default"><i className="glyphicon glyphicon-pencil"></i> Edit</button></td>
            <td></td>
           </tr>
            );
}
    },
handleEditClick: function () {
    this.setState({ isEditMode: true });
},
handleSaveClick: function () {
    SaveProdEnt(this.props.detail.doc_key,this.state.docKey,this.state.sku,this.state.name, this.saveCallBack);
    this.setState({ isEditMode: false });
},
handleCancelClick: function () {
    this.setState({ isEditMode: false });
},
handleInputChange: function (event) {
    this.setState({ sku: event.target.value });
    this.setState({ docKey: (this.props.detail.doc_key.substr(0, this.props.detail.doc_key.lastIndexOf('/') + 1) + formatNameKey(event.target.value)) });
},
saveCallBack: function (data) {
    console.log(data);
   // this.props.showFeedBack(data);
   // this.props.reloadData(node.doc_key, node.name, nodeLevel);
},
handleChange: function (name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
}
});

export default ProductDetailRow;
