import { BookOpen, Moon, Sun } from "lucide-react";
import { Link, NavLink } from "react-router";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="My Blog home">
        <span className="brand-icon"><BookOpen size={22} strokeWidth={2.4} /></span>
        <span>My Blog</span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Blog Posts</NavLink>
        <NavLink to="/posts/1" className={({ isActive }) => isActive ? "active" : ""}>Featured Post</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          <span>{theme === "light" ? "Dark" : "Light"} mode</span>
        </button>
      </nav>
    </header>
  );
}
