import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList; //store curr post list into new variable

  if (action.type === "DELETE_POST") {
    //delete the postId post
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postID
    ); //if not equal then put in new list otherwise dont put
  }
  else if(action.type === "ADD_POST"){
    //add one post
    newPostList = [action.payload , ...currPostList]; //spreading curr array and adding one more post
  }

  return newPostList;
};

const PostListProvider = ({ children }) => {
  //using useReduce hook , for post list state
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    Default_post_list
  );

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
      }}
    >
      {children}
    </PostList.Provider>
  );
};

const Default_post_list = [
  {
    id: 1,
    title: "Going on Vacation",
    body: "Hi Friends , I am going to Singapore for my Vacations . Stay Tuned..",
    noOfReactions: 0,
    userID: "user-420",
    tags: ["Vactaions", "Singapore", "Enjoying"],
  },
  {
    id: 2,
    title: "Watching Saiyaraa",
    body: "Hi Friends , I am going to watch Saiyaraa. Exicted a lot..",
    noOfReactions: 4,
    userID: "user-421",
    tags: ["Chilling", "Saiyaraa"],
  },
];

export default PostListProvider;
