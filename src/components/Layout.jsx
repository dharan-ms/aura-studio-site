import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { PROMPTS } from "../data.js";

const LINKS = [
  { to: "/mcp", label: "MCP", badge: "New" },
  { to: "/backgrounds", label: "Animated Backgrounds" },
  { to: "/academy", label: "Academy" },
  { to: "/affiliates", label: "Affiliate" },
  { to: "/public-contact", label: "Contact" },
];

export default function Layout() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [toasts, setToasts] = useState([]);
  const navigate = useNavigate();

  function toast(message) {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2200);
  }

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(true);
      }
      if (e.key === "Escape") {
        setSearch(false);
        setMenu(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hits = PROMPTS.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())).slice(0, 6);

  return (
    <div>
      <nav className="nav">
        <Link to="/" aria-label="Aura Studio home">
          <Wordmark />
        </Link>
        <div className="nav-links">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
              {l.badge && <span className="pill-new"><span>{l.badge}</span></span>}
            </NavLink>
          ))}
        </div>
        <div className="nav-actions">
          <button className="icon-btn" aria-label="Search" onClick={() => setSearch(true)}><SearchIcon /></button>
          <Link className="signup" to="/auth">Sign up</Link>
        </div>
        <div className="mobile-actions">
          <button className="icon-btn" aria-label="Search" onClick={() => setSearch(true)}><SearchIcon /></button>
          <button className="menu-btn" aria-label="Open menu" onClick={() => setMenu(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 5h16M4 12h16M4 19h16" /></svg>
          </button>
        </div>
      </nav>

      <Outlet context={{ toast }} />

      <footer className="site">
        <div className="foot-row">
          <span>© Aura Studio 2026. All rights reserved</span>
          <a className="credit" href="https://x.com/shan_dharan" target="_blank" rel="noreferrer">Built by Shan Dharan</a>
          <Link to="/terms">Terms of Use</Link>
          <Link to="/cookie-policy">Cookie Policy</Link>
          <Link to="/refund-policy">Refund Policy</Link>
        </div>
        <a className="social" href="https://x.com/shan_dharan" target="_blank" rel="noreferrer" aria-label="Shan Dharan on X">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2H21l-6.5 7.4L22 22h-6.8l-4.7-6.2L5.4 22H2.6l7-8L2 2h7l4.3 5.7L18.2 2Zm-1.2 18h1.9L7.1 3.9H5.1L17 20Z" /></svg>
        </a>
      </footer>

      {menu && (
        <>
          <div className="drawer" onClick={() => setMenu(false)} />
          <div className="drawer-panel">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMenu(false)}>{l.label}</Link>
            ))}
            <Link className="signup" to="/auth" onClick={() => setMenu(false)}>Sign up</Link>
          </div>
        </>
      )}

      {search && (
        <>
          <div className="search-back" onClick={() => setSearch(false)} />
          <div className="search-panel" role="dialog" aria-label="Search prompts">
            <input autoFocus placeholder="Search prompts" value={query} onChange={(e) => setQuery(e.target.value)} />
            <div style={{ marginTop: 10 }}>
              {(query ? hits : PROMPTS.slice(0, 5)).map((p) => (
                <button key={p.id} className="search-hit" onClick={() => { setSearch(false); navigate(`/?prompt=${p.id}`); }}>
                  <img src={p.image} alt="" />
                  <div>
                    <strong>{p.title}</strong>
                    <div style={{ color: "#ababab", fontSize: 12 }}>{p.category}</div>
                  </div>
                </button>
              ))}
              {query && hits.length === 0 && <p style={{ color: "#ababab" }}>No prompts match that search.</p>}
            </div>
          </div>
        </>
      )}

      <div className="toasts" aria-live="polite">
        {toasts.map((t) => <div key={t.id} className="toast">{t.message}</div>)}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11 2a9 9 0 0 1 9 9 9 9 0 0 1-2 5.6l3.7 3.7a1 1 0 0 1-1.4 1.4l-3.7-3.7A9 9 0 1 1 11 2Zm0 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z" />
    </svg>
  );
}

export function Wordmark({ large = false }) {
  const arcId = large ? "aura-arc-lg" : "aura-arc";
  return (
    <span className={large ? "wordmark wordmark-lg" : "wordmark"} role="img" aria-label="Aura Studio">
      <svg className="wordmark-svg" viewBox="0 0 224 158" aria-hidden="true">
        <text className="mark-aura" x="0" y="122">aura</text>
        <path id={arcId} d="M132 46 Q188 -4 230 40" fill="none" />
        <text className="studio-text">
          <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">STUDIO</textPath>
        </text>
      </svg>
    </span>
  );
}
