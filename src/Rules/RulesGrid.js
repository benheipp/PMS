import React from 'react'
import PropTypes from 'prop-types'
import RuleRow from './RuleRow'
import SortableTableHeader from './SortableTableHeader'

var RulesGrid = React.createClass({
  getInitialState: function () {
    return {
      sortField: 'datestamp',
      isReverseSort: false,
    }
  },
  sortBy: function (field, reverse, primer) {
    const key = x => (primer ? primer(x[field]) : x[field]);
    return ((a, b) => {
      const A = key(a);
      const B = key(b);

      if (A < B) {
        return -1 * [-1, 1][+!!reverse];
      }

      if (A > B) {
        return 1 * [-1, 1][+!!reverse];
      }

      return 0;
    });
  },
  handleClick: function (fieldToSort) {
    const sortField = this.state.sortField;
    const isReverseSort = sortField === fieldToSort ? !this.state.isReverseSort : true;

    this.setState( { sortField: fieldToSort, isReverseSort });
  },
  getPrimer: function () {
    switch (this.state.sortField) {
      case 'datestamp':
        return (a => new Date(a));
      default:
        return (a => a ? a.toUpperCase() : "");
    }
  },
  render: function () {
    const exactFilters = { 
      store_id: this.props.storeFilter,
      rule_type: this.props.ruleTypeFilter,
      edited_field: this.props.editedFieldFilter,
    };
    const includesFilter = {
      sku: this.props.skuFilter,
      doc_key: this.props.docKeyFilter,
    };
    const applyFilters = (r) => {
      for(var exactKey in exactFilters) {
        const filterValue = exactFilters[exactKey];
        if (filterValue && (r[exactKey] === undefined || r[exactKey] !== filterValue)) {
          return false;
        }
      }
      for (var includeKey in includesFilter) {
        const filterValue = includesFilter[includeKey];
        if (filterValue && (r[includeKey] === undefined || !r[includeKey].includes(filterValue))) {
          return false;
        }
      }
      return true;
    };
    const rows = this.props.rules
      .filter(applyFilters)
      .sort(this.sortBy(this.state.sortField, this.state.isReverseSort, this.getPrimer()))
      .map(r => (<RuleRow key={r.id} rule={r} storeLookup={this.props.storeLookup} rulesLookup={this.props.rulesLookup} />));
    const hasVisibleRules = rows.length > 0;
    
    return (
      hasVisibleRules ?
        <table className="table table-striped table-condensed table-hover">
          <colgroup>
            <col width="25%" />
            <col width="5%" />
            <col width="5%" />
            <col width="10%" />
            <col width="15%" />
            <col width="15%" />
            <col width="5%" />
            <col width="5%" />
            <col width="5%" />
          </colgroup>
          <thead>
            <tr>
              <SortableTableHeader text="Doc Key" field="doc_key" sort={this.handleClick} sortField={this.state.sortField} isReverseSort={this.state.isReverseSort} />
              <SortableTableHeader text="Type" field="rule_type" sort={this.handleClick} sortField={this.state.sortField} isReverseSort={this.state.isReverseSort} />
              <SortableTableHeader text="SKU" field="sku" sort={this.handleClick} sortField={this.state.sortField} isReverseSort={this.state.isReverseSort} />
              <SortableTableHeader text="Field" field="edited_field" sort={this.handleClick} sortField={this.state.sortField} isReverseSort={this.state.isReverseSort} />
              <SortableTableHeader text="Old Value" field="old_value" sort={this.handleClick} sortField={this.state.sortField} isReverseSort={this.state.isReverseSort} />
              <SortableTableHeader text="New Value" field="new_value" sort={this.handleClick} sortField={this.state.sortField} isReverseSort={this.state.isReverseSort} />
              <SortableTableHeader text="Date" field="datestamp" sort={this.handleClick} sortField={this.state.sortField} isReverseSort={this.state.isReverseSort} />
              <SortableTableHeader text="User" field="username" sort={this.handleClick} sortField={this.state.sortField} isReverseSort={this.state.isReverseSort} />
              <SortableTableHeader text="Store" field="store_name" sort={this.handleClick} sortField={this.state.sortField} isReverseSort={this.state.isReverseSort} />
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table> :
        <span>No rules meet the filtered criteria</span>
    )
  },
})

RulesGrid.PropTypes = {
  rules: PropTypes.array,
  storeFilter: PropTypes.number,
  ruleTypeFilter: PropTypes.number,
  skuFilter: PropTypes.string,
  docKeyFilter: PropTypes.string,
  editedFieldFilter: PropTypes.string,
  storeLookup: PropTypes.array,
  rulesLookup: PropTypes.array,
};

export default RulesGrid
