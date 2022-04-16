import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";

import wrapper from "../store/configureStore";
import { LOAD_MY_INFO_REQUEST, ADD_VISITANT_REQUEST } from "../reducers/user";
import { LOAD_RECENT_HASHTAGS_REQUEST, LOAD_POPULAR_HASHTAGS_REQUEST } from "../reducers/hashtag";
import CustomReactLoading from "../components/CustomReactLoading";

const tags = () => {
  const dispatch = useDispatch();
  const { recentHashtags, popularHashtags, loadPopularHashtagsLoading, loadPopularHashtagsDone } = useSelector(
    state => state.hashtag
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // dispatch({
    //   type: LOAD_RECENT_HASHTAGS_REQUEST
    // });
    if (popularHashtags.length === 0 && !loadPopularHashtagsDone) {
      dispatch({
        type: LOAD_POPULAR_HASHTAGS_REQUEST
      });
    }
  }, [popularHashtags, loadPopularHashtagsDone]);

  useEffect(() => {
    if (loadPopularHashtagsLoading) setIsLoading(true);
    else setIsLoading(false);
  }, [loadPopularHashtagsLoading, isLoading]);

  // console.log("태그 ", loadPopularHashtagsLoading);
  // console.log("isLoading ", isLoading);
  return (
    <>
      {isLoading && <CustomReactLoading type={"spin"} color={"#222f3e"} />}
      <div className="tag-container">
        <div className="inner">
          <div className="tag-wrapper">
            <h2>인기태그</h2>
            <div className="tag-group">
              {popularHashtags.map(tag => (
                <Link key={tag.id} href={`/posts/tags/${tag.keyword}`}>
                  <a>{tag.keyword}</a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .tag-container {
          width: 100%;
          height: 100vh;
        }

        .tag-container .tag-wrapper {
          margin-top: 30px;
        }

        .tag-container .tag-wrapper h2 {
          margin-bottom: 15px;
        }

        .tag-container .tag-wrapper .tag-group {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
        }

        .tag-container .tag-wrapper .tag-group a {
          border: 1px solid #eeeeee;
          border-radius: 0.5rem;
          margin-right: 10px;
          padding: 0.7em 0.7em;
          background-color: #3ae374;
          margin-bottom: 10px;
        }

        @media (min-width: 335px) and (max-width: 757px) {
          .tag-container .inner {
            width: 100%;
          }
          .tag-container .tag-wrapper {
            width: 95%;
            margin: auto;
            margin-top: 30px;
          }
          .tag-container .tag-wrapper h2 {
            text-align: center;
          }
          .tag-container .tag-wrapper .tag-group {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
          }
          .tag-container .tag-wrapper .tag-group a {
            display: block;
          }
          .tag-container .tag-wrapper .tag-group a:nth-child(5n) {
            margin-right: 0px;
          }
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

  // store.dispatch({
  //   type: LOAD_MY_INFO_REQUEST
  // });

  store.dispatch({
    type: ADD_VISITANT_REQUEST
  });

  store.dispatch(END);
  await store.sagaTask.toPromise();
});
export default tags;
