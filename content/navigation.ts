import type { DocLanguage } from "./docs";

type LocalizedLabel = Record<DocLanguage, string>;

export const primaryNavigation: Array<{
  id: "product" | "documentation" | "compatibility" | "known-issues" | "faq";
  label: LocalizedLabel;
  href: (lang: DocLanguage) => string;
}> = [
  { id: "product", label: { en: "Product", ko: "제품" }, href: () => "/#product" },
  { id: "documentation", label: { en: "Documentation", ko: "문서" }, href: () => "/docs" },
  { id: "compatibility", label: { en: "Compatibility", ko: "호환성" }, href: () => "/#compatibility" },
  { id: "known-issues", label: { en: "Known Issues", ko: "알려진 문제" }, href: (lang) => `/docs/${lang}/known-issues` },
  { id: "faq", label: { en: "FAQ", ko: "FAQ" }, href: (lang) => `/docs/${lang}/faq` },
];

export const canonicalDocTitles: Record<string, LocalizedLabel> = {
  overview: { en: "Overview", ko: "개요" },
  "getting-started": { en: "Quick Start", ko: "빠른 시작" },
  "editor-workflow": { en: "Editor Workflow", ko: "Editor 워크플로" },
  "large-world-world-partition": { en: "Large World & World Partition", ko: "대규모 월드와 World Partition" },
  "runtime-integration": { en: "Runtime Integration", ko: "Runtime 통합" },
  "runtime-actor-integration": { en: "Runtime Actor Integration", ko: "Runtime Actor 통합" },
  "core-concepts": { en: "Core Concepts", ko: "핵심 개념" },
  "supported-content": { en: "Supported Content", ko: "지원 콘텐츠" },
  "performance-optimization": { en: "Performance & Optimization", ko: "성능과 최적화" },
  reference: { en: "Reference", ko: "Reference" },
  "user-api": { en: "Public API", ko: "Public API" },
  troubleshooting: { en: "Troubleshooting", ko: "문제 해결" },
  "support-release-notes": { en: "Support & Release Notes", ko: "지원과 릴리스 노트" },
  faq: { en: "FAQ", ko: "자주 묻는 질문" },
  "known-issues": { en: "Known Issues", ko: "알려진 문제" },
};

export const canonicalDocDescriptions: Record<string, LocalizedLabel> = {
  overview: {
    en: "Understand what PlanetX changes in an Unreal Engine project, which problems it solves, and where game-owned responsibilities begin.",
    ko: "PlanetX가 Unreal Engine 프로젝트에서 무엇을 바꾸고 어떤 문제를 해결하는지, 게임이 직접 담당할 영역은 어디인지 설명합니다.",
  },
  "getting-started": {
    en: "Create a Planet Asset, review a Ground source, and produce your first Orbit proxy in the Editor.",
    ko: "Planet Asset을 만들고 Ground Source를 검토한 뒤 Editor에서 첫 Orbit Proxy를 생성합니다.",
  },
  "editor-workflow": {
    en: "Use Refresh, Source Review, Output Plan, and Bake to generate and manage planet proxy content.",
    ko: "Refresh, Source Review, Output Plan, Bake 순서로 행성 Proxy 콘텐츠를 생성하고 관리합니다.",
  },
  "large-world-world-partition": {
    en: "Plan source discovery, partitioning, checkpoints, and external Bake for large Worlds and World Partition projects.",
    ko: "대규모 World와 World Partition 프로젝트의 Source 탐색, Partition, Checkpoint, External Bake 전략을 설명합니다.",
  },
  "runtime-integration": {
    en: "Connect Planet Actors, runtime roles, Same World, External Level, Surface Context, and Travel flows.",
    ko: "Planet Actor, Runtime Role, Same World, External Level, Surface Context, Travel 흐름을 연결합니다.",
  },
  "runtime-actor-integration": {
    en: "Connect a gameplay Actor, Pawn, or vehicle to PlanetX coordinates, movement, gravity, and transition flows.",
    ko: "Gameplay Actor, Pawn, Vehicle을 PlanetX 좌표, Movement, Gravity, Transition 흐름에 연결합니다.",
  },
  "core-concepts": {
    en: "Learn how Planet Asset, Section, Level Pair, projection, coordinates, partitions, and generated Assets fit together.",
    ko: "Planet Asset, Section, Level Pair, Projection, 좌표, Partition, Generated Asset의 관계를 설명합니다.",
  },
  "supported-content": {
    en: "Check which Static Mesh, Landscape, ISM/HISM, Foliage, Material, and collision content can be baked.",
    ko: "Static Mesh, Landscape, ISM/HISM, Foliage, Material, Collision 콘텐츠의 Bake 지원 범위를 확인합니다.",
  },
  "performance-optimization": {
    en: "Tune partition size, source LODs, memory budget, workers, and output density in a measured order.",
    ko: "Partition 크기, Source LOD, Memory Budget, Worker, 출력 밀도를 검증 가능한 순서로 조정합니다.",
  },
  reference: {
    en: "Look up Editor panels, runtime types, public APIs, Console Variables, generated paths, and log locations.",
    ko: "Editor 패널, Runtime 타입, Public API, Console Variable, 생성 경로, Log 위치를 빠르게 찾습니다.",
  },
  "user-api": {
    en: "Use the public Blueprint and C++ APIs for entry, Travel, coordinates, movement, queries, and diagnostics.",
    ko: "진입, Travel, 좌표, Movement, Query, Diagnostics를 위한 Blueprint 및 C++ Public API를 설명합니다.",
  },
  troubleshooting: {
    en: "Diagnose common Refresh, Bake, runtime, Travel, coordinate, and generated-content failures.",
    ko: "Refresh, Bake, Runtime, Travel, 좌표, Generated Content에서 발생하는 주요 오류를 진단합니다.",
  },
  "support-release-notes": {
    en: "Prepare a useful bug report and review the verified scope and limitations of the current release.",
    ko: "문제 재현에 필요한 정보를 준비하고 현재 Release의 검증 범위와 제한사항을 확인합니다.",
  },
  faq: {
    en: "Get concise answers about PlanetX scope, runtime ownership, states, Bake, World Partition, and support.",
    ko: "PlanetX 범위, Runtime 책임, 상태, Bake, World Partition, 지원에 관한 답을 빠르게 확인합니다.",
  },
  "known-issues": {
    en: "Review acknowledged issues, current status, workarounds, and items being prepared for a patch.",
    ko: "현재 인지한 문제, 진행 상태, 우회 방법, Patch 준비 항목을 한곳에서 확인합니다.",
  },
};

export const canonicalCategoryTitles: Record<string, LocalizedLabel> = {
  Introduction: { en: "Overview", ko: "개요" },
  "Getting Started": { en: "Getting Started", ko: "시작하기" },
  Workflows: { en: "Workflows", ko: "워크플로" },
  Runtime: { en: "Runtime", ko: "Runtime" },
  "Core Concepts": { en: "Core Concepts", ko: "핵심 개념" },
  Compatibility: { en: "Compatibility", ko: "호환성" },
  Optimization: { en: "Optimization", ko: "최적화" },
  Reference: { en: "Reference", ko: "Reference" },
  Troubleshooting: { en: "Troubleshooting", ko: "문제 해결" },
  Support: { en: "Support", ko: "지원" },
};

export function getCanonicalDocTitle(slug: string, lang: DocLanguage, fallback: string) {
  return canonicalDocTitles[slug]?.[lang] ?? fallback;
}

export function getCanonicalCategoryTitle(category: string, lang: DocLanguage) {
  return canonicalCategoryTitles[category]?.[lang] ?? category;
}

export function getCanonicalDocDescription(slug: string, lang: DocLanguage, fallback: string) {
  return canonicalDocDescriptions[slug]?.[lang] ?? fallback;
}
