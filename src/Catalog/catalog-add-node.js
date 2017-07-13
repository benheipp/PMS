import React from 'react'

var CatalogAddNode = React.createClass({
  getInitialState: function () {
    return {
      newDocKey: this.props.doc_key + '/',
      newName: '',
      newNodeKey:'',
      error: false,
      errorMessage: ''
    }
  },
  componentDidMount () {
    $('#CatalogAddNode').modal('show')
    $('#CatalogAddNode').on('hidden.bs.modal', this.props.handleHideModal)
  },
  render: function () {

    return (
      <div id='CatalogAddNode' className='modal fade'>
        <div className='modal-dialog modal-lg' style={{width:'600px'}}>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              <h4 className='modal-title'>Add Catalog Node</h4>
            </div>
            <div className='modal-body'>
              {this.state.error ? <div className='alert alert-warning'><strong>Warning</strong> {this.state.errorMessage}</div> : null }
              <div className="row">
                <div className='col-sm-3'>
                  Node Name:
                </div>
                 <div className='col-sm-9'>
                   <input type='text' className='form-control' id='txtNodeInput' value={this.state.newName} onChange={this.handleInputChange}  onBlur={this.validate} />
                </div>
              </div>
              <div className="row" style={{marginTop:'10px'}}>
                <div className='col-sm-3'>
                  New Doc Key:
                </div>
                 <div className='col-sm-9'>
                   <input disabled type='text' className='form-control' id='txtNewDocKey' value={this.state.newDocKey} />
                </div>
              </div>
            </div>
             <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal'>Cancel</button>
              <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={this.handleAddNodeClick}>Add</button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  handleInputChange: function (event) {
    this.setState({ newName: event.target.value })
    this.setState({ newDocKey: this.props.doc_key + '/' + formatNameKey(event.target.value),newNodeKey:formatNameKey(event.target.value) })
  },
  handleAddNodeClick: function(event) {
   if (this.state.error == false && this.state.newName != '') {
              AddNewDocKey(this.state.newDocKey,this.props.doc_key,this.state.newName,this.state.newNodeKey,this.props.store_id, this.handleAddNodeCallback)
   }
  },
  handleAddNodeCallback: function(data){
    this.props.showFeedBack(data)
    this.props.reloadData(this.props.doc_key,this.props.nodeName,this.props.nodeLevel)
  },
  validate: function () {
    var Err = false
    var ErrMessage = ''

    if (this.state.newName == '') {
      this.setState({error: true, errorMessage: 'Node Name is required'})
      return
    }
    this.setState({error: false, errorMessage: ''})
  }
})

export default CatalogAddNode
