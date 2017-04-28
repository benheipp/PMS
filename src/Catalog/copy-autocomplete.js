import React from 'react';
import Autocomplete from 'react-autocomplete';
var CopyAutoComplete = React.createClass({
  getInitialState: function() {
    return {
      value: '',
      products: [],
      loading: false
      }
  },
    render: function () {

      var inputStyle = {
        padding : '6px 12px',
        fontSize: '14px',
        lineHeight: '1.42857143',
        color: '#555',
        backgroundColor: '#fff',
        backgroundImage: 'none',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
        transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s'
      }

      var menuStyle = {
        position: 'absolute',
        float: 'right',
        zIndex: '100',
        background: '#fff',
        border: '1px solid #ccc',
        boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)'
      }


      return (
        <div>
       <Autocomplete
          inputProps={{name: "Copy", id: "copy-autocomplete", style: {padding : '6px 12px',
          fontSize: '14px',
          lineHeight: '1.42857143',
          color: '#555',
          position: 'relative',
          backgroundColor: '#fff',
          backgroundImage: 'none',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width:'400px',
          boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
          transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s'   }}}
          ref="autocomplete-copy"
          menuStyle={menuStyle}
          value={this.state.value}
          items={this.state.products}
          getItemValue={(item) => item.name}
          onSelect={(value, item) => {
            // set the menu to only the selected item
            this.setState({ value, products: [ item ] })
            this.selectRecord(item);
            // or you could reset it to a default list again
            // this.setState({ unitedStates: getStates() })
          }}
          onChange={(event, value) => {
            if (value.length < 5)
            {
              this.setState({ value });
              return;
            } else {
              this.setState({ value, loading: true });
              CopyAutoCompleteQuery(value,this.props.store,this.autoCompleteCallback)
            }
           // fakeRequest(value, (items) => {
           //   this.setState({ unitedStates: items, loading: false })
            //})
          }}
          renderItem={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.abbr}
              id={item.abbr}
            >{item.doc_key}</div>
          )}
        />

              <span className="input-group-btn" style={{display: 'inline', position: 'absolute'}}>
              <button className="btn btn-primary" type="button">
              <span className="glyphicon glyphicon-search"></span>
             </button>
             </span>

        </div>);
    },
    autoCompleteCallback: function(data){
      console.log(data);
      this.setState({products:data });
    },
    selectRecord: function(item){
      this.props.selectRecord(item);
    }
});

export let styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc',
    zIndex: '100'
  }
}

export default CopyAutoComplete;
