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
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  changeUsername(newUsername){
    this.setState({
      currentUser: {name: newUsername}
    })
    // console.log('This worked: ', newUsername);
  }
  postMessage(event){
    // console.log("something was typed in the message box");
    const inputField = event.target;
    const newPost    = { id: Date.now(), username: this.state.currentUser.name, content: inputField.value};
    const post       = this.state.messages.concat(newPost);

    if(event.keyCode === 13){
      // console.log('posting: ', inputField.value);
      this.setState({
        messages: post
      })
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