import React from 'react'
import RuleDetailRow from './ruledetailrow'

var CatalogTypeRules = React.createClass({
  getInitialState: function () {
    return {
      rules: [],
      page: 1,
      pageCount: 0,
      pagesVisible: 20,
      numberPerPage: 20
    }
  },
  componentDidMount: function () {
    GetRulesByType('catalog_type_id_rule',this.callBackReturnData)
  },
  render: function () {
    const pageButtons = []
    var visiblePages = Math.ceil(this.state.page / this.state.pagesVisible)
    var styleDisplay = ''
    for (let i = 1; i <= this.state.pageCount; i += 1) {
      if (Math.ceil(i / this.state.pagesVisible) === visiblePages) {
        styleDisplay = 'block'
      } else {
        styleDisplay = 'none'
      }

      pageButtons.push(<li key={i} className={i === this.state.page ? 'active' : ''} style={{display: styleDisplay}}>
        <a
          href='#entity'
          onClick={() => this.setPageNumber(i)}
              >{i}
        </a>
      </li>)
    }

    if (this.state.page == 1) {
      var rows = this.state.rules.slice(0, this.state.numberPerPage).map(function (rule) {
        return <RuleDetailRow rule={rule} key={rule.key} />
      }, this)
    } else {
      var rows = this.state.rules.slice(((this.state.page - 1) * this.state.numberPerPage), (this.state.page * this.state.numberPerPage)).map(function (rule) {
        return <RuleDetailRow rule={rule} key={rule.key} />
      }, this)
    }

    return (
      <div>
        <table className='table table-striped table-hover' id='entity'>
          <tr>
            <th style={{width:'300px'}}>Doc Key</th>
            <th>Node Level</th>
            <th>Type</th>
            <th>Date/Time</th>
            <th>Username</th>
            <th>Store </th>
          </tr>
          {rows}
        </table>
        <div>
          <ul className='pagination' style={{ width: '1000px', marginTop: '5px' }}>
            <li className='page-item' >
              <a className='page-link' href='#entity' onClick={() => { if (this.state.page > 1) { this.setPageMinus() } }}>« Back</a>
            </li>
            {pageButtons}
            <li><a href='#entity' disabled={this.state.page === this.state.pageCount} onClick={() => { if (this.state.page < this.state.pageCount) { this.setPagePlus() } }}>Next »</a></li>
          </ul>
        </div>
      </div>)
  },
  callBackReturnData: function (data) {
    var pc = Math.ceil(data.length / this.state.numberPerPage)
    this.setState({pageCount: pc, page: this.state.page, rules: data})
  },
  setPageMinus: function () {
    this.setState({page: this.state.page - 1})
  },
  setPagePlus: function () {
    this.setState({page: this.state.page + 1})
  },
  setPageNumber: function (i) {
    this.setState({page: i})
  }
})

export default CatalogTypeRules
