# Implementation Plan

## Phase 0 — Assessment

- Audit all 24 Markdown sources.
- Verify central product facts against the plugin descriptor and public headers.
- Record translation gaps, missing media, and manual owner steps.
- Decide the first search and versioning policy.

Exit: assessment and migration artifacts are reviewable.

## Phase 1 — Foundation

- Keep one Next/vinext project for the product landing and docs portal.
- Compile immutable Markdown source into typed static content metadata.
- Establish `/`, `/docs`, and `/docs/{lang}/{slug}` routes.
- Add a shared navigation, responsive docs shell, and design tokens.
- Keep version `1.0` as metadata without creating snapshots.

Exit: every source document resolves at a stable route.

## Phase 2 — Documentation migration

- Rewrite relative `.md` links at build time.
- Route the supplied editor screenshot through public assets.
- Add sidebar, breadcrumb, table of contents, previous/next links, last-reviewed state, and translation status.
- Generate local search data from the same compiled source.
- Run parity and broken-link checks.

Exit: all 24 pages build and navigation is complete.

## Phase 3 — Product landing

- Implement the product story: Ground authoring, Proxy Bake, coordinate hierarchy, and Orbit/Transition/Ground journey.
- Use product assets and CSS geometry; do not fabricate Unreal output.
- Limit GSAP to progressive landing-page motion with cleanup and reduced-motion fallback.
- Add Documentation and Fab placeholders without inventing URLs.

Exit: the page communicates the verified product model without requiring animation.

## Phase 4 — Interactive components

- Search/command dialog with focus return and Escape close.
- Mobile navigation.
- Compatibility matrix with `NEEDS_PRODUCT_REVIEW` where necessary.
- State Journey, Coordinate Flow, Proxy Bake comparison, and screenshot lightbox.

Exit: keyboard, touch, and reduced-motion interactions are usable.

## Phase 5 — QA and delivery

- Run content generation, translation parity, typecheck, lint, production build, and rendered-route tests.
- Add least-privilege CI and GitHub Pages workflow scaffolding.
- Validate docs routes, tables, code blocks, focus states, responsive layout, and asset paths.
- Record the final validation gaps and manual settings.

Exit: a deployable Sites preview exists and GitHub Pages configuration is ready for owner-supplied repository settings.
