import React, { useContext, useEffect, useState } from "react";
import { PostList as PostListData } from "../store/Post-list-store";
import Post from "./Post";
import FetchData from "./FetchData";
import LoadingSpinner from "./LoadingSpinner";

function PostList() {
  const { postList , addInitialPosts } = useContext(PostListData);
  const [fetching , setFetching] = useState(false);

  useEffect(() => {
    setFetching(true); //fetch the data

    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/post" , {signal})
    .then((res) => (res.json()))
    .then((data) => {
      addInitialPosts(data.posts);

      setFetching(false); //fetched data so mark it as false
    });

    return () => {
      //use effect clean up code
      controller.abort();
    }
  } , [])

  
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
