import React from 'react'

var VendorMockModal = React.createClass({
  componentDidMount () {
    $('#VendorMockModal').modal('show')
    $('#VendorMockModal').on('hidden.bs.modal', this.props.handleHideModal)
  },
  render: function () {
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
                </tbody>
              </table>
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
                    <th>Status</th>
                    <th>Matched Doc Key</th>
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
                        <td style={{ verticalAlign: 'middle' }}><span className="label label-warning">Partial Match</span></td>
                        <td style={{ verticalAlign: 'middle' }}>catalog/yamaha/atv</td>
                      </tr>
                </tbody>
              </table>
                </div>
            </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
})

export default VendorMockModal
