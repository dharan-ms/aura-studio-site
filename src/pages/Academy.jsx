import { useState } from "react";
import { LESSONS, PROMPTS } from "../data.js";

const TONES = ["#7c3aed", "#e8400d", "#0ea5e9", "#16a34a", "#f59e0b", "#db2777"];

export default function Academy() {
  const [playing, setPlaying] = useState(null);
  const featured = LESSONS.find((l) => l.featured);
  const rest = LESSONS.filter((l) => !l.featured);

  return (
    <main className="page">
      <header className="center">
        <p className="sub">Powered by Aura Studio</p>
        <h1>Learn to make <span className="super"><span className="super-text">Cinematic</span><span className="super-glow" aria-hidden="true">Cinematic</span></span> 3D Websites with AI</h1>
        <p className="sub">Free video tutorials on prompting, animation and 3D — go from idea to shipped site.</p>
      </header>
      <section style={{ marginTop: 28 }}>
        <h2>Featured Build</h2>
        <p className="sub">Watch the walkthrough, then copy the prompt used in the video.</p>
        <button className="lesson feature-lesson" onClick={() => setPlaying(featured)} style={{ width: "100%", marginTop: 12 }}>
          <div className="thumb" style={{ background: `radial-gradient(circle at 30% 30%, ${TONES[0]}, transparent 45%), radial-gradient(circle at 70% 80%, ${TONES[1]}, #111)` }}>
            Play · {featured.length}
          </div>
          <div className="body">
            <h3>{featured.title}</h3>
            <p className="sub">SkyElite Private Jets · Landing Page</p>
          </div>
        </button>
      </section>
      <section style={{ marginTop: 36 }}>
        <h2>Watch & Learn</h2>
        <p className="sub">Short builds with the prompt used in each video — copy and remix.</p>
        <div className="lesson-grid" style={{ marginTop: 14 }}>
          {rest.map((lesson, i) => (
            <button key={lesson.id} className="lesson" onClick={() => setPlaying(lesson)}>
              <div className="thumb" style={{ background: `linear-gradient(140deg, ${TONES[i % TONES.length]}, #111 70%)` }}>{lesson.length}</div>
              <div className="body"><h3>{lesson.title}</h3></div>
            </button>
          ))}
        </div>
      </section>
      {playing && (
        <>
          <div className="modal-back" onClick={() => setPlaying(null)} />
          <div className="modal" role="dialog" aria-label={playing.title}>
            <div className="preview" style={{ display: "grid", placeItems: "center", background: "radial-gradient(circle at 40% 40%, #7c3aed, #111 60%)", fontWeight: 700 }}>
              Lesson player · {playing.length}
            </div>
            <h3>{playing.title}</h3>
            <div className="prompt-box">{PROMPTS[0].prompt}</div>
            <div className="row">
              <a className="btn" href="https://www.youtube.com/@ViktorOddy" target="_blank" rel="noreferrer">Watch on YouTube</a>
              <button className="btn ghosty" onClick={() => setPlaying(null)}>Close</button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
