import React from 'react'

var RuleDetailRow = React.createClass({
  render: function () {
      return (
        <tr>
          <td>{this.props.rule.doc_key}</td>
          <td>{this.props.rule.old_value}</td>
         <td>{this.props.rule.new_value}</td>
         <td>{this.props.rule.datestamp}</td>
         <td>{this.props.rule.username}</td>
         <td>{this.props.rule.store_name}</td>
        </tr>
      )
    }
})

export default RuleDetailRow
