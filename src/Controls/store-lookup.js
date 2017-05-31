import React from 'react'
import StoreLookupRow from './store-lookup-row'

var StoreLookup = React.createClass({
  render: function () {
    var rows = this.props.storeLookup.map(function (storeLookup) {
      return <StoreLookupRow storeLookup={storeLookup} docKey={this.props.docKey} storeValues={this.props.storeValues} key={storeLookup.key} showFeedback={this.showFeedback} type={this.props.type} docId={this.props.docId} />
    }, this)
    return (
      <div className='row'>
        {rows}
      </div>
    )
  },
  showFeedback: function (data) {
    this.props.storeUpdate(data)
  }
})

export default StoreLookup
