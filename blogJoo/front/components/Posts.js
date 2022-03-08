import React from "react";

import PostCard from "./PostCard";

const PostForm = props => {
  const { mainPosts } = props;

  //const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);
  // useEffect(
  //   () => {
  //     function onScroll() {
  //       // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);

  //       if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
  //         if (hasMorePosts && !loadPostsLoading) {
  //           const lastId = mainPosts[mainPosts.length - 1]?.id;
  //           console.log("화면 로딩");
  //           dispatch({
  //             type: LOAD_POSTS_REQUEST,
  //             lastId
  //           });
  //         }
  //       }
  //     }

  //     window.addEventListener("scroll", onScroll);
  //     return () => {
  //       window.addEventListener("scroll", onScroll);
  //     };
  //   },
  //   [hasMorePosts, loadPostsLoading],
  //   mainPosts
  // );

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

export default PostForm;
