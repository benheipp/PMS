import React from 'react';
import ProductDetailRow from './productdetailrow'

var ProductDetail = React.createClass({
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
            return <ProductDetailRow detail={detail} key={detail.key} showFeedBack={this.showFeedBack} reloadData={this.reloadData} />;
        }, this);
        return (
          <div>
            <table className="table table-striped table-hover">
              <tr>
                <th>Doc Key</th>
                <th>Sku</th>
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

export default ProductDetail;
