import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    }
    this.socket = new WebSocket('ws://localhost:3001/');
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    function connect() {
      this.socket.onopen = evt => {
        this.socket.send('Connected to server')
      }
    }
  }

  handleSubmit(event) {
    this.socket.send(JSON.stringify(event));
    this.setState({data: this.state});
    this.socket.onmessage = (event) => {
      console.log(event);
    let newMessage = JSON.parse(messageFromServer.data);
    this.state.messages.push(newMessage);
    // code to handle incoming message
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar name={this.state.currentUser.name} handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;