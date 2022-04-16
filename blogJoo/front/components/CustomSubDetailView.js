import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const CustomSubDetailView = ({ postId, title, isConnext }) => {
  // console.log("isConnext : ", isConnext);
  return (
    <>
      {isConnext ? (
        <div className="beforeAfter-link">
          <div className="beforAfter-link-text">
            <span>{title}</span>
            <i className="fa fa-long-arrow-right" aria-hidden="true" />
          </div>
        </div>
      ) : (
        <Link href={`/post/${postId}`}>
          <a className="beforeAfter-link">
            <div className="beforAfter-link-text">
              <span>{title}</span>
              <i className="fa fa-long-arrow-right" aria-hidden="true" />
            </div>
          </a>
        </Link>
      )}

      <style jsx>{`
        /* .beforeAfter-detail {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          width: 50%;
          margin: 5px 0;
        } */

        .beforeAfter-link {
          display: block;
          width: 100%;
        }

        .beforeAfter-link .beforAfter-link-text {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          width: 90%;
          font-weight: ${isConnext ? 500 : 300};
          /* font-weight: 300; */
          /* font-weight: "bolder"; */
        }

        @media (min-width: 335px) and (max-width: 757px) {
          /* .beforeAfter-detail {
            width: 100%;
          } */
          .beforeAfter-link .beforAfter-link-text {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

CustomSubDetailView.propTypes = {
  postId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isConnext: PropTypes.bool.isRequired
};

export default CustomSubDetailView;
