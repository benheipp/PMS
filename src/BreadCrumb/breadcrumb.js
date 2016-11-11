import React from 'react';
var BreadCrumb = React.createClass({
    render: function () {

        var editButton = <button onClick={this.handleEditClick} className="btn btn-default"><i className="glyphicon glyphicon-pencil"></i></button>;

        var splitStr = this.props.docKey.split("/");
        if (splitStr[5] != null) {
            return (
                <div className="row">
                    <div className="col-sm-11">
            <ol className="breadcrumb">
                       <li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 1, splitStr[0]) }>{splitStr[0]}</a></li>
                       <li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 2, splitStr[0] + '/' + splitStr[1]) }>{splitStr[1]}</a></li>
                       <li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 3, splitStr[0] + '/' + splitStr[1] + '/' + splitStr[2]) }>{splitStr[2]}</a></li>
                       <li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 4, splitStr[0] + '/' + splitStr[1] + '/' + splitStr[2] + '/' + splitStr[3]) }>{splitStr[3]}</a></li>
                       <li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 5, splitStr[0] + '/' + splitStr[1] + '/' + splitStr[2] + '/' + splitStr[3] + '/' + splitStr[4])}>{splitStr[4]}</a></li>
                       <li id="licomponent">{splitStr[5]}</li>
                            </ol></div>
                        <div className="col-sm-1">{ editButton }</div>
                </div>);
        }
        if (splitStr[4] != null) {
            return (
              <div className="row">
                    <div className="col-sm-11">
            <ol className="breadcrumb">
                       <li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 1, splitStr[0]) }>{splitStr[0]}</a></li>
                       <li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 2, splitStr[0] + '/' + splitStr[1]) }>{splitStr[1]}</a></li>
                       <li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 3, splitStr[0] + '/' + splitStr[1] + '/' + splitStr[2]) }>{splitStr[2]}</a></li>
                       <li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 4, splitStr[0] + '/' + splitStr[1] + '/' + splitStr[2] + '/' + splitStr[3]) }>{splitStr[3]}</a></li>
                       <li id="licomponent">{splitStr[4]}</li>
                            </ol>
                            </div>
                        <div className="col-sm-1">{ editButton }</div>
                </div>);
        }
        if (splitStr[3] != null) {
            return (
             <div className="row">
                    <div className="col-sm-11">
            <ol className="breadcrumb">
                       <li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 1, splitStr[0]) }>{splitStr[0]}</a></li>
                       <li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 2, splitStr[0] + '/' + splitStr[1]) }>{splitStr[1]}</a></li>
                       <li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 3, splitStr[0] + '/' + splitStr[1] + '/' + splitStr[2]) }>{splitStr[2]}</a></li>
                       <li id="licomponent">{splitStr[3]}</li>
                          </ol>
                           </div>
                        <div className="col-sm-1">{ editButton }</div>
                </div>);
        }
        if (splitStr[2] != null) {
            return (
             <div className="row">
                    <div className="col-sm-11">
            <ol className="breadcrumb">
                         <li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 1, splitStr[0]) }>{splitStr[0]}</a></li>
                         <li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 2, splitStr[0] + '/' + splitStr[1]) }>{splitStr[1]}</a></li>
                         <li id="licomponent">{splitStr[2]}</li>
                    </ol></div>
                        <div className="col-sm-1">{ editButton }</div>
                </div>);
        }
        if (splitStr[1] != null) {
            return (<div className="row"> <div className="col-sm-11"><ol className="breadcrumb"><li id="lin1"><a href="#" onClick={this.handleBreadCrumbClick.bind(this, 1, splitStr[0]) }>{splitStr[0]}</a></li><li id="licomponent">{splitStr[1]}</li></ol></div><div className="col-sm-1">{ editButton }</div></div>);
        } else {
            return (<ol className="breadcrumb"><li id="licomponent">{splitStr[0]}</li></ol>);
        }
    },
    handleBreadCrumbClick: function (nodeLevel, docKey) {
        this.props.callbackBreadCrumbClick(nodeLevel, docKey);
    },
    handleEditClick: function() {
        this.props.handleEditBreadCrumbText();
    }
});

export default BreadCrumb;