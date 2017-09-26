import React from 'react'
import TreeView from 'treeview-react-bootstrap'
import ImageGallery from 'react-image-gallery'
var DiagramMain = React.createClass({
  getInitialState: function () {
    return {
      vend:false,
      data:'',
      images:[],
      index:0
      }
    },
  componentDidMount: function () {
   GetDiagramNodes(this.getDiagramNodesCallback)
  },
  render: function () {

    var showCheckBox = false
    console.log(this.state.images.length)
    if (this.state.images.length > 0)
    {
      showCheckBox = true
    }
    console.log(showCheckBox)
    return (
      <div className='container'>
        <div className="row">
          <div className="col-md-3"><div id="tree"></div></div>
          <div className="col-md-9">
            { showCheckBox ? <div>
              {this.state.images[this.state.index].doc_key}
              <label className="radio-inline"><input type="radio" name="optradio">Valid</input></label>
            <label class="radio-inline"><input type="radio" defaultChecked name="optradio">Invalid</input></label></div> : null }
            <ImageGallery items={this.state.images} onThumbnailClick={this.handleThumbnailClick} onSlide={this.handleImageLoad} /></div>
        </div>
      </div>

    )
  },
  getDiagramNodesCallback: function(data){
    console.log(data)
    this.setState({data:data})
    var _ = this;
   $('#tree').treeview({data: data, onNodeSelected: function(event, data) {
      _.selectNode(data)
			}});
  },
  selectNode: function(data){
    GetDiagrams(data.value,this.getDiagramsCallback)
  },
  getDiagramsCallback: function(data)
  {
    this.setState({images:data})
  },
  handleImageLoad: function(index){
    this.setState({index:index})
  },
  handleThumbnailClick: function(event, index){
    this.setState({index:index})
  }
})

export default DiagramMain
