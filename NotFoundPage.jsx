import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="main-content">
      <div className="content-wrap not-found">
        <p className="eyebrow">404 · PAGE NOT FOUND</p>
        <h1>This page doesn't exist.</h1>
        <Link className="read-more" to="/">Go back home</Link>
      </div>
    </main>
  );
}
