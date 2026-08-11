# 좌표와 표면 쿼리

좌표 API는 Actor pose 변환과 행성 표면 탐색을 분리합니다. `UPlanetXSubsystem`은 World context를 받는 Blueprint facade이며 Coordinate Component는 Owner에 바인딩된 편의 API를 제공합니다.

## Transform Capture와 Resolve

- `CapturePlanetXTransform`: World Transform을 PlanetX 표준 pose로 캡처
- `CaptureActorPlanetXTransform`: Actor Transform을 캡처
- `ResolvePlanetXTransform`: 표준 pose를 현재 World Transform으로 계산
- `ApplyPlanetXTransformToActor`: 계산과 Actor 적용
- `ResolveCoordinateFrame`: Planet 또는 Section frame을 World로 resolve

반환 bool과 함께 `FPlanetXTransformResolveResult`를 확인합니다. Planet ID와 Binding, Section ID가 현재 World registry와 일치해야 합니다.

## 표면 Query

`FPlanetXSurfaceQueryInput`에는 ray origin/direction과 선택 조건이 들어갑니다. `QuerySurfaceAtWorldRayDetailed`은 Hit/Miss 외에 InvalidInput과 RuntimeUnavailable을 구분하므로 gameplay 분기에 권장됩니다.

Geo 또는 `FPlanetXTransform`에서도 표면을 조회할 수 있습니다. 결과 `FPlanetXSurfaceQueryResult`에는 Planet, Section, hit 위치, normal과 좌표 정보가 포함됩니다.

## 착지와 Section

`BuildLandingTransform`은 query 결과로 surface-aligned 착지 pose를 만듭니다. `GetSectionTransform`, `GetSectionDesc`, `GetSectionRuntimeState`는 Section 계약과 현재 상태를 조회합니다.

## Component 벡터 API

Surface Up/Down/East/North, tangent projection, Surface/Planet/Section Local ↔ World vector 변환을 제공합니다. 위치와 벡터를 혼동하지 말고, 지표 입력에는 tangent projection 여부를 명시하세요.
