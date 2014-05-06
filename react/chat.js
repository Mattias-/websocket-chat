/** @jsx React.DOM */

var ChatMessages = React.createClass({
  render: function(){
    var messages = this.props.messages.map(function (msg){
      return (<div className="chat-panel-message">
                <strong>{msg.name}</strong>
                <p className="small">{msg.msg}</p>
              </div>);
    });
    return (<div>{messages}</div>);
  }
});

var ChatMessagesContainer = React.createClass({
  getInitialState: function() {
    return {messages: []};
  },
  componentWillMount: function() {
    var that = this;
    socket.onopen = function(){
    };
    socket.onmessage = function(e){
      console.log(e);
      var data = JSON.parse(e.data);
      that.setState({messages: that.state.messages.concat([data])});
      panel = document.getElementById("chat-panel");
      panel.scrollTop = panel.scrollHeight;
    };
    socket.onclose = function(){
      console.log("Socket closed");
    }
  },
  render: function(){
    return (<div><ChatMessages messages={this.state.messages} /></div>);
  }
});

var MessageForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var msg = this.refs.msg.getDOMNode().value.trim();
    var name = "Unknown";
    socket.send(JSON.stringify({msg:msg, name:name}));
    this.refs.msg.getDOMNode().value = '';
  },
  render: function(){
    return (
        <form onSubmit={this.handleSubmit} role="form" className="form-inline message-form">
          <div className="form-group">
            <div className="input-group">
              <input ref="msg" type="text" className="form-control" autocomplete="off" id="message-field" />
              <span className="input-group-btn">
                <input className="btn btn-default" type="submit" value="Send" id="send-message" />
              </span>
            </div>
          </div>
        </form>
        );
  }
});

var url = "ws://trusty-two:8080";
socket = new WebSocket(url);

React.renderComponent(
  <ChatMessagesContainer />,
  document.getElementById('chat-panel')
);
React.renderComponent(
  <MessageForm />,
  document.getElementById('chat-footer')
);
