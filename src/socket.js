import io from "socket.io-client";
import {userJoined, receiveChat} from "./actions/users.js";
export default function(dispatch) {
  var socket = io('http://localhost:3001', {userName: "John"});
  socket.on('chat message', (data) => {
    console.log("receive", data)
    dispatch(receiveChat(data))
  });
  socket.on('join', (data) => {
    console.log("join", data)
    dispatch(userJoined(data.userName))
  });
  return socket;
}