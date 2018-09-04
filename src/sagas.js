import {takeLatest } from 'redux-saga/effects'
import {SELECT_USER, SEND_CHAT, selectUserSuccess} from './actions/users.js'
import { all, put, select } from "redux-saga/effects";

export default function* rootSaga(socket) {
  yield all([
    takeLatest(SELECT_USER, joinUser.bind(null, socket)),
    takeLatest(SEND_CHAT, sendChat.bind(null, socket))
  ])
}

function* joinUser(socket, action) {
  const res = yield socket.emit("join", { userName: action.data });
  if (res) {
    yield put(selectUserSuccess(action.data));
  }
}

function* sendChat(socket, action) {
  let from = yield select(state => state.users.currUser);
  console.log("from", from);
  const res = yield socket.emit("chat message", { to: action.data.user, text: action.data.text, from });
  console.log("action in sendChat", action);
  // yield 1;
}