
import React, {Component} from 'react';

class Message extends Component {
  render() {

    return this.props.message.username ?
    (
      <div className="message">
        <span className="message-username">
          {this.props.message.username}
        </span>
        <span className="message-content">
          {this.props.message.content}
        </span>
      </div>
    ) : (
      <div className="message system">
        {this.props.message.content}
      </div>
    );
  }
}

export default Message;