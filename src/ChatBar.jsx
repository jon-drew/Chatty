import React, {Component} from 'react';

class Chatbar extends Component {
  constructor( props ) {
    super(props);
    this.state = {value: this.props.message}
    this.enterListener = this.enterListener.bind(this)
  }

  enterListener(event) {
    if (event.keyCode === 13) {
      let newMessage = {
        username: this.props.name,
        message: event.target.value
      }
      this.setState(newMessage, () => {
        console.log(newMessage);
        this.props.handleSubmit({
            username: this.state.name,
            content: this.state.message
        })
      })
    }
  }

  render() {
    return (
      <footer className="chatbar" onSubmit={this.handleSubmit}>
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.name} onChange={this.handleChange}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.enterListener}/>
      </footer>
    );
  }
}
export default Chatbar;