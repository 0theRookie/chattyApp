import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    constructor(props){
        super(props);
    }
    makeMessage(){
        return this.props.messages.map(message => <Message message={message} messageType={message.type} key={message.id} />);
    }
    render(){
        const messages = this.makeMessage();
        return (<main className="messages">
            {messages}
        </main>);
    }
    
}

export default MessageList;