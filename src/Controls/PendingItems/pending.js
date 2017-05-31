import React from 'react'
import { Table, Column, Cell } from 'fixed-data-table'

class MyTextCell extends React.Component {
  render () {
    const {rowIndex, field, data, ...props} = this.props
    return (
      <Cell {...props}>
        {data[rowIndex][field]}
      </Cell>
    )
  }
}

class MyLinkCell extends React.Component {
  render () {
    const {rowIndex, field, data, ...props} = this.props
    const link = data[rowIndex][field]
    return (
      <Cell {...props}>
        <a href={link}>{link}</a>
      </Cell>
    )
  }
}

var PendingDataTable = React.createClass({
  getInitialState: function () {
    return {
      myTableData: []
    }
  },
  componentDidMount () {
    GetPendingCatalog(this.PendingCatalogCallback)
  },
  PendingCatalogCallback (data) {
    this.setState({myTableData: data})
  },
  render: function () {
    return (
      <Table
        rowsCount={this.state.myTableData.length}
        rowHeight={50}
        headerHeight={50}
        width={800}
        height={500}>
        <Column
          header={<Cell>Doc Key</Cell>}
          flexGrow={2}
          cell={
            <MyTextCell
              data={this.state.myTableData}
              field='doc_key'
            />
          }
          width={200}
        />
      </Table>
    )
  }
})

export default PendingDataTable
