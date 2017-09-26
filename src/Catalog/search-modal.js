import React from 'react'
import SearchResults from './search-results'
var SearchModal = React.createClass({
  getInitialState: function () {
    return {
      searchResults: [],
      searchValue: '',
      lbl:null
    }
  },
  componentDidMount () {
    $('#SearchModal').modal('show')
    $('#SearchModal').on('hidden.bs.modal', this.props.handleHideModal)
  },
  render: function () {
    var resultsVisible = false
    if (this.state.searchResults.length > 0)
    {
      resultsVisible = true
    }

    return (
      <div id='SearchModal' className='modal fade' data-keyboard='false' data-backdrop='static'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Search</h4>
            </div>
            <div className='modal-body'>
              {this.state.lbl}

              <div className='row'>
                <div className='col-sm-2' style={{marginTop:'5px'}}>Doc Key</div>
                <div className='col-sm-10'> <input type='text' className='form-control' onChange={this.handleChange.bind(this, 'searchValue')}/></div>
              </div>
              <div className='row'>
                <div className='col-sm-2'></div>
                <div className='col-sm-2' style={{marginTop:'10px'}}><button type='button' className='btn btn-primary' onClick={this.search}><span class='glyphicon glyphicon-search'></span> Search</button></div>
              </div>

              <div>
              { this.props.copyDocKeys && this.props.copyDocKeys.length > 0 ? 
                <div>
                  Copy Doc Keys
                  <ul>
                    {this.props.copyDocKeys.map(d => (<li key={d}>{d}</li>))}
                  </ul>
                </div> : 
                null
              }
              {resultsVisible ? <SearchResults data={this.state.searchResults} copyDocKeys={this.props.copyDocKeys} quickMove={this.quickMove} /> : null}
              </div>

            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  search: function(){
    SearchCatalog(this.props.storeId,this.props.docKey,this.state.searchValue, this.SearchCatalogCallback)
  },
  handleChange: function (name, e) {
    var change = {}
    change[name] = e.target.value
    this.setState(change)
  },
  SearchCatalogCallback: function(data) {

    var count = data.length
    var lbltemp
    if (count == 0)
    {
      lbltemp = <div className='alert alert-info'> No Results Found</div>
    }
    if (count > 0 && count < 100)
    {
      lbltemp = <div className='alert alert-info'> Displaying {count} Found </div>
    }
    if ( count == 100)
    {
      lbltemp = <div className='alert alert-info'> More than 100 Results Found. Displaying the top 100 </div>
    }

    this.setState({searchResults:data,lbl:lbltemp})
  },
quickMove: function (docKey) {
    this.props.quickMove(docKey)
  }
})

export default SearchModal
