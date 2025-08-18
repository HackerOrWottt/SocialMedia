import React, { useContext, useRef } from "react";
import styles from "./CreatePost.module.css";
import { PostList as PostListData } from "../store/Post-list-store";
import { Form, redirect, useNavigate } from "react-router-dom";

function CreatePost() {
  return (
    <Form method="POST" className={`${styles.form}`}>
      <div class="mb-3">
        <label for="userID" class="form-label">
          Enter your USER ID here
        </label>
        <input
          type="text"
          name="userId"
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
          name="title"
          class="form-control"
          id="title"
          placeholder="How are you feeling today..."
        />
      </div>

      <div class="mb-3">
        <label for="body" class="form-label">
          Post Content
        </label>
        <textarea
          rows="4"
          type="text"
          name="body"
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
          name="noOfReactions"
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
          name="tags"
          class="form-control"
          id="tags"
          placeholder="Please enter Tags using Space."
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Post
      </button>
    </Form>
  );
}

export async function CreatePostAction(data) {
  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData);
  postData.tags = postData.tags.split(" ");

  fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .then((post) => {
      console.log(post);
    });

  return redirect("/");
}

export default CreatePost;
