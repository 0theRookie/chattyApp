import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: {name: ''}, //if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.sendText = this.sendText.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket  = new WebSocket('ws://localhost:3001');
    // Send text to all users through the server
    this.socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      this.setState({
        messages: [...this.state.messages, newMessage]
      })
    }
  }

  sendText({ content }) {
    // Construct a msg object containing the data the server needs to process the message from the chat client.
    const msg = {
      type: 'message',
      content,
      username: this.state.currentUser.name || 'Anonymous',
    };
    
    console.log(`Attemping to send =====>  ${JSON.stringify(msg.content)}`);
    // Send the msg object as a JSON-formatted string.
    this.socket.send(JSON.stringify(msg));
  }

  changeUsername(newUsername){
    // console.log('newUsername: ', newUsername)
      this.setState({
        currentUser: {name: newUsername}
      })
  }

  render() {
    return (
      <div className='react-container'>
        <Nav />
        <MessageList messages={this.state.messages}/>
        <ChatBar 
          changeUsername={this.changeUsername} 
          user={this.state.currentUser.name}
          sendText = {this.sendText}
        />
      </div>
     
    );
  }
}


export default App;