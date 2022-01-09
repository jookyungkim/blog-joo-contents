import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import PostForm from "../../components/PostForm";

const Post = props => {
  const router = useRouter();
  const { name } = router.query;
  return (
    <>
      <AppLayout>
        <Head>
          <title>{name}</title>
        </Head>
        <div className="main-inner">
          <h2 className="title-name">{name}</h2>
          <PostForm />
        </div>
      </AppLayout>

      <style jsx>{`
        .title-name {
          text-align: center;
          margin: 8px 0;
        }
      `}</style>
    </>
  );
};

export default Post;
