import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { MCP_TOOLS } from "../data.js";

const STEPS = [
  ["Pick your AI tool", "We'll give you the exact command to run."],
  ["Register the Aura Studio MCP server", "Open a terminal and run this command."],
  ["Sign in and authorize", "A browser window opens automatically. Sign in and approve access."],
  ["You're set", "Ask your agent for a design and it pulls Aura Studio prompts. Free accounts can open 3 prompts. Paid plans unlock the full library."],
];

export default function Mcp() {
  const { toast } = useOutletContext();
  const [tool, setTool] = useState("Claude");

  return (
    <main className="page">
      <p className="sub">Aura Studio MCP</p>
      <h1>The design <span className="super"><span className="super-text">Superpowers</span><span className="super-glow" aria-hidden="true">Superpowers</span></span> your AI agents are missing.</h1>
      <p className="sub">Keep the web free of AI slop. Connect your AI agents to 500+ Premium Website Design Prompts.</p>
      <div className="row">
        <a className="btn" href="#setup">Install MCP</a>
        <Link className="btn ghosty" to="/unlimited">See plans</Link>
      </div>
      <p className="sub">Included in all paid plans</p>
      <h2 id="setup" style={{ marginTop: 40 }}>Set up in under a minute.</h2>
      <p className="sub">One command. No API key. Works with Claude, Cursor and Codex.</p>
      <div className="tools">
        {Object.keys(MCP_TOOLS).map((name) => (
          <button key={name} className={tool === name ? "on" : ""} onClick={() => setTool(name)}>{name}</button>
        ))}
      </div>
      <ol className="steps" style={{ listStyle: "none", padding: 0 }}>
        {STEPS.map(([title, body], i) => (
          <li key={title}>
            <article>
              <div className="num">0{i + 1}</div>
              <h3>{title}</h3>
              <p className="sub">{body}</p>
              {i === 1 && (
                <>
                  <pre className="code">{MCP_TOOLS[tool]}</pre>
                  <button className="btn" onClick={() => { navigator.clipboard.writeText(MCP_TOOLS[tool]); toast("Command copied"); }}>Copy</button>
                </>
              )}
            </article>
          </li>
        ))}
      </ol>
      <Link className="btn" to="/unlimited">Unlock all prompts</Link>
    </main>
  );
}
