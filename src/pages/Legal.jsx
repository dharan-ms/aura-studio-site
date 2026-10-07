const COPY = {
  terms: {
    title: "Terms of Use",
    body: [
      "Aura Studio provides design prompts, animated backgrounds, and tutorials for personal and client work.",
      "You may use prompts you are entitled to copy inside AI website builders. You may not resell the prompt library itself.",
      "Accounts are personal. Affiliate promotion must stay organic.",
      "This rebuild is a local demo. It does not bill a card or store an account on a server.",
    ],
  },
  cookies: {
    title: "Cookie Policy",
    body: [
      "This demo keeps a session email in your browser's local storage. That value stays on this device.",
      "The live product may use analytics cookies. This rebuild does not set third-party tracking cookies.",
      "Clear site data in your browser to remove the local session.",
    ],
  },
  refund: {
    title: "Refund Policy",
    body: [
      "On the live product, lifetime and subscription purchases can be reviewed if access was not delivered.",
      "Checkout in this demo is a preview only. Nothing is billed.",
      "Use the contact page with the email on the account and the plan name for a billing question.",
    ],
  },
};

export default function Legal({ kind }) {
  const page = COPY[kind];
  return (
    <main className="page" style={{ maxWidth: 720 }}>
      <h1>{page.title}</h1>
      {page.body.map((p) => <p key={p} className="sub" style={{ fontSize: 16, lineHeight: 1.6 }}>{p}</p>)}
    </main>
  );
}
