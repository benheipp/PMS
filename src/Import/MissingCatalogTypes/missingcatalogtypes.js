import React from 'react'
import MissingCatalogTypeRow from './missingcatalogtype-row'

var MissingCatalogTypes = React.createClass({
  getInitialState: function () {
    return {
      missingdata: [],
    }
  },
  componentDidMount: function () {
    GetMissingCatalogTypes(this.missingCallback)
  },
  render: function () {

 var rows = this.state.missingdata.map(function (data) {
        return <MissingCatalogTypeRow data={data} key={data.key} />
      }, this)

    return (
        <div>
          {rows}
        </div>)
  },
  missingCallback: function (data) {
    this.setState({missingdata: data})
  }
})

export default MissingCatalogTypes
