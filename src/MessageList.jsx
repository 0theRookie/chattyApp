import React, { Component } from 'react';
import Messages from './Message.jsx';

class MessageList extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (<main className="messages">
        <Messages />
        </main>);
    }
    
}

export default MessageList;