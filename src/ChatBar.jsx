import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
     user: "",
     message: ""
    };
  }

  submitName = (event) => {
    if (event.keyCode === 13) {
      this.props.onName(this.state.user);
    }
  }

  updateName = (event) => {
    this.setState({user: event.target.value});
  }

  submitMessage = (event) => {
    if (event.keyCode === 13) {
      this.props.onMessage(this.state.message);
      this.setState({message: ""});
    }
  }

  updateMessage = (event) => {
    this.setState({message: event.target.value});
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          value={this.state.user}
          onChange = {this.updateName}
          onKeyDown = {this.submitName}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.message}
          onChange = {this.updateMessage}
          onKeyDown = {this.submitMessage}
        />
      </footer>
    );
  }
}
export default ChatBar;