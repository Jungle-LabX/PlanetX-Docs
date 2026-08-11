# 검증과 진단

PlanetX 검증은 오류 문구만 나열하지 않고 finding의 Severity, Impact, blocking scope, 자동 수정 가능 여부와 resolution action을 제공합니다.

## Quick와 Full Validate

Quick Validate는 Asset 구조와 즉시 확인 가능한 계약을 검사합니다. Full Validate는 World, Proxy Bake link, Runtime Preview, 생성 결과까지 더 깊게 확인하고 구조화된 로그를 남깁니다.

Diagnostics 탭의 주요 동작:

- Quick Validate
- Full Validate
- Review Sections
- Open Proxy Bake
- Show Section
- Open Details

## Validate palette

PlanetX Mode의 Validate palette는 현재 World와 연결 Asset을 함께 검사합니다. **Fix All Safe**는 결과가 결정적이고 추가 선택이 필요 없는 Warning만 수정합니다. 파괴적 작업이나 사용자 결정을 요구하는 finding은 자동으로 바꾸지 않습니다.

## 자주 보는 finding

- Planet ID/Section ID 누락 또는 중복
- 잘못된 Radius나 Coordinate Convention
- Same World와 External Level의 World package 관계 오류
- GroundSyncMapping 또는 TransitionPolicy 누락
- stale Proxy Bake/Generated Visual/Generated Material
- 변경된 Source Material
- unresolved Reference Planet/Section
- World Partition runtime load policy 불일치

## 로그와 지원 자료

Full Validate 결과는 `LogPlanetXValidation`에 안정적인 Surface/Operation/Subject 형태로 기록됩니다. Visual Edit 문제는 `PlanetX.VisualEdit.Dump`, proxy 표현은 `PlanetX.ProxyStats.Dump`로 추가 상태를 확인하세요.
