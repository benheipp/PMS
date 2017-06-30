import React from 'react'

var MissingCatalogTypeRow = React.createClass({
  render: function () {
      return (
         <div className='row'>
          <div className='col-sm-4'>
            {this.props.data.name}
          </div>
          <div className='col-sm-4'>
            {this.props.data.value}
          </div>
        </div>
      )
    }
})

export default MissingCatalogTypeRow
