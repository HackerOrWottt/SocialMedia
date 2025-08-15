import { createContext, useReducer, useState, useEffect } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  fetching : false,
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList; //store curr post list into new variable

  if (action.type === "DELETE_POST") {
    //delete the postId post
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postID
    ); //if not equal then put in new list otherwise dont put
  } else if (action.type === "ADD_POST") {
    //add one post
    newPostList = [action.payload, ...currPostList]; //spreading curr array and adding one more post
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }

  return newPostList;
};

const PostListProvider = ({ children }) => {
  //using useReduce hook , for post list state
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const [fetching , setFetching] = useState(false);

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts: posts,
      },
    });
  };

  const deletePost = (postID) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postID: postID,
      },
    });
  };

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
    <PostList.Provider
      value={{
        postList: postList,
        addPost: addPost,
        deletePost: deletePost,
        fetching : fetching
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
