import React from 'react';
import ComponentHistoryRow from './component-history-row'
var ComponentHistoryModal = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },
    componentDidMount() {
        $('#ComponentHistoryModal').modal('show');
        $('#ComponentHistoryModal').on('hidden.bs.modal', this.props.handleHideComponentHistoryModal);
        GetComponentHistory(this.props.component.id, this.getComponentHistoryCallback);
    },
    componentWillReceiveProps: function () {
    },
    getComponentHistoryCallback: function (data) {
        this.setState({ data: data });
    },
    render: function () {
        var rows = this.state.data.map(function (history) {
            return <ComponentHistoryRow history={history} rollbackComplete={this.rollbackComplete} key={history.key} docKey={this.props.docKey} docId={this.props.component.id} />;
        }, this);
        return (
            <div id="ComponentHistoryModal" className="modal fade">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title">Component History</h4>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                          <div className="col-sm-12">
                              <div className="alert alert-info">
                                     History for: <strong>{this.props.component.ProductName}</strong>
                              </div>
        </div>
   </div>
                   <div className="row">
                    <div className="col-sm-4"><h4><strong>Previous Values</strong></h4></div>
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
},
handleHideModal: function() {
    this.props.handleHideModal();
}
});

export default ComponentHistoryModal;


