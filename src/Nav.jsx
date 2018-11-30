import React, { Component } from 'react';

class Nav extends Component {
    constructor(props){
        super(props);

    }
    displayUserSize(){
        return (
            <span className="navbar-users-size">{this.props.clientsSize}</span>
        )
    }
    render(){
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                {this.displayUserSize()}
            </nav>
        )
    }
}

export default Nav;