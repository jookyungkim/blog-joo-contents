import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import axios from "axios";
import { END } from "redux-saga";
import requestIp from "request-ip";

import wrapper from "../../store/configureStore";
import AppLayout from "../../components/AppLayout";
import PostList from "../../components/PostList";
import { LOAD_MY_INFO_REQUEST, ADD_VISITANT_REQUEST, LOAD_VISITANT_COUNTS_REQUEST } from "../../reducers/user";
import { LOAD_POSTS_REQUEST, LOAD_SEARCH_POSTS_REQUEST } from "../../reducers/post";
import { LOAD_CATEGORYS_REQUEST } from "../../reducers/category";
import CustomReactLoading from "../../components/CustomReactLoading";

const Post = props => {
  const router = useRouter();
  const { text } = router.query;

  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts, loadPostsLoading, loadSearchPostsLoading, loadPostsDone, loadSearchPostsDone } =
    useSelector(state => state.post);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (text) {
      if (mainPosts.length === 0 && !loadSearchPostsDone) {
        dispatch({
          type: LOAD_SEARCH_POSTS_REQUEST,
          data: { text }
        });
      }
    } else {
      if (mainPosts.length === 0 && !loadPostsDone) {
        dispatch({
          type: LOAD_POSTS_REQUEST
        });
      }
    }
  }, [mainPosts, loadPostsDone, loadSearchPostsDone, text]);

  useEffect(() => {
    if (loadPostsLoading || loadSearchPostsLoading) setIsLoading(true);
    else setIsLoading(false);
  }, [loadPostsLoading, loadSearchPostsLoading, isLoading]);

  useEffect(() => {
    function onScroll() {
      // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);

      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        // 화면 이동시
        if (text) {
          if (hasMorePosts && !loadSearchPostsLoading) {
            const lastId = mainPosts[mainPosts.length - 1]?.id;
            console.log("posts 개인화면 로딩");
            dispatch({
              type: LOAD_POSTS_REQUEST,
              lastId
            });
          }
          // 기본 index 화면
        } else {
          if (hasMorePosts && !loadPostsLoading) {
            const lastId = mainPosts[mainPosts.length - 1]?.id;
            console.log("index 화면 로딩");
            dispatch({
              type: LOAD_SEARCH_POSTS_REQUEST,
              data: { text, lastId }
            });
          }
        }
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.addEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, loadSearchPostsLoading, mainPosts]);

  return (
    <>
      {isLoading && <CustomReactLoading type={"spin"} color={"#222f3e"} />}
      <AppLayout>
        <Head>
          <title>링크 : {text}</title>
        </Head>
        <div className="main-inner">
          <h2 className="title-name">링크 : {text}</h2>
          <PostList mainPosts={mainPosts} loadPostsLoading={text ? loadSearchPostsLoading : loadPostsLoading} />
        </div>
      </AppLayout>

      <style jsx>{`
        .title-name {
          text-align: center;
          margin: 8px 0;
        }
      `}</style>
    </>
  );
};

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

  const ip = requestIp.getClientIp(req);
  // console.log("client ip : ", ip);
  store.dispatch({
    type: ADD_VISITANT_REQUEST,
    data: { ip }
  });

  store.dispatch({
    type: LOAD_VISITANT_COUNTS_REQUEST
  });

  store.dispatch({
    type: LOAD_CATEGORYS_REQUEST
  });
  // const router = useRouter();
  // const { name } = router.query;
  // console.log("etc$% ", etc.params);
  const { text } = etc.params;
  // console.log("text : ", text);

  // if (text) {
  //   store.dispatch({
  //     type: LOAD_SEARCH_POSTS_REQUEST,
  //     data: { text }
  //   });
  // } else {
  //   store.dispatch({
  //     type: LOAD_POSTS_REQUEST
  //   });
  // }

  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Post;
