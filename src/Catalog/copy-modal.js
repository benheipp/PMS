import React from 'react'
import FeedBack from '../Controls/feedback'
import CopyAutoComplete from './copy-autocomplete'
var CopyModal = React.createClass({
  getInitialState: function () {
    return {
      showFeedback: false,
      feedbackResult: 0,
      feedbackMessage: '',
      selectedItem: [],
      showCopyButton: false,
      disableButtons: false,
      selectedOption: 'Copy'
    }
  },
  componentDidMount () {
    $('#CopyModal').modal('show')
    $('#CopyModal').on('hidden.bs.modal', this.props.handleHideModal)
  },
  render: function () {
    return (
      <div id='CopyModal' className='modal fade' data-keyboard='false' data-backdrop='static'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Copy/Move</h4>
            </div>
            <div className='modal-body'>
              <div className='alert alert-info' role='alert'>Copy <b>{this.props.DocKey}</b> to <b>{this.state.selectedItem.doc_key}</b></div>
              <FeedBack noTimer='true' Result={this.state.feedbackResult} Message={this.state.feedbackMessage} visible={this.state.showFeedback} delay={2000} resetFeedbackState={this.resetFeedbackState} />
              <div>
                <div className='row'>
                  <div className='col-sm-1'>
                    <table>
                          <tr>
                            <td> <input type='radio' value='Copy'
                                checked={this.state.selectedOption === 'Copy'}
                                onChange={this.handleOptionChange} /></td>
                            <td>Copy</td>
                          </tr>
                        </table>
                  </div>
                  <div className='col-sm-1'>
                    <table>
                          <tr>
                            <td> <input type='radio' value='Move'
                                checked={this.state.selectedOption === 'Move'}
                                onChange={this.handleOptionChange} /></td>
                            <td>Move</td>
                          </tr>
                        </table>
                  </div>
                </div>
              </div>
              <CopyAutoComplete selectRecord={this.selectRecord} store={this.props.store} />
              {this.state.showCopyButton ? <button disabled={this.state.disableButtons} onClick={this.handleCopy} type='button' style={{marginTop: '10px'}} className='btn btn-default'><i className='glyphicon glyphicon-copy' /> {this.state.selectedOption}</button> : null }
            </div>
            <div className='modal-footer'>
              <button disabled={this.state.disableButtons} type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  resetFeedbackState: function () {
    this.setState({ showFeedback: false })
  },
  showFeedBack: function (data) {
    this.setState({ showFeedback: true, feedbackResult: data.Result, feedbackMessage: data.Message})
  },
  selectRecord: function (item) {
    if (item.doc_key != '') {
      this.setState({selectedItem: item, showCopyButton: true})
    }
  },
  handleCopy: function () {
    if (this.state.selectedOption == 'Copy') {
      this.setState({ disableButtons: true, showFeedback: true, feedbackResult: 2, feedbackMessage: 'Copying Data...'})
      var pieces = this.props.DocKey.split('/')
      if (this.props.store == '0') {
        CopyStore0(pieces[pieces.length - 1], this.props.DocKey, this.state.selectedItem.doc_key, this.props.store, this.state.selectedItem.store_id, this.handleCopyCallback)
      } else {
        Copy(pieces[pieces.length - 1], this.props.DocKey, this.state.selectedItem.doc_key, this.props.store, this.handleCopyCallback)
      }
    } else if (this.state.selectedOption == 'Move') {
      this.setState({ disableButtons: true, showFeedback: true, feedbackResult: 2, feedbackMessage: 'Moving Data...'})
      var pieces = this.props.DocKey.split('/')
      if (this.props.store == '0') {
        MoveStore0(pieces[pieces.length - 1], this.props.DocKey, this.state.selectedItem.doc_key, this.props.store, this.state.selectedItem.store_id, this.handleCopyCallback)
      } else {
        Move(pieces[pieces.length - 1], this.props.DocKey, this.state.selectedItem.doc_key, this.props.store, this.handleCopyCallback)
      }
    }
  },
  handleCopyCallback: function (data) {
    this.setState({ disableButtons: false })
    this.showFeedBack(data)
  },
  handleOptionChange: function (changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    })
  }
})

export default CopyModal
