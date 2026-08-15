"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BrandMark } from "./BrandMark";
import { SiteHeader } from "./SiteHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Language = "en" | "ko";

const FAB_LISTING_URL = "https://www.fab.com/listings/d64ca545-302a-4158-9abd-f806904a4178";
const DEMO_VIDEO_URL = "https://www.youtube.com/watch?v=N1WJU_jtTic";

const copy = {
  en: {
    heroEyebrow: "Planet-scale world workflow for Unreal Engine",
    heroTitleA: "Author the ground.",
    heroTitleB: "Reveal the planet.",
    heroBody: "PlanetX projects an authored flat Level onto a spherical planet proxy, then connects the Ground, Transition, and Orbit representations used by your game.",
    primaryCta: "Start building",
    secondaryCta: "Download on FAB",
    demoCta: "Watch Demo",
    statePrompt: "Select a state",
    proxyKicker: "Proxy Bake",
    proxyTitle: "Project flat terrain onto a spherical world.",
    proxyBody: "Proxy Bake classifies the selected source, shows Source Review and Output Plan, then generates a curved Orbit proxy. Anything that needs a manual decision remains visible before Bake.",
    proxyLink: "Explore the editor workflow",
    compatibilityKicker: "Compatibility",
    compatibilityTitle: "Verified facts stay separate from pending claims.",
    planetX: "PlanetX",
    unreal: "Unreal Engine",
    status: "Status",
    notes: "Notes",
    engineBaseline: "Unreal Engine 5.8",
    supported: "SUPPORTED",
    engineNote: "PlanetX 1.0 targets Unreal Engine 5.8 projects on Win64.",
    required: "REQUIRED",
    dependencyNote: "GeometryProcessing and PCG are required plugin dependencies.",
    partitionNote: "Use the documented source-discovery and partitioned Bake workflow.",
    compatibilityNote: "PlanetX 1.0 supports Unreal Engine 5.8 on Win64 and requires GeometryProcessing and PCG.",
    docsKicker: "Documentation",
    docsTitle: "From your first proxy to runtime integration.",
    docsBody: "Follow the Editor workflow, review supported content, integrate runtime Actors, and resolve common failure states.",
    openDocs: "Open documentation",
    otherLanguageDocs: "한국어 문서",
    acquisitionKicker: "Get PlanetX",
    acquisitionBody: "Get PlanetX 1.0 on Fab or watch the complete workflow demo.",
    fabCta: "View on Fab",
  },
  ko: {
    heroEyebrow: "Unreal Engine용 행성 규모 World 워크플로",
    heroTitleA: "평면 Level을 만들고.",
    heroTitleB: "행성으로 펼치세요.",
    heroBody: "PlanetX는 제작한 평면 Level을 구면 행성 Proxy로 투영하고, 게임에서 사용하는 Ground, Transition, Orbit 표현을 하나의 흐름으로 연결합니다.",
    primaryCta: "시작하기",
    secondaryCta: "FAB에서 다운로드",
    demoCta: "Demo 영상 보기",
    statePrompt: "상태 선택",
    proxyKicker: "Proxy Bake",
    proxyTitle: "평면 지형을 구면 행성에 투영합니다.",
    proxyBody: "Proxy Bake는 선택한 Source를 분류하고 Source Review와 Output Plan을 보여준 뒤 곡면 Orbit Proxy를 생성합니다. 직접 판단해야 할 항목은 Bake 전에 그대로 표시됩니다.",
    proxyLink: "Editor 워크플로 보기",
    compatibilityKicker: "호환성",
    compatibilityTitle: "검증된 사실과 확인 중인 항목을 구분합니다.",
    planetX: "PlanetX",
    unreal: "Unreal Engine",
    status: "상태",
    notes: "비고",
    engineBaseline: "Unreal Engine 5.8",
    supported: "지원",
    engineNote: "PlanetX 1.0은 Unreal Engine 5.8 Win64 프로젝트를 대상으로 합니다.",
    required: "필수",
    dependencyNote: "GeometryProcessing과 PCG가 필수 Plugin 의존성입니다.",
    partitionNote: "문서화된 Source 탐색과 분할 Bake 워크플로를 사용합니다.",
    compatibilityNote: "PlanetX 1.0은 Unreal Engine 5.8 Win64를 지원하며 GeometryProcessing과 PCG가 필요합니다.",
    docsKicker: "문서",
    docsTitle: "첫 Proxy 생성부터 Runtime 통합까지.",
    docsBody: "Editor 워크플로, 지원 콘텐츠, Runtime Actor 통합, 자주 발생하는 오류 해결 방법을 한곳에서 확인하세요.",
    openDocs: "한국어 문서 열기",
    otherLanguageDocs: "English docs",
    acquisitionKicker: "PlanetX 시작하기",
    acquisitionBody: "Fab에서 PlanetX 1.0을 확인하거나 전체 워크플로 Demo를 시청하세요.",
    fabCta: "Fab에서 보기",
  },
} as const;

const planetaryStates = {
  en: [
    { name: "Orbit", code: "STATE 01", title: "Frame the entire planet", body: "The generated proxy provides a coherent long-distance representation for navigation and presentation." },
    { name: "Transition", code: "STATE 02", title: "Resolve the surface handoff", body: "The Transition lifecycle connects Section state, runtime context, actor pose, and travel state." },
    { name: "Ground", code: "STATE 03", title: "Restore authored detail", body: "The Ground Level resumes responsibility for local interaction, visual detail, and gameplay." },
  ],
  ko: [
    { name: "Orbit", code: "상태 01", title: "행성 전체를 한눈에 표시합니다", body: "생성된 Proxy가 탐색과 연출에 필요한 일관된 원거리 표현을 제공합니다." },
    { name: "Transition", code: "상태 02", title: "Surface 전환을 조율합니다", body: "Transition 수명 주기가 Section 상태, Runtime Context, Actor Pose, Travel 상태를 연결합니다." },
    { name: "Ground", code: "상태 03", title: "제작한 디테일을 복원합니다", body: "Ground Level이 로컬 상호작용, 시각 디테일, 게임플레이를 다시 담당합니다." },
  ],
} as const;

const projectionCopy = {
  en: {
    source: "01 · Authored source",
    sourceDetail: "Flat terrain grid",
    projection: "02 · Surface projection",
    projectionDetail: "Radius + section frame",
    output: "03 · Orbit representation",
    outputDetail: "Curved proxy surface",
    caption: "Proxy Bake projects reviewed Ground geometry onto the planet radius while preserving its Section structure.",
  },
  ko: {
    source: "01 · Ground Source",
    sourceDetail: "평면 지형 Grid",
    projection: "02 · Surface Projection",
    projectionDetail: "행성 반지름 + Section Frame",
    output: "03 · Orbit 표현",
    outputDetail: "곡면 Proxy Surface",
    caption: "Proxy Bake는 검토가 끝난 Ground Geometry를 Section 구조와 함께 행성 반지름 위로 투영합니다.",
  },
} as const;

export function LandingPage() {
  const root = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [activeState, setActiveState] = useState(0);
  const text = copy[language];
  const state = planetaryStates[language][activeState];
  const projection = projectionCopy[language];

  useEffect(() => {
    const storedLanguage = window.sessionStorage.getItem("planetx-language");
    let frame = 0;
    if (storedLanguage === "ko" || storedLanguage === "en") {
      frame = window.requestAnimationFrame(() => setLanguage(storedLanguage));
    }
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.from(".hero-copy > *", {
      y: 28,
      opacity: 0,
      duration: 0.82,
      stagger: 0.08,
      ease: "power3.out",
    });
    gsap.from(".hero-camera-rig", { scale: 0.82, opacity: 0, rotate: -8, duration: 1.2, ease: "power3.out" });
    gsap.to(".hero-camera-rig", {
      yPercent: 7,
      rotate: 4,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
    });
    const projectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".projection-demo",
        start: "top 78%",
        end: "bottom 42%",
        scrub: 1,
      },
    });
    projectionTimeline
      .fromTo(".projection-source__terrain", { rotateX: 54, y: 34, scale: 1.03 }, { rotateX: 67, y: 0, scale: 0.9, ease: "none" }, 0)
      .fromTo(".projection-ray", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.72, stagger: 0.045, ease: "none" }, 0.08)
      .fromTo(".projection-sphere", { scale: 0.72, rotate: -18, opacity: 0.28 }, { scale: 1, rotate: 8, opacity: 1, ease: "none" }, 0)
      .fromTo(".projection-sphere__surface", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", ease: "none" }, 0.12)
      .fromTo(".projection-progress__bar", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      gsap.from(element, {
        y: 38,
        opacity: 0,
        duration: 0.78,
        ease: "power2.out",
        scrollTrigger: { trigger: element, start: "top 86%", once: true },
      });
    });
  }, { scope: root, dependencies: [language], revertOnUpdate: true });

  const stateAngle = useMemo(() => `${activeState * 120 - 18}deg`, [activeState]);

  const changeLanguage = (nextLanguage: Language) => {
    window.sessionStorage.setItem("planetx-language", nextLanguage);
    setLanguage(nextLanguage);
    setActiveState(0);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    root.current.style.setProperty("--pointer-x", x.toFixed(3));
    root.current.style.setProperty("--pointer-y", y.toFixed(3));
  };

  return (
    <div ref={root} id="site-top" className="landing" tabIndex={-1} onPointerMove={handlePointerMove}>
      <SiteHeader tone="dark" language={language} onLanguageChange={changeLanguage} />

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-aurora" aria-hidden="true" />
          <div className="hero-stars hero-stars--far" aria-hidden="true" />
          <div className="hero-stars hero-stars--near" aria-hidden="true" />

          <div className="hero-copy">
            <span className="eyebrow">{text.heroEyebrow}</span>
            <h1 id="hero-title">{text.heroTitleA}<br /><em>{text.heroTitleB}</em></h1>
            <p>{text.heroBody}</p>
            <div className="hero-actions">
              <Link className="button button--primary" href={`/docs/${language}/quick-start-same-world#main-content`}>{text.primaryCta}<span>↗</span></Link>
              <a className="button button--ghost" href={FAB_LISTING_URL} target="_blank" rel="noreferrer">{text.secondaryCta}<span>↗</span></a>
              <a className="button button--ghost" href={DEMO_VIDEO_URL} target="_blank" rel="noreferrer">{text.demoCta}<span>▶</span></a>
            </div>
          </div>

          <div className="hero-visual" data-camera-state={activeState} aria-label={`${state.name}: ${state.title}`}>
            <div className="hero-camera-rig">
              <div className="hero-orbital-shell" style={{ "--state-angle": stateAngle } as React.CSSProperties}>
              <div className="orbit-plane orbit-plane--wide"><i /><i /><i /></div>
              <div className="orbit-plane orbit-plane--tilted"><i /></div>
              <div className="hero-planet">
                <span className="planet-atmosphere" />
                <span className="planet-grid" />
                <span className="planet-continent planet-continent--one" />
                <span className="planet-continent planet-continent--two" />
                <span className="planet-light" />
                <span className="planet-scan" />
              </div>
              <div className="hero-transition-land" aria-hidden="true">
                <svg className="hero-transition-land__mesh" viewBox="0 0 420 230" role="presentation">
                  <defs>
                    <linearGradient id="transition-surface" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--accent)" stopOpacity=".3" />
                      <stop offset="1" stopColor="#071929" stopOpacity=".82" />
                    </linearGradient>
                  </defs>
                  <path className="hero-transition-land__surface" d="M56 42 Q210 -4 364 42 Q388 108 376 184 Q210 118 44 184 Q32 108 56 42Z" />
                  <g className="hero-transition-land__grid">
                    <path d="M49 76 Q210 20 371 76" />
                    <path d="M44 112 Q210 48 376 112" />
                    <path d="M42 148 Q210 79 378 148" />
                    <path d="M104 29 Q75 108 88 197" />
                    <path d="M157 11 Q143 105 151 151" />
                    <path d="M210 2 L210 118" />
                    <path d="M263 11 Q277 105 269 151" />
                    <path d="M316 29 Q345 108 332 197" />
                  </g>
                  <path className="hero-transition-land__ridge" d="M55 165 L93 126 L127 145 L174 78 L213 126 L253 96 L298 149 L347 116 L377 181 Q210 119 44 184Z" />
                </svg>
                <i className="hero-transition-land__beacon" />
              </div>
              <div className="orbital-node orbital-node--active"><span>{activeState + 1}</span></div>
              </div>
            </div>
            <div className="hero-ground-plane" aria-hidden="true">
              <div className="hero-ground-plane__grid" />
              <span className="hero-ground-plane__ridge hero-ground-plane__ridge--one" />
              <span className="hero-ground-plane__ridge hero-ground-plane__ridge--two" />
              <i className="hero-ground-plane__beacon" />
            </div>
            <div className="hero-telemetry hero-telemetry--top"><small>STATE</small><strong>{state.name.toUpperCase()}</strong></div>
            <div className="hero-state-dock" aria-label={text.statePrompt}>
              {planetaryStates[language].map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  className={index === activeState ? "is-active" : undefined}
                  onClick={() => setActiveState(index)}
                  aria-pressed={index === activeState}
                >
                  <span>0{index + 1}</span>{item.name}
                </button>
              ))}
            </div>
            <div className="hero-state-summary" aria-live="polite">
              <small>{state.code}</small>
              <strong>{state.title}</strong>
              <p>{state.body}</p>
            </div>
          </div>
        </section>

        <section className="proxy-section">
          <div className="proxy-copy" data-reveal>
            <span className="section-kicker">{text.proxyKicker}</span>
            <h2>{text.proxyTitle}</h2>
            <p>{text.proxyBody}</p>
            <Link className="text-link" href={`/docs/${language}/proxy-bake-editor#main-content`}>{text.proxyLink}<span>↗</span></Link>
          </div>
          <div className="projection-demo" data-reveal>
            <div className="projection-demo__stage" aria-label={projection.caption}>
              <div className="projection-source">
                <div className="projection-source__terrain">
                  <span className="projection-source__contour projection-source__contour--one" />
                  <span className="projection-source__contour projection-source__contour--two" />
                  <span className="projection-source__contour projection-source__contour--three" />
                </div>
              </div>
              <div className="projection-rays" aria-hidden="true">
                <i className="projection-ray" /><i className="projection-ray" /><i className="projection-ray" />
                <i className="projection-ray" /><i className="projection-ray" /><i className="projection-ray" />
                <i className="projection-ray" />
              </div>
              <div className="projection-sphere">
                <div className="projection-sphere__surface">
                  <span className="projection-sphere__land projection-sphere__land--one" />
                  <span className="projection-sphere__land projection-sphere__land--two" />
                </div>
                <span className="projection-sphere__atmosphere" />
              </div>
              <span className="projection-demo__radius">R = 6,371 KM</span>
            </div>
            <div className="projection-progress" aria-hidden="true"><i className="projection-progress__bar" /></div>
            <div className="projection-legend">
              <span><small>{projection.source}</small><strong>{projection.sourceDetail}</strong></span>
              <span><small>{projection.projection}</small><strong>{projection.projectionDetail}</strong></span>
              <span><small>{projection.output}</small><strong>{projection.outputDetail}</strong></span>
            </div>
            <p className="projection-demo__caption">{projection.caption}</p>
          </div>
        </section>

        <section className="compatibility-section" id="compatibility">
          <div className="section-heading" data-reveal><span className="section-kicker">{text.compatibilityKicker}</span><h2>{text.compatibilityTitle}</h2></div>
          <div className="compatibility-table" role="table" aria-label="PlanetX compatibility" data-reveal>
            <div role="row" className="compatibility-table__head"><span role="columnheader">{text.planetX}</span><span role="columnheader">{text.unreal}</span><span role="columnheader">{text.status}</span><span role="columnheader">{text.notes}</span></div>
            <div role="row"><strong role="cell">1.0</strong><span role="cell">{text.engineBaseline}</span><span role="cell"><b className="status status--verified">{text.supported}</b></span><span role="cell">{text.engineNote}</span></div>
            <div role="row"><strong role="cell">1.0</strong><span role="cell">GeometryProcessing + PCG</span><span role="cell"><b className="status status--verified">{text.required}</b></span><span role="cell">{text.dependencyNote}</span></div>
            <div role="row"><strong role="cell">1.0</strong><span role="cell">World Partition</span><span role="cell"><b className="status status--verified">{text.supported}</b></span><span role="cell">{text.partitionNote}</span></div>
          </div>
          <p className="compatibility-note">{text.compatibilityNote}</p>
        </section>

        <section className="docs-cta" data-reveal>
          <div><span className="section-kicker">{text.docsKicker}</span><h2>{text.docsTitle}</h2></div>
          <div><p>{text.docsBody}</p><div className="docs-cta__actions"><Link className="button button--light" href={`/docs/${language}/quick-start-same-world#main-content`}>{text.openDocs}</Link><Link className="button button--outline-light" href={`/docs/${language === "en" ? "ko" : "en"}/quick-start-same-world#main-content`}>{text.otherLanguageDocs}</Link></div></div>
        </section>

        <section className="acquisition-cta" id="get-planetx" data-reveal>
          <BrandMark className="acquisition-cta__mark" size={92} title="PlanetX orbital mark" />
          <div><span className="section-kicker">{text.acquisitionKicker}</span><h2>PlanetX 1.0</h2><p>{text.acquisitionBody}</p></div>
          <div className="acquisition-cta__actions">
            <a className="button button--primary" href={FAB_LISTING_URL} target="_blank" rel="noreferrer">{text.fabCta}<span>↗</span></a>
            <a className="button button--ghost" href={DEMO_VIDEO_URL} target="_blank" rel="noreferrer">{text.demoCta}<span>▶</span></a>
          </div>
        </section>
      </main>

    </div>
  );
}
