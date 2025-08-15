import React, { useContext, useEffect, useState } from "react";
import { PostList as PostListData } from "../store/Post-list-store";
import Post from "./Post";
import FetchData from "./FetchData";
import LoadingSpinner from "./LoadingSpinner";

function PostList() {
  const { postList , fetching } = useContext(PostListData);
  
  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && <FetchData />}
      {!fetching && postList.map((post) => (
        <Post key={post.id} post={post}/>
      ))}
    </>
  );
}

export default PostList;
