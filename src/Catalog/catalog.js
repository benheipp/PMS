import React from 'react'
import CatalogTreeRow from './catalog-row'
import FeedBack from '../Controls/feedback'
import BreadCrumb from '../BreadCrumb/breadcrumb'
import BreadCrumbModal from '../BreadCrumb/breadcrumb-modal'
import ComponentLevel from '../Component/component'
import LoadingControl from '../Controls/loading'
import ProductList from './product-list'
import CatalogTypeChangeModal from './catalog-type-change-modal'

var CatalogTree = React.createClass({
  getInitialState: function () {
    return {
      nodeLevel: 1,
      node: [],
      nodeName: '',
      nodeNameCrumb: 'catalog',
      docKey: 'catalog',
      showComponent: false,
      showProductList: false,
      componentData: [],
      productData: [],
      componentName: '',
      componentImage: '',
      showFeedback: false,
      feedbackResult: 0,
      feedbackMessage: '',
      showBreadCrumbModal: false,
      breadCrumbText: '',
      loading: false,
      noResultsMessage: false,
      showDisabled: false,
      copyActive: false,
      copyDocKeys: [],
      selectedCatalogType: '',
      showCatalogTypeChangeModal: false,
    }
  },
  componentWillMount: function () {
    if (localStorage.CatalogVisibility != 'true') {
      localStorage.clear()
      window.location.href = '/login'
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.docKey != this.props.docKey) {
      getNodeList(1, nextProps.docKey, [], this.props.selectedStore.value, this.state.showDisabled, this.handleNewData)
    }
  },
  componentDidMount: function () {
    getNodes(1, null, [], this.props.selectedStore.value, this.props.disabled, this.state.showDisabled, this.handleNewData)
  },
  createCatalogTypeItems: function () {
    let items = []
    items.push(<option value='' />)
    for (let i = 0; i < this.props.catalogTypes.length; i++) {
      const id = this.props.catalogTypes[i].id;
      items.push(<option key={id} value={id}>{this.props.catalogTypes[i].name}</option>)
    }
    return items
  },
  handleCatalogTypeChange: function (event) {
    this.setState({ selectedCatalogType: event.target.value, showCatalogTypeChangeModal: true });
  },
  handleHideCatalogTypeChangeModal: function () {
    this.setState({ showCatalogTypeChangeModal: false });
  },
  handleQuickMoveAll: function () {
    const copyDocKeys = this.state.copyDocKeys;
    this.state.node.forEach(n => {
      const index = copyDocKeys.indexOf(n.doc_key);
      if (index < 0) { copyDocKeys.push(n.doc_key); }
    });
    this.setState({ copyDocKeys, copyActive: copyDocKeys.length > 0 });
  },
  render: function () {
    var stylemargin = {
      marginTop: '60px'
    }

    var disableVis = false
    if (localStorage.Disable == 'true') {
      disableVis = true
    }

    var lockVis = false
    if (localStorage.Lock == 'true') {
      lockVis = true
    }

    var catVis;
    if (this.state.showComponent || this.state.showProductList)
    {
      catVis = {display:'none'}
    } else {
      catVis = {display:'block'}
    }

    var rows = this.state.node.map(function (node) {
      return <CatalogTreeRow catalogTypes={this.props.catalogTypes} storeLookup={this.props.storeLookup} node={node} key={node.key} nodeLevel={this.state.nodeLevel} onNodeClick={this.onNodeClick} showFeedBack={this.showFeedBack} reloadData={this.reloadData} storeUpdate={this.storeUpdate} updateAllCatalogs={this.updateAllCatalogs} store={this.props.selectedStore.value} quickMove={this.quickMove} resetQuickMove={this.resetQuickMove} copyActive={this.state.copyActive} copyDocKeys={this.state.copyDocKeys} />
    }, this)
    return (
      <div style={stylemargin}>
        <a name="top"></a>
        {this.props.disabled == '1' ? <h1>Disabled Items</h1> : null }
        <BreadCrumb nodeNameCrumb={this.state.nodeNameCrumb} docKey={this.state.docKey} callbackBreadCrumbClick={this.BreadCrumbClick} handleEditBreadCrumbText={this.handleEditBreadCrumbText} selectedStore={this.props.selectedStore} handleClearSelectedStore={this.props.handleClearSelectedStore} />
        {this.state.showBreadCrumbModal ? <BreadCrumbModal docKey={this.state.docKey} breadCrumbText={this.state.breadCrumbText} handleHideModal={this.handleHideModal} handleSaveBreadCrumbClick={this.handleSaveBreadCrumbClick} /> : null}
        <FeedBack noTimer="true" Result={this.state.feedbackResult} Message={this.state.feedbackMessage} visible={this.state.showFeedback} delay={2000} resetFeedbackState={this.resetFeedbackState} />
        { this.state.showComponent ? <ComponentLevel component={this.state.componentData} componentName={this.state.componentName} diagramUrl={this.state.componentImage} docKey={this.state.docKey} showFeedBack={this.showFeedBack} nodeName={this.state.nodeName} nodeLevel={this.state.nodeLevel} reloadDataFromComponent={this.reloadDataFromComponent} storeLookup={this.props.storeLookup} store={this.props.selectedStore.value} /> : null }
        { this.state.showProductList ? <ProductList products={this.state.productData} /> : null}
        { this.state.showCatalogTypeChangeModal &&
          <CatalogTypeChangeModal
            nodes={this.state.node}
            hideModal={this.handleHideCatalogTypeChangeModal}
            catalogTypes={this.props.catalogTypes}
            nodeLevel={this.state.nodeLevel}
            storeId={this.props.selectedStore.value}
            targetCatalogTypeId={this.state.selectedCatalogType}
          /> 
        }
      <div style={catVis}>
        {disableVis
            ? <div><b>Show Disabled </b> <input
              name='disabled'
              type='checkbox'
              defaultChecked={this.state.showDisabled}
              onChange={this.handleShowDisabledChange} />
            </div> : null }
        { this.state.copyDocKeys && this.state.copyDocKeys.length > 0 &&
          <div>
            {`${this.state.copyDocKeys.length} doc keys selected to copy`}
          </div>  
        }
        <table className='table table-striped'>
          <tbody>
            <tr>
              <th style={{width:'65%'}}><b>Node</b></th>
              <th style={{width:'5%'}}>
                <b>Type</b>
                <select className='form-control input-sm' style={{ width: '120px' }} value={this.state.selectedCatalogType}  onChange={this.handleCatalogTypeChange}>
                  {this.createCatalogTypeItems()}
                </select>
              </th>
              <th style={{width:'5%'}} />
              <th style={{width:'5%'}}>
                { this.state.nodeLevel !== 1 &&
                  <div>
                  <br />
                    <button style={{ width:'100%' }} type="button" onClick={this.handleQuickMoveAll} className="btn btn-sm btn-default">
                      <span className="glyphicon glyphicon-copy" />Move All
                    </button>
                  </div>
                }
              </th>
              <th style={{width:'5%'}} />
              <th style={{width:'5%'}} />
              {disableVis ? <th style={{width:'5%'}}><b>Disabled</b></th> : null }
              {disableVis ? <th style={{width:'5%'}}><b>Locked</b></th> : null }
            </tr>
            {rows}
            <tr>
              <td>Row Count: {this.state.node.length}</td>
              <td colSpan="7"><a href={`http://192.168.2.16:84/api/Pms/ExportToExcel?nodeLevel=${this.state.nodeLevel}&docKey=${this.state.docKey}&storeId=${this.props.selectedStore.value}&showDisabled=${this.state.showDisabled}&token=${localStorage.token}`} target="_window" > <span className="glyphicon glyphicon-file"></span> Export</a></td>
            </tr>
            {this.state.noResultsMessage ? <h4>No Results</h4> : null }
          </tbody>
        </table>
        { this.state.copyDocKeys && this.state.copyDocKeys.length > 0 ? 
          <div>
            Copy Doc Keys
            <ul>
              {this.state.copyDocKeys.map(d => (<li key={d}>{d}</li>))}
            </ul>
          </div> : 
          null
        }
        </div>
      </div>
    )
  },
  handleShowDisabledChange: function (event) {
    this.setState({showDisabled: event.target.checked})
    getNodes(this.state.nodeLevel, this.state.docKey, this.state.nodeName, this.props.selectedStore.value, this.props.disabled, event.target.checked, this.handleNewData)
    this.updateAllCatalogs(this.state.docKey)
  },
  reloadData: function (docKey, nodeName, nodeLevel) {
    var nDocKey = docKey.substring(0, docKey.lastIndexOf('/'))
    getNodes(nodeLevel, nDocKey, nodeName, this.props.selectedStore.value, this.props.disabled, this.state.showDisabled, this.handleNewData)
    GetBreadCrumbText(docKey, this.props.selectedStore.value, this.editBreadCrumbCallback)
    this.setState({ docKey: nDocKey, nodeName: nodeName })
    this.updateAllCatalogs(docKey)
  },
  quickMove: function (doc_key) {
    let copyDocKeys = this.state.copyDocKeys;
    const index = copyDocKeys.indexOf(doc_key);
    index === -1 ? copyDocKeys.push(doc_key) : copyDocKeys.splice(index, 1);

    this.setState({copyActive: copyDocKeys.length > 0, copyDocKeys})
  },
  resetQuickMove: function () {
    this.setState({copyActive: false, copyDocKeys: []})
  },
  reloadDataFromComponent: function (docKey, nodeName, nodeLevel) {
    getNodes(nodeLevel, docKey, nodeName, this.props.selectedStore.value, this.props.disabled, this.state.showDisabled, this.handleNewData)
    GetBreadCrumbText(docKey, this.props.selectedStore.value, this.editBreadCrumbCallback)
    this.setState({ docKey: docKey, nodeName: nodeName })
    this.updateAllCatalogs(docKey)
  },
  onNodeClick: function (docKey, nodeName, nodeLevel) {
    this.setState({ docKey: docKey, nodeNameCrumb: this.state.nodeNameCrumb + '[|]' + nodeName, nodeLevel: nodeLevel + 1, showFeedback: true,feedbackMessage:"Loading...", selectedCatalogType: '' })
    getNodes(nodeLevel + 1, docKey, nodeName, this.props.selectedStore.value, this.props.disabled, this.state.showDisabled, this.handleNewData)
    GetBreadCrumbText(docKey, this.props.selectedStore.value, this.editBreadCrumbCallback)
    this.updateAllCatalogs(docKey)
  },
  handleExportClick: function(){
    ExportToExcel(this.state.nodeLevel,this.state.docKey,this.state.nodeName,this.props.selectedStore.value,this.props.disabled,this.state.showDisabled,this.handleExportCallBack)
  },
  handleExportCallBack: function(){
    console.log("Export callback hit")
  },
  handleNewData: function (data, docKey, nodeName) {
    this.setState({ node: data, nodeName: nodeName })
    if (data.length == 0 && this.state.nodeLevel == 1) {
      this.setState({noResultsMessage: true, showFeedback: false, feedbackMessage:""})
    }
    if (data.length == 0 && docKey != null) {
      if (docKey.includes('catalog/aftermarket')) {
        GetProductList(docKey, this.props.selectedStore.value, this.HandleProductListData)
        this.setState({showFeedback: false, feedbackMessage:"" })
      } else {
        getComponentProducts(docKey, nodeName, this.props.selectedStore.value, this.HandleComponentData)
        this.setState({showFeedback: false, feedbackMessage:"" })
      }
    } else {
      this.setState({ componentData: [] })
      this.setState({ showComponent: false, showProductList: false, showFeedback: false, feedbackMessage:"" })
    }
  },
  BreadCrumbClick: function (nodeLevel, docKey, nodeNameCrumb) {
    console.log(nodeNameCrumb, nodeLevel)
    var splitCrumb = nodeNameCrumb.split('[|]')
    var newCrumb = ''
    var i
    for (i = 0; i < nodeLevel; i++) {
      newCrumb = newCrumb + splitCrumb[i] + '[|]'
    }
    newCrumb = newCrumb.substring(0, newCrumb.length - 3)
    this.setState({ docKey: docKey, nodeLevel: nodeLevel, showFeedback: true, feedbackMessage:"Loading...", nodeNameCrumb: newCrumb, selectedCatalogType: '' })
    getNodes(nodeLevel, docKey, [], this.props.selectedStore.value, this.props.disabled, this.state.showDisabled, this.handleNewData)
    GetBreadCrumbText(docKey, this.props.selectedStore.value, this.editBreadCrumbCallback)
    this.updateAllCatalogs(docKey)
  },
  HandleProductListData: function (data) {
    this.setState({ productData: data, showProductList: true, showFeedBack:false,feedbackMessage:"" })
    console.log("testing");
  },
  HandleComponentData: function (data, componentName) {
    var imgPrefix
    switch (this.props.selectedStore.value) {
      case 12:
        imgPrefix = '//cdn.firedog.com/diagram/'
        break
      case 11:
        imgPrefix = '//cdn.partzilla.com/diagram/'
        break
      case 10:
        imgPrefix = '//cdn.boats.net/diagram/'
        break
    }
    this.setState({ componentData: data, componentName: componentName, componentImage: imgPrefix + data[0].ImageUrl + '.png', showComponent: true, showFeedBack:false,feedbackMessage:"" })
  },
  showFeedBack: function (data) {
    this.setState({ showFeedback: true, feedbackResult: data.Result, feedbackMessage: data.Message})
  },
  handleEditBreadCrumbText: function () {
    this.setState({ showBreadCrumbModal: true })
  },
  handleSaveBreadCrumbClick: function (docKey, breadCrumbText) {
    SaveBreadCrumbText(docKey, breadCrumbText, this.props.selectedStore.value, this.breadCrumbTextSaveCallback)
  },
  breadCrumbTextSaveCallback: function (data) {
    this.showFeedBack(data)
    this.setState({ showBreadCrumbModal: false })
    GetBreadCrumbText(this.state.docKey, this.props.selectedStore.value, this.editBreadCrumbCallback)
  },
  editBreadCrumbCallback: function (data) {
    this.setState({ breadCrumbText: data.breadcrumb_text })
  },
  handleHideModal: function () {
    this.setState({ showBreadCrumbModal: false })
  },
  resetFeedbackState: function () {
    this.setState({ showFeedback: false })
  },
  storeUpdate: function (data) {
    this.showFeedBack(data)
  },
  handleClearSelectedStore: function () {
    this.props.handleClearSelectedStore()
  },
  updateAllCatalogs: function (docKey) {
    this.props.updateAllCatalogs(docKey)
  }
})

export default CatalogTree
