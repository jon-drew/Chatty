import React, {Component} from 'react';
import Message from "./Message.jsx";


function MessagesToList(messages) {
  const listMessages = messages.map((message) =>
    <div key={message.id}>
      <span className="message-username">{message.username}</span>
      <span className="message-content">{message.content}</span>
    </div>
  )
  return (
    <ul>{listMessages}</ul>
  )
}

class MessageList extends Component {
  render() {
    return (
      MessagesToList(this.props.messages)
      //<Message username={this.props.messages[0].username} content={this.props.messages[0].content} />
    )
  }
}

export default MessageList;