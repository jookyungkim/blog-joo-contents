import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import CommentList from "./CommentList";
import { ADD_COMMENT_REQUEST } from "../reducers/comment";
import useInput from "../hooks/useInput";

function commentForm({ postId }) {
  const dispatch = useDispatch();
  const { mainComments, addCommentDone } = useSelector(state => state.comment);

  const [text, onChangeText, setText] = useInput();
  const [name, onChangeName, setName] = useInput();
  // const [password, onChangePassword] = useInput();

  useEffect(() => {
    if (addCommentDone) {
      setText("");
      setName("");
    }
  }, [addCommentDone]);

  const addCommentHandler = useCallback(
    e => {
      // e.preventDefault();
      // console.log("commentForm text : ", text);

      if (!text) {
        return alert("댓글을 달아주세요");
      }

      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: { postId, text, name, password: "" }
      });
    },
    [postId, text, name]
  );
  return (
    <>
      <div className="comment-wrapper">
        <div className="comment-form">
          <h3>댓글</h3>
          <textarea
            name="comment"
            id=""
            cols="55"
            rows="8"
            placeholder="입력하세요"
            onChange={onChangeText}
            value={text || ""}
          ></textarea>
          <div className="comment-input-group">
            <div className="commnet-input">
              <span>이름</span>
              <input type="text" onChange={onChangeName} value={name || ""} />
            </div>
            <button onClick={addCommentHandler}>
              <i className="fa fa-arrow-circle-down" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="comment-list-group">
          <CommentList mainComments={mainComments} />
          {/* <div className="comment-list">
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
          </div> */}
        </div>
      </div>
      <style jsx>{`
        .comment-wrapper {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
        }

        .comment-wrapper .comment-form {
          border: 1px solid #dbdbdb;
          background-color: #ecf0f1;
          height: 210px;
          width: 100%;
        }

        .comment-wrapper .comment-form h3 {
          margin: 5px 8px;
          color: #727272;
        }

        .comment-wrapper .comment-form textarea {
          display: block;
          margin: 0 auto;
          margin-bottom: 8px;
          resize: none;
          border: none;
          background-color: #ecf0f1;
        }

        .comment-wrapper .comment-form .comment-input-group {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }

        .comment-wrapper .comment-form .comment-input-group .commnet-input {
          margin-left: 8px;
        }

        .comment-wrapper .comment-form .comment-input-group .commnet-input span {
          margin-right: 5px;
        }

        .comment-wrapper .comment-form .comment-input-group .commnet-input input {
          border: 1px solid #b4b4b4;
        }

        .comment-wrapper .comment-form .comment-input-group button {
          margin-right: 10px;
          border: 1px solid #b4b4b4;
        }

        .comment-wrapper .comment-form .comment-input-group button i {
          font-size: 1.5em;
        }

        .comment-list-group {
          margin-top: 15px;
        }

        /* .comment-list-group .comment-list .comment-parent {
          font-size: 1.2em;
          font-weight: 400;
        }

        .comment-list-group .comment-list .comment-parent i {
          margin-right: 8px;
        }

        .comment-list-group .comment-list .comment-child {
          margin-left: 15px;
        }

        .comment-list-group .comment-list .comment-child i {
          margin-right: 8px;
        } */

        .comment-wrapper .comment-form textarea {
          width: 90%;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

commentForm.propTypes = {
  postId: PropTypes.number.isRequired
};

export default commentForm;
