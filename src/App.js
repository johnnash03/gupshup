import React, { Component } from 'react';
import { connect } from "react-redux";
import UsersList from './containers/Users';
import Chat from './containers/Chat';
import './App.css';

class App extends Component {
  state = {
    currUser: null
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currUser) {
      this.setState({ currUser: nextProps.currUser });
    }
  }

  render() {
    return this.state.currUser
      ? <Chat />
      : <UsersList />;
  }
}

const mapStateToProps = ({ users }) => ({
  currUser: users.currUser
});
export default connect(mapStateToProps, {})(App);