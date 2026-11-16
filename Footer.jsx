import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} My Blog. Made with <Heart size={14} fill="currentColor" /> and a little curiosity.</p>
    </footer>
  );
}
