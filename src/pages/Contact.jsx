import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Contact() {
  const { toast } = useOutletContext();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email.includes("@") || form.message.length < 8) {
      toast("Add a name, valid email, and a short message");
      return;
    }
    setSent(true);
    toast("Message sent");
  }

  return (
    <main className="page center">
      <h1>Contact Our Team</h1>
      <p className="sub">Have a question or feedback? We'd love to hear from you.</p>
      {sent ? <p>Thanks {form.name}. We will reply to {form.email}.</p> : (
        <form className="form" onSubmit={submit}>
          <label className="field">Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label className="field">Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label className="field">Message<textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
          <button className="btn" type="submit">Send Message</button>
        </form>
      )}
    </main>
  );
}
