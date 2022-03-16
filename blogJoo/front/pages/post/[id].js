import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { END } from "redux-saga";
import DOMPurify from "isomorphic-dompurify";
import styled from "styled-components";

import wrapper from "../../store/configureStore";
import { LOAD_POST_REQUEST } from "../../reducers/post";

const CustomEditorView = styled.div`
  img {
    width: 100%;
  }
`;

const postView = () => {
  const router = useRouter();
  const { id } = router.query;
  const ref = useRef(null);

  const singlePost = useSelector(state => state.post.singlePost);
  const { Images, Hashtags } = singlePost;
  // console.log("singlePost ", singlePost);
  const firstSrc = Images[0]?.src;

  return (
    <>
      <div className="postView-container">
        <div className="slider-form">
          <img src={firstSrc} alt="" />
        </div>
        <div className="postView-inner">
          <div className="postView-wrapper">
            <CustomEditorView
              className="post-detail"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(singlePost.content) }}
            />
            <div className="postView-main">
              <div className="button-group">
                <div className="button-like-group">
                  <button className="common-button">좋아요</button>
                  <button className="common-button">신고하기</button>
                </div>
                <div className="button-status-group">
                  <button className="common-button">수정</button>
                  <button className="common-button">삭제</button>
                </div>
              </div>
              <div className="beforeAfter-link-group">
                {/* <div className="beforeAfter-title">
                  <h2>
                    {`language >`} <span>html 카테고리의 다른글</span>
                  </h2>
                </div> */}
                <hr />
                <div className="beforeAfter-list">
                  <div className="beforeAfter-detail">
                    <a href="#none" className="beforeAfter-link">
                      <div className="beforAfter-link-text">
                        <span>input 태그의 type 속성 종류와 예제</span>
                        <i className="fa fa-long-arrow-right" aria-hidden="true" />
                      </div>
                    </a>
                  </div>
                  <div className="beforeAfter-detail">
                    <a href="#none" className="beforeAfter-link">
                      <div className="beforAfter-link-text">
                        <span>input 태그의 type 속성 종류와 예제</span>
                        <i className="fa fa-long-arrow-right" aria-hidden="true" />
                      </div>
                    </a>
                  </div>
                  <div className="beforeAfter-detail">
                    <a href="#none" className="beforeAfter-link">
                      <div className="beforAfter-link-text">
                        <span>input 태그의 type 속성 종류와 예제</span>
                        <i className="fa fa-long-arrow-right" aria-hidden="true" />
                      </div>
                    </a>
                  </div>
                  <div className="beforeAfter-detail">
                    <a href="#none" className="beforeAfter-link">
                      <div className="beforAfter-link-text">
                        <span>input 태그의 type 속성 종류와 예제</span>
                        <i className="fa fa-long-arrow-right" aria-hidden="true" />
                      </div>
                    </a>
                  </div>
                </div>
                <hr />
              </div>
              <div className="tag-group">
                {Hashtags.map(tag => (
                  <Link key={tag.id} href={`/posts/${tag.keyword}`}>
                    <a>{tag.keyword}</a>
                  </Link>
                ))}
              </div>
            </div>
            <div className="serve-wrapper">
              <div className="commentShare-wrapper">
                <div className="comment-wrapper">
                  <div className="comment-form">
                    <h3>댓글</h3>
                    <textarea name="comment" id="" cols="55" rows="8" placeholder="입력하세요"></textarea>
                    <div className="comment-input-group">
                      <div className="commnet-input">
                        <span>이름</span>
                        <input type="text" />
                      </div>
                      <button>
                        <i className="fa fa-arrow-circle-down" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="share-wrapper">
                  <div className="share-group">
                    <h3>공유하기</h3>
                    <div className="share-link-list">
                      <a href="#none">네이버</a>
                      <a href="#none">카카오톡</a>
                      <a href="#none">트위터</a>
                      <a href="#none">밴드</a>
                      <a href="#none">페이스북</a>
                      <a href="#none">페이스북</a>
                      <a href="#none">페이스북</a>
                      <a href="#none">페이스북</a>
                      <a href="#none">페이스북</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="comment-list-group">
                <div className="comment-list">
                  <div className="comment-parent">
                    <i className="fa fa-chevron-circle-right" aria-hidden="true" />
                    <span>html이 브라우저로 돌아가는거 보면 신기해요</span>
                  </div>
                  <div className="comment-child">
                    <i className="fa fa-chevron-circle-left" aria-hidden="true" />
                    <span>[쿠카]</span>
                    <span>그쵸ㅎㅎ 저도 공부하면서 너무 신기했어요!</span>
                  </div>
                  <div className="comment-child">
                    <i className="fa fa-chevron-circle-left" aria-hidden="true" />
                    <span>[조로]</span>
                    <span> 많은것을 알게되서 기뻐요 ㅎㅎ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .postView-container {
          width: 100%;
          height: 100vh;
        }

        .postView-inner {
          width: 900px;
          margin: auto;
        }

        .postView-wrapper {
          width: 100%;
        }

        .slider-form {
          /* width: 100%; */
          margin: auto;
          overflow: hidden;
          /* height: 200px; */
        }

        .slider-form img {
          width: 100%;
          /* height: 250px; */
        }
        /* .postView-wrapper .postView-main .post-detail {
          height: 100px; 
          border: 1px solid blue; 
        } */

        .postView-wrapper .postView-main .button-group {
          margin-top: 15px;
          margin-bottom: 10px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }

        .postView-wrapper .postView-main .button-group .button-like-group {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 45px;
        }

        .postView-wrapper .postView-main .button-group .button-like-group .common-button {
          margin-right: 5px;
        }

        .postView-wrapper .postView-main .button-group .button-status-group {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 45px;
        }

        .postView-wrapper .postView-main .button-group .button-status-group .common-button {
          margin-left: 5px;
        }

        .postView-wrapper .postView-main .beforeAfter-link-group .beforeAfter-title {
          margin-bottom: 10px;
        }

        .postView-wrapper .postView-main .beforeAfter-link-group .beforeAfter-title span {
          color: #8f8f8f;
        }

        .postView-wrapper .postView-main .beforeAfter-link-group .beforeAfter-list {
          margin: 10px 0;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
        }

        .postView-wrapper .postView-main .beforeAfter-link-group .beforeAfter-list .beforeAfter-detail {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 50%;
          margin: 5px 0;
        }

        .postView-wrapper
          .postView-main
          .beforeAfter-link-group
          .beforeAfter-list
          .beforeAfter-detail
          .beforeAfter-link {
          display: block;
          width: 100%;
        }

        .postView-wrapper
          .postView-main
          .beforeAfter-link-group
          .beforeAfter-list
          .beforeAfter-detail
          .beforeAfter-link
          .beforAfter-link-text {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          width: 90%;
        }

        .postView-wrapper .postView-main .tag-group {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          margin-top: 10px;
          margin-bottom: 5px;
        }

        .postView-wrapper .postView-main .tag-group a {
          border: 1px solid #eeeeee;
          border-radius: 0.5rem;
          margin-right: 10px;
          padding: 0.7em 0.7em;
          background-color: #3ae374;
          margin-bottom: 10px;
        }

        .postView-wrapper .serve-wrapper .commentShare-wrapper {
          width: 100%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
        }

        .postView-wrapper .serve-wrapper .commentShare-wrapper .comment-wrapper {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
        }

        .postView-wrapper .serve-wrapper .commentShare-wrapper .comment-wrapper .comment-form {
          border: 1px solid #dbdbdb;
          background-color: #ecf0f1;
          height: 210px;
          width: 100%;
        }

        .postView-wrapper .serve-wrapper .commentShare-wrapper .comment-wrapper .comment-form h3 {
          margin: 5px 8px;
          color: #727272;
        }

        .postView-wrapper .serve-wrapper .commentShare-wrapper .comment-wrapper .comment-form textarea {
          display: block;
          margin: 0 auto;
          margin-bottom: 8px;
          resize: none;
          border: none;
          background-color: #ecf0f1;
        }

        .postView-wrapper .serve-wrapper .commentShare-wrapper .comment-wrapper .comment-form .comment-input-group {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }

        .postView-wrapper
          .serve-wrapper
          .commentShare-wrapper
          .comment-wrapper
          .comment-form
          .comment-input-group
          .commnet-input {
          margin-left: 8px;
        }

        .postView-wrapper
          .serve-wrapper
          .commentShare-wrapper
          .comment-wrapper
          .comment-form
          .comment-input-group
          .commnet-input
          span {
          margin-right: 5px;
        }

        .postView-wrapper
          .serve-wrapper
          .commentShare-wrapper
          .comment-wrapper
          .comment-form
          .comment-input-group
          .commnet-input
          input {
          border: 1px solid #b4b4b4;
        }

        .postView-wrapper
          .serve-wrapper
          .commentShare-wrapper
          .comment-wrapper
          .comment-form
          .comment-input-group
          button {
          margin-right: 10px;
          border: 1px solid #b4b4b4;
        }

        .postView-wrapper
          .serve-wrapper
          .commentShare-wrapper
          .comment-wrapper
          .comment-form
          .comment-input-group
          button
          i {
          font-size: 1.5em;
        }

        .postView-wrapper .serve-wrapper .commentShare-wrapper .share-wrapper {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
        }

        .postView-wrapper .serve-wrapper .commentShare-wrapper .share-wrapper .share-group {
          margin-left: 10px;
        }

        .postView-wrapper .serve-wrapper .commentShare-wrapper .share-wrapper .share-group h3 {
          text-align: center;
          margin: 10px 0;
        }

        .postView-wrapper .serve-wrapper .commentShare-wrapper .share-wrapper .share-group .share-link-list {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
        }

        .postView-wrapper .serve-wrapper .commentShare-wrapper .share-wrapper .share-group .share-link-list a {
          border: 1px solid #eeeeee;
          border-radius: 0.5rem;
          margin-right: 10px;
          padding: 0.7em 0.7em;
          background-color: #3498db;
          margin-bottom: 10px;
        }

        .postView-wrapper .serve-wrapper .comment-list-group {
          margin-top: 15px;
        }

        .postView-wrapper .serve-wrapper .comment-list-group .comment-list .comment-parent {
          font-size: 1.2em;
          font-weight: 400;
        }

        .postView-wrapper .serve-wrapper .comment-list-group .comment-list .comment-parent i {
          margin-right: 8px;
        }

        .postView-wrapper .serve-wrapper .comment-list-group .comment-list .comment-child {
          margin-left: 15px;
        }

        .postView-wrapper .serve-wrapper .comment-list-group .comment-list .comment-child i {
          margin-right: 8px;
        }

        @media (min-width: 335px) and (max-width: 757px) {
          .slider-form {
            width: 100%;
          }

          .slider-form img {
            /* width: 100%; */
            height: 250px;
          }

          .postView-inner {
            width: 95%;
          }
          .postView-wrapper .postView-main .beforeAfter-link-group .beforeAfter-list {
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
          }
          .postView-wrapper .postView-main .beforeAfter-link-group .beforeAfter-list .beforeAfter-detail {
            width: 100%;
          }
          .postView-wrapper
            .postView-main
            .beforeAfter-link-group
            .beforeAfter-list
            .beforeAfter-detail
            .beforeAfter-link
            .beforAfter-link-text {
            width: 100%;
          }
          .postView-wrapper .serve-wrapper .commentShare-wrapper {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
          }
          .postView-wrapper .serve-wrapper .commentShare-wrapper .comment-wrapper .comment-form textarea {
            width: 90%;
            overflow: hidden;
          }
        }
        /*# sourceMappingURL=style.css.map */
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
  // const router = useRouter();
  // const { name } = router.query;
  // console.log("etc$% ", etc.params);
  const { id } = etc.params;

  store.dispatch({
    type: LOAD_POST_REQUEST,
    data: id
  });

  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default postView;
