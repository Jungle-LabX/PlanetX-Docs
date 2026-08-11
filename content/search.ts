import type { DocLanguage } from "./docs";

export const canonicalSearchAliases: Record<string, string[]> = {
  introduction: ["about", "overview", "product", "개요", "소개", "제품"],
  "quick-start-same-world": ["quick start", "start here", "first planet", "same world", "빠른 시작", "첫 행성"],
  installation: ["install", "setup", "plugin", "설치", "플러그인"],
  "proxy-bake-editor": ["bake", "scan sources", "source review", "output plan", "apply source changes", "베이크", "소스 스캔"],
  "proxy-bake-settings": ["world partition", "large world", "partition size", "월드 파티션", "대규모 월드"],
  "runtime-integration": ["runtime", "planet actor", "handoff", "런타임", "행성 액터"],
  "same-world-travel": ["same world", "ground", "orbit", "transition", "동일 월드", "전환"],
  "level-handoff-travel": ["external level", "open level", "travel", "레벨 이동", "월드 이동"],
  "planet-assets-identities": ["planet asset", "identity", "행성 에셋", "식별자"],
  "sections-level-pairs": ["section", "level pair", "섹션", "레벨 페어"],
  "compatibility-limitations": ["ue 5.8", "win64", "pcg", "geometryprocessing", "compatibility", "호환성"],
  "project-settings": ["performance", "memory", "workers", "budget", "성능", "메모리", "최적화"],
  "settings-overview": ["reference", "setting", "configuration", "레퍼런스", "설정"],
  "api-overview": ["api", "cpp", "blueprint api", "public symbol", "공개 api"],
  "setup-configuration": ["error", "failure", "does not work", "setup issue", "오류", "실패", "문제 해결"],
  "version-1-0": ["release", "version", "changelog", "mercury", "릴리스", "버전"],
  faq: ["faq", "question", "why", "how", "자주 묻는 질문", "질문"],
  "known-issues": ["known issue", "bug", "patch", "investigating", "알려진 문제", "버그", "패치"],
};

export type GlossaryEntry = {
  id: string;
  term: string;
  ko: string;
  definition: Record<DocLanguage, string>;
  aliases: string[];
  route: string;
};

export const glossaryEntries: GlossaryEntry[] = [
  {
    id: "planet-asset",
    term: "Planet Asset",
    ko: "Planet Asset",
    definition: {
      en: "The canonical asset that identifies a planet and owns its radius, projection settings, Sections, and Bake links.",
      ko: "행성 식별, 반지름, Projection 설정, Section, Bake 연결을 관리하는 기준 Asset입니다.",
    },
    aliases: ["planet data", "planet config", "행성 에셋", "행성 설정"],
    route: "planet-assets-identities",
  },
  {
    id: "proxy-bake",
    term: "Proxy Bake",
    ko: "Proxy Bake",
    definition: {
      en: "The editor workflow that scans source content and generates the curved Orbit representation.",
      ko: "Source 콘텐츠를 스캔하고 곡면 Orbit 표현을 생성하는 Editor 워크플로입니다.",
    },
    aliases: ["bake", "orbit proxy", "proxy generation", "베이크", "프록시 생성"],
    route: "proxy-bake-editor",
  },
  {
    id: "scan-sources",
    term: "Scan Sources",
    ko: "Scan Sources",
    definition: {
      en: "The F5 action that discovers Bake sources and rebuilds Source Review and the Output Plan.",
      ko: "Bake Source를 탐색하고 Source Review와 Output Plan을 갱신하는 F5 작업입니다.",
    },
    aliases: ["source scan", "source review", "f5", "소스 스캔", "소스 검토"],
    route: "proxy-bake-editor",
  },
  {
    id: "output-plan",
    term: "Output Plan",
    ko: "Output Plan",
    definition: {
      en: "The target path, partition, Section, and rebuild state shown before a Bake.",
      ko: "Bake 전에 표시되는 Target 경로, Partition, Section, Rebuild 상태입니다.",
    },
    aliases: ["target conflict", "new output", "rebake required", "출력 계획", "타깃 충돌"],
    route: "proxy-bake-editor",
  },
  {
    id: "section",
    term: "Section",
    ko: "Section",
    definition: {
      en: "A stable authored region that connects surface identity, generated data, and runtime Level pairing.",
      ko: "표면 식별, 생성 데이터, Runtime Level Pair를 연결하는 안정적인 제작 영역입니다.",
    },
    aliases: ["region", "surface region", "섹션", "영역"],
    route: "sections-level-pairs",
  },
  {
    id: "same-world",
    term: "Same World",
    ko: "Same World",
    definition: {
      en: "A runtime mode where Ground and Orbit representations are coordinated inside one World.",
      ko: "Ground와 Orbit 표현을 하나의 World 안에서 조율하는 Runtime 모드입니다.",
    },
    aliases: ["single world", "same level", "동일 월드", "같은 월드"],
    route: "same-world-travel",
  },
  {
    id: "level-handoff",
    term: "Level Handoff",
    ko: "Level Handoff",
    definition: {
      en: "The advanced travel flow where PlanetX prepares and restores handoff state while game code owns OpenLevel, destination Pawn creation and possession, and GameMode policy.",
      ko: "PlanetX가 Handoff 상태를 준비·복원하고 게임 코드가 OpenLevel, 도착지 Pawn 생성·Possess, GameMode 정책을 담당하는 고급 Travel 흐름입니다.",
    },
    aliases: ["external level", "travel", "cross world", "레벨 이동", "월드 이동"],
    route: "level-handoff-travel",
  },
  {
    id: "transition",
    term: "Transition",
    ko: "Transition",
    definition: {
      en: "The state that coordinates the handoff between Ground and Orbit representations.",
      ko: "Ground와 Orbit 표현 사이의 Handoff를 조율하는 상태입니다.",
    },
    aliases: ["handoff", "landing", "enter ground", "전환", "착륙", "진입"],
    route: "transition-model",
  },
  {
    id: "world-partition",
    term: "World Partition",
    ko: "World Partition",
    definition: {
      en: "The Unreal Engine large-world system used by PlanetX source discovery and partitioned Bake workflows.",
      ko: "PlanetX Source 탐색과 분할 Bake 워크플로에서 사용하는 Unreal Engine 대규모 World 시스템입니다.",
    },
    aliases: ["wp", "large world", "월드 파티션", "대규모 월드"],
    route: "proxy-bake-settings",
  },
];
