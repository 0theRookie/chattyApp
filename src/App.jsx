import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.sendText = this.sendText.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket  = new WebSocket('ws://localhost:3001');
    // Send text to all users through the server
    // debugger;
    this.socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log(newMessage.content);
      this.setState({
        messages: [...this.state.messages, newMessage]
      })
    }
    // this is just stupid demo code, we don't actually want to end a stupid message on componentDidMount
    // setTimeout(() =>
    //   this.sendText({id: 0, username: 'yo dawg', content: 'xzbit'}),
    //   1000
    // );



  }

  sendText({ content }) {
    // Construct a msg object containing the data the server needs to process the message from the chat client.
    const msg = {
      type: 'message',
      content,
      username: this.state.currentUser.name,
    };
    
    console.log(`Attemping to send =====>  ${JSON.stringify(msg.content)}`);
    // Send the msg object as a JSON-formatted string.
    this.socket.send(JSON.stringify(msg));
    
    // Blank the text input element, ready to receive the next line of text from the user.
    // document.getElementById('text').value = '';
  }

  changeUsername(newUsername){
    this.setState({
      currentUser: {name: newUsername}
    })
    // console.log('This worked: ', newUsername);
  }
  //move this method into ChatBar.jsx instead and refactor
  // postMessage(event){
  //   // console.log('something was typed in the message box');
  //   const inputField = event.target;
  //   const newPost    = { id: Date.now(), username: this.state.currentUser.name, content: inputField.value};
  //   const post       = this.state.messages.concat(newPost);

  //   if(event.keyCode === 13){
  //     // console.log('posting: ', inputField.value);
  //     this.sendText(post[0]);
  //     inputField.value = '';
  //   }
    
  // }

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