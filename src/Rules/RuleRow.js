import React from 'react'
import PropTypes from 'prop-types'

var RuleRow = React.createClass({
  getRuleDescription: function () {
    const ruleType = this.props.rulesLookup.find(r => r.rule_type === this.props.rule.rule_type);
    return ruleType ? ruleType.description : null;
  },
  render: function () {
    const datestamp = new Date(this.props.rule.datestamp);
    return (
      <tr>
        <td>
          {this.props.rule.doc_key}
        </td>
        <td>
          <span style={{ cursor: 'help' }} title={this.getRuleDescription()}>{this.props.rule.rule_type}</span>
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
  rulesLookup: PropTypes.array,
};

export default RuleRow
