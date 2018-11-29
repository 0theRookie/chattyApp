import React, { Component } from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: this.props.user
        }
    }

    changeUser(event){
        const usernameInput  = event.target.value;
        if(event.keyCode === 13){
            this.props.changeUsername(usernameInput);
            event.target.blur();
        }
    }
    changeUserState(event){
        const usernameInput = event.target.value;
        this.setState({
            username: usernameInput
        });
    }
    createMsgObj(event){
        const inputField = event.target;
        const newPost    = {
            id: '', 
            username: '', 
            content: inputField.value
        };
       
        if(event.keyCode === 13){
          this.props.sendText(newPost);
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
                    onChange={event => this.changeUserState(event)}
                    onKeyUp={(event) => this.changeUser(event)}
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