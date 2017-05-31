import React from 'react'
import CatalogDisabledRow from './catalog-disabled-row'

var CatalogDisabled = React.createClass({
  getInitialState: function () {
    return {
      nodes: [],
      noResultsMessage: false,
      page: 0,
      pageCount: 0,
      pagesVisible: 20,
      numberPerPage: 50
    }
  },
  componentWillMount: function () {
    getNodeList(1, null, [], this.props.selectedStore.value, 1, this.handleNewData)
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.docKey != this.props.docKey) {
      getNodeList(1, nextProps.docKey, [], this.props.selectedStore.value, 1, this.handleNewData)
    }
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
          href='#unpaidBalancesTable'
          onClick={() => this.setPageNumber(i)}
              >{i}
        </a>
      </li>)
    }

    if (this.state.page == 1) {
      var rows = this.state.nodes.slice(0, this.state.numberPerPage).map(function (node) {
        return <CatalogDisabledRow node={node} key={node.key} />
      }, this)
    } else {
      var rows = this.state.nodes.slice(((this.state.page - 1) * this.state.numberPerPage), (this.state.page * this.state.numberPerPage)).map(function (node) {
        return <CatalogDisabledRow node={node} key={node.key} />
      }, this)
    }
    return (
      <div>
        <h3 className='text-danger'>Disabled Items</h3>
        <table className='table table-striped' id='Disabled'>
          <tbody>
            <tr>
              <td><b>Node</b></td>
            </tr>
            {rows}
            {this.state.noResultsMessage ? <h4>No Results</h4> : null }
          </tbody>
        </table>
        <div>
          <ul className='pagination' style={{ width: '1000px', marginTop: '5px' }}>
            <li className='page-item' >
              <a className='page-link' href='#Disabled' onClick={() => { if (this.state.page > 1) { this.setPageMinus() } }}>« Back</a>
            </li>
            {pageButtons}
            <li><a href='#statusTable' disabled={this.state.page === this.state.pageCount} onClick={() => { if (this.state.page < this.state.pageCount) { this.setPagePlus() } }}>Next »</a></li>
          </ul>
        </div>
      </div>
    )
  },
  setPageMinus: function () {
    this.setState({page: this.state.page - 1})
  },
  setPagePlus: function () {
    this.setState({page: this.state.page + 1})
  },
  setPageNumber: function (i) {
    this.setState({page: i})
  },
  handleNewData: function (data, docKey, nodeName) {
    var pc = Math.ceil(data.length / this.state.numberPerPage)
    this.setState({pageCount: pc, page: 1, nodes: data})
    if (data.length == 0) {
      this.setState({noResultsMessage: true})
    }
  }
})

export default CatalogDisabled
