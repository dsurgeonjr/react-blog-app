import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

export default function Comments({ comments, onAddComment }) {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const [posting, setPosting] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedComment = commentText.trim();
    if (!trimmedName || !trimmedComment) {
      setError("Please enter your name and a comment before submitting.");
      setSuccess("");
      return;
    }
    setPosting(true);
    setError("");
    setSuccess("");
    try {
      await onAddComment({ name: trimmedName, text: trimmedComment });
      setName(""); setCommentText("");
      setSuccess("Your comment was posted successfully.");
    } catch (err) {
      setError(err.message || "Unable to post your comment. Please try again.");
    } finally {
      setPosting(false);
    }
  }

  return (
    <section className="comments-section" aria-labelledby="comments-heading">
      <div className="section-heading">
        <span className="section-icon"><MessageCircle size={19} /></span>
        <h2 id="comments-heading">Comments</h2>
        <span className="comment-count">{comments.length}</span>
      </div>
      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="comment-name">Name</label>
        <input id="comment-name" type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" maxLength={60} required />
        <label htmlFor="comment-input">Comment</label>
        <textarea id="comment-input" value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder="Share your thoughts..." rows="3" maxLength={1000} required />
        {error && <p className="form-error" role="alert">{error}</p>}
        {success && <p className="success-message" role="status">{success}</p>}
        <div className="form-bottom">
          <span className="form-hint">Be kind and keep the conversation going.</span>
          <button className="submit-button" type="submit" disabled={posting}><Send size={15} />{posting ? "Posting..." : "Submit"}</button>
        </div>
      </form>
      <div className="existing-comments">
        <h3>Existing Comments</h3>
        {comments.length === 0 ? <p className="empty-comments">No comments yet. Be the first to comment!</p> : (
          <ul className="comment-list">
            {comments.map((comment) => <li key={comment.id}>
              <span className="comment-avatar" aria-hidden="true">{comment.name.charAt(0).toUpperCase()}</span>
              <span className="comment-body"><strong>{comment.name}</strong>{comment.email && <small>{comment.email}</small>}<span>{comment.text}</span></span>
            </li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
