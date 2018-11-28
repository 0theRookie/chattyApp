import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    constructor(props){
        super(props);
    }
    makeMessage(){
        //take in array of objects
        //iterate through array of objects
        //for each object, return a message to be posted
        return this.props.messages.map(message => <Message message={message} key={message.id} />);
    }
    render(){
        const messages = this.makeMessage();
        return (<main className="messages">
            {messages}
        </main>);
    }
    
}

export default MessageList;