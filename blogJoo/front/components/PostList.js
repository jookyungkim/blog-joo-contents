import React from "react";
import PropTypes from "prop-types";

import PostCard from "./PostCard";
import CustomReactLoading from "./CustomReactLoading";

const PostList = ({ mainPosts, loadPostsLoading }) => {
  // const { mainPosts } = props;
  return (
    <>
      <div className="post-wrapper">
        {/* {loadPostsLoading && <CustomReactLoading type={"spin"} color={"#222f3e"} />} */}
        <section className="posts">
          {mainPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
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

        @media (min-width: 335px) and (max-width: 757px) {
          .posts {
            flex-direction: column;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

PostList.propTypes = {
  mainPosts: PropTypes.arrayOf(PropTypes.object)
};

export default PostList;
