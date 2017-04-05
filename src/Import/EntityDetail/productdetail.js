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
            return <ProductDetailRow detail={detail} key={detail.key} />;
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

export default ProductDetail;
