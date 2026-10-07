import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Auth() {
  const { toast } = useOutletContext();
  const [mode, setMode] = useState("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(() => localStorage.getItem("ms-session") || "");

  function submit(e) {
    e.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      toast("Use a valid email and a password of 6+ characters");
      return;
    }
    localStorage.setItem("ms-session", email);
    setUser(email);
    toast(mode === "up" ? "Account created" : "Signed in");
  }

  if (user) {
    return (
      <main className="page center">
        <h1>You're in</h1>
        <p className="sub">Signed in as {user}. Free accounts can open 3 prompts. Unlimited unlocks the library.</p>
        <button className="btn" onClick={() => { localStorage.removeItem("ms-session"); setUser(""); }}>Sign out</button>
      </main>
    );
  }

  return (
    <main className="page center">
      <h1>{mode === "in" ? "Welcome back" : "Create your account"}</h1>
      <p className="sub">{mode === "in" ? "Sign in to your account" : "Start copying prompts in a minute"}</p>
      <form className="auth-card" onSubmit={submit}>
        <div className="tabs">
          <button type="button" className={mode === "in" ? "on" : ""} onClick={() => setMode("in")}>Sign In</button>
          <button type="button" className={mode === "up" ? "on" : ""} onClick={() => setMode("up")}>Sign Up</button>
        </div>
        <label className="field">Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label className="field" style={{ marginTop: 10 }}>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        <button className="btn" style={{ width: "100%", marginTop: 16 }} type="submit">{mode === "in" ? "Sign In" : "Sign Up"}</button>
        {mode === "in" && <p><button type="button" className="linkish" onClick={() => toast("A reset note would be emailed from the live product")}>Forgot password?</button></p>}
        <p className="sub">
          {mode === "in" ? "Don't have an account? " : "Already registered? "}
          <button type="button" className="linkish" onClick={() => setMode(mode === "in" ? "up" : "in")}>{mode === "in" ? "Sign Up" : "Sign In"}</button>
        </p>
      </form>
    </main>
  );
}
