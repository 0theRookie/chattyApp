import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Nav from './Nav.jsx';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
          id: '123'
        },
        {
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
          id: '435'
        }
      ]
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket  = new WebSocket('ws://localhost:3001');
    // Send text to all users through the server

    // this is just stupid demo code, we don't actually want to end a stupid message on componentDidMount
    setTimeout(() =>
      this.sendText({id: 0, username: 'yo dawg', content: 'xzbit'}),
      1000
    );



  }

  sendText({ id, username, content }) {
    // Construct a msg object containing the data the server needs to process the message from the chat client.
    const msg = {
      type: "sendMessage",
      content,
      username,
      id,
    };

    console.log("sending");
    // Send the msg object as a JSON-formatted string.
    this.socket.send(JSON.stringify(msg));
    
    // Blank the text input element, ready to receive the next line of text from the user.
    // document.getElementById("text").value = "";
  }

  changeUsername(newUsername){
    this.setState({
      currentUser: {name: newUsername}
    })
    // console.log('This worked: ', newUsername);
  }
  //move this method into ChatBar.jsx instead and refactor
  postMessage(event){
    // console.log("something was typed in the message box");
    const inputField = event.target;
    const newPost    = { id: Date.now(), username: this.state.currentUser.name, content: inputField.value};
    const post       = this.state.messages.concat(newPost);

    if(event.keyCode === 13){
      // console.log('posting: ', inputField.value);
      this.sendText(post[0]);
      inputField.value = '';
    }
    
  }

  render() {
    return (
      <div className='react-container'>
        <Nav />
        <MessageList messages={this.state.messages}/>
        <ChatBar changeUsername={this.changeUsername} user={this.state.currentUser.name}
          postMessage = {this.postMessage}
        />
      </div>
     
    );
  }
}


export default App;