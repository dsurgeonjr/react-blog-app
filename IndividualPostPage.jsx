import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, CalendarDays, Mail, UserRound } from "lucide-react";
import Comments from "../components/Comments.jsx";

const API_URL = "https://jsonplaceholder.typicode.com";

export default function IndividualPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadPostDetails() {
      setLoading(true);
      setError("");
      setPost(null);
      setAuthor(null);
      setComments([]);
      try {
        const options = { signal: controller.signal };
        const postResponse = await fetch(`${API_URL}/posts/${postId}`, options);
        if (!postResponse.ok) {
          throw new Error(postResponse.status === 404 ? "This blog post could not be found." : "Unable to load this blog post.");
        }
        const postData = await postResponse.json();
        if (!postData || !postData.id) throw new Error("This blog post could not be found.");

        const [userResponse, commentsResponse] = await Promise.all([
          fetch(`${API_URL}/users/${postData.userId}`, options),
          fetch(`${API_URL}/posts/${postId}/comments`, options)
        ]);
        if (!userResponse.ok || !commentsResponse.ok) {
          throw new Error("Unable to load the author or comments. Please try again.");
        }
        const [userData, commentsData] = await Promise.all([userResponse.json(), commentsResponse.json()]);
        setPost(postData);
        setAuthor(userData);
        setComments(commentsData.map((comment) => ({
          id: comment.id, name: comment.name, email: comment.email, text: comment.body
        })));
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Something went wrong while loading this post.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadPostDetails();
    return () => controller.abort();
  }, [postId]);

  async function handleAddComment(newComment) {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        postId: Number(postId), name: newComment.name,
        body: newComment.text
      })
    });
    if (!response.ok) throw new Error("Your comment could not be posted. Please try again.");
    const savedComment = await response.json();
    setComments((current) => [...current, {
      id: savedComment.id ?? Date.now(), name: savedComment.name,
      text: savedComment.body
    }]);
  }

  return (
    <main className="main-content">
      <div className="content-wrap">
        <Link className="back-link" to="/"><ArrowLeft size={15} /> All blog posts</Link>
        <div className="intro-label"><span /> FROM THE BLOG</div>
        {loading && <p role="status">Loading blog post and comments...</p>}
        {error && <div className="not-found"><p className="form-error" role="alert">{error}</p><Link className="read-more" to="/">Return to all blog posts <ArrowLeft size={15} /></Link></div>}
        {!loading && !error && post && (
          <article className="post-card">
            <div className="post-topline"><span className="post-category">BLOG POST</span><span className="preview-date">Post #{post.id}</span></div>
            <h1>{post.title}</h1>
            <div className="article-copy"><p>{post.body}</p></div>
            {author && <div className="post-meta author-details">
              <span><UserRound size={15} /><strong>Author:</strong> {author.name}</span>
              <span><Mail size={15} /><strong>Email:</strong> <a href={`mailto:${author.email}`}>{author.email}</a></span>
              <span><CalendarDays size={15} /><strong>Website:</strong> {author.website}</span>
            </div>}
            <div className="post-divider" />
            <Comments comments={comments} onAddComment={handleAddComment} />
          </article>
        )}
      </div>
    </main>
  );
}
