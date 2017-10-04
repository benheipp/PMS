import React from 'react'
import TreeView from 'treeview-react-bootstrap'
import ImageGallery from 'react-image-gallery'
import Loadable from 'react-loading-overlay'
import FeedBack from '../Controls/feedback'
import ToggleButton from 'react-toggle-button'
var DiagramMain = React.createClass({
  getInitialState: function () {
    return {
      vend:false,
      data:'',
      images:[],
      index:0,
      isActive:true,
      showUnsaved:false,
      selectedRadio:"0",
      showFeedback: false,
      feedbackResult: 0,
      feedbackMessage: '',
      currentDocKey:'',
      toggleSelection:true
      }
    },
  componentDidMount: function () {
   GetDiagramNodes(this.getDiagramNodesCallback)
  },
  render: function () {

    var showCheckBox = false
    if (this.state.images.length > 0)
    {
      showCheckBox = true
    }
    return (
      <Loadable
  active={this.state.isActive}
  spinner
  text='Loading your content...'
  >
      <div className='container' style={{minHeight:'500px'}}>
        <div className="row">
          <div className="col-md-3"><div id="tree"></div></div>
          <div className="col-md-8">
          <FeedBack noTimer="true" Result={this.state.feedbackResult} Message={this.state.feedbackMessage} visible={this.state.showFeedback} delay={2000} resetFeedbackState={this.resetFeedbackState} />
          <div>
              <div className="row">
               <div className="col-md-12">
           Show only invalid <input
            name="showUnsaved"
            type="checkbox"
            checked={this.state.showUnsaved}
            onChange={this.handleInputChange} />
               </div>
              </div>
             { showCheckBox ?   <div className="row">
               <div className="col-md-12"> <b>Component: {this.state.images[this.state.index].doc_key}</b> </div>
              </div>  : null }
             
              </div>
           {showCheckBox ? <ImageGallery  showPlayButton={false} showFullscreenButton={false} items={this.state.images} onThumbnailClick={this.handleThumbnailClick} onSlide={this.handleImageLoad} /> : null} </div>
           <div className="col-md-1" style={{marginTop:'430px'}}>
             {showCheckBox ?<ToggleButton
                inactiveLabel={'X'}
                activeLabel={'Valid'}
                value={this.state.toggleSelection}
                onToggle={this.handleRadioChange} /> : null }
           </div>
        </div>
      </div>
              </Loadable>

    )
  },
  getDiagramNodesCallback: function(data){
    this.setState({data:data,isActive:false})
    var _ = this;
   $('#tree').treeview({data: data, onNodeSelected: function(event, data) {
      _.selectNode(data)
			}});
  },
  selectNode: function(data){
    if (this.occurrences(data.value, "/") == 3){
          this.setState({isActive:true,currentDocKey:data.value})
          GetDiagrams(data.value,this.state.showUnsaved,this.getDiagramsCallback)
    }
  },
  getDiagramsCallback: function(data, showUnsaved)
  {
    var t
    if(showUnsaved)
    {
      t = false
    } else {
      t = true
    }


    this.setState({images:data,isActive:false,toggleSelection:t})
    this.setState({ showFeedback: false})
  },
  handleImageLoad: function(index){
    IsInvalidDiagram(this.state.images[index].doc_key, this.isInvalidCallback)
    this.setState({index:index,toggleSelection:true})
    this.setState({ showFeedback: false})
  },
  handleThumbnailClick: function(event, index){
    this.setState({index:index})
    this.setState({ showFeedback: false})
  },
  isInvalidCallback: function(data){
    if (data == true)
    {
    this.setState({ toggleSelection: false})
    }
  },
  handleInputChange: function(event)
  {
    var showUnsaved
    this.setState({ showFeedback: false})
    if(this.state.showUnsaved == false){
      this.setState({isActive:true,showUnsaved:true})
      showUnsaved = true
    } else {
      this.setState({isActive:true,showUnsaved:false})
      showUnsaved = false
    }
    GetDiagrams(this.state.currentDocKey,showUnsaved,this.getDiagramsCallback)
  },
  handleRadioChange: function(event){
    if(this.state.toggleSelection == true)
    {
          this.setState({ showFeedback: false,toggleSelection:false})
          SaveDiagramValidation(this.state.images[this.state.index].doc_key,false,this.saveCallback)
    } else{
          this.setState({ showFeedback: false,toggleSelection:true})
          SaveDiagramValidation(this.state.images[this.state.index].doc_key,true,this.saveCallback)
    }
  },
  handleSave:function(){
    SaveDiagramValidation(this.state.images[this.state.index].doc_key,this.state.selectedRadio,this.saveCallback)
  },
  saveCallback: function(data){
    this.setState({ showFeedback: true, feedbackResult: data.Result, feedbackMessage: data.Message})
  },
  occurrences:function(string,subString,allowOverlapping){
    string += "";
        subString += "";
        if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}
})

export default DiagramMain
