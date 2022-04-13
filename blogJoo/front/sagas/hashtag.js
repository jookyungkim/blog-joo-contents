import axios from "axios";

import { delay, put, takeLatest, all, call, fork, throttle } from "redux-saga/effects";

import {
  LOAD_HASHTAGS_REQUEST,
  LOAD_HASHTAGS_SUCCESS,
  LOAD_HASHTAGS_FAILURE,
  LOAD_RECENT_HASHTAGS_REQUEST,
  LOAD_RECENT_HASHTAGS_SUCCESS,
  LOAD_RECENT_HASHTAGS_FAILURE,
  LOAD_POPULAR_HASHTAGS_REQUEST,
  LOAD_POPULAR_HASHTAGS_SUCCESS,
  LOAD_POPULAR_HASHTAGS_FAILURE
} from "../reducers/hashtag";

function loadHashtagsAPI() {
  return axios.get("/hashtags");
}

function* loadHashtags() {
  try {
    const result = yield call(loadHashtagsAPI);
    yield put({
      type: LOAD_HASHTAGS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_HASHTAGS_FAILURE,
      error: err.response.data
    });
  }
}

function loadRecentHashtagsAPI() {
  return axios.get("/hashtags/recent");
}

function* loadRecentHashtags(action) {
  try {
    const result = yield call(loadRecentHashtagsAPI);
    yield put({
      type: LOAD_RECENT_HASHTAGS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_RECENT_HASHTAGS_FAILURE,
      error: err.response.data
    });
  }
}

function loadPopularHashtagsAPI() {
  return axios.get("/hashtags/popular");
}

function* loadPopularHashtags(action) {
  try {
    const result = yield call(loadPopularHashtagsAPI);
    yield put({
      type: LOAD_POPULAR_HASHTAGS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POPULAR_HASHTAGS_FAILURE,
      error: err.response.data
    });
  }
}

function* watchLoadHashtags() {
  yield takeLatest(LOAD_HASHTAGS_REQUEST, loadHashtags);
}

function* watchLoadRecentHashtags() {
  yield takeLatest(LOAD_RECENT_HASHTAGS_REQUEST, loadRecentHashtags);
}

function* watchLoadPopularHashtags() {
  yield takeLatest(LOAD_POPULAR_HASHTAGS_REQUEST, loadPopularHashtags);
}

export default function* hashtagsSaga() {
  yield all([fork(watchLoadHashtags), fork(watchLoadRecentHashtags), fork(watchLoadPopularHashtags)]);
}
