import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {

    let messages = this.props.messages

    return(
      <div id="message-list">
        {messages.map(function(message) {
          return <Message key={message.id} username={message.name} content={message.content} />
        })}
      </div>
    )
  }
}

export default MessageList;