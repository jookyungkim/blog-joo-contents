import React from "react";
import PropTypes from "prop-types";

const PostForm = props => {
  return (
    <>
      <div className="post-wrapper">
        <section className="posts">
          <div className="post">
            <a href="#none">
              <img src="https://fakeimg.pl/300/" alt="" />
              <div className="post-text">
                <h4>input 태그 속성들~ </h4>
                <p>value, readonly 속성들의 특징 이해관계를 알아보자</p>
              </div>
            </a>
          </div>
          <div className="post">
            <a href="#none">
              <img src="https://fakeimg.pl/300/" alt="" />
              <div className="post-text">
                <h4>input 태그 속성들~ </h4>
                <p>value, readonly 속성들의 특징 이해관계를 알아보자</p>
              </div>
            </a>
          </div>
          <div className="post">
            <a href="#none">
              <img src="https://fakeimg.pl/300/" alt="" />
              <div className="post-text">
                <h4>input 태그 속성들~ </h4>
                <p>value, readonly 속성들의 특징 이해관계를 알아보자</p>
              </div>
            </a>
          </div>
          <div className="post">
            <a href="#none">
              <img src="https://fakeimg.pl/300/" alt="" />
              <div className="post-text">
                <h4>input 태그 속성들~ </h4>
                <p>value, readonly 속성들의 특징 이해관계를 알아보자</p>
              </div>
            </a>
          </div>
          <div className="post">
            <a href="#none">
              <img src="https://fakeimg.pl/300/" alt="" />
              <div className="post-text">
                <h4>input 태그 속성들~ </h4>
                <p>value, readonly 속성들의 특징 이해관계를 알아보자</p>
              </div>
            </a>
          </div>
          <div className="post">
            <a href="#none">
              <img src="https://fakeimg.pl/300/" alt="" />
              <div className="post-text">
                <h4>input 태그 속성들~ </h4>
                <p>value, readonly 속성들의 특징 이해관계를 알아보자</p>
              </div>
            </a>
          </div>
        </section>
      </div>
      <style jsx>{`
        .post-wrapper {
          width: 100%;
        }

        .posts {
          display: flex;
          flex-wrap: wrap;
        }

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
          .posts {
            flex-direction: column;
            justify-content: center;
          }

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

PostForm.propTypes = {};

export default PostForm;
