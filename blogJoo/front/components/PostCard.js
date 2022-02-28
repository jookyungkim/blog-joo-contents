import React from "react";
import PropTypes from "prop-types";

const PostCard = ({ post }) => {
  //console.log(post);

  return (
    <>
      <div className="post">
        <a href={post.postId}>
          <img src={post.Images[0].src} alt="" />
          <div className="post-text">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
        </a>
      </div>
      <style jsx>{`
        .post {
          width: 280px;
          margin: 15px 15px;
        }

        .post:nth-child(3n + 1) {
          margin-left: 0;
        }

        .post:nth-child(3n + 3) {
          margin-right: 0;
        }
        .post a img {
          object-fit: cover;
          width: 100%;
          height: 250px;
        }
        .post a h4 {
          font-size: 1.3em;
        }

        @media (min-width: 335px) and (max-width: 757px) {
          .post {
            margin: 0px;
            width: 100%;
            height: 400px;
          }
          .post-text {
            margin-left: 5px;
          }

          .post a img {
            height: 300px;
          }
        }
      `}</style>
    </>
  );
};

PostCard.propTypes = {};

export default PostCard;
