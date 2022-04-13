import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import Link from "next/link";

import AppLayout from "../components/AppLayout";
import PostList from "../components/PostList";
import Slider from "../components/Slider";
import wrapper from "../store/configureStore";
import { LOAD_MY_INFO_REQUEST, ADD_VISITANT_REQUEST } from "../reducers/user";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_CATEGORYS_REQUEST } from "../reducers/category";

function index() {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);

  // 페이징 처리
  useEffect(
    () => {
      function onScroll() {
        // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);

        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (hasMorePosts && !loadPostsLoading) {
            const lastId = mainPosts[mainPosts.length - 1]?.id;
            // console.log("화면 로딩");
            dispatch({
              type: LOAD_POSTS_REQUEST,
              lastId
            });
          }
        }
      }

      window.addEventListener("scroll", onScroll);
      return () => {
        window.addEventListener("scroll", onScroll);
      };
    },
    [hasMorePosts, loadPostsLoading],
    mainPosts
  );

  // 슬라이더 data
  let postImages = [];
  let count = 0;
  for (const data of mainPosts) {
    if (data.Images[0]?.src !== undefined) {
      postImages.push({ id: data.id, src: data.Images[0].src });
      ++count;
      if (count === 3) break;
    }
  }

  return (
    <AppLayout>
      <div className="main-inner">
        <Slider images={postImages} />
        <Link href="/postRegister">
          <a className="common-link">게시글등록</a>
        </Link>
        <PostList mainPosts={mainPosts} />
      </div>

      <style jsx>{`
        .common-link {
          margin-top: 15px;
          margin-left: auto;
          /* margin-bottom: 8px; */
        }
      `}</style>
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

  // console.log("index getServerSideProps 흐름 확인");
  store.dispatch({
    type: ADD_VISITANT_REQUEST
  });

  store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });

  store.dispatch({
    type: LOAD_POSTS_REQUEST
  });

  store.dispatch({
    type: LOAD_CATEGORYS_REQUEST
  });

  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default index;
