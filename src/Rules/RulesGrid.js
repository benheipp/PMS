import React from 'react'
import PropTypes from 'prop-types'
import RuleRow from './RuleRow'

var RulesGrid = React.createClass({
  render: function () {
    const exactFilter = { 
      store_id: this.props.storeFilter,
      rule_type: this.props.ruleTypeFilter,
    };
    const includesFilter = {
      sku: this.props.skuFilter,
      doc_key: this.props.docKeyFilter,
    };
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
                for(var key in exactFilter) {
                  const filterValue = exactFilter[key];
                  if (filterValue > 0 && (r[key] === undefined || r[key] !== filterValue)) {
                    return false;
                  }
                }
                for (var includeKey in includesFilter) {
                  const filterValue = includesFilter[includeKey];
                  if (filterValue.length > 0 && (r[includeKey] === undefined || !r[includeKey].includes(filterValue))) {
                    return false;
                  }
                }
                return true;
              })
              .map(r => (<RuleRow key={r.id} rule={r} storeLookup={this.props.storeLookup} />))}
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
  storeLookup: PropTypes.array,
};

export default RulesGrid
