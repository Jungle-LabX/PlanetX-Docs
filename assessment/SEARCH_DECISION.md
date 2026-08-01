# Search Decision

## Decision

Use a generated, device-local static search index for the first release.

## Why

- The current corpus is small (24 documents) and can be searched instantly in the browser.
- No server, account, secret, crawler, or external uptime dependency is required.
- English and Korean can be indexed together while still preferring the active language.
- Search results can link to stable document routes and heading anchors.

## Options considered

| Option | Decision | Reason |
|---|---|---|
| Generated local index | Selected | Free, deterministic, private, and sufficient for the corpus size |
| Docusaurus-compatible local plugin | Deferred | The current implementation is not Docusaurus and community-plugin maintenance would add risk |
| Algolia DocSearch | Deferred | Officially supported by Docusaurus, but requires application/configuration and a public crawlable site |
| Other hosted search | Rejected for v1 | Adds an external service and operational dependency with no current need |

## Review trigger

Re-evaluate when the corpus exceeds roughly 200 substantive pages, ranking quality becomes a support issue, or the public Docusaurus migration is approved.
