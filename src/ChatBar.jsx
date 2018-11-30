import React, { Component } from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: this.props.user
        }
        this.changeUser = this.changeUser.bind(this);
    }
    //changes username state in app
    changeUser(event){
        const usernameField  = event.target;
        const usernameInput  = usernameField.value;
        if(event.keyCode === 13){
            this.props.changeUsername(usernameInput);
            usernameField.blur();
        }
    }
    //allows changing of username in ChatBar user field
    changeUserState(usernameInput){
        this.setState({
            username: usernameInput
        });
    }
    //sends messages to app
    createMsgObj(event){
        const inputField = event.target;
        const newPost    = {
            id: '', 
            username: '',
            content: inputField.value
        };
        if(event.keyCode === 13){
          this.props.sendMessage(newPost);
          inputField.value = '';
        }
      }

    render(){
        return (
            <footer className="chatbar">
                <input
                    className="chatbar-username"
                    placeholder="Your Name (Optional)"
                    value={this.state.username}
                    onChange={event => this.changeUserState(event.target.value)}
                    onKeyUp={this.changeUser}
                />
                <input 
                    className="chatbar-message" 
                    placeholder="Type a message and hit ENTER" 
                    onKeyUp={event => this.createMsgObj(event)}
                />
            </footer>
        )
    }
}

export default ChatBar;