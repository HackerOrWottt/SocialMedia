import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
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
  }
  else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }

  return newPostList;
};

const PostListProvider = ({ children }) => {
  //using useReduce hook , for post list state
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (id, title, body, react, tag) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: title,
        body: body,
        noOfReactions: react,
        userID: id,
        tags: tag,
      },
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

  return (
    <PostList.Provider
      value={{
        postList: postList,
        addPost: addPost,
        deletePost: deletePost,
        addInitialPosts: addInitialPosts,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
