# PlanetX Official Website and Documentation

PlanetX의 제품 랜딩 페이지와 Unreal Engine 플러그인 사용자 문서를 한 저장소에서 운영하는 정적 사이트입니다. 영문·국문 원문을 보존하면서 빌드 시 검색 가능한 문서 데이터와 정적 라우트를 생성합니다.

## Requirements

- Node.js 22.13 이상
- npm 10 이상

## Local development

```bash
npm ci
npm run dev
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다. `npm run dev`를 시작할 때 `source-docs/`에서 문서 데이터를 다시 생성합니다.

## Validation

```bash
npm run docs:generate
npm run docs:check
npm run typecheck
npm run lint
npm test
```

- `docs:generate`: manifest와 보존 원본에서 게시 데이터, 다운로드, 이미지 복사본을 다시 생성합니다.
- `docs:check`: manifest, EN/KO 대응, 필수 메타데이터, 링크, 이미지, 다운로드 상태를 검사합니다.
- `typecheck`: TypeScript 정적 검사를 실행합니다.
- `lint`: 앱과 스크립트의 코드 품질을 검사합니다.
- `test`: vinext 프로덕션 빌드 후 랜딩 및 EN/KO 문서 라우트를 서버 렌더링하여 검증합니다.

GitHub Pages용 결과물은 다음 명령으로 `out/`에 생성합니다.

```bash
npm run build:pages
```

## Repository map

| 경로 | 역할 |
| --- | --- |
| `app/` | 랜딩, 문서 UI, 검색, 반응형 레이아웃 |
| `source-docs/en`, `source-docs/ko` | 공개 핵심 문서와 웹 전용 보충 문서의 보존 원본 |
| `source-docs/docs-manifest.json` | 11개 카테고리, 언어별 48개 핵심 문서, 순서, 제목, 기본 문서, alias의 기준 정보 |
| `content/generated-docs.json` | 빌드용 생성 데이터; 직접 편집 금지 |
| `scripts/compile-docs.mjs` | Markdown 정규화·메타데이터·검색 데이터 생성 |
| `scripts/check-docs.mjs` | 언어별 문서 대응과 품질 검사 |
| `migration/` | 원문 매핑, 용어집, 미해결 번역 목록 |
| `assessment/` | 공개 준비도, 코드 검증, 운영 결정 기록 |
| `.github/workflows/` | CI와 GitHub Pages 배포 |

## Updating documentation

플러그인 배포본의 원본 문서는 다음 구조를 사용합니다.

```text
Docs/docs/en/<category>/<slug>.md
Docs/docs/ko/<category>/<slug>.md
```

게시 변경은 플러그인 문서를 먼저 수정한 뒤 동일한 상대 경로로 `source-docs/`에 동기화합니다. 문서를 추가하거나 순서를 바꿀 때는 `source-docs/docs-manifest.json`도 함께 수정합니다. 이후 아래 명령을 실행하고 생성 파일, 다운로드, 게시 이미지도 함께 커밋합니다.

```bash
npm run docs:generate
npm run docs:check
```

2026-08-11 기준으로 언어별 48개 핵심 문서는 EN/KO가 모두 대응하며, FAQ와 Known Issues를 합쳐 총 100개 온라인 레코드를 생성합니다. 기본 문서는 `quick-start-same-world`이고 기존 URL은 manifest alias로 보존합니다. PlanetX 1.0의 공개 계약은 Unreal Engine 5.8, Win64, 필수 플러그인 GeometryProcessing과 PCG입니다. 그 밖의 제품 호환성, 콘솔 변수, 퍼블릭 API 또는 지원 정책은 근거 없이 추정하지 않습니다.

## Versioning policy

- 현재 문서 버전은 플러그인 `VersionName`과 맞춘 `1.0`입니다.
- 패치 릴리스는 현행 문서를 갱신하고 Release Notes에 기록합니다.
- 호환되지 않는 주요 변경은 새 버전 문서 스냅샷을 만든 후 기본 버전을 전환합니다.
- `migration/document-map.json`의 안정적인 subject와 slug를 유지하여 기존 링크를 보호합니다.

## GitHub Pages

`deploy-pages.yml`은 `main` 브랜치 변경 시 `/PlanetX-Docs` base path로 정적 사이트를 빌드합니다. 실제 저장소 이름이 다르면 워크플로의 `NEXT_PUBLIC_BASE_PATH`와 `NEXT_PUBLIC_SITE_URL`을 함께 수정하세요. 조직 루트 저장소(`<owner>.github.io`) 또는 커스텀 도메인은 base path를 빈 문자열로 설정합니다.

GitHub 저장소에서 다음 설정이 한 번 필요합니다.

1. **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
2. `main` 브랜치를 보호하고 CI 통과를 병합 조건으로 설정합니다.
3. Fab 배포 링크와 YouTube Demo는 Landing의 상단 및 하단 CTA에 연결되어 있습니다. 지원 채널 URL은 확정 후 별도로 연결합니다.

자세한 수동 작업과 확인 항목은 [`assessment/CODEX_CAPABILITY_AND_MANUAL_STEPS.md`](assessment/CODEX_CAPABILITY_AND_MANUAL_STEPS.md)를 참고하세요.

## Media and accessibility

- 현재 원본에는 물리 이미지 14개가 있습니다. 개요 이미지 6개는 EN/KO의 12개 참조에서 재사용되고, Same World Quick Start의 단계 이미지 8개는 EN/KO의 16개 참조에서 재사용됩니다. Level Handoff 문서에는 아직 스크린샷이 없으므로 실제 UI 재현 검토가 별도 릴리스 게이트입니다.
- 스크린샷은 실제 Unreal Engine 화면만 사용하고 민감한 경로·프로젝트 이름을 제거합니다.
- 이미지에는 의미 있는 대체 텍스트를 제공합니다.
- 애니메이션은 `prefers-reduced-motion`을 존중하며 핵심 정보 전달을 모션에 의존하지 않습니다.
- 생성형 이미지는 제품 UI 증거로 사용하지 않고 브랜드·소셜 비주얼에만 사용합니다.

## Contributing

문서 작성 규칙, 번역 정책, 리뷰 체크리스트는 [`CONTRIBUTING.md`](CONTRIBUTING.md)에 정의되어 있습니다.
