import React from 'react'
import PropTypes from 'prop-types'

var RuleRow = React.createClass({
  render: function () {
    const datestamp = new Date(this.props.rule.datestamp);
    return (
      <tr>
        <td>
          {this.props.rule.doc_key}
        </td>
        <td>
          {this.props.rule.rule_type}
        </td>
        <td>
          {this.props.rule.sku}
        </td>
        <td>
          {this.props.rule.edited_field}
        </td>
        <td>
          {this.props.rule.old_value}
        </td>
        <td>
          {this.props.rule.new_value}
        </td>
        <td>
          <span title={datestamp.toLocaleString()} >{datestamp.toLocaleDateString()}</span>
        </td>
        <td>
          {this.props.rule.username}
        </td>
        <td>
          {this.props.rule.store_name}
        </td>
      </tr>
    )
  },
})

RuleRow.PropTypes = {
  rule: PropTypes.object,
  storeLookup: PropTypes.array,
};

export default RuleRow
