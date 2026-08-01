import type { DocLanguage } from "./docs";

export const canonicalSearchAliases: Record<string, string[]> = {
  overview: ["about", "introduction", "product", "개요", "소개", "제품"],
  "getting-started": ["quick start", "install", "setup", "first proxy", "시작", "설치", "첫 프록시"],
  "editor-workflow": ["bake", "refresh", "source review", "output plan", "베이크", "소스 검토", "출력 계획"],
  "runtime-integration": ["runtime", "state", "handoff", "런타임", "상태", "핸드오프"],
  "runtime-actor-integration": ["blueprint", "pawn", "spaceship", "movement", "Blueprint", "Pawn", "우주선", "이동"],
  "core-concepts": ["coordinate", "surface", "section", "projection", "좌표", "표면", "섹션", "프로젝션"],
  "supported-content": ["static mesh", "landscape", "foliage", "ism", "hism", "지원 콘텐츠", "랜드스케이프"],
  "large-world-world-partition": ["wp", "world partition", "large world", "대규모 월드", "월드 파티션"],
  "performance-optimization": ["performance", "memory", "workers", "partition size", "성능", "메모리", "최적화"],
  reference: ["reference", "cvar", "setting", "레퍼런스", "설정"],
  "user-api": ["api", "cpp", "blueprint api", "public symbol", "사용자 API", "공개 API"],
  troubleshooting: ["error", "failure", "crash", "does not work", "오류", "실패", "문제", "작동하지 않음"],
  "support-release-notes": ["release", "version", "support", "changelog", "릴리스", "버전", "지원"],
  faq: ["faq", "question", "why", "how", "자주 묻는 질문", "질문", "왜", "어떻게"],
  "known-issues": ["known issue", "bug", "patch", "investigating", "알려진 문제", "버그", "패치", "조사 중"],
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
  { id: "planet-asset", term: "Planet Asset", ko: "Planet Asset", definition: { en: "The canonical Asset that identifies a planet and owns its radius, projection settings, Sections, and Bake links.", ko: "행성 식별자, 반지름, Projection 설정, Section, Bake 연결을 관리하는 기준 Asset입니다." }, aliases: ["planet data", "planet config", "행성 에셋", "행성 설정"], route: "core-concepts" },
  { id: "proxy-bake", term: "Proxy Bake", ko: "Proxy Bake", definition: { en: "The editor workflow that reviews source content and generates the curved orbit representation.", ko: "Source 콘텐츠를 검토하고 곡면 Orbit 표현을 생성하는 Editor 워크플로입니다." }, aliases: ["bake", "orbit proxy", "proxy generation", "베이크", "프록시 생성", "우주 프록시"], route: "editor-workflow" },
  { id: "source-review", term: "Source Review", ko: "Source Review", definition: { en: "The canonical classification of supported, manual-review, discarded, and unsupported source content.", ko: "지원, 수동 검토, 제외, 미지원 Source 콘텐츠를 분류하는 기준 검토 단계입니다." }, aliases: ["scan", "refresh result", "소스 검토", "스캔", "리프레시 결과"], route: "editor-workflow" },
  { id: "output-plan", term: "Output Plan", ko: "Output Plan", definition: { en: "The reviewed target path, partition, section, and rebuild state shown before a bake.", ko: "Bake 전에 표시되는 Target 경로, Partition, Section, Rebuild 상태 계획입니다." }, aliases: ["target conflict", "new output", "rebake required", "출력 계획", "타깃 충돌"], route: "editor-workflow" },
  { id: "section", term: "Section", ko: "Section", definition: { en: "A stable authored region that connects surface identity, generated data, and runtime level pairing.", ko: "표면 식별자, 생성 데이터, Runtime Level Pair를 연결하는 안정적인 제작 영역입니다." }, aliases: ["region", "surface region", "섹션", "영역"], route: "core-concepts" },
  { id: "same-world", term: "Same World", ko: "Same World", definition: { en: "A runtime mode where Ground and Orbit representations are coordinated inside one world.", ko: "Ground와 Orbit 표현을 하나의 World 안에서 조율하는 Runtime 모드입니다." }, aliases: ["single world", "same level", "동일 월드", "같은 월드"], route: "runtime-integration" },
  { id: "external-level", term: "External Level", ko: "External Level", definition: { en: "A runtime mode that crosses Worlds using a Travel Ticket and a restoration flow owned by the game.", ko: "Travel Ticket과 게임에서 관리하는 복원 흐름을 사용해 World 사이를 이동하는 Runtime 모드입니다." }, aliases: ["level handoff", "travel", "cross level", "외부 레벨", "레벨 이동", "트래블"], route: "runtime-integration" },
  { id: "transition", term: "Transition", ko: "Transition", definition: { en: "The state that resolves surface context and coordinates the handoff between Ground and Orbit.", ko: "Surface Context를 해석하고 Ground와 Orbit 사이의 Handoff를 조율하는 상태입니다." }, aliases: ["handoff", "landing", "enter ground", "전환", "착륙", "진입"], route: "runtime-integration" },
  { id: "world-partition", term: "World Partition", ko: "World Partition", definition: { en: "The Unreal Engine large-world system used by PlanetX source discovery and partitioned bake workflows.", ko: "PlanetX Source 탐색과 분할 Bake 워크플로에서 사용하는 Unreal Engine 대규모 World 시스템입니다." }, aliases: ["wp", "large world", "월드 파티션", "대규모 월드"], route: "large-world-world-partition" },
];
