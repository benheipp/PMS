import React from 'react';

var CatalogDisabledRow = React.createClass({
    render: function () {
            return(
            <tr>
            <td>{this.props.node.doc_key}</td>
           </tr>
            );
    }
});

export default CatalogDisabledRow;
