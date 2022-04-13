import axios from "axios";

import { delay, put, takeLatest, all, call, fork, throttle } from "redux-saga/effects";

import { LOAD_CATEGORYS_REQUEST, LOAD_CATEGORYS_SUCCESS, LOAD_CATEGORYS_FAILURE } from "../reducers/category";

function categorysAPI(lastId) {
  //console.log("lastId", lastId);
  return axios.get("/categorys"); // lastId undefind 인경우 0으로 치환
}

function* categorys(action) {
  try {
    const result = yield call(categorysAPI);
    yield put({
      type: LOAD_CATEGORYS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_CATEGORYS_FAILURE,
      error: err.response.data
    });
  }
}

function* watchCategorys() {
  yield takeLatest(LOAD_CATEGORYS_REQUEST, categorys);
}

export default function* categorySaga() {
  yield all([fork(watchCategorys)]);
}
