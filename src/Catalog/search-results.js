import React from 'react'
import SearchResultsRow from './search-results-row'

var SearchResults = React.createClass({
  render: function () {
    var rows = this.props.data.map(function (node) {
      return <SearchResultsRow node={node} key={node.key} copyDocKeys={this.props.copyDocKeys} quickMove={this.quickMove} />
    }, this)
    return (
<div>
  <div style={{marginBottom:'20px'}}>
  </div>
      <table className='table table-bordered table-hover table-responsive table-striped'>
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      </div>
    )
  },
quickMove: function (docKey) {
    this.props.quickMove(docKey)
  }
})

export default SearchResults
