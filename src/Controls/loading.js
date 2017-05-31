import React from 'react'
var LoadingControl = React.createClass({
	 render: function () {
   var style = {
     display: 'none'
   }
   var imgStyle = {
        	display: 'none',
        	width: '50px',
     height: '50px'
   }
   return (<div style={style} id='ThisIsTesting'>Testing<img style={imgStyle} src='../src/Images/loading_spinner.gif' /></div>)
	 }
})

export default LoadingControl
