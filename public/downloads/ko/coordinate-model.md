# 좌표 모델

PlanetX는 World 좌표 하나에 모든 의미를 넣지 않고 목적이 다른 좌표 Frame을 명시적으로 구분합니다.

## 좌표 종류

| 좌표 | 의미 |
| --- | --- |
| World | 현재 Unreal World의 Transform |
| Planet Local | Planet Actor 원점을 기준으로 한 3D 위치 |
| Canonical Geo | Latitude, Longitude, AltitudeCm |
| Section Local | 특정 Section의 tangent frame |
| Surface Frame | East, North, Up 기저 |
| FPlanetXTransform | Planet ID/Binding과 위치·회전을 함께 저장하는 표준 pose |

`FPlanetXCoordinateConvention`은 North Pole과 경도 축을 정의합니다. Geo의 altitude는 Planet Radius를 기준으로 한 cm 값입니다.

## Coordinate Component의 권위

`UPlanetXCoordinateComponent.CoordinateMode`이 Unreal이면 Owner World Transform이 원본이고 PlanetX snapshot은 캡처됩니다. PlanetX 모드에서는 `FPlanetXTransform`이 원본이며 Apply가 World Transform을 만듭니다. Capture와 Apply는 명시적 작업입니다.

Reference resolve 우선순위는 Reference Planet Actor, Reference Planet ID 순입니다. Section ID를 지정하면 해당 Frame이 authoritative합니다.

## 벡터 변환

위치는 점 변환이고 이동 입력은 벡터 변환입니다. `ConvertCoordinateVectorToWorld`에서 Surface Frame을 사용하면 X/Y/Z를 East/North/Up으로 해석할 수 있습니다. 지표 이동은 `bProjectToSurfaceTangent`를 켜 Up 성분을 제거할 수 있습니다.

## 실패 처리

Transform과 Query 함수는 bool만 보지 말고 `FPlanetXTransformResolveResult` 또는 상세 Status를 확인하세요. 잘못된 버전, 미등록 Planet, 모호한 Binding, 지원하지 않는 Planet scale, 유효하지 않은 Section이 구분됩니다.
