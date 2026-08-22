# PlanetX 1.0.1 - Pending

예정된 유지보수 업데이트입니다. 현재 Fab에는 PlanetX 1.0 Mercury가 배포되어 있으며, 아래 변경 사항은 1.0.1이 게시되기 전까지 Fab 빌드에서 사용할 수 없습니다.

## 예정된 수정

- **외부 Browser Monitor:** 브라우저 acknowledgement가 없더라도 Monitor endpoint나 외부 Bake가 실패한 것처럼 처리되지 않습니다. 브라우저 실행은 best-effort이며 endpoint는 복구를 위해 계속 사용할 수 있습니다.
- **PlanetX Mode Transform Gizmo:** 일반 Actor와 다중 선택은 Unreal Engine Native Transform Gizmo로 fallback됩니다. PlanetX 전용 Gizmo는 Coordinate Component가 있는 Actor 하나를 선택한 경우에만 사용합니다.
- **Global Presentation:** `UPlanetXCoordinateComponent`에 **Presentation Scope**가 추가되었습니다. Actor가 Ground, Orbit, Transition에서 계속 보여야 하면 **Global**로 설정하세요. 이는 presentation 전용이며 Representation Domain, coordinate, Proxy Bake 대상 여부, physical-frame 소유권은 바꾸지 않습니다.

## 호환성 참고

- 기존 콘텐츠는 기본값 **Domain Only**를 유지하며 1.0의 presentation 동작을 보존합니다.
- 세 상태에서 authored presentation을 의도적으로 유지해야 하는 Actor에만 **Global**을 사용하세요.
- Global은 Representation Domain 양방향 변환이 아닙니다. Ground와 Orbit은 계속 coordinate와 loading 계약입니다.
