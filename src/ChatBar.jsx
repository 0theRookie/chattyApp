import React, { Component } from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props);
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
                    onKeyUp={event => this.props.postMessage(event)}
                />
            </footer>
        )
    }
}

export default ChatBar;