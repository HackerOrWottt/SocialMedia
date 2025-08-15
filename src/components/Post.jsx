import { useContext } from "react";
import styles from "./Post.module.css";
import { MdDelete } from "react-icons/md";
import { PostList as PostListData } from "../store/Post-list-store";

function Post({ post }) {
  const { deletePost } = useContext(PostListData);

  return (
    <div class={`card ${styles.postCard}`} style={{ width: "25rem" }}>
      <div class="card-body">
        <h5 class="card-title">
          {post.title}
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
          >
            <MdDelete />
          </span>
        </h5>
        <p class="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag} class={`badge text-bg-primary ${styles.hashtag}`}>
            {tag}
          </span>
        ))}

        <div class={`alert alert-success ${styles.reactions}`} role="alert">
          <p>This post has been reacted by {post.noOfReactions} peoples.</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
