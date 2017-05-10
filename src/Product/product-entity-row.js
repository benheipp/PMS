import React from 'react';
var ProductEntityRow = React.createClass({
	 getInitialState: function() {
        return {
            isEditMode: false,
            entityVal: this.props.entity.value,
        };
    },
	    render: function () {

 		 if (this.state.isEditMode) {
	    		return (<div className="row">
	    			<div className="col-sm-4">
	    			Entity Type:{this.props.entity.type}
	    			</div>
	    			<div className="col-sm-6">
	    			  <input type="text" className="form-control" id="txtEntity" value={this.state.entityVal} onChange={this.handleChange.bind(this, 'entityVal')} />
	    			</div>
	    			<div className="col-sm-1">
	    			  <button onClick={this.handleCancelClick} className="btn btn-sm btn-default"><i className="glyphicon glyphicon-remove"></i> Cancel</button>
	    			</div>
						<div className="col-sm-1">
	    				<button onClick={this.handleSaveClick.bind(this, this.props.entity.type, this.props.entity.value, this.state.entityVal, this.props.entity.entityId)} className="btn btn-sm btn-default"><i className="glyphicon glyphicon-floppy-disk"></i> Save</button>
	    			</div>
	    			</div>);
          } else {
	    		return (
	    			<div className="row">
	    				<div className="col-sm-4">
	    				Entity Type:{this.props.entity.type}
	    				</div>
	    				<div className="col-sm-6">
	    				{this.state.entityVal}
	    				</div>
	    				<div className="col-sm-1">
	    				  <button onClick={this.handleEditClick} className="btn btn-sm btn-default"><i className="glyphicon glyphicon-pencil"></i> Edit</button>
	    				</div>
	    			</div>);
          }
	    },
handleChange: function (name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
},
handleEditClick: function(){
	this.setState({isEditMode:true});
},
handleCancelClick: function(){
	this.setState({isEditMode:false});
},
handleSaveClick: function(edited_field, old_value, new_value, entityId){
	this.props.SaveEnityData(edited_field, old_value, new_value, entityId);
	this.setState({isEditMode:false});
}
});

export default ProductEntityRow;
