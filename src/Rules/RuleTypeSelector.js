import React from 'react'
import PropTypes from 'prop-types'

var RuleTypeSelector = React.createClass({
  render: function () {
    return (
      <select className="form-control" onChange={this.props.onChange}>
        <option value="">-- Filter By Rule Type --</option>
        { this.props.ruleTypes.map((s) => 
          (<option key={s.id} value={s.rule_type}>{s.rule_type}</option>)
        )}
      </select>
    )
  },
})

RuleTypeSelector.PropTypes = {
  ruleTypes: PropTypes.array,
  onChange: PropTypes.func,
};

export default RuleTypeSelector
