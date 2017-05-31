import React from 'react'
import ProductEntityRow from './product-entity-row'
var ProductEntity = React.createClass({
	    render: function () {
	    var rows = this.props.entities.map(function (entity) {
      return <ProductEntityRow entity={entity} key={entity.key} SaveEnityData={this.SaveEnityData} />
    }, this)
	    	return (
  <div className='row'>
    <div className='col-sm-12'>
      {rows}
    </div>
  </div>
	    	)
	    },
  SaveEnityData: function (edited_field, old_value, new_value, entityId) {
    this.props.SaveEnityData(edited_field, old_value, new_value, entityId)
  }

})

export default ProductEntity
