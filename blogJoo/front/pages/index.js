import React from "react";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import SliderForm from "../components/sliderForm";

function index() {
  return (
    <AppLayout>
      <div className="main-inner">
        <SliderForm />
        <PostForm />
      </div>
    </AppLayout>
  );
}

export default index;
