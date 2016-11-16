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
        return (
            <div className="col-sm-4">
                <strong><a href={url} target="_window">{this.props.storeLookup.store_name}</a></strong>
                <div className={this.props.storeLookup.store_name}>    
                    <input type="checkbox" defaultChecked={chk} defaultChecked={chk} onChange={this.onChange} id={keyUnique} name="check" />
                    <label htmlFor={keyUnique}></label>
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