import { useEffect, useMemo, useState } from "react";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import { FILTERS, PROMPTS } from "../data.js";
import { Wordmark } from "../components/Layout.jsx";

const BUILDERS = ["Lovable", "Cursor", "Bolt", "Claude", "v0", "Replit"];

export default function Home() {
  const { toast } = useOutletContext();
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [price, setPrice] = useState("All");
  const [openSort, setOpenSort] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [active, setActive] = useState(null);
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ms-saved") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const id = params.get("prompt");
    if (!id) return;
    const found = PROMPTS.find((p) => p.id === id);
    if (found) setActive(found);
  }, [params]);

  const items = useMemo(() => {
    let list = [...PROMPTS];
    if (filter === "Saved") list = list.filter((p) => saved.includes(p.id));
    else if (filter === "Recent") list.sort((a, b) => b.date.localeCompare(a.date));
    else if (filter !== "All") list = list.filter((p) => p.groups.includes(filter) || p.category === filter);
    if (price === "Free") list = list.filter((p) => p.free);
    if (price === "Premium") list = list.filter((p) => !p.free);
    if (sort === "Popular") list.sort((a, b) => b.popular - a.popular);
    if (sort === "Recent") list.sort((a, b) => b.date.localeCompare(a.date));
    return list;
  }, [filter, sort, price, saved]);

  function toggleSave(item) {
    setSaved((prev) => {
      const next = prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id];
      localStorage.setItem("ms-saved", JSON.stringify(next));
      return next;
    });
    toast(saved.includes(item.id) ? "Removed from saved" : "Saved");
  }

  async function copyPrompt(item) {
    if (!item.free) {
      setActive(item);
      return;
    }
    try {
      await navigator.clipboard.writeText(item.prompt);
      toast("Prompt copied");
    } catch {
      toast("Could not copy");
    }
  }

  function closeModal() {
    setActive(null);
    if (params.get("prompt")) setParams({});
  }

  const head = items.slice(0, 4);
  const tail = items.slice(4);

  return (
    <main>
      <header className="hero">
        <span className="eyebrow"><span>Fresh Drops Everyday</span></span>
        <h1>
          Unlock <em>your</em> AI
          <br />
          Design <Super />
        </h1>
        <p className="lede">Build beautiful landing pages in minutes with our ready-to-use prompts. Just copy, paste, and launch.</p>
        <Link className="go-unlimited" to="/unlimited">Go Unlimited →</Link>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-group" key={copy}>
                {[...BUILDERS, ...BUILDERS].map((name, i) => (
                  <span key={`${copy}-${i}`}>{name}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="count">{PROMPTS.length} prompts in the library · {saved.length} saved</p>
      </header>

      <div className="filters">
        <div className="filter-track" role="tablist">
          {[...FILTERS, "Saved"].map((name) => (
            <button key={name} className={filter === name ? "chip active" : "chip"} onClick={() => setFilter(name)}>{name}{name === "Saved" ? ` ${saved.length}` : ""}</button>
          ))}
        </div>
        <div className="drop">
          <button onClick={() => { setOpenSort((v) => !v); setOpenPrice(false); }} aria-expanded={openSort}>
            {sort === "Featured" ? "Popular" : sort} <Caret />
          </button>
          {openSort && (
            <div className="menu">
              {["Featured", "Popular", "Recent"].map((opt) => (
                <button key={opt} className={sort === opt ? "on" : ""} onClick={() => { setSort(opt); setOpenSort(false); }}>{opt}</button>
              ))}
            </div>
          )}
        </div>
        <div className="drop">
          <button onClick={() => { setOpenPrice((v) => !v); setOpenSort(false); }} aria-expanded={openPrice}>
            {price === "All" ? "Pricing" : price} <Caret />
          </button>
          {openPrice && (
            <div className="menu">
              {["All", "Free", "Premium"].map((opt) => (
                <button key={opt} className={price === opt ? "on" : ""} onClick={() => { setPrice(opt); setOpenPrice(false); }}>{opt}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="grid">
        {head.map((item, i) => <Card key={item.id} item={item} saved={saved.includes(item.id)} onOpen={() => setActive(item)} onCopy={() => copyPrompt(item)} onSave={() => toggleSave(item)} delay={i} />)}
        <Link className="promo" to="/backgrounds">
          <video autoPlay muted loop playsInline src="https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/a/darkgradientwhitelineArea.mp4" />
          <div className="wash" style={{ opacity: 0.45 }} />
          <div className="kicker">Backgrounds</div>
          <div>
            <h3>Animated backgrounds designed to convert, impress, and amaze.</h3>
            <span className="explore">Explore Videos</span>
          </div>
        </Link>
        {tail.map((item, i) => <Card key={item.id} item={item} saved={saved.includes(item.id)} onOpen={() => setActive(item)} onCopy={() => copyPrompt(item)} onSave={() => toggleSave(item)} delay={i + 4} />)}
      </section>

      {items.length === 0 && <p className="center sub">{filter === "Saved" ? "No saved prompts yet. Tap the bookmark on a card." : "Nothing in this filter yet. Try All."}</p>}

      <section className="steps how">
        <article><div className="num">01</div><h3>Browse</h3><p className="sub">Filter heroes, apps, 3D sites, and sections. Save the ones you want to build.</p></article>
        <article><div className="num">02</div><h3>Copy</h3><p className="sub">Free prompts copy straight to your clipboard. Premium prompts unlock with Unlimited.</p></article>
        <article><div className="num">03</div><h3>Launch</h3><p className="sub">Paste into Lovable, Cursor, Bolt, Claude, v0, or Replit, then customize.</p></article>
      </section>

      <section className="rocket">
        <div className="rocket-copy">
          <Wordmark large />
          <h2>Develop your design eye until it stands out.</h2>
          <p>"Give me a few days and I'll show you how to create sites that most agencies charge $5,000 for."</p>
          <Link className="library" to="/academy">Explore the full library</Link>
        </div>
        <div className="rocket-art">
          <img src="/aura-still.jpg" alt="A cream sheet of paper and a pale sphere resting on black stone" />
        </div>
      </section>

      {active && (
        <>
          <div className="modal-back" onClick={closeModal} />
          <div className="modal" role="dialog" aria-modal="true" aria-label={active.title}>
            {active.video ? (
              <video className="preview" src={active.video} poster={active.image} autoPlay muted loop playsInline />
            ) : (
              <img className="preview" src={active.image} alt={active.title} />
            )}
            <h3>{active.title}</h3>
            <p className="sub">{active.category}{active.free ? " · Free prompt" : " · Premium prompt"}</p>
            <div className="prompt-box">{active.free ? active.prompt : "This prompt is part of Unlimited. Unlock the library to copy it into Lovable, Cursor, Bolt, Claude, v0, or Replit."}</div>
            <div className="row">
              {active.free ? (
                <button className="btn" onClick={() => copyPrompt(active)}>Copy prompt</button>
              ) : (
                <Link className="btn" to="/unlimited">Unlock prompt</Link>
              )}
              <button className="btn ghosty" onClick={() => toggleSave(active)}>{saved.includes(active.id) ? "Saved" : "Save"}</button>
              <button className="btn ghosty" onClick={closeModal}>Close</button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

function Card({ item, saved, onOpen, onCopy, onSave, delay }) {
  return (
    <article className="card" style={{ animationDelay: `${Math.min(delay, 12) * 40}ms` }} onClick={onOpen}>
      <div className="media">
        <img src={item.image} alt={item.title} />
        {item.video && <video src={item.video} poster={item.image} muted loop playsInline autoPlay />}
      </div>
      <div className="meta">
        <div>
          <h3>{item.title}</h3>
          <p>{item.category}</p>
        </div>
        <div className="actions">
          <button className={saved ? "ghost on" : "ghost"} aria-label={saved ? "Remove saved prompt" : "Save prompt"} onClick={(e) => { e.stopPropagation(); onSave(); }}>
            <BookmarkIcon filled={saved} />
          </button>
          <button className="ghost" aria-label={item.free ? "Copy prompt" : "Unlock prompt"} onClick={(e) => { e.stopPropagation(); onCopy(); }}>
            {item.free ? <CopyIcon /> : <LockIcon />}
          </button>
        </div>
      </div>
    </article>
  );
}

function Super() {
  return (
    <span className="super">
      <span className="super-text">Superpowers</span>
      <span className="super-glow" aria-hidden="true">Superpowers</span>
      <span className="super-noise" aria-hidden="true" />
    </span>
  );
}
function Caret() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>;
}
function CopyIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="8" y="8" width="14" height="14" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>;
}
function LockIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
}
function BookmarkIcon({ filled }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M6 4h12a1 1 0 0 1 1 1v16l-7-4-7 4V5a1 1 0 0 1 1-1z" /></svg>;
}
