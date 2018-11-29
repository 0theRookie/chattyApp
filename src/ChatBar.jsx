import React, { Component } from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props);

        //uncomment if changing state in app doesn't work
        // this.state = {
        //     username: '',
        // }
    }
    createMsgObj(event){
        // console.log("something was typed in the message box");
        const inputField = event.target;
        const newPost    = { 
            //id key will not be necessary when websocket handles unique keys
            id: Date.now(), 
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
                    value={this.props.user}
                    onChange={(event) => this.props.changeUsername(event.target.value)}
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