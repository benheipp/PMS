import React from 'react'

var SearchResultsRow = React.createClass({
  render: function () {
      return (
        <tr>
          <td><button onClick={this.quickMove} className={`btn btn-sm btn-default${this.props.copyDocKeys.indexOf(this.props.node.doc_key) > -1 ? ' active' : ''}`}><i className='glyphicon glyphicon-copy' /> Quick Move</button></td>
          <td>{this.props.node.doc_key}</td>
        </tr>
      )
    },
quickMove: function () {
    this.props.quickMove(this.props.node.doc_key)
  }
})

export default SearchResultsRow
