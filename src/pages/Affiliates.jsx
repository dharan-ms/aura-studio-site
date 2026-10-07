import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const FAQS = [
  ["How much can I earn?", "You earn 40% of every eligible purchase made through your link, on one-time purchases and plans alike."],
  ["When do I get paid?", "Request a payout from your affiliate dashboard once you have an available balance."],
  ["Which payout methods are supported?", "Wire/SWIFT, PayPal, local bank transfer, or Wise."],
  ["Who can apply?", "Anyone with an audience they can share with. Every application is reviewed by hand."],
  ["What kind of promotion is allowed?", "Organic promotion only. Paid ads and posing as Aura Studio are not allowed."],
  ["How are referrals tracked?", "Your link carries a personal referral code. The first visit is attributed for 30 days."],
];

export default function Affiliates() {
  const { toast } = useOutletContext();
  const [applied, setApplied] = useState(false);
  const [form, setForm] = useState({ name: "", channel: "", note: "" });

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.channel) {
      toast("Add your name and where you will share");
      return;
    }
    setApplied(true);
    toast("Application received");
  }

  return (
    <main className="page">
      <header>
        <p className="sub">Affiliate Program</p>
        <h1>Share Aura Studio.<br />Get paid for it.</h1>
        <p className="sub">Join the Aura Studio affiliate program, share your personal link, and earn 40% on every eligible purchase your audience makes.</p>
        <a className="btn" href="#apply" style={{ display: "inline-block", marginTop: 16 }}>Apply now</a>
        <p className="sub">Free to join · No paid ads allowed · Affiliate terms</p>
      </header>
      <section className="stat-row">
        <div className="stat"><b>40%</b>Commission on every eligible purchase.</div>
        <div className="stat"><b>30 days</b>Attribution after the first click.</div>
        <div className="stat"><b>4 ways</b>Wire, PayPal, bank, or Wise.</div>
        <div className="stat"><b>$0</b>To join. No follower minimum.</div>
      </section>
      <h2>Three steps to your first payout</h2>
      <section className="steps">
        <article><div className="num">01</div><h3>Apply</h3><p className="sub">Tell us where you will share Aura Studio.</p></article>
        <article><div className="num">02</div><h3>Get your link</h3><p className="sub">Drop the referral link into videos, posts, courses and newsletters.</p></article>
        <article><div className="num">03</div><h3>Earn on every sale</h3><p className="sub">Each purchase through your link pays 40%.</p></article>
      </section>
      <h2 style={{ marginTop: 36 }}>Every click and dollar, tracked for you</h2>
      <div className="dash">
        <div className="sub">aura.studio/affiliate/dashboard</div>
        <p>Your link <code>https://aura.studio/?ref=yourname</code></p>
        <button className="btn ghosty" onClick={() => { navigator.clipboard.writeText("https://aura.studio/?ref=yourname"); toast("Link copied"); }}>Copy</button>
        <div className="metrics">
          <div><strong>2,418</strong>Clicks</div>
          <div><strong>41</strong>Sales</div>
          <div><strong>$586</strong>Available</div>
          <div><strong>$2,940</strong>Paid out</div>
        </div>
      </div>
      <h2 style={{ marginTop: 36 }}>Built for people with an audience</h2>
      <section className="audience">
        {[
          ["Content creators", "YouTube tutorials, design breakdowns and build-in-public threads."],
          ["Educators", "Teaching AI design or no-code building."],
          ["Community leaders", "A Discord, newsletter or forum for makers."],
          ["Designers", "Recommend the tools you already ship with."],
        ].map(([title, body]) => (
          <article key={title}><h3>{title}</h3><p className="sub">{body}</p></article>
        ))}
      </section>
      <h2 style={{ marginTop: 36 }}>Affiliate program FAQ</h2>
      <section className="faq">
        {FAQS.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </section>
      <section id="apply" style={{ marginTop: 36 }}>
        <h2>Start earning with Aura Studio</h2>
        {applied ? <p>Thanks {form.name}. We will review how you plan to share from {form.channel}.</p> : (
          <form className="form" onSubmit={submit} style={{ marginLeft: 0 }}>
            <label className="field">Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
            <label className="field">Where you will share<input value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} placeholder="YouTube, newsletter, Discord" /></label>
            <label className="field">Note<textarea rows={4} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></label>
            <button className="btn" type="submit">Apply now</button>
          </form>
        )}
      </section>
    </main>
  );
}
