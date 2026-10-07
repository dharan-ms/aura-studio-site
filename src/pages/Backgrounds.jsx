import { Link, useOutletContext } from "react-router-dom";
import { BG_GRADIENTS, BG_VIDEOS } from "../data.js";

export default function Backgrounds() {
  const { toast } = useOutletContext();

  async function copy(value, locked) {
    if (locked) {
      toast("Unlock Unlimited to copy this background");
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      toast("URL copied");
    } catch {
      toast("Could not copy");
    }
  }

  return (
    <main className="page">
      <header className="center">
        <span className="eyebrow"><span>New Videos added daily</span></span>
        <h1>Jaw-dropping<br /><span className="super"><span className="super-text">Animated</span><span className="super-glow" aria-hidden="true">Animated</span></span> Backgrounds</h1>
        <p className="sub">A huge collection of handcrafted Animated Backgrounds</p>
        <Link className="go-unlimited" to="/unlimited" style={{ marginTop: 18 }}>Go Unlimited →</Link>
      </header>
      <section className="bg-grid" style={{ marginTop: 36 }}>
        {BG_VIDEOS.map((item) => (
          <article key={item.id} className="bg-tile">
            <video src={item.video} autoPlay muted loop playsInline />
            <div className="cap">
              <strong>{item.title}</strong>
              <button onClick={() => copy(item.video, !item.free)}>{item.free ? "Copy URL" : "Unlock background"}</button>
            </div>
          </article>
        ))}
        {BG_GRADIENTS.map((item) => (
          <article key={item.id} className="bg-tile">
            <div className="fill" style={{ background: item.background }} />
            <div className="cap">
              <strong>{item.title}</strong>
              <button onClick={() => copy(item.background, !item.free)}>{item.free ? "Copy URL" : "Unlock background"}</button>
            </div>
          </article>
        ))}
      </section>
      <h2 style={{ marginTop: 40 }}>Recent</h2>
      <section className="bg-grid">
        {BG_GRADIENTS.filter((g) => g.recent).map((item) => (
          <article key={`r-${item.id}`} className="bg-tile">
            <div className="fill" style={{ background: item.background }} />
            <div className="cap">
              <strong>{item.free ? item.title : "No preview"}</strong>
              <button onClick={() => copy(item.background, !item.free)}>{item.free ? "Copy URL" : "Unlock background"}</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
