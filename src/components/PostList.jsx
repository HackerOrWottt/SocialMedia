import React, { useContext, useEffect, useState } from "react";
import { PostList as PostListData } from "../store/Post-list-store";
import Post from "./Post";
import FetchData from "./FetchData";

function PostList() {
  const { postList , addInitialPosts } = useContext(PostListData);
  const [fetched , setFetched] = useState(false);

  if(!fetched){
    fetch("https://dummyjson.com/post")
    .then((res) => (res.json()))
    .then((data) => {
      addInitialPosts(data.posts);
    });

    setFetched(true);
  }
  
  return (
    <>
      {postList.length === 0 && <FetchData />}
      {postList.map((post) => (
        <Post key={post.id} post={post}/>
      ))}
    </>
  );
}

export default PostList;
