import React, {Component} from 'react';
const uuid = require('uuid/v4');

class Chatbar extends Component {
  constructor( props ) {
    super(props);
    this.state = {username: '',
                  message: '',
                  error: ''
    }
    this.enterListener = this.enterListener.bind(this)
  }

  enterListener(event) {
    if (event.keyCode === 13) {
      let newMessage = {
        message: event.target.value,
        username: "Jon"
      }

      this.setState(newMessage, () => {
        this.props.createNewMessage({
          currentUser: this.state.username,
          messages: [{
            key: uuid(),
            username: this.state.username,
            content: this.state.message
          }]
        })
      })
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.name}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.enterListener}/>
      </footer>
    );
  }
}
export default Chatbar;
