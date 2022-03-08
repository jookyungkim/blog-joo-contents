import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";

import AppLayout from "../../components/AppLayout";
import Posts from "../../components/Posts";
import { LOAD_POSTS_REQUEST } from "../../reducers/post";

const Post = props => {
  const router = useRouter();
  const { name } = router.query;

  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);

  useEffect(
    () => {
      function onScroll() {
        // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);

        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (hasMorePosts && !loadPostsLoading) {
            const lastId = mainPosts[mainPosts.length - 1]?.id;
            console.log("화면 로딩");
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

  return (
    <>
      <AppLayout>
        <Head>
          <title>{name}</title>
        </Head>
        <div className="main-inner">
          <h2 className="title-name">{name}</h2>
          <Posts mainPosts={mainPosts} />
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

export default Post;
