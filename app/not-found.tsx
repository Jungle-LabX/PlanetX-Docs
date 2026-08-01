import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <span>404 · Lost in orbit</span>
      <h1>This route is outside the current chart.</h1>
      <p>The document may have moved, or the translation may not exist yet.</p>
      <div><Link className="button button--primary" href="/docs">Open documentation</Link><Link className="button button--ghost" href="/">Return home</Link></div>
    </main>
  );
}
