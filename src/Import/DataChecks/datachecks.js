import React from 'react';
import TreeView from 'treeview-react-bootstrap'
import { GetDataChecksData, StartDataCheck } from './actions';

var DataChecks = React.createClass({
  getInitialState: function () {
    return {
      inProgress: false,
      isComplete: false,
      startTime: '',
      endTime: '',
      totalChecks: 0,
      completedChecks: 0,
      dataChecks: [],
      selectedStoreId: '',
      selectedVendorId: '',
    }
  },
  componentDidMount: function () {
    this.setState({ inProgress: true });
    this.updateData();
  },
  render: function () {
    return (
      <div className='webSend-container'>
        <div className='modal-header' style={{ backgroundColor: 'rgb(51, 122, 183)', color: 'white', marginBottom: '20px' }}>
          <h4 className='modal-title'>Data Checks</h4>
        </div>
        { this.getHeader() }
        { this.state.isComplete &&
          this.getBody()
        }
      </div>
    )
  },
  getHeader: function () {
    return (
      <div>
        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-xs-2">
            <button
              type="button"
              className="btn btn-primary"
              disabled={this.state.inProgress}
              onClick={this.handleCheckDataClick}
              style={{ marginTop: '20px' }}
            >Check Data</button>
          </div>
          { this.state.isComplete &&
            <div>
              <div className="col-xs-4">
                Store: {this.getStoreDropdown()}
              </div>
              <div className="col-xs-6">
                Vendor: {this.getVendorDropdown()}
              </div>
            </div>
          }
        </div>
        <div>
          <div className="row" style={{ marginBottom: '10px' }}>
            <div className="col-xs-2">Started:</div>
            <div className="col-xs-4">{this.state.startTime}</div>
            <div className="col-xs-2">Completed:</div>
            <div className="col-xs-4">{this.state.endTime}</div>
          </div>
          <div className="row" style={{ marginBottom: '10px' }}>
            <div className="col-xs-2">Completed:</div>
            <div className="col-xs-4">{this.state.completedChecks} / {this.state.totalChecks}</div>
            <div className="col-xs-6">
              Failed checks: {this.getFailedChecks()}
            </div>
          </div>
        </div>
      </div>
    );
  },
  groupBy: function (xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  },
  getBody: function () {
    const stores = this.groupBy(this.state.dataChecks, 'StoreName');
    const tree = [];
    for(const store in stores) {
      const vendors = this.groupBy(stores[store], 'VendorName');
      const vendorNodes = [];
      for (const vendor in vendors) {
        const checkNodes = [];
        for (const c in vendors[vendor]) {
          const check = vendors[vendor][c];
          const checkNode = { text: `${check.DataCheck.Name} (${check.Count})` };
          checkNodes.push(checkNode);
        }
        const vendorNode = { text: vendor || 'No vendor', nodes: checkNodes };
        vendorNodes.push(vendorNode);
      }
      const storeNode = { text: store || 'No store', nodes: vendorNodes };
      tree.push(storeNode);
    }

    return (<TreeView data={tree} />);
  },
  getFailedChecks: function () {
    return (
      <ul className="comma-separted-list">
        { 
          [...new Set(this.state.dataChecks.map(c => c.DataCheck.Name))].map(n => (
            <li key={n}>{n}</li>
          ))
        }
      </ul>
    );
  },
  handleCheckDataClick: function () {
    this.setState({ inProgress: true });
    StartDataCheck().then(
      (data) => {
        this.endUpdateLoop();
        this.loadDataChecksData(data);
      }
    );
    this.startUpdateLoop();
  },
  updateData: function () {
    GetDataChecksData().then((data) => { this.loadDataChecksData(data) });
  },
  startUpdateLoop: function() {
    const intervalId = window.setInterval(() => { this.updateData(); }, 1000);
    this.setState({ intervalId });
  },
  endUpdateLoop: function() {
    window.clearInterval(this.state.intervalId);
  },
  getStoreDropdown: function () {
    const stores = [...new Set(this.state.dataChecks.filter(c => c.StoreId > 0).map(c => ({id: c.StoreId, name: c.StoreName })))];
    return (
      <select
        className="form-control"
        value={this.state.selectedStoreId}
        onChange={(e) => { this.setState( { selectedStoreId: e.target.value }); }}
      >
        <option value=''></option>
        {stores.map(s => (<option key={s.id} value={s.id}>{s.name}</option>))}
      </select>
    );
  },
  getVendorDropdown: function () {
    const vendors = [...new Set(this.state.dataChecks.filter(c => c.VendorId > 0).map(c => ({id: c.VendorId, name: c.VendorName })))];
    return (
      <select
        className="form-control"
        value={this.state.selectedVendorId}
        onChange={(e) => { this.setState( { selectedVendorId: e.target.value }); }}
      >
        <option value=''></option>
        {vendors.map(s => (<option key={s.id} value={s.id}>{s.name}</option>))}
      </select>
    );
  },
  loadDataChecksData: function (data) {
    if (data != null)
    {
      this.setState({
        inProgress: !data.IsComplete,
        isComplete: data.IsComplete,
        startTime: data.StartTime,
        endTime: data.EndTime,
        dataChecks: data.Results,
        completedChecks: data.CompletedChecks,
        totalChecks: data.TotalChecks,
      });
    }

    this.setState({ inProgress: false });
  }
})

export default DataChecks
