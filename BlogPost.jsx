import { useState } from "react";
import { CalendarDays, Heart, UserRound } from "lucide-react";
import Comments from "./Comments.jsx";

export default function BlogPost({ post, comments, onAddComment }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  function toggleLike() {
    setLiked((wasLiked) => {
      setLikeCount((count) => count + (wasLiked ? -1 : 1));
      return !wasLiked;
    });
  }

  return (
    <article className="post-card">
      <div className="post-topline">
        <span className="post-category">{post.category}</span>
        <button
          className={`like-button ${liked ? "is-liked" : ""}`}
          type="button"
          onClick={toggleLike}
          aria-pressed={liked}
          aria-label={liked ? "Unlike this post" : "Like this post"}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
          <span>{likeCount}</span>
        </button>
      </div>

      <h1>{post.title}</h1>
      <div className="article-copy">
        {post.content.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>

      <div className="post-meta">
        <span><UserRound size={15} /><strong>Author:</strong> {post.author}</span>
        <span><CalendarDays size={15} /><strong>Date:</strong> {post.date}</span>
      </div>

      <div className="post-divider" />
      <Comments comments={comments} onAddComment={onAddComment} />
    </article>
  );
}
