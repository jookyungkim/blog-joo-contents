import axios from "axios";

import { delay, put, takeLatest, all, call, fork, throttle } from "redux-saga/effects";

import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_LINK_POSTS_REQUEST,
  LOAD_LINK_POSTS_SUCCESS,
  LOAD_LINK_POSTS_FAILURE,
  LOAD_SEARCH_POSTS_REQUEST,
  LOAD_SEARCH_POSTS_SUCCESS,
  LOAD_SEARCH_POSTS_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  IS_LIKE_REQUEST,
  IS_LIKE_SUCCESS,
  IS_LIKE_FAILURE,
  LIKE_REQUEST,
  LIKE_SUCCESS,
  LIKE_FAILURE,
  UNLIKE_REQUEST,
  UNLIKE_SUCCESS,
  UNLIKE_FAILURE
} from "../reducers/post";

function loadPostsAPI(lastId) {
  //console.log("lastId", lastId);
  return axios.get(`/posts?lastId=${lastId || 0}`); // lastId undefind 인경우 0으로 치환
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data
    });
  }
}

function loadHashtagPostsAPI(data) {
  // console.log("action-data : ", data);
  return axios.get(`/posts/tag/${encodeURI(data.text)}?lastId=${data.lastId || 0}`); // lastId undefind 인경우 0으로 치환
}

function* loadHashtagPosts(action) {
  // console.log("action : ", action);
  try {
    const result = yield call(loadHashtagPostsAPI, action.data);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: err.response.data
    });
  }
}

function loadLinkPostsAPI(data) {
  //console.log("lastId", lastId);
  return axios.get(
    `posts/sub/linkPages?targetId=${data.id || 0}&&offset=${data.offset || 0}&&limit=${data.limit || 0}`
  ); // lastId undefind 인경우 0으로 치환
}

function* loadLinkPosts(action) {
  try {
    const result = yield call(loadLinkPostsAPI, action.data);
    yield put({
      type: LOAD_LINK_POSTS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_LINK_POSTS_FAILURE,
      error: err.response.data
    });
  }
}

function loadSearchPostsAPI(data) {
  // console.log("action-data : ", data);
  return axios.get(`/posts/${encodeURI(data.text)}?lastId=${data.lastId || 0}`); // lastId undefind 인경우 0으로 치환
}

function* loadSearchPosts(action) {
  // console.log("action : ", action);
  try {
    const result = yield call(loadSearchPostsAPI, action.data);
    yield put({
      type: LOAD_SEARCH_POSTS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_SEARCH_POSTS_FAILURE,
      error: err.response.data
    });
  }
}

function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data
    });
  }
}

function addPostAPI(data) {
  return axios.post("/post", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);

    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data.id}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data
    });
  }
}

function updatePostAPI(data) {
  return axios.patch(`/post/${data.id}`, data);
}

function* updatePost(action) {
  try {
    const result = yield call(updatePostAPI, action.data);
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_POST_FAILURE,
      error: err.response.data
    });
  }
}

function uploadImageAPI(data) {
  return axios.post("/post/image", data); // formData
}

function* uploadImage(action) {
  // const result = yield call(uploadImagesAPI, action.data);
  // console.log("result ", result);
  try {
    const result = yield call(uploadImageAPI, action.data);
    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGE_FAILURE,
      error: err.response.data
    });
  }
}

function isLikeAPI(data) {
  // console.log("isLikeAPI ", data.ip);
  // return axios.post(`/post/${data.id}/isLike`, data);
  return axios.post(`/post/${data}/isLike`);
}

function* isLike(action) {
  try {
    const result = yield call(isLikeAPI, action.data);
    yield put({
      type: IS_LIKE_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: IS_LIKE_FAILURE,
      error: err.response.data
    });
  }
}

function likeAPI(data) {
  return axios.post(`/post/${data}/like`);
}

function* like(action) {
  try {
    const result = yield call(likeAPI, action.data);
    yield put({
      type: LIKE_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_FAILURE,
      error: err.response.data
    });
  }
}

function unlikeAPI(data) {
  console.log("unlikeAPI ", data);
  return axios.post(`/post/${data}/unlike`);
}

function* unlike(action) {
  try {
    const result = yield call(unlikeAPI, action.data);
    yield put({
      type: UNLIKE_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_FAILURE,
      error: err.response.data
    });
  }
}

function* watchLoadPosts() {
  yield throttle(10000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchLoadSearchPosts() {
  yield throttle(10000, LOAD_SEARCH_POSTS_REQUEST, loadSearchPosts);
}

function* watchLoadHashtagPosts() {
  yield throttle(10000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLoadLinkPosts() {
  yield takeLatest(LOAD_LINK_POSTS_REQUEST, loadLinkPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}

function* watchUploadImage() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage);
}

function* watchIsLike() {
  yield takeLatest(IS_LIKE_REQUEST, isLike);
}

function* watchLike() {
  yield takeLatest(LIKE_REQUEST, like);
}

function* watchUnLike() {
  yield takeLatest(UNLIKE_REQUEST, unlike);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchLoadPost),
    fork(watchLoadLinkPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchUpdatePost),
    fork(watchUploadImage),
    fork(watchLoadSearchPosts),
    fork(watchLoadHashtagPosts),
    fork(watchIsLike),
    fork(watchLike),
    fork(watchUnLike)
  ]);
}
