# Design

## Source of truth
- Status: Active
- Last refreshed: 2026-08-15
- Primary product surfaces: bilingual product landing page, documentation index, English and Korean documentation pages, standalone Known Issues, FAQ, Release Notes and About Us pages, and local search.
- Evidence reviewed: `app/components/LandingPage.tsx`, `app/components/SiteHeader.tsx`, `app/components/StandalonePage.tsx`, `app/components/DocsPage.tsx`, `app/globals.css`, the deployed GitHub Pages site, and the source documentation set.

## Brand
- Personality: precise, orbital, modern, technically credible, and quietly cinematic.
- Trust signals: verified product facts, explicit review states, clear ownership, source-backed documentation, and restrained motion.
- Avoid: generic SaaS gradients, game-launcher spectacle, dense HUD noise, repeated eyebrow-card scaffolding, stock space photography as the main identity, and MVP-looking uniform grids.

## Product goals
- Goals: explain PlanetX in one scroll, make the Ground–Transition–Orbit model memorable, lead developers into the correct guide, and present LabX as the independent product owner.
- Non-goals: imply unverified Unreal Engine compatibility, present KRAFTON as the developer or distributor, or turn the site into a fictional game interface.
- Success signals: visitors understand the plugin workflow, can change language and theme without losing context, and can reach documentation, product status, release information, FAQs, or team ownership in one action.

## Personas and jobs
- Primary personas: Unreal Engine technical artists, world builders, gameplay programmers, and evaluators reviewing the plugin.
- User jobs: understand the product, assess workflow fit, verify compatibility claims, follow setup guidance, and troubleshoot integration.
- Key contexts of use: desktop evaluation, laptop development, mobile link review, and low-light technical work.

## Information architecture
- Primary navigation: Main, Documentation, Known Issues, FAQ, Release Notes, About Us, followed by Search, Language, and Theme utilities.
- Core routes/screens: `/`, `/docs`, `/docs/en/*`, `/docs/ko/*`, `/known-issues`, `/faq`, `/release-notes`, `/about`.
- Route boundary: FAQ, Known Issues, and Release Notes are standalone product-information routes and must not appear in the documentation sidebar, pagination, full-edition downloads, or generated `/docs/{lang}/*` routes.
- Landing hierarchy: value proposition and interactive state model → Proxy Bake projection → compatibility summary → documentation CTA → acquisition CTA (Fab + Demo).
- Standalone-page hierarchy: plain editorial header → source-backed content or team statement → global ownership footer.

## Design principles
- Orbital, not decorative: motion and geometry explain state, scale, and transformation.
- Current state is explicit: language and theme controls show the active state, not the destination.
- Technical confidence before spectacle: every visual flourish must preserve legibility and product truth.
- Edit before decorating: Main carries only the information needed to understand, evaluate, and continue; implementation detail belongs in Documentation.
- One system, two modes: light and dark themes share hierarchy, spacing, and component behavior.
- Tradeoffs: prefer CSS/SVG-native visuals for sharpness and performance; reserve bitmap imagery for product screenshots.

## Visual language
- Color: deep navy, ice cyan, spectral violet, and solar amber in dark mode; lunar white, ink navy, teal, and restrained violet in light mode.
- Typography: compact grotesk/system sans for product copy and monospace for telemetry, states, and metadata.
- Spacing/layout rhythm: broad editorial sections with dense, precise instrumentation inside cards and diagrams.
- Shape/radius/elevation: 16–24px glass surfaces, circular orbital geometry, thin technical borders, soft atmospheric shadows.
- Motion: slow orbital loops, pointer parallax, scroll reveals, active-state transitions, and subtle scanning light; all disabled or reduced under `prefers-reduced-motion`.
- Imagery/iconography: a repo-native PlanetX orbital monogram built from SVG geometry; no dependency on the original plugin PNG for the site identity.

## Components
- Existing components to reuse: `SiteHeader`, `SearchDialog`, documentation shell, markdown renderer, and GSAP reveal infrastructure.
- New/changed components: `BrandMark`, `ThemeToggle`, `MermaidDiagram`, `StandalonePage`, bilingual landing copy, current-language control, interactive hero states, LabX legal footer.
- Variants and states: light/dark header treatment, EN/KO active language, system/light/dark theme, three active planetary states, mobile navigation.
- Token/component ownership: global theme and landing tokens live in `app/globals.css`; interaction state lives in client components.

## Accessibility
- Target standard: WCAG 2.2 AA for contrast, keyboard access, focus visibility, and semantic structure.
- Keyboard/focus behavior: all state selectors and toggles are native buttons or links with visible focus and explicit labels.
- Contrast/readability: text remains readable over atmospheric backgrounds through solid or blurred surfaces; both themes are independently tuned. Documentation body copy targets 16–18px, navigation and TOC text 13–14px, and metadata never relies on sub-10px text.
- Screen-reader semantics: decorative orbital visuals are hidden; controls expose active state and intent.
- Reduced motion and sensory considerations: animations stop or collapse to near-zero duration when reduced motion is requested.

## Responsive behavior
- Supported breakpoints/devices: large desktop, laptop/tablet, and mobile down to 360px.
- Layout adaptations: hero changes from two-column orbital composition to stacked content; state console and workflow grids become single-column; utility labels collapse before controls disappear.
- Touch/hover differences: important information is never hover-only; pointer parallax is enhancement-only.

## Interaction states
- Loading: static content and SVG identity render before animation initializes.
- Empty: search retains its existing empty-result guidance and indexes only the active session language.
- Error: routes use the existing themed not-found page.
- Success: selected language, theme, and planetary state are visibly marked.
- External acquisition: Landing Fab and Demo CTAs open their canonical URLs in a new tab; the Hero and closing acquisition section expose both paths without embedding remote media.
- Offline/slow network: core identity and diagrams are code-native and do not depend on remote assets.

## Content voice
- Tone: concise, technically literate, confident without overstating product maturity.
- Terminology: preserve Planet Asset, Ground, Transition, Orbit, Proxy Bake, Same World, External Level, and World Partition.
- Microcopy rules: action labels start with verbs; current state controls display the current value; review limitations remain explicit.

## Implementation constraints
- Framework/styling system: Next.js static export, React 19, TypeScript, global CSS, GSAP.
- Design-token constraints: extend the existing CSS variables; do not introduce a second styling framework.
- Performance constraints: no remote font, video background, embedded player, or large generated bitmap. The Demo is an external YouTube link; Mermaid is loaded dynamically only on documentation pages that contain a Mermaid block.
- Compatibility constraints: GitHub Pages base path and static export must remain functional.
- Test/screenshot expectations: docs checks, typecheck, lint, rendered HTML tests, Pages build, and visual checks at desktop/mobile in both themes.

## Open questions
- [x] Connect the public PlanetX Fab listing to both Landing acquisition CTAs / LabX / `d64ca545-302a-4158-9abd-f806904a4178`.
- [x] Connect the public workflow Demo to both Landing acquisition groups / LabX / `N1WJU_jtTic`.
- [ ] Replace the review-state Unreal Engine compatibility row with a tested version matrix / LabX / affects compatibility claims only.
