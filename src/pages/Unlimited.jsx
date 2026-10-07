import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FAQS, PLANS } from "../data.js";

export default function Unlimited() {
  const [left, setLeft] = useState(1 * 3600 + 26 * 60 + 54);
  const [qty, setQty] = useState(2);
  const [paid, setPaid] = useState("");

  useEffect(() => {
    const id = setInterval(() => setLeft((n) => (n > 0 ? n - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const h = String(Math.floor(left / 3600)).padStart(2, "0");
  const m = String(Math.floor((left % 3600) / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  const packPrice = qty <= 2 ? 49 : qty <= 5 ? 99 : 179;

  return (
    <main className="page">
      <div className="sale">
        <span>Founding Members Sale — $759 now $399</span>
        <span className="timer">{h}:{m}:{s} left</span>
      </div>
      <header className="center" style={{ marginTop: 36 }}>
        <h1>Unlimited Prompts,<br />Unlimited Access</h1>
        <p className="sub">Pick the plan that fits your workflow. Go yearly or save big with a lifetime deal.</p>
      </header>
      <section className="plans">
        {PLANS.map((plan) => (
          <article key={plan.id} className={plan.popular ? "plan pop" : "plan"}>
            {plan.popular && <span className="badge">Most Popular</span>}
            <h2 style={{ marginBottom: 4 }}>{plan.name}</h2>
            <p className="sub">{plan.blurb}</p>
            <div className="price">{plan.was && <s>${plan.was}</s>}${plan.price}</div>
            <p className="sub">{plan.cadence}</p>
            <button className="btn" style={{ width: "100%", margin: "12px 0 8px" }} onClick={() => setPaid(plan.name)}>{plan.cta}</button>
            <ul>{plan.perks.map((perk) => <li key={perk}>{perk}</li>)}</ul>
          </article>
        ))}
      </section>
      <section className="faq" style={{ marginTop: 48 }}>
        {FAQS.map((item) => (
          <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>
        ))}
      </section>
      <section className="pack">
        <h2>Need prompts on your terms?</h2>
        <p className="sub">Buy prompt packs for one-off projects and flexible usage.</p>
        <h3>Prompt packs</h3>
        <ul>
          <li>Copy from the full prompt library</li>
          <li>2–10 prompt downloads</li>
          <li>No commitment</li>
        </ul>
        <p><strong>{qty}</strong> prompts</p>
        <input className="slider" type="range" min="2" max="10" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
        <div className="price">${packPrice}</div>
        <button className="btn" onClick={() => setPaid(`${qty}-prompt pack`)}>Buy now</button>
      </section>
      {paid && (
        <>
          <div className="modal-back" onClick={() => setPaid("")} />
          <div className="modal" role="dialog" aria-label="Checkout">
            <h3>Checkout</h3>
            <p className="sub">This demo records your choice on screen only. No card is charged.</p>
            <p>Selected: <strong>{paid}</strong></p>
            <div className="row">
              <Link className="btn" to="/auth">Continue to sign in</Link>
              <button className="btn ghosty" onClick={() => setPaid("")}>Close</button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
