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
    this.connection = new WebSocket('ws://localhost:3001/');
    this.createNewMessage = this.createNewMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    function connect() {
      this.connection.onopen = evt => {
        this.connection.send('Connected to server')
      }
    }
  }

  createNewMessage(newMessage) {
    newMessage.username = this.state.currentUser.name;
    this.connection.send(JSON.stringify(newMessage));
  }

  addNewMessage(messageFromServer) {
    let newMessage = JSON.parse(messageFromServer.data);
    this.state.messages.push(newMessage);
    this.setState({data: this.state});
  }

  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //     const messages = this.state.messages.concat(newMessage)
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({messages: messages})
  //   }, 3000);

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar name={this.state.currentUser.name} createNewMessage={this.createNewMessage}/>
      </div>
    );
  }
}

export default App;
