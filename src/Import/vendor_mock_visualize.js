import React from 'react'
import TreeView from 'treeview-react-bootstrap'

var VendorMockVisualize = React.createClass({
  componentDidMount () {
    $('#VendorMockVModal').modal('show')
    $('#VendorMockVModal').on('hidden.bs.modal', this.props.handleHideModal)
  },
  render: function () {

var tree = [
  {
    text: "Yamaha",
      	expanded: false,
    nodes: [
      {
        text: "ATV",
        nodes: [
          {
            text: "2018",
                state: {
  	expanded: false
  },
            nodes: [
            {
              text: "KODIAK 700 EPS 4WD - YFM70KPAHL",
                  state: {
  	expanded: false
  },
              nodes: [
              {
              text: "CLUTCH"
            }
              ]
            },
            {
              text: "NEW MODEL",
                  state: {
  	expanded: false
  },
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
      <div id='VendorMockVModal' className='modal fade'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Visualizing New Records</h4>
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-sm-12'>
                <TreeView data={tree} selectable={false} levels={1} showBorder={false} />
                </div>
               </div>
            </div>
             <div className='modal-footer'>
              <div className='row'>
                <div className='col-sm-12'>
                   <button type='button' className='btn btn-default' onClick={this.closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  },
  closeModal: function(){
    this.props.handleHideModal()
  }
})

export default VendorMockVisualize
