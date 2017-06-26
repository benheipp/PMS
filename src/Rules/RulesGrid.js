import React from 'react'
import PropTypes from 'prop-types'
import RuleRow from './RuleRow'

var RulesGrid = React.createClass({
  render: function () {
    const hasRules = this.props.rules && this.props.rules.length > 0;
    return (
      hasRules &&
        <table className="table table-striped table-condensed table-hover">
          <thead>
            <tr>
              <th>Doc Key</th>
              <th>Type</th>
              <th>SKU</th>
              <th>Field</th>
              <th>Old Value</th>
              <th>New Value</th>
              <th>Date</th>
              <th>Username</th>
              <th>Store</th>
            </tr>
          </thead>
          <tbody>
            { this.props.rules
              .filter(r => {
                const isStore = this.props.storeFilter <= 0 || r.store_id === this.props.storeFilter;
                const isType = !this.props.ruleTypeFilter || r.rule_type === this.props.ruleTypeFilter;
                const isSku = !this.props.skuFilter || r.sku.includes(this.props.skuFilter);
                const isDocKey = !this.props.docKeyFilter || r.doc_key.includes(this.props.docKeyFilter);

                return isStore && isType && isSku && isDocKey;
              })
              .map(r => (<RuleRow key={r.id} rule={r} />))}
          </tbody>
        </table>
    )
  },
})

RulesGrid.PropTypes = {
  rules: PropTypes.array,
  storeFilter: PropTypes.number,
  ruleTypeFilter: PropTypes.number,
  skuFilter: PropTypes.string,
  docKeyFilter: PropTypes.string,
};

export default RulesGrid
