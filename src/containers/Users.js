import React, { Component } from "react";
import { connect } from "react-redux";
import { selectUser } from "../actions/users.js";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
class UsersList extends Component {
  handleUserClick = user => {
    this.props.selectUser(user);
    // socket.emit("join", { userName: user });
  };
  render() {
    let usersList = this.props.allUsers.map(user => {
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
}


const mapStateToProps = ({users}) => ({ allUsers: users.allUsers});

export default connect(mapStateToProps, {
  selectUser
})(UsersList);
