
import { useEffect, useState } from "react";
import { ArrowRight, UserRound } from "lucide-react";
import { Link } from "react-router";

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog posts.");
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPosts();

    return () => controller.abort();
  }, []);

  return (
    <main className="main-content">
      <div className="content-wrap">
        <div className="intro-label">
          <span /> A PLACE FOR IDEAS
        </div>

        <section className="home-intro">
          <h1>Thoughts, stories, and ideas.</h1>
          <p>
            Welcome to My Blog. Explore the latest posts and
            join the conversation.
          </p>
        </section>

        <div className="posts-heading">
          <div>
            <p className="eyebrow">THE JOURNAL</p>
            <h2>Latest blog posts</h2>
          </div>

          <span className="post-count">
            {posts.length} posts
          </span>
        </div>

        {loading && <p>Loading blog posts...</p>}

        {error && <p className="form-error">{error}</p>}

        {!loading && !error && (
          <div className="posts-list">
            {posts.map((post) => (
              <article className="post-preview" key={post.id}>
                <div className="post-preview-top">
                  <span className="post-category">
                    BLOG POST
                  </span>
                  <span className="preview-date">
                    Post #{post.id}
                  </span>
                </div>

                <h2>
                  <Link to={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>

                <p>
                  {post.body.slice(0, 175)}
                  {post.body.length > 175 ? "…" : ""}
                </p>

                <div className="preview-bottom">
                  <span>
                    <UserRound size={14} />
                    User ID: {post.userId}
                  </span>

                  <Link
                    className="read-more"
                    to={`/posts/${post.id}`}
                  >
                    Read full post
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

