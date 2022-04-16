import React, { useEffect, useState } from "react";
import axios from "axios";
import { END } from "redux-saga";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import wrapper from "../store/configureStore";
import SearchForm from "../components/search";
import { LOAD_MY_INFO_REQUEST, ADD_VISITANT_REQUEST } from "../reducers/user";
import { LOAD_SEARCHS_IP_REQUEST } from "../reducers/search";
import { LOAD_RECENT_HASHTAGS_REQUEST, LOAD_POPULAR_HASHTAGS_REQUEST } from "../reducers/hashtag";
import CustomReactLoading from "../components/CustomReactLoading";

const search = () => {
  const dispatch = useDispatch();
  const {
    recentHashtags,
    popularHashtags,
    loadRecentHashtagsLoading,
    loadRecentHashtagsDone,
    loadPopularHashtagsLoading,
    loadPopularHashtagsDone
  } = useSelector(state => state.hashtag);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (recentHashtags.length === 0 && !loadRecentHashtagsDone) {
      dispatch({
        type: LOAD_RECENT_HASHTAGS_REQUEST
      });
    }

    if (popularHashtags.length === 0 && !loadPopularHashtagsDone) {
      dispatch({
        type: LOAD_POPULAR_HASHTAGS_REQUEST
      });
    }
  }, [loadRecentHashtagsDone, loadPopularHashtagsDone]);

  useEffect(() => {
    if (loadRecentHashtagsLoading || loadPopularHashtagsLoading) setIsLoading(true);
    else setIsLoading(false);
  }, [isLoading, loadRecentHashtagsLoading, loadPopularHashtagsLoading]);

  console.log("isLoading : ", isLoading);
  return (
    <>
      {isLoading && <CustomReactLoading type={"spin"} color={"#222f3e"} />}
      <div className="search-container">
        <div className="inner">
          <div className="search-wrapper">
            <h2>무엇을 찾고 계산가요?</h2>
            <SearchForm setIsLoading={setIsLoading} />
            {/* <div className="input-search-group">
              <div className="search-input">
                <input
                  type="search"
                  onChange={e => setSearchField(e.target.value)}
                  onFocus={handlerFocus}
                  onBlur={handlerOnBlur}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={handlerOnClick}>
                  <i className="fa fa-search" aria-hidden="true" />
                </button>
              </div>
              <SearchBlock datas={filteredDatas} />
            </div> */}
            <div className="recent-search">
              <h2>최근검색</h2>
              <div className="recent-link-group">
                {recentHashtags.map(tag => (
                  <Link key={tag.id} href={`/posts/tags/${tag.keyword}`}>
                    <a>{tag.keyword}</a>
                  </Link>
                ))}
              </div>
            </div>
            <div className="popuar-search">
              <h2>인기검색</h2>
              <div className="popuar-link-group">
                {popularHashtags.map(tag => (
                  <Link key={tag.id} href={`/posts/tags/${tag.keyword}`}>
                    <a>{tag.keyword}</a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .search-container {
          width: 100%;
          height: 100vh;
        }

        .search-container .search-wrapper {
          margin-top: 30px;
          height: 100vh;
        }

        .search-container .search-wrapper h2 {
          margin-bottom: 15px;
        }

        /* .search-container .search-wrapper .input-search-group {
          margin-bottom: 70px;
        }
        
        .search-container .search-wrapper .input-search-group .search-input input {
          width: 250px;
          height: auto;
           높이값 초기화 
          line-height: normal;
           line-height 초기화 
          padding: .6em .5em;
           원하는 여백 설정, 상하단 여백으로 높이를 조절 
          font-family: inherit;
           폰트 상속 
          border: 1px solid #c9c9c9;
          border-radius: 0;
           iSO 둥근모서리 제거 
          outline-style: none;
           포커스시 발생하는 효과 제거를 원한다면 
          -webkit-appearance: none;
           브라우저별 기본 스타일링 제거 
          -moz-appearance: none;
          appearance: none;
        }
        
        .search-container .search-wrapper .input-search-group .search-input button {
          border: 1px solid #c9c9c9;
          width: 50px;
          padding: .6em .5em;
        } */

        .search-container .search-wrapper .recent-search {
          margin-bottom: 70px;
        }

        .search-container .search-wrapper .recent-search h2 {
          margin-bottom: 15px;
        }

        .search-container .search-wrapper .recent-search .recent-link-group {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
        }

        .search-container .search-wrapper .recent-search .recent-link-group a {
          border: 1px solid #eeeeee;
          border-radius: 0.5rem;
          margin-right: 10px;
          padding: 0.7em 0.7em;
          background-color: #3ae374;
          margin-bottom: 10px;
        }

        .search-container .search-wrapper .popuar-search {
          margin-bottom: 70px;
        }

        .search-container .search-wrapper .popuar-search h2 {
          margin-bottom: 15px;
        }

        .search-container .search-wrapper .popuar-search .popuar-link-group {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
        }

        .search-container .search-wrapper .popuar-search .popuar-link-group a {
          border: 1px solid #eeeeee;
          border-radius: 0.5rem;
          margin-right: 10px;
          padding: 0.7em 0.7em;
          background-color: #3ae374;
          margin-bottom: 10px;
        }

        /*
          .search-container .search-wrapper .input-search-group .search-input {
            text-align: center;
          } */
        .search-container .search-wrapper .recent-search {
          margin-bottom: 20px;
        }
        .search-container .search-wrapper .recent-search .recent-link-group {
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          /* justify-content: center; */
        }
        .search-container .search-wrapper .recent-search .recent-link-group a {
          display: block;
        }
        .search-container .search-wrapper .recent-search .recent-link-group a:nth-child(5n) {
          margin-right: 0px;
        }
        .search-container .search-wrapper .popuar-search .popuar-link-group {
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          /* justify-content: center; */
        }
        .search-container .search-wrapper .popuar-search .popuar-link-group a {
          display: block;
        }
        .search-container .search-wrapper .popuar-search .popuar-link-group a:nth-child(5n) {
          margin-right: 0px;
        }

        @media (min-width: 335px) and (max-width: 757px) {
          .search-container .inner {
            width: 100%;
          }
          .search-container .search-wrapper {
            /* width: 95%; */
            margin: auto;
            margin-top: 30px;
          }
          .search-container .search-wrapper h2 {
            text-align: center;
          }
          .search-container .search-wrapper .recent-search .recent-link-group {
            justify-content: center;
          }

          .search-container .search-wrapper .popuar-search .popuar-link-group {
            justify-content: center;
          }
          /* .search-container .search-wrapper .input-search-group {
            margin-bottom: 20px;
            /* position: absolute; */
          /* display: flex; */
          /* flex-direction: column; */
          /* justify-content: center; */
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

  // console.log("index getServerSideProps 흐름 확인");
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });

  store.dispatch({
    type: ADD_VISITANT_REQUEST
  });

  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default search;
