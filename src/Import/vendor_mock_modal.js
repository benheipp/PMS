import React from 'react'
import TreeView from 'treeview-react-bootstrap'
import VendorMockVisualize from './vendor_mock_visualize'

var VendorMockModal = React.createClass({
  componentDidMount () {
    $('#VendorMockModal').modal('show')
    $('#VendorMockModal').on('hidden.bs.modal', this.props.handleHideModal)
  },
  getInitialState: function () {
    return {
      showVisual: false,
    }
  },
  showVisual: function() {
    this.setState({showVisual:true})
  },
  handleHideModal: function() {
    this.setState({showVisual:false})
  },
  render: function () {

var tree = [
  {
    text: "Yamaha",
    nodes: [
      {
        text: "ATV",
        nodes: [
          {
            text: "2018",
            nodes: [
            {
              text: "KODIAK 700 EPS 4WD - YFM70KPAHL",
              nodes: [
              {
              text: "CLUTCH"
            }
              ]
            },
            {
              text: "NEW MODEL",
               nodes: [
              {
                text: "CLUTCH"
              }
               ]
            }
            ]
          }
        ]
      }
    ]
  }
];




    return (
      <div id='VendorMockModal' className='modal fade'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Viewing Changed Records</h4>
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-sm-12'>
                <table className="table table-striped">
                <thead>
                  <tr>
                    <th></th>
                    <th>vendor_id</th>
                    <th>sku</th>
                    <th>name</th>
                    <th>n1</th>
                    <th>n2</th>
                    <th>n3</th>
                    <th>n4</th>
                    <th>n5</th>
                  </tr>
                </thead>
                <tbody>
                      <tr>
                        <td>
                          <button type="button" className="btn btn-sm btn-danger">
                            Remove
                          </button>
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>99</td>
                        <td style={{ verticalAlign: 'middle' }}>34234343</td>
                        <td style={{ verticalAlign: 'middle' }}>Piston Kit - Standard Bore 66.40mm</td>
                        <td style={{ verticalAlign: 'middle' }}>yamaha</td>
                        <td style={{ verticalAlign: 'middle' }}>ATV</td>
                        <td style={{ verticalAlign: 'middle' }}>2018</td>
                        <td style={{ verticalAlign: 'middle' }}>KODIAK 700 EPS 4WD - YFM70KPAHL</td>
                        <td style={{ verticalAlign: 'middle' }}>CLUTCH</td>
                      </tr>
                       <tr>
                        <td>
                          <button type="button" className="btn btn-sm btn-danger">
                            Remove
                          </button>
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>99</td>
                        <td style={{ verticalAlign: 'middle' }}>2342343</td>
                        <td style={{ verticalAlign: 'middle' }}>Bolt</td>
                        <td style={{ verticalAlign: 'middle' }}>yamaha</td>
                        <td style={{ verticalAlign: 'middle' }}>ATV</td>
                        <td style={{ verticalAlign: 'middle' }}>2018</td>
                        <td style={{ verticalAlign: 'middle' }}>KODIAK 700 EPS 4WD - YFM70KPAHL</td>
                        <td style={{ verticalAlign: 'middle' }}>CLUTCH</td>
                      </tr>
                      <tr>
                        <td>
                          <button type="button" className="btn btn-sm btn-danger">
                            Remove
                          </button>
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>99</td>
                        <td style={{ verticalAlign: 'middle' }}>8567656</td>
                        <td style={{ verticalAlign: 'middle' }}>O-Ring</td>
                        <td style={{ verticalAlign: 'middle' }}>yamaha</td>
                        <td style={{ verticalAlign: 'middle' }}>ATV</td>
                        <td style={{ verticalAlign: 'middle' }}>2018</td>
                        <td style={{ verticalAlign: 'middle' }}>KODIAK 700 EPS 4WD - YFM70KPAHL</td>
                        <td style={{ verticalAlign: 'middle' }}>CLUTCH</td>
                      </tr>
                     <tr>
                        <td>
                          <button type="button" className="btn btn-sm btn-danger">
                            Remove
                          </button>
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>99</td>
                        <td style={{ verticalAlign: 'middle' }}>3423677</td>
                        <td style={{ verticalAlign: 'middle' }}>Spring</td>
                        <td style={{ verticalAlign: 'middle' }}>yamaha</td>
                        <td style={{ verticalAlign: 'middle' }}>ATV</td>
                        <td style={{ verticalAlign: 'middle' }}>2018</td>
                        <td style={{ verticalAlign: 'middle' }}>NEW MODEL</td>
                        <td style={{ verticalAlign: 'middle' }}>CLUTCH</td>
                      </tr>
                </tbody>
              </table>
              {this.state.showVisual ? <VendorMockVisualize handleHideModal={this.handleHideModal} /> : null}
                </div>
              </div>
            <div className='row'>
                <div className='col-sm-12'>
                  <h3>Doc Keys</h3>
                   <table className="table table-striped">
                <thead>
                  <tr>
                    <th></th>
                    <th>Doc Key</th>
                    <th>Parent Status</th>
                    <th>Parent Match</th>
                  </tr>
                </thead>
                <tbody>
                      <tr>
                        <td>
                          <button type="button" className="btn btn-sm btn-danger">
                            Remove
                          </button>
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>catalog/yamaha/atv/2018/kodiak-700-eps-4wd-yfm70pahl/clutch</td>
                        <td style={{ verticalAlign: 'middle' }}><span className="label label-success">Parent Match</span></td>
                        <td style={{ verticalAlign: 'middle' }}>catalog/yamaha/atv</td>
                      </tr>
                      <tr>
                        <td>
                          <button type="button" className="btn btn-sm btn-danger">
                            Remove
                          </button>
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>catalog/yamaha/atv/2018/new-model/clutch</td>
                        <td style={{ verticalAlign: 'middle' }}><span className="label label-success">Parent Match</span></td>
                        <td style={{ verticalAlign: 'middle' }}>catalog/yamaha/atv</td>
                      </tr>
                </tbody>
              </table>
                </div>
            </div>
            </div>
            <div className='modal-footer'>
              <div className='row'>
                <div className='col-sm-2'>
                  <h4>Import to:</h4>
                </div>
                <div className='col-sm-3'>
             <select className="form-control"><option value=""></option>
            <option value="Boats">Boats</option>
            <option value="Partzilla">Partzilla</option>
            <option value="Firedog">Firedog</option></select>
                </div>
                <div className='col-sm-1'>
                  <button type='button' className='btn btn-success' data-dismiss='modal'>Import</button>
                </div>
                 <div className='col-sm-1'>
                  <button type='button' className='btn btn-primary' onClick={this.showVisual}>Visualize</button>
                </div>
                <div className='col-sm-5'>
                     <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
                </div>
              </div>
  

            </div>
          </div>
        </div>
      </div>

    )
  }
})

export default VendorMockModal
