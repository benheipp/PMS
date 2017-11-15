import React from 'react'
import ProgressBar from './progressbar'
import TimerMixin from 'react-timer-mixin'
import PendingItemsModal from './pending-modal'
import { VerifyDataCheck } from './DataChecks/actions';

var WebSendComponent = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function () {
    return {
      counter: 0,
      webSendInProgress: false,
      intervalId: 0,
      totalRecordsSendClick: 0,
      showPendingItems: false,
      selectedStore: '0',
      StatusData: {
        status_message: '',
        percent_complete: 0,
        catalog_records_remaining: 0,
        product_records_remaining: 0,
        last_checked: '',
        status_flag: true,
        send_flag: false,
        storeId: 0,
        isTimerPaused: true
      }
    }
  },
  componentDidMount: function () {
      GetCurrentImportStatus(this.getCurrentImportStatusCallback)
      this.initTimer()
  	},
    initTimer: function () {
      if (this.state.intervalId === 0) {
        var intId = this.setInterval(() => {
          if (this.state.counter >= 15) {
            GetCurrentImportStatus(this.getCurrentImportStatusCallback)
            this.setState({
              counter: 0
            })
          } else {
            this.setState({
              counter: this.state.counter + 1
            })
          }
        }, 1000)
        this.setState({intervalId: intId, isTimerPaused: false})
      }
    },
    pauseTimer: function () {
      this.setState({ isTimerPaused: true, intervalId: 0 })
      this.clearInterval(this.state.intervalId)
    },
  	handleSendToWebClick: function () {
      var _this = this;
  		var statusData = _this.state.StatusData
  		if (_this.state.selectedStore == '0') {
  			statusData.status_message = 'Select a store.'
  			_this.setState({StatusData: statusData })
  			return
      }

      _this.setState({ dataCheckMessage: 'Running data check... '});
      VerifyDataCheck(_this.state.selectedStore).then(
        (results) => {
          if (results.Result.Result === 'Success') {
            _this.setState({ dataCheckMessage: undefined, dataCheckError: false });
            _this.startSendToWeb();
          } else {
            _this.setState({ dataCheckMessage: results.Message, dataCheckError: true });
          }
        }
      )
    },
    startSendToWeb: function () {
      return;
      var statusData = this.state.StatusData
      var totalRecords = statusData.catalog_records_remaining + statusData.product_records_remaining
  		
      statusData.status_message = 'Queueing data...'
  		statusData.send_flag = true
  		this.setState({totalRecordsSendClick: totalRecords, StatusData: statusData })
      UpdateWebSent(0, this.state.selectedStore, this.updateWebSentFlagCallback)
    },
  	handleCancelClick: function () {
  		var statusData = this.state.StatusData
  		if (statusData.send_flag == false) {
  			statusData.status_message = 'Nothing to cancel!'
  			this.setState({StatusData: statusData })
  			return
  		}
  		statusData.status_message = 'Cancelling send...'
  		statusData.send_flag = false
  		this.setState({totalRecordsSendClick: 0, StatusData: statusData })
      this.pauseTimer()
      UpdateSendToWebFlag(false, 'Cancelled', this.state.selectedStore, this.updateSendToWebFlagCallback)
      UpdateWebSent(1, this.state.selectedStore, this.updateWebSentFlagCallback)
  	},
  	updateSendToWebFlagCallback: function (data) {
  		if (data.Result.Result == 'Error') {
      UpdateWebSent(1, this.state.selectedStore, this.updateWebSentFlagCallback)
  }
  	},
  updateWebSentFlagCallback: function (data, webSentFlag) {
    console.log(webSentFlag);
    if (webSentFlag == 1)
    {
      this.initTimer()
    } else {
      UpdateSendToWebFlag(true, 'Preparing to send...', this.state.selectedStore, this.updateSendToWebFlagCallback)
    }
  },
  	getCurrentImportStatusCallback: function (data) {
  		var statusData = this.state.StatusData
  		statusData.status_message = data.status_message
  		statusData.catalog_records_remaining = data.catalog_records_remaining
  		statusData.product_records_remaining = data.product_records_remaining
  		statusData.last_checked = data.last_checked
  		statusData.status_flag = data.status_flag
  		statusData.send_flag = data.send_flag
  		statusData.percent_complete = data.percent_complete
      statusData.storeId = data.storeId
  		this.setState({StatusData: statusData, selectedStore: data.storeId})
  	},
  handleViewPendingClick: function () {
    this.setState({showPendingItems: true})
  },
  handleHidePendingModal: function () {
    this.setState({showPendingItems: false})
  },
  handleStoreSelectChange: function (event) {
    this.setState({selectedStore: event.target.value})
  },
  createStoreItems: function () {
    let items = []
    items.push(<option value='0' />)
    for (let i = 0; i < this.props.storeLookup.length; i++) {
      items.push(<option key={i} value={this.props.storeLookup[i].id}>{this.props.storeLookup[i].store_name}</option>)
    }
    return items
  },
  render: function () {
    	var styleMargin25 = {
      marginTop: 50,
      borderRadius: '4px',
      backgroundColor: 'grey'
    }

    var countDown = (15 - this.state.counter)

    	return (
      <div className='webSend-container'>
        <div className='modal-header' style={{ backgroundColor: 'rgb(51, 122, 183)', color: 'white' }}><h4 className='modal-title'>Data Export</h4></div>
        <table className='table table-striped'>
          <tr><td><br /></td></tr>
          <tr>
            <td><strong>Pending Catalog Items</strong></td>
            <td><strong>Pending Products</strong></td>
            <td>{ this.state.showPendingItems ? <PendingItemsModal handleHidePendingModal={this.handleHidePendingModal} /> : null } </td>
          </tr>
          <tr>
            <td>{this.state.StatusData.catalog_records_remaining}</td>
            <td>{this.state.StatusData.product_records_remaining}</td>
            <td><button className='btn btn-info' onClick={this.handleViewPendingClick}>View Pending Items</button></td>
          </tr>
        </table>
        <div className='row'>
          <div className='col-sm-3'>
            <strong>Select a Store</strong>
            <select className='form-control' value={this.state.selectedStore} style={{width: '300px'}} onChange={this.handleStoreSelectChange}>
              {this.createStoreItems()}
            </select>
          </div>
        </div>
        <div className='row'>
                        &nbsp;
        </div>
        <div className='row'>
          <div className='col-sm-3'>
            <button disabled={this.state.StatusData.send_flag || this.state.selectedStore == ''} className='btn btn-success' onClick={this.handleSendToWebClick}><span className='glyphicon glyphicon-arrow-up' aria-hidden='true' /> Send to Titan</button>
          </div>
          <div className='col-sm-3'>
            <button disabled={!this.state.StatusData.send_flag} type='button' className='btn btn-danger' onClick={this.handleCancelClick}><span className='glyphicon glyphicon-remove' aria-hidden='true' /> Cancel</button>
          </div>

        </div>
        { this.state.dataCheckMessage &&
          <div className={`alert alert-${this.state.dataCheckError ? 'danger' : 'info'}`} style={{ marginTop: '10px' }}>
            {this.state.dataCheckMessage}
            { this.state.dataCheckError &&
              <a href="#dataChecks" className="alert-link" style={{ display: 'block' }}>View data checks</a>
            }
          </div>
        }
        { !this.state.dataCheckMessage &&
          <div className='row'>
            <div className='col-sm-12'>
              <ProgressBar data={this.state.StatusData} />
            </div>
          </div>
        }
        <div className='row'>
          <div className='col-sm-6'>
            <strong>Last Updated: {this.state.StatusData.last_checked} </strong>
          </div>
        </div>
      </div>
    )
  }
})

export default WebSendComponent
