import React from 'react';
import BreadCrumbComp from './breadcrumb-comp'
var BreadCrumb = React.createClass({
    render: function () {

        var editButton = <button onClick={this.handleEditClick} className="btn btn-default"><i className="glyphicon glyphicon-pencil"></i></button>;
        var splitStr = this.props.docKey.split("/");
            return (
                <div className="row">
                    <div className="col-sm-11">
                      <BreadCrumbComp docKeySplit={splitStr}
                      callbackBreadCrumbClick={this.handleBreadCrumbClick}
                      selectedStore={this.props.selectedStore}
                      handleClearSelectedStore={this.props.handleClearSelectedStore}/>
                    </div>
                        <div className="col-sm-1">{ editButton }</div>
                </div>);
    },
    handleBreadCrumbClick: function (nodeLevel, docKey) {
        this.props.callbackBreadCrumbClick(nodeLevel, docKey);
    },
    handleEditClick: function() {
        this.props.handleEditBreadCrumbText();
    },
    handleClearSelectedStore: function(){
        this.props.handleClearSelectedStore();
    }
});

export default BreadCrumb;
