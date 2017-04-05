import React from 'react';
import EntityDetailRow from './entitydetailrow'

var EntityDetail = React.createClass({
  getInitialState: function() {
        return {
            details: []
        };
  },
  componentDidMount: function() {
    GetDataAnalysisDetails(this.props.type, this.callBackReturnData);
  },
  render: function () {
        var rows = this.state.details.map(function(detail) {
            return <EntityDetailRow detail={detail} key={detail.key} type={this.props.type} />;
        }, this);
        return (
          <div>
            {rows}
          </div>);
          },
  callBackReturnData: function(data) {
    this.setState({details: data});
      }
});

export default EntityDetail;
