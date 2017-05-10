import React from 'react';
import NodeHistoryRow from './catalog-node-history-row'
var NodeHistoryModal = React.createClass({
    componentDidMount() {
        $('#NodeHistoryModal').modal('show');
        $('#NodeHistoryModal').on('hidden.bs.modal', this.props.handleHideModal);
    },
    render: function () {
        var rows = this.props.data.map(function (history) {
            return <NodeHistoryRow history={history} rollbackComplete={this.rollbackComplete} key={history.key} docKey={this.props.docKey} catalogId={this.props.catalogId} webSent={this.props.webSent} />;
        }, this);
        return (
            <div id="NodeHistoryModal" className="modal fade">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title">Node History</h4>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                          <div className="col-sm-12">
                              <div className="alert alert-info">
                                     History for: <strong>{this.props.docKey}</strong>
                              </div>
        </div>
   </div>
                        {rows}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
     </div>
    </div>
    </div>
    </div>
        );
    },
    rollbackComplete: function(data) {
        this.props.rollbackComplete(data);
    }
});

export default NodeHistoryModal;


