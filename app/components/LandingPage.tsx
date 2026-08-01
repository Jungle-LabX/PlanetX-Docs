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

const copy = {
  en: {
    heroEyebrow: "Planet-scale world workflow for Unreal Engine",
    heroTitleA: "Author the ground.",
    heroTitleB: "Reveal the planet.",
    heroBody: "PlanetX projects an authored flat Level onto a spherical planet proxy, then connects the Ground, Transition, and Orbit representations used by your game.",
    primaryCta: "Start building",
    secondaryCta: "Explore the system",
    version: "Current plugin version",
    modules: "Runtime + Editor modules",
    documents: "Source documents",
    systemOnline: "SYSTEM ONLINE",
    scale: "PLANETARY SCALE",
    scroll: "Scroll to enter the system",
    problemKicker: "The design problem",
    problemTitle: "Keep the Level workflow. Scale the experience to a planet.",
    problemBodyA: "A Ground Level is familiar, precise, and rich in detail. An Orbit view needs curvature, long-distance representation, partitioning, and an explicit runtime state model.",
    problemBodyB: "PlanetX connects those two scales while preserving the Unreal Engine authoring workflow your team already uses.",
    stateKicker: "Live state model",
    stateTitle: "One World. Three connected representations.",
    stateBody: "See how the same World changes representation during travel. PlanetX provides coordinates and surface context; your game remains responsible for Level travel, Pawn setup, and replication.",
    statePrompt: "Select a state",
    proxyKicker: "Proxy Bake",
    proxyTitle: "Project flat terrain onto a spherical world.",
    proxyBody: "Proxy Bake classifies the selected source, shows Source Review and Output Plan, then generates a curved Orbit proxy. Anything that needs a manual decision remains visible before Bake.",
    proxyLink: "Explore the editor workflow",
    groundSource: "GROUND SOURCE",
    authored: "AUTHORED",
    persistent: "Persistent level content",
    proxyBake: "PROXY BAKE",
    orbitProxy: "ORBIT PROXY",
    generated: "GENERATED",
    partitioned: "Partitioned curved representation",
    structureKicker: "World structure",
    structureTitle: "Choose the World boundary your game needs.",
    sameWorld: "Same World",
    sameWorldBody: "Keep Ground and Orbit representations in one World and coordinate the state handoff in place.",
    externalLevel: "External Level",
    externalLevelBody: "Travel between Worlds with a receiver Component and a restoration flow owned by your game.",
    coordinatesKicker: "Coordinate model",
    coordinatesTitle: "Keep every Actor located at every scale.",
    coordinatesBody: "PlanetX connects Unreal World space to planet space, a local surface frame, and the authored Section that owns the experience.",
    conceptsLink: "Read the core concepts",
    workflowKicker: "Editor sequence",
    workflowTitle: "A reviewable path from Ground Level to planet proxy.",
    compatibilityKicker: "Compatibility",
    compatibilityTitle: "Verified facts stay separate from pending claims.",
    planetX: "PlanetX",
    unreal: "Unreal Engine",
    status: "Status",
    notes: "Notes",
    rangeNotDeclared: "Range not declared",
    review: "PRODUCT REVIEW",
    engineNote: "The plugin descriptor does not declare an EngineVersion.",
    verified: "VERIFIED",
    geometryNote: "Enabled plugin dependency.",
    workflowQa: "WORKFLOW QA",
    partitionNote: "Documented as supported; project-scale verification remains.",
    compatibilityNote: "We do not infer engine compatibility from source alone. A tested matrix will replace the review state.",
    docsKicker: "Documentation",
    docsTitle: "From your first proxy to runtime integration.",
    docsBody: "Follow the Editor workflow, review supported content, integrate runtime Actors, and resolve common failure states.",
    openDocs: "Open documentation",
    otherLanguageDocs: "한국어 문서",
    fabKicker: "Fab listing",
    fabBody: "The public Fab URL has not been configured yet.",
    fabPending: "Fab link pending",
    footerTagline: "Planet-scale workflow tools for Unreal Engine.",
    disclaimer: "PlanetX is independently developed by LabX while participating in the Epic Project, a developer-support program of the KRAFTON JUNGLE GameTech Lab. All rights, title, and interest in the product belong exclusively to LabX. KRAFTON, Inc. was not involved in its development or distribution and assumes no responsibility or liability arising from its use.",
    rights: "© 2026 LabX. PlanetX documentation version 1.0.",
  },
  ko: {
    heroEyebrow: "Unreal Engine용 행성 규모 World 워크플로",
    heroTitleA: "평면 Level을 만들고.",
    heroTitleB: "행성으로 펼치세요.",
    heroBody: "PlanetX는 제작한 평면 Level을 구면 행성 Proxy로 투영하고, 게임에서 사용하는 Ground, Transition, Orbit 표현을 하나의 흐름으로 연결합니다.",
    primaryCta: "시작하기",
    secondaryCta: "시스템 살펴보기",
    version: "현재 플러그인 버전",
    modules: "Runtime + Editor 모듈",
    documents: "공개 문서",
    systemOnline: "시스템 온라인",
    scale: "행성 규모",
    scroll: "스크롤하여 시스템 살펴보기",
    problemKicker: "해결하는 문제",
    problemTitle: "익숙한 Level 제작 방식 그대로, 행성 규모의 World를 구현합니다.",
    problemBodyA: "Ground Level은 정밀한 제작과 높은 디테일에 적합합니다. 반면 Orbit 뷰에는 곡률, 원거리 표현, Partition, 명확한 Runtime 상태 모델이 필요합니다.",
    problemBodyB: "PlanetX는 팀이 사용하던 Unreal Engine 제작 워크플로를 유지하면서 두 규모를 연결합니다.",
    stateKicker: "Runtime 상태 모델",
    stateTitle: "하나의 World, 연결된 세 가지 표현.",
    stateBody: "이동 과정에서 같은 World의 표현이 어떻게 바뀌는지 확인하세요. PlanetX는 좌표와 Surface Context를 제공하며, Level Travel·Pawn 설정·Replication은 게임에서 담당합니다.",
    statePrompt: "상태 선택",
    proxyKicker: "Proxy Bake",
    proxyTitle: "평면 지형을 구면 행성에 투영합니다.",
    proxyBody: "Proxy Bake는 선택한 Source를 분류하고 Source Review와 Output Plan을 보여준 뒤 곡면 Orbit Proxy를 생성합니다. 직접 판단해야 할 항목은 Bake 전에 그대로 표시됩니다.",
    proxyLink: "Editor 워크플로 보기",
    groundSource: "GROUND 소스",
    authored: "제작 원본",
    persistent: "퍼시스턴트 레벨 콘텐츠",
    proxyBake: "PROXY BAKE",
    orbitProxy: "ORBIT 프록시",
    generated: "생성 결과",
    partitioned: "파티셔닝된 곡면 표현",
    structureKicker: "World 구성",
    structureTitle: "게임 구조에 맞는 World 경계를 선택하세요.",
    sameWorld: "Same World",
    sameWorldBody: "Ground와 Orbit 표현을 하나의 World에 두고, 같은 공간에서 상태 전환을 조율합니다.",
    externalLevel: "External Level",
    externalLevelBody: "Receiver Component와 게임이 관리하는 복원 흐름을 사용해 World 사이를 이동합니다.",
    coordinatesKicker: "좌표 체계",
    coordinatesTitle: "어떤 규모에서도 Actor의 위치를 일관되게 다룹니다.",
    coordinatesBody: "PlanetX는 Unreal World 좌표를 Planet 좌표, 로컬 Surface Frame, 그리고 콘텐츠를 소유한 Section까지 연결합니다.",
    conceptsLink: "핵심 개념 읽기",
    workflowKicker: "Editor 작업 순서",
    workflowTitle: "Ground Level에서 행성 Proxy까지, 단계마다 검토할 수 있습니다.",
    compatibilityKicker: "호환성",
    compatibilityTitle: "검증된 사실과 확인 중인 항목을 구분합니다.",
    planetX: "PlanetX",
    unreal: "Unreal Engine",
    status: "상태",
    notes: "비고",
    rangeNotDeclared: "범위 미선언",
    review: "제품 검증 중",
    engineNote: "Plugin Descriptor에 EngineVersion이 선언되어 있지 않습니다.",
    verified: "검증 완료",
    geometryNote: "Plugin 의존성으로 활성화되어 있습니다.",
    workflowQa: "워크플로 검증 중",
    partitionNote: "지원 워크플로로 문서화되어 있으며, 대규모 프로젝트 검증이 진행 중입니다.",
    compatibilityNote: "소스 코드만으로 Engine 호환성을 추정하지 않습니다. 실제 테스트 결과가 확보되면 검증 매트릭스로 갱신합니다.",
    docsKicker: "문서",
    docsTitle: "첫 Proxy 생성부터 Runtime 통합까지.",
    docsBody: "Editor 워크플로, 지원 콘텐츠, Runtime Actor 통합, 자주 발생하는 오류 해결 방법을 한곳에서 확인하세요.",
    openDocs: "한국어 문서 열기",
    otherLanguageDocs: "English docs",
    fabKicker: "Fab 등록",
    fabBody: "공개 Fab URL은 아직 설정되지 않았습니다.",
    fabPending: "Fab 링크 준비 중",
    footerTagline: "Unreal Engine을 위한 행성 규모 워크플로 도구.",
    disclaimer: "PlanetX는 KRAFTON JUNGLE GameTech Lab의 개발자 지원 프로그램인 Epic Project 참여 과정에서 LabX가 독립적으로 개발한 제품입니다. 제품에 관한 모든 권리와 소유권은 LabX에 있으며, KRAFTON은 개발 및 유통에 관여하지 않았고 제품 사용으로 발생하는 결과에 대해 책임을 부담하지 않습니다.",
    rights: "© 2026 LabX. PlanetX 문서 버전 1.0.",
  },
} as const;

const workflows = {
  en: [
    ["01", "Create a Planet Asset", "Define planet identity, radius, projection settings, and authored Sections."],
    ["02", "Review the Ground source", "Choose a Source Scope, then inspect supported, manual-review, and excluded content."],
    ["03", "Bake the Orbit proxy", "Generate a curved, partitioned representation from persistent source LOD data."],
    ["04", "Connect runtime state", "Use Planet, Coordinate, Movement, and Travel Components in the flow owned by your game."],
  ],
  ko: [
    ["01", "Planet Asset 생성", "행성 식별자, 반지름, Projection 설정, 제작 Section을 정의합니다."],
    ["02", "Ground Source 검토", "Source Scope를 선택한 뒤 지원·수동 검토·제외 콘텐츠를 확인합니다."],
    ["03", "Orbit Proxy Bake", "Persistent Source LOD 데이터로 곡면·Partition 표현을 생성합니다."],
    ["04", "Runtime 상태 연결", "Planet, Coordinate, Movement, Travel Component를 게임 흐름에 연결합니다."],
  ],
} as const;

const planetaryStates = {
  en: [
    { name: "Orbit", code: "STATE 01", title: "Frame the entire planet", body: "The generated proxy provides a coherent long-distance representation for navigation and presentation.", metric: "GLOBAL VIEW" },
    { name: "Transition", code: "STATE 02", title: "Resolve the surface handoff", body: "Surface Context connects the planetary representation to the authored Ground experience.", metric: "SURFACE LOCK" },
    { name: "Ground", code: "STATE 03", title: "Restore authored detail", body: "The Ground Level resumes responsibility for local interaction, visual detail, and gameplay.", metric: "LOCAL DETAIL" },
  ],
  ko: [
    { name: "Orbit", code: "상태 01", title: "행성 전체를 한눈에 표시합니다", body: "생성된 Proxy가 탐색과 연출에 필요한 일관된 원거리 표현을 제공합니다.", metric: "전역 뷰" },
    { name: "Transition", code: "상태 02", title: "Surface 전환을 조율합니다", body: "Surface Context가 행성 표현과 제작된 Ground 경험을 연결합니다.", metric: "SURFACE LOCK" },
    { name: "Ground", code: "상태 03", title: "제작한 디테일을 복원합니다", body: "Ground Level이 로컬 상호작용, 시각 디테일, 게임플레이를 다시 담당합니다.", metric: "로컬 디테일" },
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
    <div ref={root} className="landing" onPointerMove={handlePointerMove}>
      <SiteHeader tone="dark" language={language} onLanguageChange={changeLanguage} />

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-aurora" aria-hidden="true" />
          <div className="hero-stars hero-stars--far" aria-hidden="true" />
          <div className="hero-stars hero-stars--near" aria-hidden="true" />

          <div className="hero-copy">
            <div className="hero-system-status"><i /> {text.systemOnline}<span>PX-01</span></div>
            <span className="eyebrow">{text.heroEyebrow}</span>
            <h1 id="hero-title">{text.heroTitleA}<br /><em>{text.heroTitleB}</em></h1>
            <p>{text.heroBody}</p>
            <div className="hero-actions">
              <Link className="button button--primary" href={`/docs/${language}/getting-started`}>{text.primaryCta}<span>↗</span></Link>
              <a className="button button--ghost" href="#product">{text.secondaryCta}<span>↓</span></a>
            </div>
            <div className="hero-proof" aria-label="Verified product facts">
              <span><strong>1.0</strong> {text.version}</span>
              <span><strong>2</strong> {text.modules}</span>
              <span><strong>28</strong> {text.documents}</span>
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
            <div className="hero-telemetry hero-telemetry--side"><small>{text.scale}</small><strong>6,371 KM</strong><span>RADIUS MODEL</span></div>
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
          </div>

          <div className="scroll-cue"><span /> {text.scroll}</div>
        </section>

        <div className="mission-strip" aria-hidden="true">
          <span>UNREAL WORLD</span><i /> <span>PLANET ASSET</span><i /> <span>SURFACE CONTEXT</span><i /> <span>ORBIT PROXY</span>
        </div>

        <section className="problem-section" id="product">
          <div className="section-kicker">{text.problemKicker}</div>
          <div className="problem-grid" data-reveal>
            <h2>{text.problemTitle}</h2>
            <div><p>{text.problemBodyA}</p><p>{text.problemBodyB}</p></div>
          </div>
          <div className="scale-line" aria-hidden="true"><span>1 M</span><i /><span>1 KM</span><i /><span>ORBIT</span></div>
        </section>

        <section className="solution-section">
          <div className="section-heading" data-reveal>
            <span className="section-kicker">{text.stateKicker}</span>
            <h2>{text.stateTitle}</h2>
            <p>{text.stateBody}</p>
          </div>
          <div className="state-console" data-reveal>
            <div className="state-console__rail" role="tablist" aria-label={text.statePrompt}>
              {planetaryStates[language].map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={index === activeState}
                  className={index === activeState ? "is-active" : undefined}
                  onClick={() => setActiveState(index)}
                >
                  <span>0{index + 1}</span><strong>{item.name}</strong><small>{item.metric}</small>
                </button>
              ))}
            </div>
            <div className="state-console__display" aria-live="polite">
              <div className="state-console__radar" data-state={activeState} aria-hidden="true"><i /><i /><i /><span /></div>
              <div className="state-console__copy"><small>{state.code}</small><h3>{state.title}</h3><p>{state.body}</p><code>PX / {state.metric}</code></div>
            </div>
          </div>
        </section>

        <section className="proxy-section">
          <div className="proxy-copy" data-reveal>
            <span className="section-kicker">{text.proxyKicker}</span>
            <h2>{text.proxyTitle}</h2>
            <p>{text.proxyBody}</p>
            <Link className="text-link" href={`/docs/${language}/editor-workflow`}>{text.proxyLink}<span>↗</span></Link>
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

        <section className="mode-section" data-reveal>
          <div className="section-heading section-heading--center">
            <span className="section-kicker">{text.structureKicker}</span>
            <h2>{text.structureTitle}</h2>
          </div>
          <div className="mode-cards">
            <article><span className="mode-icon">◎</span><small>MODE / 01</small><h3>{text.sameWorld}</h3><p>{text.sameWorldBody}</p><code>Runtime Role · Surface Context</code></article>
            <article><span className="mode-icon">⇥</span><small>MODE / 02</small><h3>{text.externalLevel}</h3><p>{text.externalLevelBody}</p><code>Prepare · Travel · Resume</code></article>
          </div>
        </section>

        <section className="coordinate-section">
          <div className="coordinate-copy" data-reveal>
            <span className="section-kicker">{text.coordinatesKicker}</span>
            <h2>{text.coordinatesTitle}</h2>
            <p>{text.coordinatesBody}</p>
            <Link className="text-link" href={`/docs/${language}/core-concepts`}>{text.conceptsLink}<span>↗</span></Link>
          </div>
          <div className="coordinate-stack" aria-label="World to Planet to Surface to Section hierarchy" data-reveal>
            <div><small>01</small><strong>WORLD</strong><span>Unreal transform</span></div>
            <div><small>02</small><strong>PLANET</strong><span>Identity + projection</span></div>
            <div><small>03</small><strong>SURFACE</strong><span>Local frame</span></div>
            <div><small>04</small><strong>SECTION</strong><span>Authored region</span></div>
          </div>
        </section>

        <section className="workflow-section">
          <div className="section-heading" data-reveal><span className="section-kicker">{text.workflowKicker}</span><h2>{text.workflowTitle}</h2></div>
          <div className="workflow-list">
            {workflows[language].map(([number, title, description]) => (
              <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{description}</p><i aria-hidden="true">↗</i></article>
            ))}
          </div>
        </section>

        <section className="compatibility-section" id="compatibility">
          <div className="section-heading" data-reveal><span className="section-kicker">{text.compatibilityKicker}</span><h2>{text.compatibilityTitle}</h2></div>
          <div className="compatibility-table" role="table" aria-label="PlanetX compatibility" data-reveal>
            <div role="row" className="compatibility-table__head"><span role="columnheader">{text.planetX}</span><span role="columnheader">{text.unreal}</span><span role="columnheader">{text.status}</span><span role="columnheader">{text.notes}</span></div>
            <div role="row"><strong role="cell">1.0</strong><span role="cell">{text.rangeNotDeclared}</span><span role="cell"><b className="status status--review">{text.review}</b></span><span role="cell">{text.engineNote}</span></div>
            <div role="row"><strong role="cell">1.0</strong><span role="cell">GeometryProcessing</span><span role="cell"><b className="status status--verified">{text.verified}</b></span><span role="cell">{text.geometryNote}</span></div>
            <div role="row"><strong role="cell">1.0</strong><span role="cell">World Partition</span><span role="cell"><b className="status status--review">{text.workflowQa}</b></span><span role="cell">{text.partitionNote}</span></div>
          </div>
          <p className="compatibility-note">{text.compatibilityNote}</p>
        </section>

        <section className="docs-cta" data-reveal>
          <div><span className="section-kicker">{text.docsKicker}</span><h2>{text.docsTitle}</h2></div>
          <div><p>{text.docsBody}</p><div className="docs-cta__actions"><Link className="button button--light" href={`/docs/${language}/getting-started`}>{text.openDocs}</Link><Link className="button button--outline-light" href={`/docs/${language === "en" ? "ko" : "en"}/overview`}>{text.otherLanguageDocs}</Link></div></div>
        </section>

        <section className="fab-cta" data-reveal>
          <BrandMark className="fab-cta__mark" size={92} title="PlanetX orbital mark" />
          <div><span className="section-kicker">{text.fabKicker}</span><h2>PlanetX 1.0</h2><p>{text.fabBody}</p></div>
          <span className="button button--disabled" aria-disabled="true">{text.fabPending}</span>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__brand"><BrandMark size={40} /><span><strong>PlanetX</strong><small>by LabX</small></span></div>
        <p>{text.footerTagline}</p>
        <nav aria-label="Footer navigation">
          <Link href="/docs">{text.docsKicker}</Link>
          <Link href={`/docs/${language}/support-release-notes`}>{language === "ko" ? "릴리스 노트" : "Release notes"}</Link>
          <Link href={`/docs/${language}/troubleshooting`}>{language === "ko" ? "지원" : "Support"}</Link>
          <a href="https://github.com/Jungle-LabX/PlanetX-Docs" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <p className="site-footer__disclaimer">{text.disclaimer}</p>
        <small className="site-footer__rights">{text.rights}</small>
      </footer>
    </div>
  );
}
