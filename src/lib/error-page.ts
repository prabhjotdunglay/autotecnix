// Static fallback page used when SSR itself fails. Kept dependency-free so it
// renders even if the app bundle is broken.
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load · Autotecnix</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <style>
      :root { color-scheme: dark; }
      body { font: 15px/1.6 system-ui, -apple-system, sans-serif; background: #0b0c0f; color: #f2f2ec; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 30rem; width: 100%; text-align: center; padding: 2.5rem 2rem; border: 1px solid rgba(255,255,255,.1); border-radius: 1.5rem; background: #121317; }
      .code { font: 600 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .2em; color: #d4ff3a; text-transform: uppercase; }
      h1 { font-size: 1.5rem; margin: .9rem 0 .5rem; letter-spacing: -.01em; }
      p { color: #a3a7ae; margin: 0 0 1.75rem; }
      .actions { display: flex; gap: .6rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: .7rem 1.2rem; border-radius: 999px; font: 600 14px/1 system-ui, sans-serif; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #d4ff3a; color: #0b0c0f; }
      .secondary { background: transparent; color: #f2f2ec; border-color: rgba(255,255,255,.2); }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="code">Fault code P0500 · Server</div>
      <h1>This page didn't load</h1>
      <p>Something went wrong on our side. Try refreshing, or head back to the homepage.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
