

var socket;
$(document).ready(function() {
  $(".message-form").submit(function(e){
    e.preventDefault();
    $field = $("#message-field");
    var msg = $field.val();
    $field.val("");
    var data = {msg: msg, name: "Unknown"};
    socket.send(JSON.stringify(data));
  });

  var url = "ws://trusty-two:8080";
  socket = new WebSocket(url);
  socket.onopen = function(){
  };
  socket.onmessage = function(e){
    console.log(e);
    var data = JSON.parse(e.data);
    var elem = createMessage(data);
    panel = document.getElementById("chat-panel");
    panel.appendChild(elem);
    panel.scrollTop = panel.scrollHeight;

  };
  socket.onclose = function(){
    console.log("Socket closed");
  }

});

function createMessage(data){
  var elem = document.createElement("div");
  elem.setAttribute("class","chat-panel-message");
  var s = document.createElement("strong");
  var n = document.createTextNode(data.name);
  s.appendChild(n);
  elem.appendChild(s);
  var p = document.createElement("p");
  p.setAttribute("class","small");
  var m = document.createTextNode(data.msg);
  p.appendChild(m);
  elem.appendChild(p);
  return elem;

}
