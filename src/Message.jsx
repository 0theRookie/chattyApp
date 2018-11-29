import React, { Component } from 'react';

class Message extends Component {
    constructor(props){
        super(props);
    }
    showMessage(){
        console.log('Calling showMessage()...');
        const {message} = this.props;
        switch(message.type){
            case 'notification':
            console.log(`Notification type ${message.type}`);
            return (<span className="message-content">{message.content}</span>)
            break;
            // case 'text':
            case 'message': //may take this out later if message cannot be a type
            console.log(`Message type ${message.type}`);
            default:
                return (<span className="message-content">{message.content}</span>)
        }
    }
    render(){
        return (
            <div  className="message">
                <span className="message-username">{this.props.message.username}</span>
                {this.showMessage()}
            </div>
        )
    }
}

export default Message;