"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SiteHeader } from "./SiteHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const workflow = [
  ["01", "Create a Planet Asset", "Define the planet identity, radius, projection, and authored sections."],
  ["02", "Review the ground source", "Choose a source scope and inspect supported, manual-review, and excluded content."],
  ["03", "Bake the orbit proxy", "Generate a curved, partitioned representation from persistent source LOD data."],
  ["04", "Connect runtime state", "Use Planet, Coordinate, Movement, and travel components for the game-owned flow."],
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

export function LandingPage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.from(".hero-copy > *", {
      y: 26,
      opacity: 0,
      duration: 0.8,
      stagger: 0.09,
      ease: "power3.out",
    });
    gsap.to(".hero-planet", {
      yPercent: 8,
      rotate: 7,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      gsap.from(element, {
        y: 32,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: { trigger: element, start: "top 84%", once: true },
      });
    });
  }, { scope: root });

  return (
    <div
      ref={root}
      className="landing"
      style={{ "--space-background": `url("${basePath}/images/space-background.png")` } as React.CSSProperties}
    >
      <SiteHeader tone="dark" />

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-stars" aria-hidden="true" />
          <div className="hero-copy">
            <span className="eyebrow">Planet-scale world workflow for Unreal Engine</span>
            <h1 id="hero-title">Build the ground.<br /><em>Reveal the planet.</em></h1>
            <p>
              PlanetX turns authored Unreal Engine levels into a curved planetary presentation and connects the journey between Ground, Transition, and Orbit.
            </p>
            <div className="hero-actions">
              <Link className="button button--primary" href="/docs/en/getting-started">Start building</Link>
              <Link className="button button--ghost" href="/docs/en/overview">Read the overview</Link>
            </div>
            <div className="hero-proof" aria-label="Verified product facts">
              <span><strong>1.0</strong> Current plugin version</span>
              <span><strong>2</strong> Runtime + Editor modules</span>
              <span><strong>24</strong> Source documents</span>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="orbit orbit--outer" />
            <div className="orbit orbit--inner" />
            <div className="hero-planet">
              <span className="planet-grid" />
              <span className="planet-light" />
              <span className="planet-marker">PX</span>
            </div>
            <div className="hero-status hero-status--orbit"><small>STATE 01</small><strong>ORBIT</strong></div>
            <div className="hero-status hero-status--ground"><small>STATE 03</small><strong>GROUND</strong></div>
          </div>

          <div className="scroll-cue"><span /> Scroll to enter the system</div>
        </section>

        <section className="problem-section" id="product">
          <div className="section-kicker">The problem</div>
          <div className="problem-grid" data-reveal>
            <h2>A world can feel local to build—<br />and planetary to experience.</h2>
            <div>
              <p>Traditional ground authoring is precise and familiar. Planet-scale presentation needs curvature, distance, partitioning, and a runtime state model.</p>
              <p>PlanetX connects those scales without asking a team to abandon the level workflow it already understands.</p>
            </div>
          </div>
          <div className="scale-line" aria-hidden="true">
            <span>1 m</span><i /><span>1 km</span><i /><span>Orbit</span>
          </div>
        </section>

        <section className="solution-section" data-reveal>
          <div className="section-heading">
            <span className="section-kicker">The PlanetX model</span>
            <h2>One authored ground.<br />Three connected states.</h2>
            <p>The state journey is a product concept, not a forced game loop. Your game remains responsible for travel and replication.</p>
          </div>
          <div className="state-journey" aria-label="Orbit, Transition, Ground state journey">
            <article><span>01</span><strong>Orbit</strong><p>Read the planet as a whole through generated proxy content.</p></article>
            <div className="state-connector"><i /><b>ENTER</b><i /></div>
            <article className="state-journey__active"><span>02</span><strong>Transition</strong><p>Resolve surface context and hand the experience between representations.</p></article>
            <div className="state-connector"><i /><b>LAND</b><i /></div>
            <article><span>03</span><strong>Ground</strong><p>Return to the authored level and its full local detail.</p></article>
          </div>
        </section>

        <section className="proxy-section">
          <div className="proxy-copy" data-reveal>
            <span className="section-kicker">Proxy Bake</span>
            <h2>Review first.<br />Bake with intent.</h2>
            <p>Choose a source scope, classify content, inspect the output plan, and then generate the proxy. Unsupported or manual-review content stays visible before the bake.</p>
            <Link className="text-link" href="/docs/en/editor-workflow">Explore the editor workflow <span>→</span></Link>
          </div>
          <div className="proxy-comparison" data-reveal>
            <div className="proxy-panel proxy-panel--source">
              <header><span>GROUND SOURCE</span><b>AUTHORED</b></header>
              <div className="terrain terrain--flat"><i /><i /><i /><i /><i /></div>
              <footer>Persistent level content</footer>
            </div>
            <div className="proxy-transform"><span>PROXY BAKE</span><i>→</i></div>
            <div className="proxy-panel proxy-panel--output">
              <header><span>ORBIT PROXY</span><b>GENERATED</b></header>
              <div className="terrain terrain--curve"><i /><i /><i /><i /><i /></div>
              <footer>Partitioned curved representation</footer>
            </div>
          </div>
        </section>

        <section className="mode-section" data-reveal>
          <div className="section-heading section-heading--center">
            <span className="section-kicker">World structure</span>
            <h2>Same World or External Level.<br />Make the boundary explicit.</h2>
          </div>
          <div className="mode-cards">
            <article>
              <span className="mode-icon">↻</span>
              <h3>Same World</h3>
              <p>Keep representations in one world and coordinate the state handoff in place.</p>
              <code>Runtime Role · Surface Context</code>
            </article>
            <article>
              <span className="mode-icon">⇥</span>
              <h3>External Level</h3>
              <p>Travel between worlds with a receiver component and game-owned restoration flow.</p>
              <code>Prepare · Travel · Resume</code>
            </article>
          </div>
        </section>

        <section className="coordinate-section">
          <div className="coordinate-copy" data-reveal>
            <span className="section-kicker">Coordinate flow</span>
            <h2>Know where an actor is—at every scale.</h2>
            <p>PlanetX’s coordinate and surface concepts connect Unreal World space to the planet, its surface frame, and authored sections.</p>
            <Link className="text-link" href="/docs/en/core-concepts">Read the core concepts <span>→</span></Link>
          </div>
          <div className="coordinate-stack" aria-label="World to Planet to Surface to Section hierarchy" data-reveal>
            <div><small>01</small><strong>WORLD</strong><span>Unreal transform</span></div>
            <div><small>02</small><strong>PLANET</strong><span>Identity + projection</span></div>
            <div><small>03</small><strong>SURFACE</strong><span>Local frame</span></div>
            <div><small>04</small><strong>SECTION</strong><span>Authored region</span></div>
          </div>
        </section>

        <section className="workflow-section">
          <div className="section-heading" data-reveal>
            <span className="section-kicker">Editor workflow</span>
            <h2>From level to planet proxy,<br />one reviewable sequence.</h2>
          </div>
          <div className="workflow-list">
            {workflow.map(([number, title, description]) => (
              <article key={number} data-reveal>
                <span>{number}</span><h3>{title}</h3><p>{description}</p><i aria-hidden="true">↗</i>
              </article>
            ))}
          </div>
        </section>

        <section className="compatibility-section" id="compatibility">
          <div className="section-heading" data-reveal>
            <span className="section-kicker">Compatibility</span>
            <h2>Verified facts stay separate<br />from pending claims.</h2>
          </div>
          <div className="compatibility-table" role="table" aria-label="PlanetX compatibility" data-reveal>
            <div role="row" className="compatibility-table__head"><span role="columnheader">PlanetX</span><span role="columnheader">Unreal Engine</span><span role="columnheader">Status</span><span role="columnheader">Notes</span></div>
            <div role="row"><strong role="cell">1.0</strong><span role="cell">Range not declared</span><span role="cell"><b className="status status--review">PRODUCT REVIEW</b></span><span role="cell">The plugin descriptor does not declare an EngineVersion.</span></div>
            <div role="row"><strong role="cell">1.0</strong><span role="cell">GeometryProcessing</span><span role="cell"><b className="status status--verified">VERIFIED</b></span><span role="cell">Enabled plugin dependency.</span></div>
            <div role="row"><strong role="cell">1.0</strong><span role="cell">World Partition</span><span role="cell"><b className="status status--review">WORKFLOW QA</b></span><span role="cell">Documented as supported; project-scale verification remains.</span></div>
          </div>
          <p className="compatibility-note">We do not infer engine compatibility from source alone. A tested matrix will replace the review state.</p>
        </section>

        <section className="docs-cta" data-reveal>
          <div>
            <span className="section-kicker">Documentation</span>
            <h2>From first proxy<br />to runtime handoff.</h2>
          </div>
          <div>
            <p>Follow the complete workflow, inspect supported content, integrate runtime actors, and resolve common failure states.</p>
            <div className="docs-cta__actions">
              <Link className="button button--light" href="/docs/en/getting-started">Open documentation</Link>
              <Link className="button button--outline-light" href="/docs/ko/overview">한국어 문서</Link>
            </div>
          </div>
        </section>

        <section className="fab-cta" data-reveal>
          <Image src={`${basePath}/brand/planetx-icon.png`} alt="PlanetX plugin icon" width={88} height={88} />
          <div><span className="section-kicker">Fab listing</span><h2>PlanetX 1.0</h2><p>The public Fab URL has not been configured yet.</p></div>
          <span className="button button--disabled" aria-disabled="true">Fab link pending</span>
        </section>
      </main>

      <footer className="site-footer">
        <div><Image src={`${basePath}/brand/planetx-icon.png`} alt="" width={34} height={34} /><strong>PlanetX</strong></div>
        <p>Planet-scale workflow tools for Unreal Engine.</p>
        <nav aria-label="Footer navigation">
          <Link href="/docs">Documentation</Link>
          <Link href="/docs/en/support-release-notes">Release notes</Link>
          <Link href="/docs/en/troubleshooting">Support</Link>
          <span>GitHub URL pending</span>
        </nav>
        <small>© 2026 Yongin Aerospace Industries. PlanetX documentation version 1.0.</small>
      </footer>
    </div>
  );
}
