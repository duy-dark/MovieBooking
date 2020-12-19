import React from "react";
import PostItem from "./post_item";
import PostItemSmall from "./post_item_small";
import "../../../../styles/customers/news/post_container.scss";
export default function PostContainer(props) {
  return (
    <>
      <div className="post_container1">
        <PostItem></PostItem>
        <PostItem></PostItem>
      </div>
      <div className="post_container23">
        <div className="post_container2 post_container21">
          <PostItem></PostItem>
          <PostItem></PostItem>
        </div>
        <div className="post_container3 post_container31">
          <PostItemSmall></PostItemSmall>
          <PostItemSmall></PostItemSmall>
          <PostItemSmall></PostItemSmall>
          <PostItemSmall></PostItemSmall>
        </div>
      </div>
    </>
  );
}
