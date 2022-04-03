import React from "react";
import PropTypes from "prop-types";

function CommentList({ mainComments }) {
  return (
    <>
      <div className="comment-list">
        {mainComments.map((comment, index) => (
          <div key={comment.id}>
            <div className="comment-parent">
              <i className="fa fa-chevron-circle-right" aria-hidden="true" />
              <span>{comment.text}</span>
            </div>
            {comment.subComments.map((data, i) => (
              <div className="comment-child" key={data.id}>
                <i className="fa fa-chevron-circle-left" aria-hidden="true" />
                <span>[{data.name}] </span>
                <span>{data.text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <style jsx>{`
        .comment-list .comment-parent {
          font-size: 1.2em;
          font-weight: 400;
        }

        .comment-list .comment-parent i {
          margin-right: 8px;
        }

        .comment-list .comment-child {
          margin-left: 15px;
        }

        .comment-list .comment-child i {
          margin-right: 8px;
        }
      `}</style>
    </>
  );
}

CommentList.propTypes = {};

export default CommentList;
