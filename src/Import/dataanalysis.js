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
        product_invalidSkus: 0,
        product_invalidSkusWStoreIDAssociation: 0
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
                href="#unpaidBalancesTable"
                onClick={() => this.setPageNumber(i)}
              >{i}
              </a>
            </li>);
          }


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
                <div className="col-xs-6">Invalid Product Skus:</div>
                <div className="col-xs-2">{this.state.AnalysisData.product_invalidSkus}</div>
                <div className="col-xs-2"><button type="button" onClick={this.handleViewDetailsClick.bind(this,'product_invalidSkus', 'Invalid Product Skus')} className="btn btn-info btn-sm">Details</button></div>
              </div>
              <div className="row" style={{marginBottom:'10px'}}>
                <div className="col-xs-6">Invalid Product Skus W/Store Association:</div>
                <div className="col-xs-2">{this.state.AnalysisData.product_invalidSkusWStoreIDAssociation}</div>
                <div className="col-xs-2"><button type="button" onClick={this.handleViewDetailsClick.bind(this,'product_invalidSkusWStoreIDAssociation', 'Invalid Skus W/Store Assocation')} className="btn btn-info btn-sm">Details</button></div>
              </div>
          </div>);
          },
      statsCallback: function(data) {
        var ad = this.state.AnalysisData;
        ad.catalog_invalidChars = data.catalog_invalidChars;
        ad.product_invalidChars = data.product_invalidChars;
        ad.product_shortSkus = data.product_shortSkus;
        ad.product_invalidSkus = data.product_invalidSkus;
        ad.product_invalidSkusWStoreIDAssociation = data.product_invalidSkusWStoreIDAssociation;

        this.setState({AnalysisData : ad});
      }
});

export default DataAnalysis;
