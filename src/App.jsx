import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import Nav from './Nav.jsx'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      numberOfUsers: 1
    };
    this.socket = new WebSocket("ws://localhost:3001");
  }

  componentDidMount(){
    console.log("componentDidMount <App />");
    function connect() {
      this.socket.onopen = evt => {
        this.socket.send('Connected to server')
      }
    }

    this.socket.onmessage = messageEvent => {
      let newMessage = JSON.parse(messageEvent.data);
      if (newMessage.content !== undefined){
        this.setState(
          {messages: this.state.messages.concat(newMessage)}
        );
      } else {
        if (newMessage.counter)
          this.setState({numberOfUsers: newMessage.counter});
      }
    }
  }

  onName = (newUser) =>{
    if(this.socket)
      this.socket.send(JSON.stringify({username: newUser}));
  }

  onMessage = (content) =>{
    if(this.socket)
      this.socket.send(JSON.stringify({content}));
  }

  render() {
    return (
      <div>
        <Nav
          numberOfUsers={this.state.numberOfUsers}
        />
        <MessageList
          MessageList={this.state.messages}
        />
        <ChatBar
          onName={this.onName}
          onMessage={this.onMessage}
        />
      </div>
    );
  }
}
export default App;