import React, { useContext, useRef } from "react";
import styles from "./CreatePost.module.css";
import { PostList as PostListData} from "../store/Post-list-store";

function CreatePost() {
  const {addPost} = useContext(PostListData)

  const userID = useRef();
  const postTitle = useRef();
  const postBody = useRef();
  const reactions = useRef();
  const tags = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    //take out the values from useRef hooks
    const id = userID.current.value;
    const title = postTitle.current.value;
    const body = postBody.current.value;
    const react = reactions.current.value;
    const tag = tags.current.value.split(' '); //to split the strings into an array

    //now empty all the fiels 
    userID.current.value = "";
    postTitle.current.value = "";
    postBody.current.value = "";
    reactions.current.value = "";
    tags.current.value = "";

    addPost(id , title , body , react , tag);
  }

  return (
    <form className={`${styles.form}`} onSubmit={handleSubmit}>
      <div class="mb-3">
        <label for="userID" class="form-label">
          Enter your USER ID here
        </label>
        <input
          type="text"
          ref = {userID}
          class="form-control"
          id="userID"
          placeholder="Enter your ID"
        />
      </div>

      <div class="mb-3">
        <label for="title" class="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref= {postTitle}
          class="form-control"
          id="title"
          placeholder="How are you feeling today..."
        />
      </div>

      <div class="mb-3">
        <label for="body" class="form-label">
          Post Content
        </label>
        <textarea rows="4"
          type="text"
          ref = {postBody}
          class="form-control"
          id="body"
          placeholder="Tell us more about it."
        />
      </div>

      <div class="mb-3">
        <label for="reactions" class="form-label">
          Number of reactions
        </label>
        <input
          type="text"
          ref = {reactions}
          class="form-control"
          id="reactions"
          placeholder="How many peoples reacted on it."
        />
      </div>

      <div class="mb-3">
        <label for="tags" class="form-label">
          Enter your Hashtags here 
        </label>
        <input
          type="text"
          ref = {tags}
          class="form-control"
          id="tags"
          placeholder="Please enter Tags using Space."
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Post
      </button>
    </form>
  );
}

export default CreatePost;
