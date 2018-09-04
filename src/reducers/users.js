import { SELECT_USER_SUCCESS, USER_JOINED, SEND_CHAT, RECEIVE_CHAT } from "../actions/users.js";
let initialState = {
  allUsers: ["amar", "prem", "raveena", "karishma", "bhalla", "robert", "teja", "crimeMaster"],
  friendsList: {
    amar: ["prem", "raveena", "karishma"],
    teja: ["bhalla", "robert"],
    prem: ["amar"],
    crimeMaster: [""]
  },
  currUser: null,
  onlineUsers: [],
  chats: {}
}
const users = ( state = initialState, action) => {
  switch(action.type) {
    case SELECT_USER_SUCCESS:
      return {...state, currUser: action.data}
    case USER_JOINED:
      return {...state, onlineUsers: [...state.onlineUsers, action.data]}
    case SEND_CHAT: {
      let newChats;
      let chats = state.chats;
      if (!chats.hasOwnProperty(action.data.user)) {
        newChats = {...chats, [action.data.user]: [{direction: "sent", text: action.data.text}]};
      } else {
        console.log(chats[action.data.user]);
        newChats = {...chats, [action.data.user]: [...chats[action.data.user], {direction: "sent", text: action.data.text}]}
      }
      return {...state, chats: newChats};
    }
    case RECEIVE_CHAT: {
      let newChats;
      let chats = state.chats;
      if (!chats.hasOwnProperty(action.data.from)) {
        newChats = {...chats, [action.data.from]: [{direction: "received", text: action.data.text}]};
      } else {
        console.log(chats[action.data.user]);
        newChats = {...chats, [action.data.from]: [...chats[action.data.from], {direction: "received", text: action.data.text}]}
      }
      return {...state, chats: newChats};
    }
    default:
      return state;
  }
}
export default users;