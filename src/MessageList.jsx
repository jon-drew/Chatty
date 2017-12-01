import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render(){

    let messages = this.props.MessageList;

    let messageList = messages.map(message =>
      <Message key={message.id} message={message} />
    );

    return (
      <div className="messages">
        {messageList}
      </div>
    );
  }
}

export default MessageList;