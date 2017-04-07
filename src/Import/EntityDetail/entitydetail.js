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
            return <EntityDetailRow detail={detail} key={detail.key} type={this.props.type} showFeedBack={this.showFeedBack} reloadData={this.reloadData} />;
        }, this);
        return (
          <div>
             <table className="table table-striped table-hover">
              <tr>
                <th>Name</th>
              </tr>
              {rows}
            </table>
          </div>);
          },
  callBackReturnData: function(data) {
    this.setState({details: data});
      },
  showFeedBack: function(data){
    this.props.showFeedBack(data);
  },
  reloadData: function(){
    GetDataAnalysisDetails(this.props.type, this.callBackReturnData);
  }
});

export default EntityDetail;
