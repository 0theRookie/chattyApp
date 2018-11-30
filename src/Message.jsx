import React, { Component } from 'react';

class Message extends Component {
    constructor(props){
        super(props);
    }
    showMessage(){
        const {message} = this.props;

        switch(message.type){
            case 'notification':
            return (<span className="message-content">{message.content}</span>)
            case 'message': 
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