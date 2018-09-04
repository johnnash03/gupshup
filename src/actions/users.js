export const SELECT_USER = "SELECT_USER";
export const selectUser = (user) => ({ type: SELECT_USER, data: user });

export const SELECT_USER_SUCCESS = "SELECT_USER_SUCCESS";
export const selectUserSuccess = (user) => ({ type: SELECT_USER_SUCCESS, data: user })

export const USER_JOINED = "USER_JOINED";
export const userJoined = (user) => ({ type: USER_JOINED, data: user});

export const SEND_CHAT = "SEND_CHAT";
export const sendChat = (data) => ({ type: SEND_CHAT, data});

export const RECEIVE_CHAT = "RECEIVE_CHAT";
export const receiveChat = (data) => ({ type: RECEIVE_CHAT, data });