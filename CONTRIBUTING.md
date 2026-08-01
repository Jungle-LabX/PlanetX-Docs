# Contributing to PlanetX Docs

## Source of truth

플러그인 저장소의 `ProjectPlanetX/Plugins/PlanetX/Docs/UserGuide`가 제품 문서의 최초 원본입니다. 이 저장소의 `source-docs/`는 게시 파이프라인을 위한 보존 복사본이며, `content/generated-docs.json`은 생성물입니다. 생성물을 직접 편집하지 마세요.

## Writing rules

- 한 문서는 하나의 사용자 과업 또는 개념에 집중합니다.
- 제목은 한 개의 H1으로 시작하고, 본문 구조는 H2부터 사용합니다.
- 절차는 전제 조건, 단계, 기대 결과, 실패 시 확인 항목 순서로 작성합니다.
- C++ 타입, UPROPERTY, 콘솔 변수, 플러그인 의존성은 코드에서 확인한 공개 이름만 사용합니다.
- 검증하지 못한 호환성이나 제품 동작은 `제품 확인 필요`로 분리합니다.
- 내부 개발 메모, 사설 경로, 자격 증명, 개인 정보는 게시하지 않습니다.

## English and Korean parity

- 동일 주제는 `migration/document-map.json`의 subject와 slug를 공유합니다.
- 한 언어만 먼저 추가할 수 있지만, 대응 문서에는 번역 대기 상태를 명시합니다.
- 용어는 `migration/terminology.en-ko.json`을 우선합니다.
- 번역은 코드, API 이름, 파일 경로를 변경하지 않습니다.
- 번역 완료 후 `npm run docs:check`에서 language-only 상태가 의도대로 줄었는지 확인합니다.

## Screenshots and diagrams

- 실제 제품 UI 스크린샷에는 사용한 PlanetX와 Unreal Engine 버전을 PR에 기록합니다.
- 스크린샷은 `public/images/`에 넣고 문서에서는 루트 기준 경로로 참조합니다.
- 각 이미지에 대체 텍스트를 작성하고, 장식 이미지는 빈 대체 텍스트를 사용합니다.
- 생성형 이미지를 기능 증거 또는 실제 Unreal Editor 캡처처럼 표현하지 않습니다.

## Page template

```markdown
# Page title

한 문단 요약.

## Prerequisites

## Workflow

## Expected result

## Troubleshooting
```

## Pull request checklist

- [ ] 원본과 `source-docs/`가 동기화되었습니다.
- [ ] EN/KO 상태와 용어집을 확인했습니다.
- [ ] 새 주장이 실제 코드 또는 승인된 제품 정책으로 검증되었습니다.
- [ ] `npm run docs:check`, `npm run typecheck`, `npm run lint`가 통과합니다.
- [ ] UI 변경이면 데스크톱과 모바일, 키보드 탐색, reduced-motion을 확인했습니다.
- [ ] 링크, 코드 복사, 이미지 확대, 로컬 검색을 확인했습니다.

## Release and version changes

문서 버전은 플러그인 배포 버전을 따릅니다. 호환되지 않는 변경은 이전 버전 링크를 보존하는 별도 스냅샷 계획과 함께 제안해야 합니다. Release Notes에는 사용자 영향, 마이그레이션, 알려진 제한을 기록합니다.
