import React from 'react';
var StoreLookupRow = React.createClass({
    render: function () {
        var chk = this.returnChecked(this.props.storeValues, this.props.storeLookup.id);
        var chkStyle = {
            width: 25,
            height: 25,
        }

        var chkStyle2 = {
            display: 'inline'
        }

        var keyUnique = this.props.docKey + this.props.storeLookup.id;
        var url = this.props.storeLookup.store_base_url + this.props.docKey;

        var storeDisable;
        if (localStorage.StoreEditing == 'true'){storeDisable = false;} else {storeDisable = true;}

        return (
            <div className="col-sm-4" style={{fontSize:'12px'}}>
                <div className="row">
                    <div className="col-sm-3">
                    <strong><a href={url} target="_window">{this.props.storeLookup.store_name}</a></strong>
                    </div>
                    <div className="col-sm-4">
                    <div className={this.props.storeLookup.store_name}>    
                        <input disabled={storeDisable} type="checkbox" defaultChecked={chk} onChange={this.onChange} id={keyUnique} name="check" />
                        <label htmlFor={keyUnique}></label>
                    </div>
                    </div>
                </div>
            </div>
        );
    },
    onChange: function (event) {
        if (this.props.type == 'node') {
            SaveStore(this.props.docKey, this.props.storeLookup.id, event.target.checked, this.storeSaveCallback);
        } else if (this.props.type == 'component') {
            SaveStoreComponent(this.props.docId, this.props.storeLookup.id, event.target.checked, this.storeSaveCallback);
        }
    },
    storeSaveCallback: function(data) {
        this.props.showFeedback(data);
    },
    returnChecked: function(storeValues,matchValue) {
        //trim leading comma
        storeValues = storeValues.substring(0, storeValues.length - 1);
        var strArrayComma = storeValues.split(",");

        for (var i = 0; i < strArrayComma.length; i++) {
            var strArrayPipe = strArrayComma[i].split("|");
            if (strArrayPipe.length > 1) {
                if (strArrayPipe[0] == matchValue) {
                    if (strArrayPipe[1] == '1') {
                        return true;
                    } else {
                        return false;
                    }

                }
            }
        }
    }
});

export default StoreLookupRow;