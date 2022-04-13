import axios from "axios";

import { delay, put, takeLatest, all, call, fork, throttle } from "redux-saga/effects";

import {
  LOAD_SEARCHS_REQUEST,
  LOAD_SEARCHS_SUCCESS,
  LOAD_SEARCHS_FAILURE,
  LOAD_SEARCHS_IP_REQUEST,
  LOAD_SEARCHS_IP_SUCCESS,
  LOAD_SEARCHS_IP_FAILURE,
  ADD_SEARCH_REQUEST,
  ADD_SEARCH_SUCCESS,
  ADD_SEARCH_FAILURE
} from "../reducers/search";

function searchsIpAPI() {
  return axios.get("/searchs/userIp");
}

function* searchsIp() {
  try {
    const result = yield call(searchsIpAPI);
    yield put({
      type: LOAD_SEARCHS_IP_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_SEARCHS_IP_FAILURE,
      error: err.response.data
    });
  }
}

function addSearchAPI(data) {
  return axios.post("/search", data);
}

function* addSearch(action) {
  console.log("add search : ", action.data);
  try {
    const result = yield call(addSearchAPI, action.data);
    yield put({
      type: ADD_SEARCH_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_SEARCH_FAILURE,
      error: err.response.data
    });
  }
}

function* watchSearchsIp() {
  yield takeLatest(LOAD_SEARCHS_IP_REQUEST, searchsIp);
}

function* watchAddSearch() {
  yield takeLatest(ADD_SEARCH_REQUEST, addSearch);
}

export default function* searchSaga() {
  yield all([fork(watchSearchsIp), fork(watchAddSearch)]);
}
