import React from 'react'
import BreadCrumbComp from './breadcrumb-comp'
var BreadCrumb = React.createClass({
  render: function () {

      var disable = false
      var indxStore = this.props.storeLookup.findIndex(i => i.id === this.props.selectedStore.value);
      if (this.props.storeLookup[indxStore].store_lock == true) { disable = true }


    var editButton = <button disabled={disable} style={{ marginTop: '5px' }} onClick={this.handleEditClick} className='btn btn-default'><i className='glyphicon glyphicon-pencil' /></button>
    var splitStr = this.props.docKey.split('/')
    var nodeNameCrumb = this.props.nodeNameCrumb.split('[|]')
    return (
      <div className='row'>
        <div className='col-sm-11'>
          <BreadCrumbComp docKeySplit={splitStr} nodeNameCrumb={nodeNameCrumb}
            callbackBreadCrumbClick={this.handleBreadCrumbClick}
            selectedStore={this.props.selectedStore}
            handleClearSelectedStore={this.props.handleClearSelectedStore} />
        </div>
        <div className='col-sm-1'>{ editButton }</div>
      </div>)
  },
  handleBreadCrumbClick: function (nodeLevel, docKey, nodeNameCrumb) {
    this.props.callbackBreadCrumbClick(nodeLevel, docKey, nodeNameCrumb)
  },
  handleEditClick: function () {
    this.props.handleEditBreadCrumbText()
  },
  handleClearSelectedStore: function () {
    this.props.handleClearSelectedStore()
  }
})

export default BreadCrumb
