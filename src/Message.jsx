import React, {Component} from 'react';

class Message extends Component {
  render() {
    let message = this.props;
    let username = 'Anonymous' || message.username
    return (
      <div className="message" key={message.id}>
        <div className="message">
          <span className="message-username">{username}</span>
          <span className="message-content">{content}</span>
        </div>
        {<div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>}
      </div>
    );
  }
}
export default Message;