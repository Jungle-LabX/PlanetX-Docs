# Search Decision

## Decision

Use the generated, device-local static search index for PlanetX 1.0.

## Current scope

- 100 generated records: 48 core documents and two web supplements for each language.
- English and Korean are indexed together while results prefer the active language.
- Results link to canonical document routes and heading anchors.
- Legacy aliases resolve old URLs but do not create duplicate search entries.

## Why

- The current corpus remains small enough for immediate in-browser filtering.
- No server, crawler, external account, secret, or third-party uptime dependency is required.
- The index is generated from the same reviewed records used by navigation and static routes, which prevents a separate search corpus from drifting.
- Static search remains compatible with GitHub Pages and the configured base path.

## Options considered

| Option | Decision | Reason |
|---|---|---|
| Generated local index | Selected | Deterministic, private, deployment-independent, and sufficient for 100 records |
| Framework-specific local plugin | Deferred | Adds a second indexing path without a demonstrated need |
| Algolia DocSearch | Deferred | Requires an application, configuration, and a public crawlable site |
| Other hosted search | Rejected for 1.0 | Adds credentials and operational dependencies with no current benefit |

## Review trigger

Re-evaluate only when measured bundle size or query latency becomes unacceptable, ranking quality creates a support problem, the corpus grows materially, or publication requirements demand hosted analytics or crawling. Record measurements before replacing the local implementation.
