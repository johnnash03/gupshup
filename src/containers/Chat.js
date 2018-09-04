import React, { Component } from "react";
import {connect} from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {sendChat} from '../actions/users.js'
import '../Chat.css';
class Chat extends Component {
  state = {
    selectedUser: null,
    text: "",
    currChats: []
  }
  componentDidUpdate(prevProps) {
    console.log("this.props", this.props)
    console.log("prevProps", prevProps)
    console.log("this.state.selectedUser", this.state.selectedUser)
    if(this.props.chats[this.state.selectedUser] && this.props.chats[this.state.selectedUser].length !== (prevProps.chats[this.state.selectedUser] && prevProps.chats[this.state.selectedUser].length)) {
      this.setState({currChats: this.props.chats[this.state.selectedUser]});
    }
  } 
  handleUserClick = (user) => {
    this.setState({selectedUser: user});
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // sendChat
      this.props.sendChat({
        text: e.target.value,
        user: this.state.selectedUser
      })
      this.setState({text: ""})
    }
  }

  renderUsersList() {
    const friends = this.props.friendsList[this.props.currUser];
    let usersList = friends.map(user => {
      return (
        <ListItem button key={user} onClick={this.handleUserClick.bind(null, user)}>
          <ListItemText primary={user} />
        </ListItem>
      );
    });
    return (
      <div>
        <List component="nav">{usersList}</List>
      </div>
    );
  }
  renderChats() {
    console.log("this.state.currChats", this.state.currChats)
    let chats = this.state.currChats.map((chat, index) => {
      return (
        <div className={"single-chat-container "+chat.direction} key={index}>
          <div className="single-chat">
            <span>{chat.text}</span>
          </div>
        </div>
      )
    })
    return(
      <div id="users-chat">
        <div id="chat">
          {chats}
        </div>
        <div id="input-container">
          <input type="text"
            onKeyPress={this.handleKeyPress}
            value={this.state.text}
            onChange={(e) => this.setState({text: e.target.value})}>
          </input>
        </div>
      </div>
    );
  }
  render() {
    let ChatPanel = null;
    if (this.state.selectedUser) {
      ChatPanel = this.renderChats();
    } else {
      ChatPanel = <div id="welcome-text">Welcome to the chat</div>
    }
    return(
      <div className="chat-container">
        <div className="users-list">{this.renderUsersList()}</div>
        {ChatPanel}
      </div>
    )
  }
}

const mapStateToProps = ({users}) => ({
  friendsList: users.friendsList,
  currUser: users.currUser,
  chats: users.chats
})
export default connect(mapStateToProps, {
  sendChat
})(Chat);