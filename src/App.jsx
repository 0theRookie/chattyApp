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
        },
        {
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
    this.changeUsername = this.changeUsername.bind(this);
  }
  changeUsername(newUsername){
    this.setState({
      currentUser: {name: newUsername}
    })
    console.log('This worked: ', newUsername);
  }
  render() {
    return (
      <div className='react-container'>
        <Nav />
        <MessageList messages={this.state.messages}/>
        <ChatBar changeUsername={this.changeUsername} user={this.state.currentUser.name}/>
      </div>
     
    );
  }
}


export default App;