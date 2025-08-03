import React, { useContext } from "react";
import { PostList as PostListData } from "../store/Post-list-store";
import Post from "./Post";

function PostList() {
  const { postList } = useContext(PostListData);
  return (
    <>
      {postList.map((post) => (
        <Post key={post.id} post={post}/>
      ))}
    </>
  );
}

export default PostList;
