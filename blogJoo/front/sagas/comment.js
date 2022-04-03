import axios from "axios";

import { delay, put, takeLatest, all, call, fork, throttle } from "redux-saga/effects";

import {
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
} from "../reducers/comment";

function commentsAPI(data) {
  //console.log("lastId", lastId);
  return axios.get(`/comments?postId=${data.postId}`);
}

function* comments(action) {
  try {
    const result = yield call(commentsAPI, action.data);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: err.response.data
    });
  }
}

function addCommentAPI(data) {
  //console.log("lastId", lastId);
  return axios.post("/comment", data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data
    });
  }
}

function* watchComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, comments);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchComments)]);
  yield all([fork(watchAddComment)]);
}
