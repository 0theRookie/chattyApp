import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: {name: ''}, //if currentUser is not defined, it means they're Anonymous
      messages: [],
      clientsSize: ''
    }
    this.changeUsername   = this.changeUsername.bind(this);
    this.sendMessage      = this.sendMessage.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket = new WebSocket('ws://localhost:3001');
    // Send text to all users through the server
    this.socket.onmessage = (event) => {
      const newMessage    = JSON.parse(event.data);
      // debugger;
      if(newMessage.type === 'clientsSize'){
        this.setState({
          clientsSize: newMessage.content
        })
      } else {
        this.setState({
          messages: [...this.state.messages, newMessage]
        })
      }
      
    }
  }

  sendNotification(content){
    const msg = {
      type: 'notification',
      content,
    }
    console.log(`Attemping to send notification =====>  ${content}`);
    
    this.socket.send(JSON.stringify(msg));
  }

  sendMessage({ content }) {
    // Construct a msg object containing the data the server needs to process the message from the chat client.
    const msg = {
      type: 'message',
      content,
      username: this.state.currentUser.name || 'Anonymous',
    };
    
    console.log(`Attemping to send message =====>  ${JSON.stringify(msg.content)}`);
    // Send the msg object as a JSON-formatted string.
    this.socket.send(JSON.stringify(msg));
  }

  changeUsername(newUsername){
    const currentUsername = this.state.currentUser.name || 'Anonymous';
    newUsername = newUsername || 'Anonymous';
      if(currentUsername !== newUsername){
        console.log(`${currentUsername} changing name to ${newUsername}`);

        this.setState({
          currentUser: {name: newUsername}
        })
        this.sendNotification(`${currentUsername} has changed their name to ${newUsername}.`);
      }
  }

  render() {
    return (
      <div className='react-container'>
        <Nav clientsSize={this.state.clientsSize}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar 
          changeUsername={this.changeUsername} 
          user={this.state.currentUser.name}
          sendMessage = {this.sendMessage}
          sendNotification = {this.sendNotification}
        />
      </div>
     
    );
  }
}


export default App;