import React from 'react';
var FeedBack = React.createClass({
    getInitialState: function () {
        return {
            visible: this.props.visible
    };
    },
    componentDidMount: function() {
        this.setTimer();
    },
    componentWillReceiveProps: function(nextProps) {
        this.setTimer();
        this.setState({ visible: this.props.visible });
    },
    render: function () {
        var classN;
        if (this.props.Result == 0) {
            classN = "alert alert-success";
        } else if (this.props.Result == 1)  {
            classN = "alert alert-danger";
        }

        var fadeOut = {
            visibility: 'hidden',
            opacity: '0',
            transition: 'visibility 0s 2s, opacity 2s linear'
        };

        return (
            this.state.visible ? <div className={classN}>{this.props.Message}</div> : <div className={classN} style={fadeOut}>{this.props.Message}</div> 
        );
    },
    setTimer: function() {
        this._timer != null ? clearTimeout(this._timer) : null;

        this._timer = setTimeout(function() {
            this.setState({ visible: false });
            this.props.resetFeedbackState();
            this._timer = null;
        }.bind(this), this.props.delay);
    },
    componentWillUnMount:function() {
        clearTimeout(this._timer);
    }
});

export default FeedBack;