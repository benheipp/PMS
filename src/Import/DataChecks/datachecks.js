import React from 'react';
import DataCheckModal from './datacheckmodal'
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
      selectedStoreId: 0,
      selectedVendorId: 0,
      showDataModal: false,
      hasError: false,
      intervalId: 0,
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
          <div id="tree" />
        }
        { this.state.showDataModal &&
          <DataCheckModal data={this.state.selectedDataCheck} handleHideModal={this.handleHideModal} />
        }
      </div>
    )
  },
  handleHideModal: function () {
    this.setState({ showDataModal: false });
    $('#tree').treeview('getSelected').forEach(n => {
      $('#tree').treeview('unselectNode', n);
    });    
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
          { this.state.hasError &&
            <div className="row" style={{ marginBottom: '10px' }}>
              <div className="alert alert-danger">
                There was an error checking the data. Please run the check again.
                <ul>
                  { this.state.dataChecks.filter(d => d.HasError).map(e =>
                      (<li key={e.Id}>{e.DataCheck.Name}: {e.ErrorMessage}</li>)
                    )
                  }
                </ul>
              </div>
            </div>
          }
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
  getCheckColor: function (dataCheck) {
    return dataCheck.AllowUploadOnFailure ? '#33AC00' : '#ff3600';
  },
  getTreeData: function () {
    const selectedStoreId = Number(this.state.selectedStoreId);
    const selectedVendorId = Number(this.state.selectedVendorId);
    const filteredDataChecks = this.state.dataChecks
      .filter(d => (
        (selectedStoreId > 0 ? d.StoreId === selectedStoreId : true)
        && (selectedVendorId > 0 ? d.VendorId === selectedVendorId : true)
      ));

    const stores = this.groupBy(filteredDataChecks, 'StoreName');
    const tree = [];
    for(const store in stores) {
      const vendors = this.groupBy(stores[store], 'VendorName');
      const vendorNodes = [];
      for (const vendor in vendors) {
        const checkNodes = [];
        for (const c in vendors[vendor]) {
          const check = vendors[vendor][c];
          const color = this.getCheckColor(check.DataCheck);
          const checkNode = {
            text: `${check.DataCheck.Name} (${check.Count})`,
            tags:[`${check.Count}`],
            color: color,
            dataCheck: check,
          };
          checkNodes.push(checkNode);
        }
        const vendorNode = { text: vendor !== 'null' ? vendor : 'No vendor', nodes: checkNodes, selectable: false };
        vendorNodes.push(vendorNode);
      }
      const storeNode = { text: store !== 'null' ? store : 'No store', nodes: vendorNodes, selectable: false };
      tree.push(storeNode);
    }

    return tree;
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
        this.loadDataChecksData(data);
      }
    );
    this.startUpdateLoop();
  },
  updateData: function () {
    GetDataChecksData().then((data) => {
      if (data.IsComplete) { this.endUpdateLoop(); }
      else if (this.state.intervalId === 0) {
        this.startUpdateLoop();
      }

      this.loadDataChecksData(data);
    });
  },
  startUpdateLoop: function() {
    const intervalId = window.setInterval(() => { this.updateData(); }, 1500);
    this.setState({ intervalId });
  },
  endUpdateLoop: function() {
    window.clearInterval(this.state.intervalId);
    this.setState({ intervalId: 0 });
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
  selectNode(data) {
    this.setState({ showDataModal: true, selectedDataCheck: data });
  },
  loadDataChecksData: function (data) {
    const _this = this;
    
    if (data != null)
    {
      _this.setState({
        inProgress: !data.IsComplete,
        isComplete: data.IsComplete,
        startTime: data.StartTime,
        endTime: data.EndTime,
        dataChecks: data.Results,
        completedChecks: data.CompletedChecks,
        totalChecks: data.TotalChecks,
        hasError: data.HasError,
      });
    }

    $('#tree').treeview(
      {
        data: _this.getTreeData(),
        levels: 3,
        onNodeSelected: function(event, data) {
          _this.selectNode(data)
        }
      }
    );

    _this.setState({ inProgress: false });
  }
})

export default DataChecks
