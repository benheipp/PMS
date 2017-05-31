import React from 'react';
import ProductDetailRow from './productdetailrow'

var ProductDetail = React.createClass({
  getInitialState: function() {
        return {
            details: [],
            page:1,
            pageCount:0,
            pagesVisible:20,
            numberPerPage:20
        };
  },
  componentDidMount: function() {
    GetDataAnalysisDetails(this.props.type, this.callBackReturnData);
  },
  render: function () {
        const pageButtons = [];
        var visiblePages = Math.ceil(this.state.page / this.state.pagesVisible);
        var styleDisplay = '';
          for (let i = 1; i <= this.state.pageCount; i += 1) {
            if (Math.ceil(i / this.state.pagesVisible) === visiblePages)
            {
              styleDisplay = 'block';
            } else {
              styleDisplay = 'none';
            }

            pageButtons.push(<li key={i} className={i === this.state.page ? 'active' : ''} style={{display:styleDisplay}}>
              <a
                href="#entity"
                onClick={() => this.setPageNumber(i)}
              >{i}
              </a>
            </li>);
          }

        if (this.state.page == 1){
            var rows = this.state.details.slice(0, this.state.numberPerPage).map(function(detail) {
              return <ProductDetailRow detail={detail} key={detail.key} showFeedBack={this.showFeedBack} reloadData={this.reloadData} />;
            }, this);
        } else{
            var rows = this.state.details.slice(((this.state.page - 1) * this.state.numberPerPage), (this.state.page * this.state.numberPerPage)).map(function(detail) {
              return <ProductDetailRow detail={detail} key={detail.key} showFeedBack={this.showFeedBack} reloadData={this.reloadData} />;
            }, this);
        }

        return (
          <div>
            <table className="table table-striped table-hover">
              <tr>
                <th>Doc Key</th>
                <th>Sku</th>
                <th>Name</th>
                <th>Store</th>
              </tr>
              {rows}
            </table>
            <div>
                <ul className="pagination" style={{ width: '1000px', marginTop:'5px' }}>
                  <li className="page-item" >
                    <a className="page-link" href="#entity" onClick={() => { if (this.state.page > 1) { this.setPageMinus(); } }}>« Back</a>
                  </li>
                  {pageButtons}
                  <li><a href="#entity" disabled={this.state.page === this.state.pageCount} onClick={() => { if (this.state.page < this.state.pageCount) { this.setPagePlus(); } }}>Next »</a></li>
                </ul>
              </div>
          </div>);
          },
  callBackReturnData: function(data) {
    var pc =  Math.ceil(data.length / this.state.numberPerPage);
    this.setState({pageCount: pc, page: this.state.page, details: data});
      },
  showFeedBack: function(data){
    this.props.showFeedBack(data);
  },
  reloadData: function(){
    GetDataAnalysisDetails(this.props.type, this.callBackReturnData);
  },
  setPageMinus: function(){
        this.setState({page: this.state.page - 1});
    },
  setPagePlus: function(){
        this.setState({page: this.state.page + 1});
    },
  setPageNumber: function(i){
        this.setState({page: i});
    }
});

export default ProductDetail;
