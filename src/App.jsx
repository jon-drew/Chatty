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
      let incomingMessage = JSON.parse(messageEvent.data);
      if (incomingMessage.content !== undefined){
        this.setState({messages: this.state.messages.concat(incomingMessage)})
      } else if (incomingMessage.counter) {
        this.setState({numberOfUsers: incomingMessage.counter});
      }
    }
  }

  changeName = (newUser) => {
    if(this.socket)
      this.socket.send(JSON.stringify({username: newUser}));
  }

  newMessage = (content) => {
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
          changeName={this.changeName}
          newMessage={this.newMessage}
        />
      </div>
    );
  }
}
export default App;