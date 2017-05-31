import React from 'react';
import DataAnalysisDetailsModal from './dataanalysisdetails-modal'

var DataAnalysis = React.createClass({
  getInitialState: function() {
    return {
      showDetails:false,
      detailType:'',
      modalTitle:'',
      AnalysisData: {
        catalog_invalidChars: 0,
        product_invalidChars: 0,
        product_shortSkus: 0,
        product_invalidSkus: 0
      }
    }
  },
  componentDidMount: function() {
    GetDataAnalysisStats(this.statsCallback);
  },
  handleViewDetailsClick: function(type, modalTitle){
        this.setState({showDetails:true, detailType: type, modalTitle: modalTitle});
  },
  handleHideDetailsModal: function(){
        this.setState({showDetails:false});
  },
  render: function () {
        return (
          <div className="webSend-container">
          { this.state.showDetails ? <DataAnalysisDetailsModal ModalTitle={this.state.modalTitle} detailType={this.state.detailType} handleHideDetailsModal={this.handleHideDetailsModal}/> : null }
            <div className="modal-header" style={{ backgroundColor: 'rgb(51, 122, 183)', color: 'white' }}><h4 className="modal-title">Data Analysis</h4></div>
              <div className="row" style={{marginBottom:'10px',marginTop:'20px'}}>
                <div className="col-xs-6">Possible Catalog Invalid Characters:</div>
                <div className="col-xs-2">{this.state.AnalysisData.catalog_invalidChars}</div>
                <div className="col-xs-2"><button type="button"  onClick={this.handleViewDetailsClick.bind(this,'catalog_invalidChars', 'Catalog Invalid Characters')} className="btn btn-info btn-sm">Details</button></div>
              </div>
              <div className="row" style={{marginBottom:'10px'}}>
                <div className="col-xs-6">Possible Product Invalid Characters:</div>
                <div className="col-xs-2">{this.state.AnalysisData.product_invalidChars}</div>
                <div className="col-xs-2"><button type="button" onClick={this.handleViewDetailsClick.bind(this,'product_invalidChars', 'Product Invalid Characters')} className="btn btn-info btn-sm">Details</button></div>
              </div>
              <div className="row" style={{marginBottom:'10px'}}>
                <div className="col-xs-6">Short Product Skus:</div>
                <div className="col-xs-2">{this.state.AnalysisData.product_shortSkus}</div>
                <div className="col-xs-2"><button type="button" onClick={this.handleViewDetailsClick.bind(this,'product_shortSkus', 'Short Product Skus')} className="btn btn-info btn-sm">Details</button></div>
              </div>
              <div className="row" style={{marginBottom:'10px'}}>
                <div className="col-xs-6">Invalid Products:</div>
                <div className="col-xs-2">{this.state.AnalysisData.product_invalidSkus}</div>
                <div className="col-xs-2"><button type="button" onClick={this.handleViewDetailsClick.bind(this,'product_invalidSkus', 'Invalid Products')} className="btn btn-info btn-sm">Details</button></div>
              </div>
          </div>);
          },
      statsCallback: function(data) {
        var ad = this.state.AnalysisData;
        ad.catalog_invalidChars = data.catalog_invalidChars;
        ad.product_invalidChars = data.product_invalidChars;
        ad.product_shortSkus = data.product_shortSkus;
        ad.product_invalidSkus = data.product_invalidSkus;

        this.setState({AnalysisData : ad});
      }
});

export default DataAnalysis;
