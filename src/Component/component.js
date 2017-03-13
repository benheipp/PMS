import React from 'react';
import ComponentRow from './component-row'

var ComponentLevel = React.createClass({
    componentDidMount: function() {
            var $section = $('section').first();
        $section.find('.panzoom').panzoom({
            $zoomIn: $section.find(".zoom-in"),
            $zoomOut: $section.find(".zoom-out"),
            $zoomRange: $section.find(".zoom-range"),
            $reset: $section.find(".reset"),
            startTransform: "scale(1)",
            increment: 0.3,
            minScale: .1,
            contain: false,
            panOnlyWhenZoomed: "true",
            transformOrigin: "0% 0% 0px"
        });
    },
    render: function () {
        var rows = this.props.component.map(function (component) {
            return <ComponentRow component={component} key={component.key} docKey={this.props.docKey} componentName={this.props.componentName} nodeName={this.props.nodeName} nodeLevel={this.props.nodeLevel} showFeedBack={this.showFeedBack} reloadData={this.reloadData} handleShowModal={this.handleShowModal} handleHideModal={this.handleHideModal} storeLookup={this.props.storeLookup} />;
        }, this);

        var divPanZoomStyle = {
            textAlign: 'right',
            padding: '3px',
        };

        var divPanZoom = {
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
            transition: 'transform 200ms ease-in-out',
            overflow: 'visible',
            width: '600px'
    };

        var tdStyle = {
            verticalAlign: "top"
        };

        var sectionStyle = {
            width: "600px"
        };

        return (
            <div>
              <table className="table" id="componentTable">
                <tr>
                  <td colspan="2">
                    <h2 id="h2TopTag">
                        {this.props.componentName}
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style={tdStyle}>
                     <section id="pan-when-zoomed" style={sectionStyle}>
                       <div style={divPanZoomStyle}>
                        <button className="zoom-in btn-primary btn-sm" title="Zoom In"><span className="glyphicon glyphicon-zoom-in" aria-hidden="true"></span></button>
                        <button className="zoom-out btn-primary btn-sm" title="Zoom Out"><span className="glyphicon glyphicon-zoom-out" aria-hidden="true"></span></button>
                        <button className="reset btn-primary btn-sm" title="Reset"><span className="glyphicon glyphicon-repeat" aria-hidden="true"></span></button>
                      </div>
                      <div className="panzoom" style={divPanZoom}>
                            <img src={this.props.diagramUrl} style={divPanZoom} id="compdiagimg" alt={this.props.componentName} />
                      </div>
                     </section>
</td>
                  <td style={tdStyle}>
                    <table className="table table-striped table-inverse">
                        <thead>
                        <tr>
                            <th></th>
                          <th>ref-id</th>
                          <th>Product Name</th>
                          <th>ref-qty</th>
                          <th>sku</th>
                          <th></th>
                          <th></th>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
              );
    },
    showFeedBack: function(data) {
        this.props.showFeedBack(data);
    },
    reloadData: function (docKey, nodeName, nodeLevel) {
        this.props.reloadDataFromComponent(docKey, nodeName, nodeLevel);
    }
});

export default ComponentLevel;
