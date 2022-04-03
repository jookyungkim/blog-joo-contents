import React from "react";

import PostCard from "./PostCard";

const PostList = props => {
  const { mainPosts } = props;

  return (
    <>
      <div className="post-wrapper">
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

export default PostList;
