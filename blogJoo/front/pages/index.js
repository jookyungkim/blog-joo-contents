import React from "react";
import axios from "axios";
import { END } from "redux-saga";

import AppLayout from "../components/AppLayout";
import Posts from "../components/Posts";
import SliderForm from "../components/sliderForm";
import wrapper from "../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

function index() {
  return (
    <AppLayout>
      <div className="main-inner">
        <SliderForm />
        <Posts />
      </div>
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
  // **** 매우중요 ****
  // 쿠키를 프론트 서버에서 벡엔드 서버로 보내준다. 브라우저는 간섭을 못한다.
  // 실제 내 pc 쿠키가 있을때만 넣어주고 없을때는 "" 초기화 해주기

  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });

  store.dispatch({
    type: LOAD_POSTS_REQUEST
  });

  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default index;
