import { useCallback, useState } from "react";
import PostItem from "./PostItem";

export const PostList = ({ posts }) => {
  return (
    <>
      <div className="main_title">
        <h4>Post Lists</h4>
      </div>
      <div className="post-grid">
        {posts.map((post) => (
          <PostItem data={post} key={post.id} />
        ))}
      </div>
    </>
  );
};
