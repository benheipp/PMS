import React from 'react';
import ProductHistoryMaster from './product-history-master'
import ProductEntity from './product-entity'
var ProductDisplay = React.createClass({
	getInitialState: function() {
    return {
      	isEditMode: false,
      	prodName: this.props.data.name,
      	showHistory: false
    	}
	},
    render: function () {
        var disableVar;
        if (this.props.data.webSent == false && this.props.data.webSentDatetime != '1900-01-01T00:00:00')
        {
            disableVar = true;
        }else{
            disableVar = false;
        }

        if (this.state.isEditMode) {
            return (
				<div className="panel panel-default" style={{marginTop:'20px',position: 'static',zIndex:'1'}}>
				  <div className="panel-heading">
				    <h3 className="panel-title"><input type="text" className="form-control" id="txtNodeInput" value={this.state.prodName} onChange={this.handleChange.bind(this, 'prodName')} /></h3>
				  </div>
				  <div className="panel-body">
				    <div className="row">
    					<div className="col-xs-2">Sku: </div>
    					<div className="col-xs-10">{this.props.data.sku}</div>
    				</div>
    				<div className="row">
    					<div className="col-xs-2">Doc Key: </div>
    					<div className="col-xs-10">{this.props.data.doc_key}</div>
    				</div>
    				<div className="row">
    					<div className="col-xs-2">Web Sent: </div>
    					<div className="col-xs-10">{String(this.props.data.webSent)}</div>
    				</div>
    				<div className="row">
    					<div className="col-xs-2">Web Sent DT: </div>
    					<div className="col-xs-10">{this.props.data.webSentDatetime}</div>
    				</div>
				  </div>
				  <div className="panel-footer">
					<button className="btn btn-default" onClick={this.handleCancelClick}><i className="glyphicon glyphicon-remove"></i> Cancel</button><button style={{marginLeft:'20px'}} className="btn btn-default" onClick={this.handleSaveClick}><i className="glyphicon glyphicon-floppy-disk"></i> Save</button>
				  </div>
				</div>
            	);
        } else {
        	return (
    			<div className="panel panel-default" style={{marginTop:'20px',position: 'static',zIndex:'1'}}>
				  <div className="panel-heading">
				    <h3 className="panel-title">{this.props.data.name}</h3>
				  </div>
				  <div className="panel-body">
				    <div className="row">
    					<div className="col-xs-2">Sku: </div>
    					<div className="col-xs-10">{this.props.data.sku}</div>
    				</div>
    				<div className="row">
    					<div className="col-xs-2">Doc Key: </div>
    					<div className="col-xs-10">{this.props.data.doc_key}</div>
    				</div>
    				<div className="row">
    					<div className="col-xs-2">Web Sent: </div>
    					<div className="col-xs-10">{String(this.props.data.webSent)}</div>
    				</div>
    				<div className="row">
    					<div className="col-xs-2">Web Sent DT: </div>
    					<div className="col-xs-10">{this.props.data.webSentDatetime}</div>
    				</div>
    				<div style={{marginTop:'20px'}}>
    					<ProductEntity entities={this.props.data.Entities} />
    				</div>
				  </div>
				  <div className="panel-footer">
					<button disabled={disableVar} className="btn btn-default" onClick={this.handleEditClick}><i className="glyphicon glyphicon-pencil"></i> Edit</button>
					<button style={{marginLeft:'20px'}} onClick={this.showHistoryModal} className="btn btn-default"><i className="glyphicon glyphicon-book"></i> History</button>
				  </div>
				 {this.state.showHistory ? <ProductHistoryMaster prod={this.props.data} handleHideProductMasterHistoryModal={this.handleHideProductMasterHistoryModal} handleHideModal={this.handleHideModal} rollbackComplete={this.rollbackComplete} /> : null}
				</div>
    		);
    	}
},
handleChange: function (name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
},
handleEditClick: function () {
	this.setState({isEditMode:true,prodName:this.props.data.name});
},
handleCancelClick: function () {
	this.setState({isEditMode:false});
},
handleSaveClick: function (){
	this.setState({isEditMode:false});
	this.props.handleSaveProdClick(this.state.prodName,this.props.data)
},
showHistoryModal: function(){
	this.setState({showHistory:true});
},
handleHideProductMasterHistoryModal: function(){
	this.setState({ showHistory: false });
},
handleHideModal:function(){
	this.setState({ showHistory: false });
},
rollbackComplete: function (data,newName) {
	this.setState({ showHistory: false });
    this.props.rollbackComplete(data, newName);
}
 });


export default ProductDisplay;