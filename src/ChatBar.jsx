import React, { Component } from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props);

        //uncomment if changing state in app doesn't work
        this.state = {
            username: '',
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
        // console.log("something was typed in the message box");
        const inputField = event.target;
        const newPost    = { 
            //id key will not be necessary when websocket handles unique keys
            id: '', 
            username: '', 
            content: inputField.value
        };
       
        if(event.keyCode === 13){
          // console.log('posting: ', inputField.value);
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