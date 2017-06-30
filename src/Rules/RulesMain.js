import React from 'react'
import StoreSelector from './StoreSelector'
import RuleTypeSelector from './RuleTypeSelector'
import SkuFilter from './SkuFilter'
import DocKeyFilter from './DocKeyFilter'
import RulesGrid from './RulesGrid'
import EditedFieldFilter from './EditedFieldFilter'

var RulesMain = React.createClass({
  getInitialState: function () {
    return {
      stores: [],
      ruleTypes: [],
      rules: [],
      storeFilter: 0,
      ruleTypeFilter: "",
      docKeyFilter: "",
      skuFilter: "",
      editedFieldFilter: "",
    }
  },
  componentWillMount: function () {
    if (!localStorage.RuleVisibility) {
      localStorage.clear()
      window.location.href = '/login'
    }
  },
  componentDidMount: function () {
    GetStoreLookups(this.loadStores)
    GetRuleTypes(this.loadRuleTypes)
    GetRules(this.loadRules)
  },
  loadRules: function (data) {
    this.setState({ rules: data });
  },
  loadStores: function (data) {
    this.setState({ stores: data });
  },
  loadRuleTypes: function (data) {
    this.setState({ ruleTypes: data });
  },
  setStoreFilter: function (event) {
    const storeFilter = parseInt(event.target.value);
    this.setState({ storeFilter });
  },
  setRuleTypeFilter: function (event) {
    this.setState({ ruleTypeFilter: event.target.value });
  },
  setSkuFilter: function (event) {
    this.setState({ skuFilter: event.target.value });
  },
  setDocKeyFilter: function (event) {
    this.setState({ docKeyFilter: event.target.value });
  },
  setEditedFieldFilter: function (event) {
    this.setState({ editedFieldFilter: event.target.value });
  },
  render: function () {
    return (
      <div>
        <div className="container">
          <h4>Filters</h4>
          <div className="row">
            <div className="col-xs-4">
              <StoreSelector stores={this.state.stores} onChange={this.setStoreFilter} />
            </div>
            <div className="col-xs-4">
              <RuleTypeSelector ruleTypes={this.state.ruleTypes} onChange={this.setRuleTypeFilter} />
            </div>
            <div className="col-xs-4">
              <EditedFieldFilter onChange={this.setEditedFieldFilter} editedFields={[...new Set(this.state.rules.map(r => r.edited_field))].filter(f => f)} />
            </div>
          </div>
          <div className="row top-10">
            <div className="col-xs-4">
              <DocKeyFilter onChange={this.setDocKeyFilter} />
            </div>
            <div className="col-xs-4">
              <SkuFilter onChange={this.setSkuFilter} />
            </div>
          </div>
        </div>
        { this.state.rules.length > 0 &&
          <div style={{ margin: '0 2%' }}>
            <h4>Rules</h4>
            <RulesGrid
              rules={this.state.rules}
              skuFilter={this.state.skuFilter}
              docKeyFilter={this.state.docKeyFilter}
              storeFilter={this.state.storeFilter}
              ruleTypeFilter={this.state.ruleTypeFilter}
              editedFieldFilter={this.state.editedFieldFilter}
              storeLookup={this.state.stores}
              rulesLookup={this.state.ruleTypes}
            />
          </div>
        }
      </div>
    )
  }
});

export default RulesMain;
